const { readFileSync, writeFileSync, existsSync } = require('fs');
const error = (a) => {
    console.error(a + '\nPlease check https://github.com/PrincessCyanMarine/txt2html#how-to-installuse to see how to isntall correctly\n');
    process.exit(1);
}

['./config.js', './files/input.txt'].forEach(a => { if (!existsSync(a)) error(a + ' does not exist'); });


const { html_text, formatter, github_auth } = require('./config');
if (!(html_text && formatter && github_auth) || !(github_auth.trim()) || github_auth == '') error("config.js is incorrect");
console.log("Read config!");


const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: github_auth });

const input = readFileSync('./files/input.txt', 'utf-8');
console.log("Read input!");
const text = formatter(input);

writeFileSync('./files/output.md', text);
console.log('Written output.md!');

const https = require('https');
var css = '';
https.get("https://raw.githubusercontent.com/sindresorhus/github-markdown-css/main/github-markdown.css", (res) => {
    res.on('data', (data) => { css += data });
    res.on('end', () => {
        octokit.request('POST /markdown', { text }).then(res => {
            const body = res.data.replace(/<h1>([\s\S]+?<\/a>)([\s\S]+?)<\/h1>/g, (a, a1, a2) => `<h1 id=\"${a2.replace(/\s/g, '-')}\">${a1}${a2}</h1>`);
            writeFileSync('./files/output.html', html_text(css, body));
            console.log('Written output.html!');

            console.log('\nMade by CyanMarine :P');
            console.log('Check https://github.com/PrincessCyanMarine/txt2html for more info\n');
        });
    });
});