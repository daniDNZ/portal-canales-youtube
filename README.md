# YT Portal

YTPortal es una app que permite ver los vídeos y estadísticas de cualquier canal de YouTube.

La demo está desplegada en [gh-pages](https://danidnz.github.io/portal-canales-youtube/).

## Configuración

Puedes probar YTPortal en local, descargándote el repositorio y siguiendo estos pasos:

1. Cambia el nombre al archivo `src/config.sample.ts` por `config.ts`.

2. Sustituye el contenido de la constante `YT_API_KEY` por tu key de la YouTube Data API v3.

```javascript
// Change this for your API key
export const YT_API_KEY = "<API_KEY>";
```

3. Para activar o desactivar _mock data_ y así poder usar la App sin hacer peticiones, puedes cambiar el booleano de la constante `LOAD_MOCK_DATA`.

```javascript
// true = Carga datos mock
// false = Pide los datos a la API
const LOAD_MOCK_DATA = true;
```

\*\*Trabajar con _mock data_ provoca que algunas acciones no funcionen, como el paginamiento de la lista de vídeos.

4. Posiciónate en el directorio e instala las dependencias con `npm` o `yarn`.

```shell
npm install

## OR

yarn
```

5. Lanza la App!

```shell
npm start

## OR

yarn start
```

6. Listo! La puedes visitar en [http://localhost:3000](http://localhost:3000).

\*\*Recuerda que necesitarás tener instalado [Node.js](https://nodejs.org/en/) y `npm` o `yarn`.

## Próximos pasos

- Añadir _Snackbars_ para mostrar errores.
- Activar automáticamente _mock data_ cuando se acaba el cupo de peticiones a la API.
- Eliminar _scroll_ horizontal en la paginación de los vídeos.

## Gracias por tu tiempo <3
