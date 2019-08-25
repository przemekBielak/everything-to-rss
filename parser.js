const cheerio = require('cheerio')
const fs = require('fs')

let links = [];

fs.readFile('./email.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
    }

    const $ = cheerio.load(data);

    $('a').each(function (i, elem) {
        links.push({ name: $(this).text(), link: elem.attribs.href })
    })

    console.log(links)
})
