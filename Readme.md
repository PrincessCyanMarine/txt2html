# txt to markdown and html converter
I had a txt file I wanted to convert to html, but I didn't want to make it into markdown by hand, so I made this

# How to install/use
Click code

Click Download ZIP

Extract ZIP

Run ```npm i``` on the extracted folder


Create a config.js file and paste
```javascript
module.exports = {
    html_text: (css, body) => `
    <!DOCTYPE html>
    <html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <html>
        <head>
            <style>
            ${css}

            .markdown-body h1:hover { padding-left: 20px; }
            </style>
            <title>TITLE</title>
        </head>

        <body class="markdown-body" style="padding: 20px;">
            <div>${body}</div>
        </body>
    </html>`,
    formatter: (input) => (input + '\n')
    ,
    github_auth: '',
    create_md: false
}
```

Customize formatter and html_text to your liking

If you want a .md file to be created, change create_md to true

Go to https://github.com/settings/tokens to create an auth code and paste it on config.js as well

Create an input folder

Paste your txt files on the input folder

Run convert.bat (or use ```node .```)

You will find the converted files on the output folder

# Done using
https://github.com/sindresorhus/github-markdown-css

https://docs.github.com/en/rest/reference/markdown
