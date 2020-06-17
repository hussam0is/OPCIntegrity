
const log = console.log
const fetch = require('node-fetch');
const get_existed_environments = () => {
    //environment >> GET method: getting an array with all jobs(environments) names
    const url = 'http://localhost:5000/environment';
    log('data from fetching:')
    fetch(url).then(data => data.json()).then(body => log(body)).catch(err => {
        log('we got this error:')
        log(err)
    })
}

exports.get_existed_environments = get_existed_environments;
