const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const mime = require('mime');

const server = http.createServer((req, res) => {
  const filePath = './index.js';
  const mimeType = mime.getType(filePath);

  res.writeHead(200, { 'Content-Type': mimeType });

  fs.readFile(filePath, (error, data) => {
    if (error) {
      console.error('Erro ao ler o arquivo:', error);
      res.statusCode = 500;
      res.end('Ocorreu um erro ao processar a requisição.');
    } else {
      res.end(data);
    }
  });
});


const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(3000, () => {
  console.log('API está disponível em http://localhost:3000');
});


app.get('/tjsp', async (req, res) => {
  try {
    const url = 'https://debit.com.br/tabelas/tabela-completa.php?indice=aasp';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const tables = [];

    $('table').each((index, element) => {
      $(element).find('tr').each((rowIndex, rowElement) => {
        let row = '';
        let ano = 0;
        $(rowElement).find('td').each((cellIndex, cellElement) => {
            let data = $(cellElement).text();

            if(data.includes('/')) {
              let txtsplit = data.split('/')
              ano = parseInt(txtsplit[1])
              data = `${txtsplit[1]};${parseInt(txtsplit[0])}`
            } else {
              data = data.replace('.', '').replace(',', '.');
            }

            if (cellIndex != 0) {
              row += ';';
            }

            row += data;
        });
        if (row != "" && ano >= 2022) {
          tables.push(row);
        }
      });
    });

    res.json(tables);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a requisição.' });
  }
});

app.get('/ortn', async (req, res) => {
  try {
    const url = 'https://debit.com.br/tabelas/tabela-completa.php?indice=btn';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const tables = [];

    $('table').each((index, element) => {
      $(element).find('tr').each((rowIndex, rowElement) => {
        let row = '';
        let ano = 0;
        $(rowElement).find('td').each((cellIndex, cellElement) => {
            let data = $(cellElement).text();

            if(data.includes('/')) {
              let txtsplit = data.split('/')
              ano = parseInt(txtsplit[1])
              data = `${txtsplit[1]};${parseInt(txtsplit[0])}`
            } else {
              data = data.replace('.', '').replace(',', '.');
              data = `${data}00`
            }

            if (cellIndex != 0) {
              row += ';';
            }

            row += data;
        });
        if (row != "" && ano >= 2022) {
          tables.push(row);
        }
      });
    });

    res.json(tables);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a requisição.' });
  }
});

app.get('/ufir', async (req, res) => {
  try {
    const url = 'https://debit.com.br/tabelas/tabela-completa.php?indice=ufir';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const tables = [];

    $('table').each((index, element) => {
      $(element).find('tr').each((rowIndex, rowElement) => {
        let row = '';
        let ano = 0;
        $(rowElement).find('td').each((cellIndex, cellElement) => {
            let data = $(cellElement).text();

            if(data.includes('/')) {
              let txtsplit = data.split('/')
              ano = parseInt(txtsplit[1])
              data = `${txtsplit[1]};${parseInt(txtsplit[0])}`
            } else {
              data = data.replace('.', '').replace(',', '.');
              data = `${data}00`
            }

            if (cellIndex != 0) {
              row += ';';
            }

            row += data;
        });
        if (row != "" && ano >= 2022) {
          tables.push(row);
        }
      });
    });

    res.json(tables);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a requisição.' });
  }
});


app.get('/caderneta-poupanca', async (req, res) => {
  try {
    const url = 'https://debit.com.br/tabelas/tabela-completa.php?indice=poupanca';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const tables = [];

    $('table').each((index, element) => {
      $(element).find('tr').each((rowIndex, rowElement) => {
        let row = '';
        let ano = 0;
        $(rowElement).find('td').each((cellIndex, cellElement) => {
            let data = $(cellElement).text();

            if(data.includes('/')) {
              let txtsplit = data.split('/')
              ano = parseInt(txtsplit[1])
              data = `${txtsplit[1]};${parseInt(txtsplit[0])}`
            } else {
              data = data.replace('.', '').replace(',', '.');
            }

            if (cellIndex != 0) {
              row += ';';
            }

            row += data;
        });
        if (row != "" && ano >= 2022) {
          tables.push(row);
        }
      });
    });

    res.json(tables);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a requisição.' });
  }
});