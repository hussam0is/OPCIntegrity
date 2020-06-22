const fetch = require('node-fetch');


const isDebug = false;
const log = (str) => {
    if (isDebug) console.log(str)
}

const get_existed_environments = async () => {
    //environment >> GET method: getting an array with all jobs(environments) names
    const url = 'http://localhost:5000/environment';
    log('data from fetching:')
    return new Promise(resolve => {
        fetch(url).then(data => data.json()).then(json => {
            if (json.error === true) {
                log('Error: ' + json.message)
            } else {
                log(json)
                resolve(json)
            }
        }).catch(err => {
            console.log('Error: ' + err)
        })
    })
}
exports.get_existed_environments = get_existed_environments;
