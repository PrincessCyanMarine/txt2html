# txt to markdown and html converter
I had a txt file I wanted to convert to html, but I didn't want to make it into markdown by hand, so I made this

# How to install/use
Run the following on terminal
```console
$ git clone https://github.com/PrincessCyanMarine/txt2html.git
$ cd txt2html
$ npm i
```

Open the config.js file

Customize formatter and html_text to your liking

If you want a .md file to be created, changed create_md to true

Go to https://github.com/settings/tokens to create an auth code and paste it on config.js as well

Paste your txt files on the input folder

Run convert.bat (or use ```node .```)

You will find the converted files on the output folder

# Done using
https://github.com/sindresorhus/github-markdown-css

https://docs.github.com/en/rest/reference/markdown