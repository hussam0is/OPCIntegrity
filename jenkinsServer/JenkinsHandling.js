const jenkinsAPI = require('jenkins-api');
const username = 'admin';
const token = '11198feb1a0d516c53113b7b5966db23a4'

function connectJenkinsUser(username, token) {
    return require('jenkins')({
        baseUrl: 'http://' + username + ':' + token + '@localhost:8080',
        crumbIssuer: true
    })
}

let jenkinsUser1 = connectJenkinsUser(username, token);
let jenkinsUser2 = jenkinsAPI.init("http://" + username + ":" + token + "@localhost:8080");
exports.jenkinsUser2 = jenkinsUser2
exports.jenkinsUser1 = jenkinsUser1
//console.log(jenkinsUser1)
//console.log(jenkinsUser2) // all functions in the api


exports.lastBuild = async function(jobName){
    return new Promise(resolve => {
        jenkinsUser1.job.get(jobName, function (err, data) {
            if (err) {
                return console.log(err);
            }
            resolve(data["lastBuild"]["numbernumber"])
        })
    })
}

exports.get_builds_and_tests = function (jobName) {
    return new Promise((resolve, reject) => {
        jenkinsUser1.job.get(jobName, function (err, data) {
            if (err) {
                return console.log(err);
            }
            let jobList = [];
            for (let i = 0; i < data['builds'].length; i++) {
                if (data['builds'][i]['number'] != null) {
                    jobList[i] = data['builds'][i]['number']
                }
            }
            if (jobList.length > 99) {
                jobList = jobList.slice(jobList.length - 100, jobList.length)
            }
            jobList = jobList.reverse()
            console.log("got the latest #" + jobList.length + " builds and tests in job " + '\'' + jobName + '\'.')
            resolve(jobList);
        });
    }).catch(err => {
        console.log(err)
    });
}

function get_ALl_jobs() {
    return new Promise((resolve, reject) => {
        jenkinsUser1.info(function (err, data) {
            if (err) {
                reject(err)
            } else {
                let jobs = [];
                data["jobs"].forEach(element => jobs = jobs.concat({"environment_name": element.name}));
                // must get more data from the URL
                resolve(jobs)
            }
        })
    })
}

exports.get_ALl_jobs = get_ALl_jobs

exports.getConsoleOutput = function (jobName, buildNumber) {
    return new Promise((resolve, reject) => {
        jenkinsUser1.build.log(jobName, buildNumber, function (err, data) {
            if (err) {
                reject(err)
                throw err;
            }
            resolve(data)
        });
    }).catch(err => {
        console.log(err)
        console.log("error getting data from build.log at jenkins_handling.js")
    })
}

const getConfigXML = async function (jobName) {
    return new Promise((resolve, reject) => {
        jenkinsUser2.get_config_xml(jobName, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }).catch(err => console.log(err))
}


exports.update_job_xml = async function (jobName, groupNum) {
    return new Promise((resolve, reject) => {
        const group1 = 'group54321'
        const group2 = 'group5432'
        const group3 = 'group543'
        const group4 = 'group54'
        const group5 = 'group5'
        var group_to_run;
        if (groupNum == 1) {
            group_to_run = group1
        }
        if (groupNum == 2) {
            group_to_run = group2
        }
        if (groupNum == 3) {
            group_to_run = group3
        }
        if (groupNum == 4) {
            group_to_run = group4
        }
        if (groupNum == 5) {
            group_to_run = group5
        }
        const config = getConfigXML(jobName)

        jenkinsUser2.update_config(jobName
            , function (config) {
                // function which takes the config.xml, and returns
                // the new config xml for the new job
                var new_xml = config.replace(
                    /npm test -- --grep group54321|npm test -- --grep group5432|npm test -- --grep group543|npm test -- --grep group54|npm test -- --grep group5/gi
                ,'npm test -- --grep ' + group_to_run);
                new_xml = new_xml.replace(/npm test -- --grep undefined/gi,'npm test -- --grep ' + group_to_run)
                return new_xml
            },
            function (err, data) {
                // if no error, job was copied
                if (err) {
                    reject("Error occured while updating xml for job: " + jobName+'\nError type: '+err)
                    return console.log(err);
                }
                resolve(data)
            }
        )

    })

}

exports.test_result = function (jobName, Id) {
    return new Promise((resolve, reject) => {
        jenkinsUser2.test_result(jobName, Id, function (err, data) {
            if (err) {
                // console.log(err)
                resolve(false);
                return
            }
            resolve(true)
        });
    })
}

exports.buildInfo = async function (jobName, buildId) {
    return new Promise((resolve, reject) => {
        jenkinsUser2.build_info(jobName, buildId, function (err, data) {
            if (err) {
                reject(err)
                return console.log(err)
            }
            resolve(data)
        })
    }).catch(err => console.log('ERR: ', err))
}

exports.deleteBuild = function (jobName, buildId) {
    return new Promise((resolve, reject) => {
        jenkinsUser2.delete_build(jobName, buildId, function (err, data) {
            if (err) {
                console.log("Failed to delete build number: " + buildId + ", in job: " + jobName)
                return reject(err)
            }
            console.log("Successfully deleted build number: " + buildId + ", in job: " + jobName)
            resolve(data)
        })
    }).catch(err => console.log(err))
}

exports.createJob = async function (jobName) {
    const jobsInJenkins = await get_ALl_jobs()
    const xmlConfigString = '<?xml version=\'1.1\' encoding=\'UTF-8\'?>\n' +
        '<project>\n' +
        '  <keepDependencies>false</keepDependencies>\n' +
        '  <properties/>\n' +
        '  <scm class="hudson.scm.NullSCM"/>\n' +
        '  <canRoam>false</canRoam>\n' +
        '  <disabled>false</disabled>\n' +
        '  <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>\n' +
        '  <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>\n' +
        '  <triggers/>\n' +
        '  <concurrentBuild>false</concurrentBuild>\n' +
        '  <builders/>\n' +
        '  <publishers/>\n' +
        '  <buildWrappers/>\n' +
        '</project>';

    return new Promise((resolve, reject) => {
        jenkinsUser2.create_job(jobName, xmlConfigString, function (err, data) {
            for (let job in jobsInJenkins) {
                if (jobsInJenkins[job].environment_name.localeCompare(jobName) === 0) {
                    console.log('Jenkins has another job with the same name ' + jobName)
                    return
                }
            }
            if (err) {
                if (jobName)
                    return console.log(err);
            }
            console.log('Environment -' + jobName + '- has been added to jenkins successfully:')
            resolve(data)
        });
    }).catch(err => {
        console.log('Error in function -createJob()- :' + err)
    })
}
exports.stopBuild = async function (jobName, buildId) {
    return new Promise((resolve, reject) => {
        jenkinsUser2.stop_build(jobName, buildId, function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log('Stopped running build #' + buildId + ' in job -' + jobName + '-')
            console.log(data)
        })
    }).catch(err => console.log(err));
}

exports.run_build = async function (jobName) {
    return new Promise((resolve, reject) => {
        jenkinsUser2.build(jobName, function (err, data) {
            if (err) {
                console.log("Error running job: ", jobName)
                return console.log(err);
            }
            console.log('building job: '+jobName+'..')
            console.log(data)
            resolve(data)
            
        })
    })
}


exports.getConfigXML = getConfigXML
