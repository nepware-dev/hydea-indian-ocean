import React from 'react';

import SelectInput from '@ra/components/Form/SelectInput';

import styles from './styles.module.scss';

const keyExtractor = (item: { value: string }) => item?.value;
const valueExtractor = (item: { title: string }) => item?.title;

interface SelectProps {
    options: Array<{
        title: string;
        value: string;
    }>;
    placeholder: string;
}

const Select: React.FC<SelectProps> = ({ options, placeholder }) => {
    return (
        <SelectInput
            className={styles.select}
            optionsWrapperClassName={styles.optionsWrapperClassName}
            selectOptionClassName={styles.selectOptionClassName}
            optionItemClassName={styles.optionItemClassName}
            controlClassName={styles.controlClassName}
            options={options}
            valueExtractor={valueExtractor}
            keyExtractor={keyExtractor}
            clearable={false}
            placeholder={placeholder}
        />
    );
};

export default Select;
