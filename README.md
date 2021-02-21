# Chatterona UI

Chatterona UI is an application providing people to create groups, direct messages, channels, and public scenes to communicate with one another.
Built using the wonderful React, Material UI, and Redux combination. See [this](https://www.npmjs.com/) documentation for a topology view of this software.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all dependies.

```bash
cd chatterona_ui
npm install
```

## Usage
```bash
npm start
```

## Contributions

As we are currently still supporting this software, we are doing our best to avoid overlaps in development. Please reach out to our [team](https://www.npmjs.com/) for more information.


## Repository overview

```javascript 
folder structure
--src
   ---components  (separated by page)
        - Main
        - UserSettings
            ...
   ---constants   (hard coded values that are persistent through the application)  
   ---http        (http handlers / rest endpoints)
   ---images      (static assets)
   ---pages       (main page views, corresponding component folder)
   ---redux       (redux actions, reducers, store)
   ---services    (websocket interface & higher order components)
   ---styles      (theme variables, main css)
   ---utilities   (global utility functions used across application)
   // serviceWorkers, testSetup
```

## Other useful scripts
[Prettier](https://www.npmjs.com/package/prettier)
```bash
npm run lint:fix
```

