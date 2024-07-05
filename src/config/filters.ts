const subfilters = [
    {
        title: 'Bâtiment',
        options: [
            {
                title: 'Typologie',
                title_en: 'Typology',
                value: 'Typologie',
                options: [
                    {
                        title: "Bâtiment à caractère d'habitation",
                        title_en: 'Residential building',
                        value: 'hab',
                    },
                    {
                        title: 'Bâtiment à caractère social ou administratif',
                        title_en: 'Social or administrative building',
                        value: 'soc',
                    },
                    {
                        title: 'Bâtiment à caractère industriel, commercial ou maritime',
                        title_en: 'Industrial, commercial or maritime building',
                        value: 'ind',
                    },
                    {
                        title: 'Bâtiment à caractère militaire',
                        title_en: 'Military building',
                        value: 'mil',
                    },
                    {
                        title: 'Bâtiment à caractère agricole',
                        title_en: 'Agricultural building',
                        value: 'agr',
                    },
                    {
                        title: 'Bâtiment à caractère religieux',
                        title_en: 'Religious building',
                        value: 'rel',
                    },
                    {
                        title: 'Autres types',
                        title_en: 'Other types',
                        value: 'autre',
                    },
                ],
            },
            {
                title: 'Matériaux de construction',
                title_en: 'Building materials',
                value: 'Matériaux de construction', // Note: kobo_form -> `Materiaux_construction`
                options: [
                    {
                        title: 'Bois (préciser les essences)',
                        title_en: 'Wood (specify species)',
                        value: 'bois',
                    },
                    {
                        title: "Terre crue  (préciser la nature et l'origine)",
                        title_en: 'Raw earth (specify nature and origin)',
                        value: 'terre_crue',
                    },
                    {
                        title: 'Terre cuite  (préciser les formes, tailles et origines)',
                        title_en: 'Clay (specify shape, size and origin)',
                        value: 'terre_cuite',
                    },
                    {
                        title: 'Pierres maçonnées (préciser les types)',
                        title_en: 'Stone masonry (specify type)',
                        value: 'pierre',
                    },
                    {
                        title: 'Pierres sèches (préciser les types)',
                        title_en: 'Dry stone (specify type)',
                        value: 'pierres_s',
                    },
                    {
                        title: "Galets (préciser la forme et l'origine)",
                        title_en: 'Pebbles (specify shape and origin)',
                        value: 'galets',
                    },
                    {
                        title: 'Béton',
                        title_en: 'Concrete',
                        value: 'beton',
                    },
                    {
                        title: 'Ciment et parpaings',
                        title_en: 'Cement and breeze blocks',
                        value: 'ciment',
                    },
                    {
                        title: "Chaux (préciser l'origine)",
                        title_en: 'Lime (specify origin)',
                        value: 'chaux',
                    },
                    {
                        title: "Bambou (préciser l'origine)",
                        title_en: 'Bamboo (specify origin)',
                        value: 'bambou',
                    },
                    {
                        title: "Paille (préciser l'origine)",
                        title_en: 'Straw (specify origin)',
                        value: 'paille',
                    },
                    {
                        title: "Chaume (préciser l'origine)",
                        title_en: 'Straw (specify origin)',
                        value: 'chaume',
                    },
                    {
                        title: "Bananier (préciser l'origine)",
                        title_en: 'Banana (specify origin)',
                        value: 'bananier',
                    },
                    {
                        title: "Laca-laca (préciser l'origine)",
                        title_en: 'Laca-laca (specify origin)',
                        value: 'laca',
                    },
                    {
                        title: "Ravinala (préciser l'origine)",
                        title_en: 'Ravinala (specify origin)',
                        value: 'ravinala',
                    },
                    {
                        title: "Roseaux (préciser l'origine)",
                        title_en: 'Reed (specify origin)',
                        value: 'roseaux',
                    },
                    {
                        title: "Latanier (préciser l'origine)",
                        title_en: 'Latanier (specify origin)',
                        value: 'latanier',
                    },
                    {
                        title: "Palétuvier (préciser l'origine)",
                        title_en: 'Mangrove (specify origin)',
                        value: 'paletuvier',
                    },
                    {
                        title: 'Tôles',
                        title_en: 'Sheet metal',
                        value: 'toles',
                    },
                    {
                        title: 'Feuilles de zinc',
                        title_en: 'Zinc sheets',
                        value: 'zinc',
                    },
                    {
                        title: 'Cuivre',
                        title_en: 'Copper',
                        value: 'cuivre',
                    },
                    {
                        title: 'Autres',
                        title_en: 'Other',
                        value: 'autre',
                    },
                ],
            },
            {
                title: 'Période de construction',
                value: 'Période de construction', // Note: kobform -> `Periode_de_construction`
                title_en: 'Period of construction',
                options: [
                    {
                        title: '17ème siècle ou antérieur',
                        title_en: '17th century or earlier',
                        value: '1600',
                    },
                    {
                        title: '18ème siècle',
                        title_en: '18th century',
                        value: '1700',
                    },
                    {
                        title: '19ème siècle',
                        title_en: '19th century',
                        value: '1800',
                    },
                    {
                        title: '20ème siècle, première moitié (1900 – 1959)',
                        title_en: '20th century, first half (1900 - 1959)',
                        value: '1900',
                    },
                    {
                        title: '20ème siècle, deuxième moitié (1960 – 2000)',
                        title_en: '20th century, second half (1960 - 2000)',
                        value: '1960',
                    },
                    {
                        title: '21ème siècle',
                        title_en: '21st century',
                        value: '2000',
                    },
                ],
            },
        ],
        subFilter: [
            {
                title: 'Valeur Patrimoniale',
                value: 'VALEUR',
                title_en: 'Heritage value',
                options: [
                    {
                        title: 'Caractère historique intangible',
                        title_en: 'Intangible historic character',
                        value: 'Caractère historique intangible',
                        flatOptions: [0, 1, 2, 3],
                    },
                    {
                        title: 'Authenticité et intégrité',
                        value: 'Authenticité et intégrité',
                        title_en: 'Authenticity and integrity',
                        flatOptions: [0, 1, 2, 3],
                    },
                    {
                        title: 'Caractère architectural',
                        value: 'Caractère architectural',
                        title_en: 'Architectural character',
                        flatOptions: [0, 1, 2, 3],
                    },
                    {
                        title: 'Rôle dans le paysage et le territoire',
                        value: 'Rôle dans le paysage et le territoire',
                        title_en: 'Role in landscape and territory',
                        flatOptions: [0, 1, 2, 3],
                    },
                    {
                        title: 'Caractère décoratif',
                        value: 'Caractère décoratif',
                        title_en: 'Decorative character',
                        flatOptions: [0, 1, 2, 3],
                    },
                    {
                        title: 'VALEUR PATRIMONIALE ESTIMÉE',
                        value: 'R',
                        title_en: 'Estimated heritage value',
                        flatOptions: [
                            '>2.75',
                            '>2.5',
                            '>2.25',
                            '>2',
                            '>1.5',
                            '>1',
                            '<2.75',
                            '<2.5',
                            '<2.25',
                            '<2',
                            '<1.5',
                            '<1',
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: 'Ensemble urbain',
        options: [
            {
                title: 'Typologie',
                value: 'Typologie',
                title_en: 'Typology',
                options: [
                    {
                        title: "Bâtiment à caractère d'habitation",
                        title_en: 'Residential building',
                        value: 'hab',
                    },
                    {
                        title: 'Bâtiment à caractère social ou administratif',
                        title_en: 'Social or administrative building',
                        value: 'soc',
                    },
                    {
                        title: 'Bâtiment à caractère industriel, commercial ou maritime',
                        title_en: 'Industrial, commercial or maritime building',
                        value: 'ind',
                    },
                    {
                        title: 'Bâtiment à caractère militaire',
                        title_en: 'Military building',
                        value: 'mil',
                    },
                    {
                        title: 'Bâtiment à caractère agricole',
                        title_en: 'Agricultural building',
                        value: 'agr',
                    },
                    {
                        title: 'Bâtiment à caractère religieux',
                        title_en: 'Religious building',
                        value: 'rel',
                    },
                    {
                        title: 'Autres types',
                        title_en: 'Other types',
                        value: 'autre',
                    },
                ],
            },
            {
                title: 'Matériaux de construction',
                value: 'Matériaux de construction', // Note: kobo_form -> `Materiaux_construction`
                title_en: 'Building materials',
                options: [
                    {
                        title: 'Bois (préciser les essences)',
                        title_en: 'Wood (specify species)',
                        value: 'bois',
                    },
                    {
                        title: "Terre crue  (préciser la nature et l'origine)",
                        title_en: 'Raw earth (specify nature and origin)',
                        value: 'terre_crue',
                    },
                    {
                        title: 'Terre cuite  (préciser les formes, tailles et origines)',
                        title_en: 'Clay (specify shape, size and origin)',
                        value: 'terre_cuite',
                    },
                    {
                        title: 'Pierres maçonnées (préciser les types)',
                        title_en: 'Stone masonry (specify type)',
                        value: 'pierre',
                    },
                    {
                        title: 'Pierres sèches (préciser les types)',
                        title_en: 'Dry stone (specify type)',
                        value: 'pierres_s',
                    },
                    {
                        title: "Galets (préciser la forme et l'origine)",
                        title_en: 'Pebbles (specify shape and origin)',
                        value: 'galets',
                    },
                    {
                        title: 'Béton',
                        title_en: 'Concrete',
                        value: 'beton',
                    },
                    {
                        title: 'Ciment et parpaings',
                        title_en: 'Cement and breeze blocks',
                        value: 'ciment',
                    },
                    {
                        title: "Chaux (préciser l'origine)",
                        title_en: 'Lime (specify origin)',
                        value: 'chaux',
                    },
                    {
                        title: "Bambou (préciser l'origine)",
                        title_en: 'Bamboo (specify origin)',
                        value: 'bambou',
                    },
                    {
                        title: "Paille (préciser l'origine)",
                        title_en: 'Straw (specify origin)',
                        value: 'paille',
                    },
                    {
                        title: "Chaume (préciser l'origine)",
                        title_en: 'Straw (specify origin)',
                        value: 'chaume',
                    },
                    {
                        title: "Bananier (préciser l'origine)",
                        title_en: 'Banana (specify origin)',
                        value: 'bananier',
                    },
                    {
                        title: "Laca-laca (préciser l'origine)",
                        title_en: 'Laca-laca (specify origin)',
                        value: 'laca',
                    },
                    {
                        title: "Ravinala (préciser l'origine)",
                        title_en: 'Ravinala (specify origin)',
                        value: 'ravinala',
                    },
                    {
                        title: "Roseaux (préciser l'origine)",
                        title_en: 'Reed (specify origin)',
                        value: 'roseaux',
                    },
                    {
                        title: "Latanier (préciser l'origine)",
                        title_en: 'Latanier (specify origin)',
                        value: 'latanier',
                    },
                    {
                        title: "Palétuvier (préciser l'origine)",
                        title_en: 'Mangrove (specify origin)',
                        value: 'paletuvier',
                    },
                    {
                        title: 'Tôles',
                        title_en: 'Sheet metal',
                        value: 'toles',
                    },
                    {
                        title: 'Feuilles de zinc',
                        title_en: 'Zinc sheets',
                        value: 'zinc',
                    },
                    {
                        title: 'Cuivre',
                        title_en: 'Copper',
                        value: 'cuivre',
                    },
                    {
                        title: 'Autres',
                        title_en: 'Other',
                        value: 'autre',
                    },
                ],
            },
            {
                title: 'Période de construction',
                title_en: 'Period of construction',
                value: 'Période de construction',
                options: [
                    {
                        title: '17ème siècle ou antérieur',
                        title_en: '17th century or earlier',
                        value: '1600',
                    },
                    {
                        title: '18ème siècle',
                        title_en: '18th century',
                        value: '1700',
                    },
                    {
                        title: '19ème siècle',
                        title_en: '19th century',
                        value: '1800',
                    },
                    {
                        title: '20ème siècle, première moitié (1900 – 1959)',
                        title_en: '20th century, first half (1900 - 1959)',
                        value: '1900',
                    },
                    {
                        title: '20ème siècle, deuxième moitié (1960 – 2000)',
                        title_en: '20th century, second half (1960 - 2000)',
                        value: '1960',
                    },
                    {
                        title: '21ème siècle',
                        title_en: '21st century',
                        value: '2000',
                    },
                ],
            },
        ],
        subFilter: [
            {
                title: 'Valeur Patrimoniale',
                value: 'VALEUR',
                title_en: 'Heritage value',
                options: [
                    {
                        title: 'Caractère historique intangible',
                        title_en: 'Intangible historic character',
                        value: 'Caractère historique intangible',
                        flatOptions: [0, 1, 2, 3],
                    },
                    {
                        title: 'Authenticité et intégrité',
                        value: 'Authenticité et intégrité',
                        title_en: 'Authenticity and integrity',
                        flatOptions: [0, 1, 2, 3],
                    },
                    {
                        title: 'Caractère architectural',
                        value: 'Caractère architectural',
                        title_en: 'Architectural character',
                        flatOptions: [0, 1, 2, 3],
                    },
                    {
                        title: 'Rôle dans le paysage et le territoire',
                        value: 'Rôle dans le paysage et le territoire',
                        title_en: 'Role in landscape and territory',
                        flatOptions: [0, 1, 2, 3],
                    },
                    {
                        title: 'Caractère décoratif',
                        value: 'Caractère décoratif',
                        title_en: 'Decorative character',
                        flatOptions: [0, 1, 2, 3],
                    },
                    {
                        title: 'VALEUR PATRIMONIALE ESTIMÉE',
                        value: 'R',
                        title_en: 'Estimated heritage value',
                        flatOptions: [
                            '>2.75',
                            '>2.5',
                            '>2.25',
                            '>2',
                            '>1.5',
                            '>1',
                            '<2.75',
                            '<2.5',
                            '<2.25',
                            '<2',
                            '<1.5',
                            '<1',
                        ],
                    },
                ],
            },
        ],
    },
    {
        // not found...
        title: 'Patrimoine immatériel',
        options: [
            {
                title: 'Types_de_patrimoine',
                value: 'Types_de_patrimoine',
            },
            {
                title: 'Sexe(s) concerné(s)',
                options: [
                    {
                        title: 'Hommes',
                        value: 'Hommes',
                    },
                    {
                        title: 'Femmes',
                        value: 'Femmes',
                    },
                    {
                        title: 'Les deux',
                        value: 'Les deux',
                    },
                ],
            },
        ],
    },
];

export default subfilters;
