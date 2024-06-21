import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import './styles/_base.scss';

import Container from 'components/Container';
import Select from 'components/SelectInput';

import Form from '@ra/components/Form/Advanced';

import styles from './styles.module.scss';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const myGeoJson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [50.274850301973856, -19.692298962482],
            },
            properties: {
                image: 'green',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [52.970975815015834, -17.467855261386887],
            },
            properties: {
                image: 'yellow',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [52.40834505292676, -20.53752891369757],
            },
            properties: {
                image: 'red',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [42.384262512817855, -23.88830490702773],
            },
            properties: {
                image: 'red',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [39.642385217081994, -19.41017133333493],
            },
            properties: {
                image: 'red',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [43.55141448857154, -15.39889463267302],
            },
            properties: {
                image: 'yellow',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [43.7632405667795, -19.37851654917695],
            },
            properties: {
                image: 'yellow',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [81.99559777345331, 28.698158731705476],
            },
            properties: {
                image: 'green',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [37.573631087184765, -18.27075567222144],
            },
            properties: {
                image: 'green',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [41.193215851436435, -13.65227094138524],
            },
            properties: {
                image: 'red',
            },
        },
    ],
};

const App = () => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            center: [46.85398470163446, -19.44362550521764],
            zoom: 4,
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-left');
        map.addControl(new mapboxgl.FullscreenControl(), 'top-left');

        for (const marker of myGeoJson.features) {
            const el = document.createElement('img');
            el.className = marker.properties?.image || 'lorem';
            (el.style.height = '22px'), (el.src = `/src/assets/${marker.properties.image}-marker.svg`);

            const popup = new mapboxgl.Popup({ offset: 11 }).setHTML(
                `<h3>Your Title Here</h3><p>${marker.properties.image}</p>`,
            );
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates as any)
                .setPopup(popup)
                .addTo(map);
        }
    }, []);
    return (
        <Container>
            <Form className={styles.filterSection}>
                <Form.Input
                    component={Select}
                    options={[
                        { title: 'Dolor', value: 'dolor' },
                        { title: 'Ament', value: 'ament' },
                    ]}
                    placeholder='Territoire'
                />
                <Form.Input
                    component={Select}
                    options={[
                        { title: 'Lorem', value: 'lorem' },
                        { title: 'Ipusm', value: 'Ipsum' },
                    ]}
                    placeholder='Type of Date'
                />
            </Form>
            <div id='map' className={styles.map} />
        </Container>
    );
};

export default App;
