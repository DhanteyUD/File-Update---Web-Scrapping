import http, { IncomingMessage, Server, ServerResponse } from 'http';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
let format = require('./data/format.json');

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    switch (req.method) {
      case 'GET':
        if (req.url === '/') {
          fs.mkdir('data', () => {
            fs.writeFile(
              './data/database.json',
              JSON.stringify(format, null, ' '),
              'utf8',
              (err: any) => {
                if (err) {
                  console.log("Can't find data");
                }
              }
            );
          });

          console.log(format);
          console.log(`${format.length} data ready!`);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(format));
        }
        break;
      case 'POST':
        if (req.url === '/create') {
          let isExist: any = fs.existsSync('database.json');
          if (isExist === false) {
            let body: any = '';
            req.on('data', (chunk: any) => {
              body += chunk;
            });
            req.on('end', () => {
              const {
                organization,
                createdAt,
                updatedAt,
                products,
                marketValue,
                address,
                ceo,
                country,
                noOfEmployees,
                employees,
              } = JSON.parse(body);

              const data: any = {
                organization,
                createdAt,
                updatedAt,
                products,
                marketValue,
                address,
                ceo,
                country,
                noOfEmployees,
                employees,
              };

              // Model ...
              const newData: any = { id: uuid(), ...data };
              const dataCount: number = format.push(newData);
              console.log(newData);
              console.log(
                `Data with id ${newData.id} is successfully added to database...`
              );

              // // Util...
              // fs.writeFile('./data/database.json', JSON.stringify(format, null, ' '),'utf8', (err) => {});

              fs.writeFile('./data/database.json', body, 'utf8', (err: any) => {
                if (err) {
                  console.log("Can't find data");
                  return null;
                }
                console.log(`File ${dataCount} created successfully...`);
              });
              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(newData));
            });
          }
        }
        break;
      case 'PUT':
        if (req.url?.match(/\/data\/update\/([0-9A-Za-z]+)/)) {
          const id: string = req.url.split('/')[3];
          const newFormat: any = format.find((dataId: any) => dataId.id === id);
          if (!newFormat) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data not Found' }));
          } else {
            let body: any = '';
            req.on('data', (chunk) => {
              body += chunk.toString();
            });
            req.on('end', () => {
              const {
                organization,
                createdAt,
                updatedAt,
                products,
                marketValue,
                address,
                ceo,
                country,
                noOfEmployees,
                employees,
              } = JSON.parse(body);

              const dataFormat: any = {
                organization: organization || newFormat.organization,
                createdAt: createdAt || newFormat.createdAt,
                updatedAt: updatedAt || newFormat.updatedAt,
                products: products || newFormat.products,
                marketValue: marketValue || newFormat.marketValue,
                address: address || newFormat.address,
                ceo: ceo || newFormat.ceo,
                country: country || newFormat.country,
                noOfEmployees: noOfEmployees || newFormat.noOfEmployees,
                employees: employees || newFormat.employees,
              };

              // Model ...
              const index: number = format.findIndex(
                (dataId: any) => dataId.id === id
              );
              format[index] = { id, ...dataFormat };
              const updFormat: any = format[index];
              console.log(updFormat);
              console.log(
                `Data with id ${updFormat.id} is successfully updated...`
              );

              // Util...
              fs.writeFile('./data/database.json', body, 'utf8', (err: any) => {
                if (err) {
                  console.log("Can't find data");
                  return null;
                }
                console.log(`File ${index} updated successfully...`);
              });
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(updFormat));
            });
          }
        }
        break;
      case 'DELETE':
        if (req.url?.match(/\/data\/delete\/([0-9A-Za-z]+)/)) {
          const id: string = req.url.split('/')[3];
          const newFormat: any = format.find((dataId: any) => dataId.id === id);
          if (!newFormat) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data not Found' }));
          } else {
            format = format.filter((data: any) => data.id !== id);
            console.log(format);
            console.log(`Data ${id} removed...`);
            console.log(`${format.length} files in database...`);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Data ${id} removed` }));
          }
        }
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'oooops, data not found :-(' }));
        break;
    }
  }
);

const PORT: number = 5060;

server.listen(PORT, () => console.log(`server started on port ${PORT}`));

module.exports = server;
