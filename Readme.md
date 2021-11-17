I wanted to convert a txt file to html so I made this

# How to install/use
Clone this clone this repo
```console
$ git clone https://github.com/PrincessCyanMarine/txt2html.git
$ cd txt2html
$ npm i
```

Create a file called config.js and paste
```javascript
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

        <body class="markdown-body">
            <div style="padding: 20px;">${body}</div>
        </body>
    </html>`,

    formatter: (input) => input

    github_auth: ""
}
```

Customize formatter and html_text to your liking

Go to https://github.com/settings/tokens to create an auth code and paste it on config.js as well

Create a folder called files

Paste your input txt file and rename it to input.txt

run convert.bat


# Possible thanks to
https://github.com/sindresorhus/github-markdown-css
https://docs.github.com/en/rest/reference/markdown