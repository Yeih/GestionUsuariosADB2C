const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(cors({
  origin: '*', // permitir cualquier origen
  methods: ['GET', 'POST'], // permitir métodos GET y POST
  allowedHeaders: ['Content-Type'] // permitir encabezado Content-Type
}));

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/Bat-crear_usuarios', (req, res) => {
  exec("start CMD-TEST.bat", (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
    res.send(stdout);
  });
});

app.post('/CrearJson', (req, res) => {
  const json = req.body;
  const jsonString = JSON.stringify(json);

  fs.writeFile('./Resources/Usuario.json', jsonString, err => {
    if (err) {
      console.log('Error writing file', err);
      res.status(500).send('Error writing file');
    } else {
      console.log('Successfully wrote file');
      res.send('Successfully wrote file');
    }
  });
});


app.post('/clean-json', (req, res) => {
fs.writeFile('./Resources/Usuario.json', '', err => {
  if (err) {
    console.log('Error writing file', err);
    res.status(500).send('Error writing file');
  }
  });
});

 
 app.post('/CrearJson-lote', (req, res) => {
  let json = req.body;

  fs.readFile('./Resources/Usuario.json', 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file', err);
      res.status(500).send('Error reading file');
    } else {
      let users;
      try {
        users = JSON.parse(data);
        if (!Array.isArray(users)) {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        console.log('Error parsing file', error);
        users = [];
      }

      users.push(json);

      fs.writeFile('./Resources/Usuario.json', JSON.stringify(users), err => {
        if (err) {
          console.log('Error writing file', err);
          res.status(500).send('Error writing file');
        } else {
          console.log('Successfully wrote file');
          res.send('Successfully wrote file');
        }
      });

      // Limpiar las variables
      json = null;
      users = null;
    }
  });
});

 