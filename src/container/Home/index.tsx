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
import DataTypes from 'data/dataTypes';
import Territories from 'data/territories';
import useFilterExpression from 'hooks/useFilterExpression';
import styles from 'styles.module.scss';

import Form from '@ra/components/Form/Advanced';
import cs from '@ra/cs';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const HYDEA_GEOJSON_URL = import.meta.env.VITE_HYDEA_GEOJSON_URL;

interface PopupProps {
  coordinates: any;
  data: any;
}

interface SelectedOption {
  id: number;
  title: string;
  name: string;
  value: string;
  option?: any;
  subFilter?: any;
  values?: any;
  field?: string;
}

const markers = [
    { id: 1, title: 'mozambique', icon: greenMarker },
    { id: 2, title: 'madagascar', icon: redMarker },
    { id: 3, title: 'maurice', icon: yellowMarker },
];

const Home = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const [dataType, setDataType] = useState<SelectedOption | null>(null);
    const [filterExpression, updateFilterExpression] = useFilterExpression();

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
                    'icon-image': ['coalesce', ['get', 'Territoire'], 'red'],
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
            const title = e?.features[0].properties['Dénomination du bâtiment']; //Note:- `Building name`
            const description = e.features[0].properties['Commentaire'];
            // console.log(e.features[0].properties); //
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            // fix: image field -> `Photographies générales`
            const popUpContent = { title, description, images: [] };
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
            if (filterExpression?.length) {
                map.current.setFilter('hydea-places', ['all', ...filterExpression]);
            } else {
                if (map.current.isStyleLoaded()) {
                    map.current.setFilter('hydea-places', null);
                }
            }
        }
    }, [dataType, filterExpression]);

    const handleSelectInputChange = useCallback(
        ({ option }: { option: SelectedOption }, field: string | null = null) => {
            if (field === 'type') {
                option ? setDataType(option) : setDataType(null);
            }
            updateFilterExpression(option, field);
        },
        [updateFilterExpression],
    );

    const territoriesOption = useMemo(
        () =>
            Territories.map(({ title, ...item }: { title: string }) => ({
                title,
                name: 'Territoire',
                ...item,
            })),
        [],
    );
    const dataTypesOption = useMemo(
        () => DataTypes.map(({ title, ...item }: { title: string }) => ({ title, name: 'type', ...item })),
        [],
    );

    return (
        <Container>
            <Form className={styles.filterSection}>
                <Form.Input
                    component={Select}
                    options={territoriesOption}
                    placeholder='Territoire'
                    onChange={(e: any) => handleSelectInputChange(e, 'Territoire')}
                />
                <Form.Input
                    component={Select}
                    options={dataTypesOption}
                    placeholder='Type of Data'
                    onChange={(e: any) => handleSelectInputChange(e, 'type')}
                />
                {dataType && (
                    <>
                        <div className={styles.filterSectionGroup}>
                            {dataType?.option.map((item: SelectedOption) => (
                                <Form.Input
                                    key={`${dataType.title} ${item.title}`}
                                    component={Select}
                                    options={
                                        item.option &&
                    item.option.map(({ title, ...subItem }: { title: string }) => ({
                        title,
                        name: item?.name,
                        ...subItem,
                    }))
                                    }
                                    onChange={(e: any) => handleSelectInputChange(e, item.title)}
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
                                        {dataType.subFilter[0].option.map((item: SelectedOption) => (
                                            <div
                                                key={`${dataType.title} ${item.title}`}
                                                className={styles.filterSectionBlockContentItem}
                                            >
                                                <span className={styles.filterSectionBlockContentItemHeader}>
                                                    {item.title}
                                                </span>
                                                <Form.Input
                                                    component={Select}
                                                    options={
                                                        item?.values &&
                            item?.values.map((option: SelectedOption) => ({
                                name: item.name,
                                title: option.toString(),
                                value: option,
                            }))
                                                    }
                                                    onChange={(e: any) => handleSelectInputChange(e, item.title)}
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
