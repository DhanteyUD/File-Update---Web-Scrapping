"use strict";
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const url = 'https://www.jumia.com.ng/';
const PORT = 8080;
app.get('/', (req, res) => {
    axios
        .get(url)
        .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const title = $('meta[property="og:title"]').attr('content') ||
            $('title').text() ||
            $('meta[name="title"]').attr('content');
        const description = $('meta[property="og:description"]').attr('content') ||
            $('meta[name="description"]').attr('content');
        const imageUrl = $('meta[property="og:image"]').attr('content') ||
            $('meta[property="og:image:url"]').attr('content');
        res.json({
            title,
            description,
            imageUrl,
        });
    })
        .catch((err) => console.log(err));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
