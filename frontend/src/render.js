export default (html, css, bundles) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>React App</title>
    ${css}
    <link rel="prefetch" href="/static/js/0.2eaf09ee.chunk.js">
    <link rel="prefetch" href="/static/js/1.3cee81ce.chunk.js">
</head>

<body>
    <div id="root">${html}</div>
    ${bundles.getScriptTag()}
    <script type="text/javascript" src="/static/js/main.e111c47e.js"></script>


</body>

</html>

`;