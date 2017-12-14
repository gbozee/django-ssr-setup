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
    
    <link rel="prefetch" href="/static/js/0.17e10159.chunk.js">
    <link rel="prefetch" href="/static/js/1.392e12f1.chunk.js">
</head>

<body>
    <div id="root">${html}</div>

<script type="text/javascript" src="https://unpkg.com/@umds/object-assign@4.1.1-beta.24/object-assign.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/react@16.2.0/umd/react.production.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/react-router-dom@4.2.2/umd/react-router-dom.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/react-dom@16.2.0/umd/react-dom.production.min.js"></script>
    <script type="text/javascript" src="/static/js/main.68d442dc.js"></script>
                        ${bundles.map(bundle => {
                            return `<script src="${bundle.file}"></script>`
                        }).join('\n')}
</body>

</html>

`;