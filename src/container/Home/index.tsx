import mapboxgl from 'mapbox-gl';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import ImageGallery from 'react-image-gallery';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import greenMarker from 'assets/green-marker.png';
import redMarker from 'assets/red-marker.png';
import yellowMarker from 'assets/yellow-marker.png';
import Container from 'components/Container';
import Select from 'components/SelectInput';
import fields from 'config/fields';
import filters from 'config/filters';
import territories from 'config/territories';
import styles from 'styles.module.scss';

import Form from '@ra/components/Form/Advanced';
import cs from '@ra/cs';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const HYDEA_GEOJSON_URL = import.meta.env.VITE_HYDEA_GEOJSON_URL;

interface PopupProps {
    coordinates: any;
    data: any;
}

interface FilterItem {
    title: string;
    value: string;
    options?: any;
    flatOptions?: any;
    subFilter: any;
}

interface Filter {
    [key: string]: string;
}

const markers = [
    { title: 'mozambique', icon: greenMarker },
    { title: 'madagascar', icon: redMarker },
    { title: 'maurice', icon: yellowMarker },
];

const Home = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const [dataType, setDataType] = useState<FilterItem | null>(null);
    const [filter, setFilter] = useState<Filter>({});

    const PopupWrapper: React.FC<PopupProps> = ({ coordinates, data }) => {
        const popupRef = useRef(null);

        useEffect(() => {
            if (popupRef.current && map.current) {
                const popup = new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setDOMContent(popupRef.current)
                    .addTo(map.current);

                return () => {
                    popup.remove();
                };
            }
        }, [coordinates]);

        const galleryProps = {
            infinite: false,
            showNav: false,
            showThumbnails: false,
            showFullscreenButton: false,
            showPlayButton: false,
        };

        return (
            <div ref={popupRef} className={styles.mapPopUp}>
                <span className={styles.mapPopUpHeader}>{data?.title}</span>
                <p>{data?.description}</p>
                {data?.images && <ImageGallery {...galleryProps} items={data.images} />}
                {Object.keys(data.properties)
                    .filter((key) => !(fields.excludeAutomatedFields && key.startsWith('_')))
                    .filter((key) => !fields.excludedFields.includes(key))
                    .map((key) => (
                        <div>
                            <b>{key}</b>: {data.properties[key]}
                        </div>
                    ))}
            </div>
        );
    };

    useEffect(() => {
        if (!mapContainer.current) return;
        const mapInstance = new mapboxgl.Map({
            container: mapContainer.current,
            center: [51.284, -16.857],
            zoom: 4,
        });
        map.current = mapInstance;
        mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-left');
        mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-left');

        const loadMarkerImages = () => {
            markers.filter((marker) =>
                mapInstance?.loadImage(marker.icon, (error, res: any) => {
                    mapInstance?.addImage(marker.title.toString(), res);
                    if (error) {
                        console.warn(error);
                    }
                }),
            );
        };

        const addGeoJsonSource = (data: mapboxgl.MapboxGeoJSONFeature) => {
            mapInstance.addSource('HydeaGeoJson', {
                type: 'geojson',
                data: data,
            });
        };

        const addGeoJsonLayers = () => {
            mapInstance.addLayer({
                id: 'hydea-places',
                type: 'symbol',
                source: 'HydeaGeoJson',
                layout: {
                    'icon-image': ['coalesce', ['get', fields.territoryField], 'red'],
                    'icon-size': 1.25,
                    'icon-allow-overlap': true,
                },
            });
        };

        const initializeMap = () => {
            loadMarkerImages();
            fetch(HYDEA_GEOJSON_URL)
                .then((response) => response.json())
                .then((data) => {
                    addGeoJsonSource(data);
                    addGeoJsonLayers();
                });
        };

        mapInstance.on('load', initializeMap);
        mapInstance.on('click', 'hydea-places', (e: any) => {
            const coordinates = e?.features[0].geometry.coordinates.slice();
            const properties = e?.features[0].properties;
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            const popUpContent = {
                title: properties[fields.titleField],
                images: properties[fields.galleryField],
                properties,
            };
            ReactDOM.createRoot(document.createElement('div')).render(
                <PopupWrapper coordinates={coordinates} data={popUpContent} />,
            );
        });

        return () => {
            mapInstance.remove();
        };
    }, []);

    useEffect(() => {
        if (map.current) {
            const _filterExpression = Object.keys(filter).map((key) => ['==', ['get', key], filter[key].toString()]);

            if (map.current.isStyleLoaded()) {
                map.current.setFilter('hydea-places', ['all', ..._filterExpression]);
            }
        }
    }, [dataType, filter]);

    const updateLayerFilter = useCallback(
        (option: FilterItem, field: string) => {
            if (option) {
                setFilter({
                    ...filter,
                    [field]: option.value,
                });
            } else {
                const newFilter = Object.assign({}, filter);
                delete newFilter[field];
                setFilter(newFilter);
            }
        },
        [filter],
    );

    const handleSelectInputChange = useCallback(
        ({ option }: { option: FilterItem }, field: string | null = null) => {
            if (field === 'type') {
                // reset layer filters if the data type is changed
                if (option !== dataType) {
                    const newFilter = filter[fields.territoryField]
                        ? { [fields.territoryField]: filter[fields.territoryField] }
                        : {};
                    setFilter(newFilter);
                }
                setDataType(option);
            } else if (field) {
                updateLayerFilter(option, field);
            }
        },
        [filter, dataType, updateLayerFilter],
    );

    const filterOption = useMemo(
        () => filters.map(({ title, ...item }: { title: string }) => ({ title, value: 'type', ...item })),
        [],
    );

    const calculateOptions = useCallback((filterItem: FilterItem) => {
        if(filterItem.options) {
            return filterItem.options;
        } else if (filterItem.flatOptions) {
            return filterItem.flatOptions.map((option: string | number) => ({
                title: option.toString(),
                value: option,
            }));
        }
        return [];
    }, []);

    return (
        <Container>
            <Form className={styles.filterSection}>
                <Form.Input
                    component={Select}
                    options={territories}
                    placeholder={fields.territoryField}
                    onChange={(e: any) => handleSelectInputChange(e, fields.territoryField)}
                />
                <Form.Input
                    component={Select}
                    options={filterOption}
                    placeholder='Type of Data'
                    onChange={(e: any) => handleSelectInputChange(e, 'type')}
                />
                {dataType && (
                    <>
                        <div className={styles.filterSectionGroup}>
                            {dataType?.options.map((item: FilterItem) => (
                                <Form.Input
                                    key={`${dataType.title} ${item.title}`}
                                    component={Select}
                                    options={calculateOptions(item)}
                                    onChange={(e: any) => handleSelectInputChange(e, item.value)}
                                    placeholder={item.title}
                                />
                            ))}
                        </div>
                        <div className={cs(styles.filterSectionGroup, styles.filterSectionBlock)}>
                            {dataType?.subFilter && (
                                <div>
                                    <span className={styles.filterSectionBlockHeader}>
                                        {dataType?.subFilter[0].title}
                                    </span>
                                    <div className={styles.filterSectionBlockContent}>
                                        {dataType.subFilter[0].options.map((item: FilterItem) => (
                                            <div
                                                key={`${dataType.title} ${item.title}`}
                                                className={styles.filterSectionBlockContentItem}
                                            >
                                                <span className={styles.filterSectionBlockContentItemHeader}>
                                                    {item.title}
                                                </span>
                                                <Form.Input
                                                    component={Select}
                                                    options={calculateOptions(item)}
                                                    onChange={(e: any) => handleSelectInputChange(e, item.value)}
                                                    placeholder='Afficher tout'
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </Form>
            <div ref={mapContainer} className={styles.map} />
        </Container>
    );
};

export default Home;
