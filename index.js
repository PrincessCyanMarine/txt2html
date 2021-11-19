const { readFileSync, writeFileSync, existsSync, readdirSync } = require('fs');
const error = (a) => {
    console.error(a + '\nPlease check https://github.com/PrincessCyanMarine/txt2html#how-to-installuse to see how to isntall correctly\n');
    process.exit(1);
}

if (!existsSync('./config.js')) error('config.js does not exist');


const { html_text, formatter, github_auth, create_md } = require('./config');
if (!(html_text && formatter && github_auth) || !(github_auth.trim()) || github_auth == '') error("config.js is incorrect");
console.log("Read config!");


const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: github_auth });
const https = require('https');

const dir = readdirSync('./input/');
const css_URL = "https://raw.githubusercontent.com/sindresorhus/github-markdown-css/main/github-markdown.css";
var css = '';
https.get(css_URL, (res) => {
    res.on('data', (data) => { css += data });
    res.on('end', () => { convert(); });
});
async function convert(i) {
    console.log(``);
    const next = () => {
        if (i < (dir.length - 1)) convert(i + 1);
        else {
            console.log('\nMade by CyanMarine :P');
            console.log('Check https://github.com/PrincessCyanMarine/txt2html for more info\n');
        }
    };

    if (!i) i = 0;
    let file = dir[i];
    if (!file.endsWith('.txt')) { next(); return; };
    let file_name = file.split('.')[0];
    let input = readFileSync('./input/' + file, 'utf-8');
    console.log(`Read ${file}!`);
    let text = formatter(input);

    if (create_md) {
        writeFileSync('./output/' + file_name + '.md', text);
        console.log('Written ' + file_name + '.md!');
    }

    let body = (await octokit.request('POST /markdown', { text }))
        .data
        .replace(/<h1>([\s\S]+?<\/a>)([\s\S]+?)<\/h1>/g, (a, a1, a2) => `<h1 id=\"${a2.replace(/\s/g, '-')}\">${a1}${a2}</h1>`);
    writeFileSync('./output/' + file_name + '.html', html_text(css, body));
    console.log('Written ' + file_name + '.html!');

    next();
}