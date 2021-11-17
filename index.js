const { readFileSync, writeFileSync } = require('fs');
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: `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` });

var answer = readFileSync('./files/prova.txt', 'utf-8');
answer =
    answer
        .replace(/# ([\s\S]+?)[\r\n]/g, "\n```java\n$1\n```\n")
        .replace(/```\n+```java/g, '')
        .replace(/! ([\s\S]+?)[\r\n]/g, "\n```console\n$1\n```\n")
        .replace(/```\n+```console/g, '')
        .replace(/[0-9]{1,2} [a-e][\r\n]/g, "# $&")
        .replace(/([0-9]{1,2}):\s{5,6}([a-e])\s+[0-9]+/g, "[$1 $2](#$1-$2)\n")
        .replace(/gabarito\s+(explicação na linha)/i, "# Índice")
// .replace(//g, "")


writeFileSync('./files/prova.md', answer);
octokit.request('POST /markdown', {
    text: answer
}).then(markdown => {
    const css = readFileSync('./github-markdown.css', 'utf-8');
    writeFileSync('./files/prova.html', `<!DOCTYPE html>
    <html lang="pt-br">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <html>
        <head>
            <style>${css}</style>
            <title>Prova 1 de tecnicas - Rawan</title>
        </head>
        
        <body class="markdown-body">
            <div style="padding: 20px;">${markdown.data}</div>
        </body>
    </html>`);
});
