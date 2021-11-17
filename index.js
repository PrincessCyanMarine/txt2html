const { readFileSync, writeFileSync, existsSync } = require('fs');
const error = () => {
    console.error('Something is wrong, please check https://github.com/PrincessCyanMarine/txt2html to see how to isntall correctly\n');
    process.exit(1);
}

['./config.js', './files/input.txt', './github-markdown.css'].forEach(a => { if (!existsSync(a)) error(); });


const { html_text, formatter, github_auth } = require('./config');
if (!(html_text && formatter && github_auth) || !(github_auth.trim()) || github_auth == '') error();
console.log("Read config!");


const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: github_auth });



const input = readFileSync('./files/input.txt', 'utf-8');
console.log("Read input!");
const text = formatter(input);

writeFileSync('./files/output.md', text);
console.log('Written output.md!');
octokit.request('POST /markdown', { text }).then(body => {
    const css = readFileSync('./github-markdown.css', 'utf-8');
    writeFileSync('./files/output.html', html_text(css, body.data));
    console.log('Written output.html!');

    console.log('\nMade by CyanMarine :P');
    console.log('Check https://github.com/PrincessCyanMarine/txt2html for more info\n');
});
