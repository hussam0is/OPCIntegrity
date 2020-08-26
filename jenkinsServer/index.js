const express = require('express')
const JH = require('./JenkinsHandling')
const jobTriggers = require('./jobTriggers')
const {getBuilds} = require('./builds')
const {getJobs} = require('./jobs')
const bodyParser = require('body-parser');
const {update_environments, update_builds} = require('./DB_mangement_jenkins/update_DB_data')
const {get_existed_environments} = require('./DB_mangement_jenkins/get_data')
const {addEnvironmentToDB} = require('./DB_mangement_jenkins/add_data_to_DB')
const fetch = require('node-fetch');
const isDebug = true;
var convert = require('xml-js');


const log = (str) => {
    if (isDebug) console.log(str)
}

async function main() {
    const app = express()
    const PORT = 3000
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    const builds = await getBuilds()
    const jobs = await getJobs()
    log("WE GOT " + jobs.length + " JOBS:")
    log("WE GOT " + builds.length + " BUILDS:")
    app.post('/api/runBuild',async function(req, res) {
        const request = req.body
        const jobName = request['envName']
        const groupNum = request['groupNum']
        log('A build for Job: '+ jobName+' and group number: '+groupNum+' started running..')
        // SEND "BUILD IS RUNNING"
        const result = await jobTriggers.runBuild(jobName, groupNum)
        // UPDATE BUILD DETAILS
        log('build has finished, reults are: \n')
        log(result)
        res.send(200)
        //res.sendStatus(200);
    });
    // app.post('/buildOverView/555', function(req, res) {
    //     console.log(req.body);
    //     res.send(200);
    // });

    app.listen(PORT, () => log('server started on port', PORT))
    //Running job == jobName with tests of group_number <= groupNum
    // const jobName = jobs[1]['environment_name']
    //
    // const groupNum = 3
    // const result = jobTriggers.runBuild(jobName, groupNum)
    
    // const groupNum = '3'
    // const result1 = await JH.update_job_xml(jobName, groupNum)
    // const result2 = await JH.run_build(jobName)
    // log(result)
    //const latest_build = builds[-1]['build_id']
    
 
   
}
main()


// app.use(sendToDB);
/*app.get('/', (res, req) => {
       res.send('updating data...')
   })*/
//environment:
//await update_environments()
//JH.get_ALl_jobs().then(jobs=>log(jobs))
//await JH.createJob('TestCreatJobFun-2')



 
