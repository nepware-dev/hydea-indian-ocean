export default {
    territoryField: 'Territoire',
    titleField: 'Dénomination du bâtiment',
    galleryField: 'Photographies générales',
    excludedFields: [
        'Dénomination du bâtiment', //title
        'Photographies générales', //gallery
    ],
    excludeAutomatedFields: true, // will filter all the fields starting with underscore(_)
};
