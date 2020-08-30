const JH = require('./JenkinsHandling')
var convert = require('xml-js');
const log = console.log
const fetch = require('node-fetch');
// to delete
exports.update_job_command = async function (jobName, groupNumber) {
    const oldConfigXML = await JH.getConfigXML(jobName)
    const newConsoleCommand = 'npm test -- --grep group' + groupNumber;
    var result = convert.xml2json(oldConfigXML, {compact: true, spaces: 4, alwaysChildren: true});
    result = JSON.parse(result)
    result['project']['builders']['hudson.tasks.BatchFile']['command']['_text'] = newConsoleCommand
    const new_xml = result
    log(new_xml['project']['builders']['hudson.tasks.BatchFile']['command']['_text'])
    return new_xml
}

// Run a build with jobName and groupNum, returns numOfTests, numOfFailedTests, buildDuration

/////////////RUN BUILD\\\\\\\\\\\\\\\
exports.runBuild = async function (jobName, groupNum) {
    const result1 = await JH.update_job_xml(jobName, groupNum).catch(error => console.log(error))
    const result2 = await JH.run_build(jobName).catch(error => console.log(error))
    const build_data = await buildData(jobName)
    log("+++++++++++++++++++++++++")
    const result3 = await addTestsDataToDB(build_data)
    return build_data
}


buildData = async function (jobName) {
    const lastBuild = await JH.lastBuild(jobName)
    var build_info = await JH.buildInfo(jobName, lastBuild)
    const consoleOutput = await JH.getConsoleOutput(jobName, lastBuild)
    const start = consoleOutput.indexOf("<testsuite")
    const end = consoleOutput.indexOf("</testsuite>")
    const xmlTestsOutput = consoleOutput.slice(start, end + 12)
    const build_state_index = consoleOutput.indexOf('Finished:')
    const build_state = consoleOutput.slice(build_state_index + 10, -1)

    const jsonTestsOutbut = JSON.parse(convert.xml2json(xmlTestsOutput, {
        compact: true,
        spaces: 4,
        alwaysChildren: true
    }));


    const testsData = jsonTestsOutbut["testsuite"]["_attributes"]
    const testsCases = jsonTestsOutbut["testsuite"]["testcase"]
    const numOfFailedTests = testsData["failures"] + testsData["errors"]

    const build_data = {
        "testsData": testsData,
        'testsCases': testsCases,
        'numOfFailedTests': numOfFailedTests
    }

    const testId = getTestID(build_data['testsCases'][0])
    const testGroup = getTestGroup(build_data['testsCases'][5])
    return build_data
}

getTestID = function (testCase) {
    if (typeof testCase != 'undefined') {
        log(testCase)
        const start = testCase['_attributes']['classname'].indexOf("ID:") + 3
        const end = start + 6
        const testID = parseInt(testCase['_attributes']['classname'].slice(start, end), 10)
        return testID
    } else {
        return 'undefined'
    }
}
exports.getTestID = getTestID

getTestGroup = function (testCase) {
    if (typeof testCase != 'undefined') {
        const start = testCase['_attributes']['classname'].indexOf("group")
        const end = start + 10
        var testGroup = testCase['_attributes']['classname'].substr(0, testCase['_attributes']['classname'].indexOf(' '));
        if (testGroup == 'group54321') {
            testGroup = 1
        }
        if (testGroup == 'group5432') {
            testGroup = 2
        }
        if (testGroup == 'group543') {
            testGroup = 3
        }
        if (testGroup == 'group54') {
            testGroup = 4
        }
        if (testGroup == 'group5') {
            testGroup = 5
        }
        return testGroup
    } else {
        return 'undefined'
    }
}
exports.getTestGroup = getTestGroup

addTestsDataToDB = async function (buildData) {
    log("-------------xxxxxxx-----------")
    log(buildData["testsCases"])
    for (var test in buildData["testsCases"]) {
        const test_idt = getTestID(buildData["testsCases"][test])
        const test_caset = 'Null'
        log("-------------xxxxasdasdxxx-----------")
        log(buildData["testsCases"][test]['classname'])
        log("-------------xxxasdasdxxxx-----------")
        const test_titlet = buildData["testsCases"][test]["_attributes"]["classname"]
        const Categoryt = 'UniTest'
        const test_summaryt = 'Null'
        const test_groupt = getTestGroup(buildData["testsCases"][test])
        
        const testData = {
            test_id: test_idt,
            category: Categoryt,
            test_case: test_caset,
            test_title: test_titlet,
            group: test_groupt,
            test_summary: test_summaryt
        }
        log("-------------------")
        log(testData)
        log("-------------------")
        const result = await addTestToDB(testData)
    }
}
exports.addTestsDataToDB = addTestsDataToDB

addTestToDB = async function (testData) {
    const url = 'http://localhost:5000/test';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(testData),
        headers: {'Content-Type': 'application/json'},
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
// while (typeof build_info == 'undefined' || build_info['building'] == true) {
//     if (typeof build_info == 'undefined') {
//         build_info = await JH.buildInfo(jobName, lastBuild1 + 1)
//     }
// }
