const express = require('express')
const JH = require('./JenkinsHandling')
const {getBuilds} = require('./builds')
const {getJobs} = require('./jobs')
const bodyParser = require('body-parser');
const {update_environments, update_builds} = require('./DB_manging/sendToDB')
const {get_existed_environments} = require('./DB_manging/getFromDB')
const fetch = require('node-fetch');
const log = console.log

async function main() {
    const app = express()

    const PORT = process.env.PORT || 5000
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    // app.use(sendToDB);
    const builds = await getBuilds()
    const jobs = await getJobs()
    log("WE GOT " + jobs.length + " JOBS:")
    log("WE GOT " + builds.length + " BUILDS:")
    /*app.get('/', (res, req) => {
        res.send('updating data...')
    })*/
    //environment:
    //await update_environments()
    await get_existed_environments()
    //await update_builds()
    //const builds = await getBuilds();
    // const url = 'http://localhost:5000/build';
    // for(let build in builds){
    //     if(builds.hasOwnProperty(build)){
    //         fetch(url, {
    //             method: 'POST',
    //             body: JSON.stringify(builds[build]),
    //             headers: {'Content-Type': 'application/json'},
    //         }).then(res => res.json()) // expecting a json response
    //             .then(json => {
    //                 if (json.error === true) {
    //                     log('Error: ' + json.message)
    //                 }
    //                 else{log("build added successfully")}
    //             }).catch(err => log(err));
    //     }
    //     else{
    //         log('No builds found in array builds in sendTODB.js')
    //     }
    // }
    // const buildInfo =await JH.buildInfo(jobs[1].environment_name, 108)
    //log(buildInfo)
    app.listen(PORT, () => log('server started on port', PORT))
}

main()


