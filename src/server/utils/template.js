/* eslint-disable max-len */

export default ({
  data,
  helmet,
  html,
  style,
}) => `
  <!doctype html>
  <html ${helmet.htmlAttributes.toString()} >
    <head>
      <meta charset="utf-8" />
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${style.styledComponents}
    </head>
    <body ${helmet.bodyAttributes.toString()} >
      <div id="app">${html}</div>
      <style id="jss-server-side">${style.materialUI}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <script>
        window.__INIT_DATA_FROM_SERVER_RENDER__ = ${JSON.stringify(data)};
      </script>
      <script src="/bundles/index.js"></script>
    </body>
  </html>
`
