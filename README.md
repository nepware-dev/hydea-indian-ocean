# Hydea Indian Ocean

## Setting up
- Install NodeJS
- Enable corepack `corepack enable`
- Install dependencies `pnpm install`
- Make a copy of .env.example as .env and fill up the variables

## Configuring System
All of the dynamic config are located inside src/config. From here we can change
which filters are shown in the system, it's options, popup behaviour, main fields,
and etc.

### Configuring filters
Filters have a structure of
```
title: 'this represent what the title of filter is
title_en: 'this is just for documentation and used nowhere and system will work without this'
value: 'this represent which geojson property this filter works on if no value is given
        here then the filter don't have any effect on map
options: 'this one is optional, the system automatically generates the options from data
          if this is not present we can however pass our own option we if we want more
          customization of how options look'
flatOptions: 'easier options passing here we pass just array of string|number and it will act both as option value and option title
```

### Configuring fields
Rhe main fields like title, gallery, popup options can be be configured from `config/fields` file

## Building
For development: `pnpm dev`
For production: `pnpm build`
