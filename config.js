module.exports = {
    html_text: (css, body) => `
    <!DOCTYPE html>
    <html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <html>
        <head>
            <style>${css}</style>
            <title></title>
        </head>

        <body class="markdown-body" style="padding: 20px;">
            <div>${body}</div>
        </body>
    </html>`,
    formatter: (input) => input,
    github_auth: "",
    create_md: false
}