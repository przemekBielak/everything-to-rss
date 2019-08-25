const cheerio = require('cheerio')
const fs = require('fs')
const feed = require('feed')

let posts = [];

fs.readFile('./email.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
    }

    const $ = cheerio.load(data);

    $('a').each(function (i, elem) {
        posts.push({ title: $(this).text(), url: elem.attribs.href })
    })

    // console.log(posts)

    const rssFeed = new feed.Feed({
        title: "Feed Title",
        description: "This is my personal feed!",
        id: "http://example.com/",
        link: "http://example.com/",
        language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
        image: "http://example.com/image.png",
        favicon: "http://example.com/favicon.ico",
        copyright: "All rights reserved 2013, John Doe",
        updated: new Date(2013, 6, 14), // optional, default = today
        generator: "awesome", // optional, default = 'Feed for Node.js'
        feedLinks: {
            json: "https://example.com/json",
            atom: "https://example.com/atom"
        },
        author: {
            name: "John Doe",
            email: "johndoe@example.com",
            link: "https://example.com/johndoe"
        }
    });

    posts.forEach(post => {
        rssFeed.addItem({
            title: post.title,
            id: post.url,
            link: post.url,
            description: "description",
            content: "content",
            image: "iamge"
        });
    });

    rssFeed.addCategory("Technologie");

    rssFeed.addContributor({
        name: "Johan Cruyff",
        email: "johancruyff@example.com",
        link: "https://example.com/johancruyff"
    });

    fs.writeFile('./rss.txt', rssFeed.rss2(), err => {
        if (err) {
            console.log(err)
        }
    })
    // Output: RSS 2.0
})


