# dilsy

## An audio visual representation of bike share traffic in Washington, DC.

### Rundown

- Divide DC into a grid of 7 columns and 7 rows. The columns will represent the notes in the C major scale (C, D, E, F, G, A, B) and the columns will be different octives of the scales.
- Making API calls periodically and comparing the data against the last call, a note will be played to represent the activity. Depending on where the station is on the "grid" the note will be chosen and played.

### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```

#### Lints and fixes files

```
npm run lint
```

#### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
