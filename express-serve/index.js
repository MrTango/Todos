const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const url = "/api/todos";

let todos = [];
todos.push({id: 1, name: "first", isComplete: false});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get(url, (req, res) => {
  res.status(200).send(JSON.stringify(todos.sort((f, s) => f.id > s.id)));
});

app.post(url, (req, res) => {
  let idx = todos.findIndex(x => x.id == req.body.id);
  if (idx > -1) {
    todos[idx] = req.body;
  } else if (req.body.name) {
    let newid = todos.sort((f, s) => f.id > s.id).reverse()[0].id;
    todos.push({ id: ++newid, name: req.body.name, isComplete: false});
  }
  res.status(204);
  res.send();
});

app.delete(`${url}/:id`, (req, res) => {
  const todo = findTodo(req.params.id);  
  if (todo) {
    todos = todos.filter(x => x.id != req.params.id);
    res.status = 204;
  } else {
    res.status = 400;
  }
  res.send();
});

const findTodo = (id) => todos.find(x => x.id == id);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))