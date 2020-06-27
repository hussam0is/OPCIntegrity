const JH = require('./JenkinsHandling')
const {getJobs} = require('./jobs')

const log = console.log


let builds = [{
    'build_id': 0,
    //'jobName': 'Hello world 2',
   // 'run_duration': 0,
   // 'result': 'Null',
  //  'start_time': 0,
    "reporters_ids":[0],
    "build_tests":{}
}]

const build2 = {
    'build_id': 5,
    //'jobName': 'Hello world 2',
    //'run_duration': 45644,
    //'result': 'SUCCESS',
   // 'start_time': 1589828191781,
    "reporters_ids":[0],
    "build_tests":{}
}


const addItem = (item, list) => {
    return list.concat(item)
}
builds = addItem(build2, builds)
builds = builds.slice(1, builds.length)


const getBuilds = async () => {
    const jobs = await getJobs()
    for (let job in jobs) {
        const builds_ids = await JH.get_builds_and_tests(jobs[job].environment_name)
        for (let build_id in builds_ids) {
            const build_data = JH.buildInfo(jobs[job].environment_name, builds_ids[build_id])
            const build_data_ = {
                'build_id': build_data['number'],
                //'jobName': jobs[job].environment_name,
                //'run_duration': build_data['duration'],
                //'result': build_data['result'],
                //'start_time': 1589828191781,
                "reporters_ids":[0],
                "build_tests":{}
            }
            builds = addItem(build_data_, builds)
        }
    }
    return builds
};
exports.getBuilds = getBuilds
