import { useState } from 'react';

interface FilterExpression {
  filter: [];
}

interface Option {
  title: string;
  name: string;
  value: string;
}

const useFilterExpression = () => {
    let _filterExpression = null;
    const [filterExpression, setFilterExpression] = useState<FilterExpression[] | null>(null);

    const updateFilterExpression = (option: Option, excludedField = null) => {
        const getTerritorieFilter = (prevFilterExpression: any, option: Option) => {
            if (prevFilterExpression && prevFilterExpression.length > 0) {
                const territorieFilter = prevFilterExpression[0].filter.find((item: any) => 'Territoire' in item);
                if (territorieFilter) {
                    return [
                        {
                            filter: [
                                {
                                    Territoire: territorieFilter.Territoire,
                                },
                            ],
                        },
                    ];
                }
                if (option) return null;
            }
            return prevFilterExpression;
        };

        if (!option && excludedField === 'type') {
            setFilterExpression((prevFilterExpression: any) => getTerritorieFilter(prevFilterExpression, option));
        }
        if (option && ['Bâtiment', 'Ensemble urbain', 'Patrimoine immatériel'].includes(option.title)) {
            setFilterExpression((prevFilterExpression: any) => getTerritorieFilter(prevFilterExpression, option));
            return;
        }

        const constructExpression = (option: Option) => {
            if (option.name === 'R') {
                const [expression, value] = option.value.split(' ');
                return {
                    field: option.name,
                    value: value,
                    expression: `${expression}=`,
                };
            }
            return {
                field: option.name,
                value: option.value,
                expression: `['get', '${option.name}']`,
            };
        };

        setFilterExpression((prevFilterExpression: any) => {
            let newFilterExpression;
            // construct filter for selected value
            if (option) {
                newFilterExpression = {
                    filter:
            prevFilterExpression && prevFilterExpression.length
                ? prevFilterExpression[0].filter
                    .filter((item: any) => !Object.prototype.hasOwnProperty.call(item, option.name))
                    .concat({
                        [option['name']]: constructExpression(option),
                    })
                : [
                    {
                        [option['name']]: constructExpression(option),
                    },
                ],
                };
            } else {
                // remove filter for cleared value
                return prevFilterExpression.map((item: any) => {
                    if (item?.filter) {
                        item.filter = item.filter.filter((filterItem: any) => {
                            return !(excludedField && excludedField in filterItem);
                        });
                    }
                    return item;
                });
            }
            return [newFilterExpression];
        });
    };

    if (filterExpression?.length) {
        _filterExpression = filterExpression[0]?.filter.reduce(
            (acc: any, curr: { value: { field: string; value: string; expression: string } }) => {
                for (const [, value] of Object.entries(curr)) {
                    if (value.field === 'R') {
                        acc.push([value.expression, ['get', value.field], value.value]);
                    } else {
                        acc.push(['==', ['get', value.field], value.value.toString()]);
                    }
                }
                return acc;
            },
            [],
        );
    }

    return [_filterExpression, updateFilterExpression];
};

export default useFilterExpression;
