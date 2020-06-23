
// app.put('editTest:test_id', (req, res) => {
//   //Look up the test, if not existing, return 404
//   const test = tests.find(c => c.id === parseInt(req.params.test_id));
//   if(!test) {
//     res.status(404).send('Test with the given ID was not found.');
//   }
//   //validate: if invalid, return 400 - Bad request
//   const result = validateTest(req.body);
//   const {error } = validateTest(req.body); // result.error
//   if (error) {
//     // 400 Bad Request
//     return res.status(400).send(result.error.details[0].message);
//   }
//   //Update test, Return the updated test
//   test.category = req.body.category;
//   test.test_case = req.body.testCase,
//   test.test_title = req.body.testTitle,
//   test.group = req.body.group,
//   test.symbol = req.body.symbol,
//   test.test_summary = req.body.testSummary,
//   test.test_steps = req.body.testSteps,
//   test.test_data = req.body.testData,
//   test.expected_result = req.body.expectedResult,
//   test.notes = req.body.notes,
//   res.send(test);
// });

// function validateTest(test) {
//   const schema = {
//     name: Joi.string().min(3).required()
//   };
//   return Joi.validate(test, schema);
// }

// app.get('/api/environment/:environment_id', (req, res) => {
//   const environment = Environments.find(c => c.id === parseInt(req.params.environment_id));
//   if(!environment) {
//     return res.status(404).send('Environment with the given ID was not found.');

//   }
//   res.send(environment);
// });

// app.delete('deleteTest/:test_id', (req, res) => {
//   const test = tests.find(c => c.id === parseInt(req.params.test_id));
//   if(!test) {
//     return res.status(404).send('Test with the given ID was not found.');
//   }
//   //Delete
//   const index = tests.indexOf(test);
//   tests.splice(index, 1);
//   //Return the same test
//   res.send(test);
// })

// app.put('editUser:user_id', (req, res) => {
//   //Look up the user, if not existing, return 404
//   const user = users.find(c => c.id === parseInt(req.params.user_id));
//   if(!user) {
//     res.status(404).send('User with the given ID was not found.');
//   }
//   //validate: if invalid, return 400 - Bad request
//   const result = validateUser(req.body);
//   const {error } = validateUser(req.body); // result.error
//   if (error) {
//     // 400 Bad Request
//     return res.status(400).send(result.error.details[0].message);
//   }
//   //Update user, Return the updated user
//   user.first_name = req.body.first,
//   user.last_name = req.body.last,
//   user.email_address = req.body.email,
//   user.password = req.body.pass,
//   user.user_type = req.body.type,
//   res.send(user);
// });

// function validateUser(user) {
//   const schema = {
//     name: Joi.string().min(3).required()
//   };
//   return Joi.validate(user, schema);
// }

// app.delete('deleteUser/:User_id', (req, res) => {
//   const user = users.find(c => c.id === parseInt(req.params.user_id));
//   if(!user) {
//     return res.status(404).send('User with the given ID was not found.');
//   }
//   //Delete
//   const index = users.indexOf(user);
//   tests.splice(index, 1);
//   //Return the same user
//   res.send(user);
// })

const express = require('express')
const JH = require('./JenkinsHandling')
const {getBuilds} = require('./builds')
const {getJobs} = require('./jobs')
const bodyParser = require('body-parser');
const {update_environments, update_builds} = require('./DB_mangement_jenkins/sendToDB')
const {get_existed_environments} = require('./DB_mangement_jenkins/getFromDB')
const fetch = require('node-fetch');
const log = console.log

const app = express()
const PORT = process.env.PORT || 5000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const builds = await getBuilds()
const jobs = await getJobs()
log("WE GOT " + jobs.length + " JOBS:")
log("WE GOT " + builds.length + " BUILDS:")
await get_existed_environments()
app.listen(PORT, () => log('server started on port', PORT))

const environments =[];
const get_existed_environments = () => {
  //environment >> GET method: getting an array with all jobs(environments) names
  const url = 'http://localhost:5000/environment';
  log('data from fetching:')
  fetch(url).then(data => data.json()).then(body => environments.push(body)).catch(err => {
      log('we got this error:')
      log(err)
  })
  log(environments);
}

const users =[];
const get_existed_users = () => {
  //user >> GET method: getting an array with all users 
  const url = 'http://localhost:5000/user';
  log('data from fetching:')
  fetch(url).then(data => data.json()).then(body => users.push(body)).catch(err => {
      log('we got this error:')
      log(err)
  })
  log(users);
}
exports.get_existed_users = get_existed_users;

