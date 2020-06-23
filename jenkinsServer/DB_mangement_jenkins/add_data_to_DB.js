const fetch = require('node-fetch');

const isDebug = false;
const log = (str) => {
    if (isDebug) console.log(str)
}

// NOT JENKINS RELATED:
// (1) Adding environment to the database.
const addEnvironmentToDB = async (Env_name) => {
    const url = 'http://localhost:5000/environment';
    const job = {'environment_name': Env_name}
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(job),
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
