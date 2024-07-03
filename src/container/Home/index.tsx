import { type FeatureCollection } from '@types/geojson';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Map, {
    NavigationControl,
    FullscreenControl,
    Source,
    Layer,
    MapRef,
    Popup,
    MapLayerMouseEvent,
} from 'react-map-gl';

import greenMarker from 'assets/green-marker.png';
import redMarker from 'assets/red-marker.png';
import yellowMarker from 'assets/yellow-marker.png';
import Container from 'components/Container';
import Gallery from 'components/Gallery';
import Select from 'components/SelectInput';
import fields from 'config/fields';
import filters from 'config/filters';
import territories from 'config/territories';
import styles from 'styles.module.scss';

import Form from '@ra/components/Form/Advanced';
import cs from '@ra/cs';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const HYDEA_GEOJSON_URL = import.meta.env.VITE_HYDEA_GEOJSON_URL;

interface PopupProps {
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

const PopupContent: React.FC<PopupProps> = ({ data }) => {
    return (
        <div className={styles.mapPopUp}>
            <div className={styles.mapPopUpHeader}>{data?.title}</div>
            <p>{data?.description}</p>
            {data?.images && <Gallery images={data.images} />}
            {Object.keys(data.properties)
                .filter((key) => !(fields.excludeAutomatedFields && key.startsWith('_')))
                .filter((key) => !fields.excludedFields.includes(key))
                .map((key) => (
                    <div className={styles.property}>
                        <span className={styles.title}>{key}</span>: {data.properties[key]}
                    </div>
                ))}
        </div>
    );
};

const Home = () => {
    const mapRef = useRef<MapRef>(null);

    const [data, setData] = useState<FeatureCollection>(null);
    const [dataType, setDataType] = useState<FilterItem | null>(null);
    const [filter, setFilter] = useState<Filter>({});
    const [popupData, setPopupData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(HYDEA_GEOJSON_URL);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, []);

    const onMapClick = useCallback(
        (e: MapLayerMouseEvent) => {
            if (popupData) {
                return setPopupData(null);
            }

            if (!e.features?.length) {
                return;
            }

            const coordinates = e?.features[0].geometry.coordinates.slice();
            const properties = e?.features[0].properties;
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            const newPopupData = {
                title: properties[fields.titleField],
                images: properties[fields.galleryField],
                properties,
                coordinates: coordinates,
            };
            setPopupData(newPopupData);
        },
        [popupData],
    );

    const onMapLoaded = useCallback(() => {
        markers.filter((marker) =>
            mapRef.current?.loadImage(marker.icon, (error, res: any) => {
                mapRef.current?.addImage(marker.title.toString(), res);
                if (error) {
                    console.warn(error);
                }
            }),
        );
    }, []);

    const mapFilterExp = useMemo(() => {
        const _filterExpression = Object.keys(filter).map((key) => {
            if (fields.expressionFields.includes(key)) {
                const match = filter[key].match(/([<>])(\d+(?:\.\d+)?)/);
                if (match) {
                    const [, operator, value] = match;
                    return [operator, ['get', key], value];
                }
                return [];
            }
            return ['==', ['get', key], filter[key].toString()];
        });
        return ['all', ..._filterExpression];
    }, [filter]);

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
        if (filterItem.options) {
            return filterItem.options;
        } else if (filterItem.flatOptions) {
            return filterItem.flatOptions.map((option: string | number) => ({
                title: option.toString(),
                value: option,
            }));
        }

        // try to dynamically generate options from the geojson data if no options given
        const values: Array<string | number> = [
            ...new Set(data?.features.map((feature) => feature?.properties?.[filterItem.value])),
        ];
        return values
            .filter((val) => val ?? '')
            .filter((val) => val !== '')
            .map((val) => ({ title: val.toString(), value: val }));
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
            <Map
                ref={mapRef}
                style={{
                    height: '80vh',
                    width: '100%',
                    margin: '0 0 90px 0',
                }}
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{
                    longitude: 51.284,
                    latitude: -16.857,
                    zoom: 4,
                }}
                onLoad={onMapLoaded}
                mapStyle='mapbox://styles/mapbox/streets-v9'
                onClick={onMapClick}
                interactiveLayerIds={['hydea-places']}
            >
                <NavigationControl position='top-left' />
                <FullscreenControl position='top-left' />
                <Source id='HydeaGeoJson' type='geojson' data={data} />
                <Layer
                    id='hydea-places'
                    type='symbol'
                    source='HydeaGeoJson'
                    filter={mapFilterExp}
                    layout={{
                        'icon-image': ['coalesce', ['get', fields.territoryField], 'madagascar'],
                        'icon-size': 1,
                        'icon-allow-overlap': true,
                    }}
                />
                {!!popupData && (
                    <Popup
                        longitude={popupData.coordinates[0]}
                        latitude={popupData.coordinates[1]}
                        closeOnClick={true}
                        onClose={() => setPopupData(null)}
                    >
                        <PopupContent data={popupData} />
                    </Popup>
                )}
            </Map>
        </Container>
    );
};

export default Home;
