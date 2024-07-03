import { useCallback, useMemo, useState } from 'react';
import Lightbox, { SlideImage } from 'yet-another-react-lightbox';

import List from '@ra/components/List';

import 'yet-another-react-lightbox/styles.css';

import styles from './styles.module.scss';

const keyExtractor = (item: string) => item;

export default function Gallery({ images }: { images: string[] }) {
    const [index, setIndex] = useState(-1);

    const renderImage = useCallback(({ item, index, key }: { item: string; index: number; key: any }) => {
        return (
            <div onClick={() => setIndex(index)} key={key}>
                <img className={styles.image} src={item} />
            </div>
        );
    }, []);

    const slides: SlideImage[] = useMemo(() => {
        return images.map((image) => ({ src: image }));
    }, [images]);

    return (
        <div>
            <List keyExtractor={keyExtractor} className={styles.gallery} data={images} renderItem={renderImage} />
            <Lightbox slides={slides} open={index >= 0} index={index} close={() => setIndex(-1)} />
        </div>
    );
}
