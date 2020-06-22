const moment = require('moment')
const {getJobs} = require('../jobs')
const {getBuilds} = require('../builds')
const fetch = require('node-fetch');

const isDebug = true;
const log = (str) => {
    if (isDebug) console.log(str)
}

// ON START::
const update_environments = async () => {
    //environment >> POST method:
    const url = 'http://localhost:5000/environment';
    const jobs = await getJobs()
    for (let job in jobs) {
        if (jobs.hasOwnProperty(job)) {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(jobs[job]),
                headers: {'Content-Type': 'application/json'},
            }).then(res => res.json()) // expecting a json response
                .then(json => {
                    if (json.error === true) {
                        if (json.message.substring(0, 35).localeCompare('Tried to save duplicate unique keys') === 0) {
                            log('A: Error in function update_environments: ' + json.message.substring(0, 35))
                        } else {
                            console.log('B: Error in function update_environments: ' + json.message)
                        }
                    } else {
                        console.log(json.message)
                    }
                }).catch(err => {
                console.log(err)
            });
        } else {
            console.log('No jobs found in array jobs in sendTODB.js')
        }
    }
}
const update_builds = async () => {
    const url = 'http://localhost:5000/build';
    const builds = await getBuilds();
    for(let build in builds){
        if(builds.hasOwnProperty(build)){
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(builds[build]),
                headers: {'Content-Type': 'application/json'},
            }).then(res => res.json()) // expecting a json response
                .then(json => {
                    if (json.error === true) {
                        log('Error: ' + json.message)
                    } else{
                      //  log(json)
                    }
                }).catch(err => log(err));
        }
        else{
            log('No builds found in array builds in sendTODB.js')
        }
    }

}

const sendDataToDB = (next) => {
    /* if (req.originalUrl === r.send_to_DB_url){
         log( '#1 '+moment().format().slice(0,10)+' '+moment().format().slice(11,)+': Started sending data to the database..')

        /!* // log(req.protocol);    //  http
         // log(req.get('host')); //  localhost:5000
         // log(req.originalUrl); //  /api/send_To_DB*!/
     }*/
    //environment:
    const url = 'http://localhost:5000/environment';
    next();
}


exports.sendDataToDB = sendDataToDB;
exports.update_environments = update_environments;
exports.update_builds = update_builds;

