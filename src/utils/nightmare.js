const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });

const fetchHtml = async (url) => {
    return nightmare.goto(url)
        .wait('body')
        .evaluate(() => document.querySelector('html').innerHTML)
        .end()
        .then(response => response)
        .catch(err => '');
}

module.exports = { fetchHtml };