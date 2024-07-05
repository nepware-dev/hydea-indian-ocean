export default {
    territoryField: 'Territoire',
    titleField: 'Dénomination du bâtiment',
    galleryField: 'Photographies générales',
    excludedFields: [
        'Dénomination du bâtiment', //title
        'Photographies générales', //gallery
        "Délimitation de la zone ou de l'ensemble auquel appartient le bâtiment", //poly coordinate
        "Périmètre de l'ensemble urbain",
    ],
    excludeAutomatedFields: true, // will filter all the fields starting with underscore(_)
    expressionFields: ['R'], // fields that will have mapbox layer expression (https://docs.mapbox.com/style-spec/reference/expressions/) in the value itself (like <2, >2) etc
};
