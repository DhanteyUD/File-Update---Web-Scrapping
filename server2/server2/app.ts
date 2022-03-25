import http, { IncomingMessage, Server, ServerResponse } from 'http';
const axios: any = require('axios');
const cheerio: any = require('cheerio');

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/scrape' && req.method === 'POST') {
      let body: string = '';
      req.on('data', (chunk: string) => {
        body += chunk;
      });
      req.on('end', () => {
        const url: string = JSON.parse(body);
        axios(url)
          .then((response: any) => {
            const html: any = response.data;
            const $: any = cheerio.load(html);

            // Title...
            const title: string =
              $('meta[property="og:title"]').attr('content') ||
              $('title').text() ||
              $('meta[name="title"]').attr('content');
            console.log('TITLE:');
            console.table(title);
            console.log(
              '-------------------------------------------------------------------------------------------'
            );

            // Description...
            const description: string =
              $('meta[property="og:description"]').attr('content') ||
              $('meta[name="description"]').attr('content');
            console.log('DESCRIPTION:');
            console.table(description);
            console.log(
              '-------------------------------------------------------------------------------------------'
            );

            // ImageUrl...
            const imageUrl: string =
              $('meta[property="og:image"]').attr('content') ||
              $('meta[property="og:image:url"]').attr('content');
            console.log('IMAGE URL:');
            console.table(imageUrl);
            console.log(
              '-------------------------------------------------------------------------------------------'
            );
            console.log(
              '-------------------------------------------------------------------------------------------'
            );

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ title, description, imageUrl }));
          })
          .catch((err: any) => console.log(err));
      });
    }
  }
);

const PORT: number = 3001;

server.listen(PORT, () => console.log(`server started on port ${PORT}`));
