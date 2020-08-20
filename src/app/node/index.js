
const express = require('express')

// var express = require('express')
//   , cors = require('cors')
//   , app = express();
// const corsOptions = {
//   origin: true,
//   credentials: true
// }
// app.options('*', cors(corsOptions)); // preflight OPTIONS; put before other routes
// app.listen(5000, function(){
//   console.log('CORS-enabled web server listening on port 5000');
// });


// const JH = require('./JenkinsHandling')
// const {getBuilds} = require('./builds')
// const {getJobs} = require('./jobs')
 const bodyParser = require('body-parser');
// const router = Router();
// const {update_environments, update_builds} = require('./DB_mangement_jenkins/sendToDB')
// const {get_existed_environments} = require('./DB_mangement_jenkins/getFromDB')
 const fetch = require('node-fetch');
const log = console.log
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 5000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use((res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
  next();
});
// const builds = await getBuilds()
// const jobs = await getJobs()
// log("WE GOT " + jobs.length + " JOBS:")
// .log("WE GOT " + builds.length + " BUILDS:")
//  await get_existed_environments()
//app.listen(PORT, () => log('server started on port', PORT))
// app.post('/environment', async (req, res)=> {
//   console.log(req);
//   const message = await req.context.models.Message.create({
//     environment_name: req.body.name});
//     var MongoClient = require('mongodb').MongoClient;
//     var url = "mongodb://localhost:27017/environment";
//     MongoClient.connect(url, function(err, db) {
//       if (err) throw err;
//       var dbo = db.db("mydb");
//       dbo.collection("customers").insertOne(res.send(message), function(err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
//   // const message = await req.context.models.Message.create({
//   //   environment_name: req.body.name,
//   });
 
//   return res.send(message);
// } )


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
        headers: {'Content-Type': 'application/json'}
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

const deleteUser = (id) => {
  const url = 'http://localhost:5000/user/' + id
  fetch(url, {
    method: 'DELETE',
  })
  .then(res => res.json()) 
  .then(res => console.log(res))
}
exports.deleteUser = deleteUser

const deleteTest = (id) => {
  const url = 'http://localhost:5000/test/' + id
  fetch(url, {
    method: 'DELETE',
  })
  .then(res => res.json()) 
  .then(res => console.log(res))
}
exports.deleteTest = deleteTest

const updateUser = (id, data) => {
  const url = 'http://localhost:5000/user/' + id
  const formData = new FormData();
  formData.append('user_id', id);
  formData.append('first_name', data[0]);
  formData.append('last_name', data[1]);
  formData.append('email_address', data[2]);
  formData.append('password', data[3]);
  formData.append('user_type', data[4]);
  fetch(url, {
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
exports.updateUser = updateUser

const updateBuild = (id, data) => {
  const url = 'http://localhost:5000/build/' + id
  const formData = new FormData();
  formData.append('build_id', id);
  formData.append('build_name', data[0]);
  formData.append('group', data[1]);
  formData.append('jenkins_job_number', data[2]);
  formData.append('status', data[3]);
  formData.append('result', data[4]);
  formData.append('running_environment', data[5]);
  formData.append('start_time', data[6]);
  formData.append('run_duration', data[7]);
  formData.append('reporters_ids', data[8]);
  formData.append('zoho_issue_link', data[9]);
  formData.append('build_tests', data[10]);
  fetch(url, {
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
exports.updateBuild = updateBuild

const updateTest = (id, data) => {
  const url = 'http://localhost:5000/test/' + id
  const formData = new FormData();
  formData.append('test_id', id);
  formData.append('category', data[0]);
  formData.append('test_case', data[1]);
  formData.append('test_title', data[2]);
  formData.append('group', data[3]);
  formData.append('symbol', data[4]);
  formData.append('test_summary', data[5]);
  formData.append('test_steps', data[6]);
  formData.append('test_data', data[7]);
  formData.append('expected_result', data[8]);
  formData.append('notes', data[9]);
  fetch(url, {
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
exports.updateTest = updateTest
//////////////////////////////////////////////////////////////////////////////////////////////////////

// router.get('/:user_id', async (req, res) => {
//   const users = await req.context.models.User.find();
//   return res.send(users);
// });