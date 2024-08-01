'use client';
import React, { useState } from 'react';

import styles from './Select.module.scss';
import clsx from 'clsx';

type TProps = {
    items: string[];
    name: string;
    isMultiple?: boolean;
};

function chooseColor(i: number) {
    const colors = [
        '#ff5733',
        '#33ff57',
        '#3357ff',
        '#ff33a1',
        '#ff8c33',
        '#8cff33',
        '#338cff',
    ];
    return colors[i % colors.length];
}

export default function Select({ items, name, isMultiple }: TProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSelect = (option: string) => {
        setSelectedOptions([...selectedOptions, option]);
    };

    const handleSingleSelect = (option: string) => {
        setSelectedOptions([option]);
    };

    const handleRemove = (option: string) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={styles.container}>
            <div className={styles.dropdown} onClick={toggleDropdown}>
                <button className={styles.selectBtn}>
                    {selectedOptions.length > 0
                        ? selectedOptions.join(', ')
                        : name}
                </button>
                <div
                    className={clsx({
                        [styles.dropdownContent]: true,
                        [styles.show]: isDropdownOpen,
                    })}
                >
                    {items.map((option, i) => (
                        <div
                            key={option}
                            className={clsx({
                                [styles.option]: true,
                                [styles.selected]:
                                    selectedOptions.includes(option),
                            })}
                            onClick={() => {
                                if (isMultiple) {
                                    if (!selectedOptions.includes(option)) {
                                        handleSelect(option);
                                    } else {
                                        handleRemove(option);
                                    }
                                } else {
                                    handleSingleSelect(option);
                                }
                            }}
                        >
                            <span
                                style={{
                                    backgroundColor: chooseColor(i),
                                }}
                            >
                                {option}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <h3>{isMultiple ? 'Multiple' : 'Single'}: </h3>
            <ul>
                {isMultiple
                    ? (selectedOptions as string[]).map((i) => (
                          <li key={i}>{i}</li>
                      ))
                    : selectedOptions && <li>{selectedOptions}</li>}
            </ul>
        </div>
    );
}
