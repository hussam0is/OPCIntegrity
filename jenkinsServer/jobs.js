const JH = require('./JenkinsHandling')
// check witch jobs are in the jenkins and return them.

let jobs = [{name: 'null', color: 'null'}]

async function getJobs() {
    jobs = await JH.get_ALl_jobs()
    return jobs
}

exports.getJobs = getJobs