const tests =[];
const get_existed_tests = () => {
  //test >> GET method: getting an array with all tests of last build 
  const url = 'http://localhost:5000/test';
  log('data from fetching:')
  fetch(url).then(data => data.json()).then(body => tests.push(body)).catch(err => {
      log('we got this error:')
      log(err)
  })
  log(tests);
}
exports.get_existed_tests = get_existed_tests;

const last10Builds =[];
const get_last_10_builds = () => {
  //last 10 builds >> GET method: getting an array with last 10 builds
  const url = 'http://localhost:5000/build';
  log('data from fetching:')
  fetch(url).then(data => data.json()).then(body => last10Builds.push(body)).catch(err => {
      log('we got this error:')
      log(err)
  })
  log(last10Builds);
}
exports.get_last_10_builds = get_last_10_builds;

const addEnvironmentToDB = () => {
  //environment >> POST method
  const url = 'http://localhost:5000/environment';
    const environment = {'environment_name': Env_name}
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(environment),
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()) // expecting a json response
        .then(json => {
            if (json.error === true) {
                if (json.message.substring(0, 35).localeCompare('Tried to save duplicate unique keys') === 0) {
                    console.log('Error in function addEnvironmentToDB: ' + json.message.substring(0, 35))
                } else {
                    console.log('Error in function addEnvironmentToDB: ' + json.message)
                }
            } else {
                console.log(json.message)
            }
        }).catch(err => {
        console.log(err)
    });
}
exports.addEnvironmentToDB = addEnvironmentToDB

const addUserToDB = () => {
  //user >> POST method
  const url = 'http://localhost:5000/user';
    const user = {
        'user_id': user_id,
        'first_name': user_firstName,
        'last_name': user_lastName,
        'email_address': user_email,
        'password': user_pass,
        'user_type': user_type}
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()) // expecting a json response
        .then(json => {
            if (json.error === true) {
                if (json.message.substring(0, 35).localeCompare('Tried to save duplicate unique keys') === 0) {
                    console.log('Error in function adduserToDB: ' + json.message.substring(0, 35))
                } else {
                    console.log('Error in function adduserToDB: ' + json.message)
                }
            } else {
                console.log(json.message)
            }
        }).catch(err => {
        console.log(err)
    });
}
exports.addUserToDB = addUserToDB

const addTestToDB = () => {
  //test >> POST method
  const url = 'http://localhost:5000/test';
    const test = {
      'test_id': test_id,
      'category': test_category,
      'test_case': test_Case,
      'test_title': test_Title,
      'group': test_group,
      'symbol': test_symbol,
      'test_summary': test_Summary,
        'test_steps': test_Steps,
      'test_data': test_Data,
      'expected_result': test_expectedResult,
      'notes': test_notes}
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(test),
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()) // expecting a json response
        .then(json => {
            if (json.error === true) {
                if (json.message.substring(0, 35).localeCompare('Tried to save duplicate unique keys') === 0) {
                    console.log('Error in function addTestToDB: ' + json.message.substring(0, 35))
                } else {
                    console.log('Error in function addTestToDB: ' + json.message)
                }
            } else {
                console.log(json.message)
            }
        }).catch(err => {
        console.log(err)
    });
}
exports.addTestToDB = addTestToDB

const addBuildToDB = () => {
  //test >> POST method
  const url = 'http://localhost:5000/build';
    const build = {
      'build_id' : build_id,
      'build_name' : build_name,
      'group' : build_group,
      'jenkins_job_number' : jenkins_job_number,
      'status' : build_status,
      'result' : build_result,
      'running_environment' : running_environment,
      'start_time' : start_time,
      'run_duration' : run_duration,
      'reporters_ids' : reporters_ids,
      'zoho_issue_link' : zoho_issue_link,
      'build_tests' : build_tests}
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(build),
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()) // expecting a json response
        .then(json => {
            if (json.error === true) {
                if (json.message.substring(0, 35).localeCompare('Tried to save duplicate unique keys') === 0) {
                    console.log('Error in function addBuildToDB: ' + json.message.substring(0, 35))
                } else {
                    console.log('Error in function addBuildToDB: ' + json.message)
                }
            } else {
                console.log(json.message)
            }
        }).catch(err => {
        console.log(err)
    });
}
exports.addBuildToDB = addBuildToDB
