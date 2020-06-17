const sql = require('mssql');
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
const environments =[
  {environment_id: 1, environment_name: 'client'},
  {environment_id: 2, environment_name: 'trial'},
  {environment_id: 3, environment_name: 'master'},
]


app.get('/', function (req, res) {

  var sql = require("mssql");

  // config for your database
  var config = {
      user: 'sa',
      password: 'mypassword',
      server: 'localhost',
      database: 'opcintergrity'
  };

  // connect to your database
  sql.connect(config, function (err) {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query('select * from Student', function (err, recordset) {

          if (err) console.log(err)

          // send records as a response
          res.send(recordset);

      });
  });
});
app.post('addUser',(req, res) =>{
  // const {error } = validateEnvironment(req.body); // result.error
  // if (error) {
  //   // 400 Bad Request
  //   return res.status(400).send(result.error.details[0].message);
  // }
  var data = {
    'user_id': req.body.id,
    'first_name': req.body.first,
    'last_name': req.body.last,
    'email_address': req.body.email,
    'password': req.body.pass,
    'user_type': req.body.type,
    'createdAt': new Date().toJSON()
  }
  res.status(200).json({ })
})
app.post('addTest',(req, res) =>{
  // const {error } = validateEnvironment(req.body); // result.error
  // if (error) {
  //   // 400 Bad Request
  //   return res.status(400).send(result.error.details[0].message);
  // }
  var data = {
    'test_id': req.body.id,
    'category': req.body.category,
    'test_case': req.body.testCase,
    'test_title': req.body.testTitle,
    'group': req.body.group,
    'symbol': req.body.symbol,
    'test_summary': req.body.testSummary,
    'test_steps': req.body.testSteps,
    'test_data': req.body.testData,
    'expected_result': req.body.expectedResult,
    'notes': req.body.notes,
    'createdAt': new Date().toJSON()
  }
  db.post(data).then(function (result) {
    // handle result
  })
})
app.get('getUsers',(req, res) =>{
  res.send(users);
})
app.get('getEnvironments', (req,res) => {
  res.send(Environments);
});
app.get('getTests', (req,res) => {
  res.send(tests);
});

app.post('addEnvironment', (req, res) => {
  const {error } = validateEnvironment(req.body); // result.error
  if (error) {
    // 400 Bad Request
    return res.status(400).send(result.error.details[0].message);
  }
  const environment = {
    environment_id: Environments.length + 1,
    environment_name: req.body.environment_name
  };
  // environments.push(environment);
  res.send(environment);
});

app.put('editTest:test_id', (req, res) => {
  //Look up the test, if not existing, return 404
  const test = tests.find(c => c.id === parseInt(req.params.test_id));
  if(!test) {
    res.status(404).send('Test with the given ID was not found.');
  }
  //validate: if invalid, return 400 - Bad request
  const result = validateTest(req.body);
  const {error } = validateTest(req.body); // result.error
  if (error) {
    // 400 Bad Request
    return res.status(400).send(result.error.details[0].message);
  }
  //Update test, Return the updated test
  test.category = req.body.category;
  test.test_case = req.body.testCase,
  test.test_title = req.body.testTitle,
  test.group = req.body.group,
  test.symbol = req.body.symbol,
  test.test_summary = req.body.testSummary,
  test.test_steps = req.body.testSteps,
  test.test_data = req.body.testData,
  test.expected_result = req.body.expectedResult,
  test.notes = req.body.notes,
  res.send(test);
});

function validateTest(test) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(test, schema);
}

app.get('/api/environment/:environment_id', (req, res) => {
  const environment = Environments.find(c => c.id === parseInt(req.params.environment_id));
  if(!environment) {
    return res.status(404).send('Environment with the given ID was not found.');

  }
  res.send(environment);
});

app.delete('deleteTest/:test_id', (req, res) => {
  const test = tests.find(c => c.id === parseInt(req.params.test_id));
  if(!test) {
    return res.status(404).send('Test with the given ID was not found.');
  }
  //Delete
  const index = tests.indexOf(test);
  tests.splice(index, 1);
  //Return the same test
  res.send(test);
})

app.put('editUser:user_id', (req, res) => {
  //Look up the user, if not existing, return 404
  const user = users.find(c => c.id === parseInt(req.params.user_id));
  if(!user) {
    res.status(404).send('User with the given ID was not found.');
  }
  //validate: if invalid, return 400 - Bad request
  const result = validateUser(req.body);
  const {error } = validateUser(req.body); // result.error
  if (error) {
    // 400 Bad Request
    return res.status(400).send(result.error.details[0].message);
  }
  //Update user, Return the updated user
  user.first_name = req.body.first,
  user.last_name = req.body.last,
  user.email_address = req.body.email,
  user.password = req.body.pass,
  user.user_type = req.body.type,
  res.send(user);
});

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(user, schema);
}

app.delete('deleteUser/:User_id', (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.user_id));
  if(!user) {
    return res.status(404).send('User with the given ID was not found.');
  }
  //Delete
  const index = users.indexOf(user);
  tests.splice(index, 1);
  //Return the same user
  res.send(user);
})

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port '+ port + '...'));


