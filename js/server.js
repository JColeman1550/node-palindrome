const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;

  if (page === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (page === '/style.css') {
    fs.readFile('style.css', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/css' });
        res.end('Error loading style.css');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else if (page === '/main.js') {
    fs.readFile('main.js', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/javascript' });
        res.end('Error loading main.js');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && page === '/') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const input = new URLSearchParams(body).get('input');
      const isPalindrome = (str) => {
        const cleanStr = str.replace(/\s+/g, '').toLowerCase();
        return cleanStr === cleanStr.split('').reverse().join('');
      };
      const result = isPalindrome(input) ? 'Palindrome' : 'Not a palindrome';

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ result }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(9000, () => {
  console.log('Server running at http://localhost:9000');
});
