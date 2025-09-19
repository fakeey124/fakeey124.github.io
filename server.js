const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const yaml = require('js-yaml');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Предполагается, что index.html и script.js в папке public

app.post('/save-data', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Everything is required!' });
  }

  // Запись в JSON файл
  const jsonFilePath = 'users.json';
  fs.readFile(jsonFilePath, (err, data) => {
    let users = [];
    if (!err && data.length > 0) {
      users = JSON.parse(data.toString());
    }
    users.push({ username, email }); // Не сохраняйте пароли в открытом виде!
    fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Ошибка записи в JSON' });
      }
    });
  });

  // Запись в YAML файл
  const yamlFilePath = 'users.yml';
  fs.readFile(yamlFilePath, 'utf8', (err, data) => {
    let users = [];
    if (!err) {
      try {
        users = yaml.load(data) || [];
      } catch (e) {
        console.error('Ошибка парсинга YAML:', e);
      }
    }
    users.push({ username, email });
    const yamlStr = yaml.dump(users);
    fs.writeFile(yamlFilePath, yamlStr, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error' });
      }
    });
  });

  res.status(200).json({ message: 'Success!', username, email });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
