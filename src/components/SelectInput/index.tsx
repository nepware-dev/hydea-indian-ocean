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
    onChange(e: React.ChangeEventHandler<HTMLInputElement>): void;
}

const Select: React.FC<SelectProps> = ({ options, placeholder, onChange }) => {
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
            clearable={true}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default Select;
