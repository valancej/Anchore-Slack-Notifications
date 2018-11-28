const request = require('request');

module.exports = function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');
    
    if(req) {
        let slackUrl = 'https://hooks.slack.com/services/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';
        let text = {
            "text": "Something happened!!"
        };
        
        let requestData = {
            url: slackUrl,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: text
        };
        
        request(requestData);
        context.res = {
            status: 200
        };
    }
    else {
        context.res = {
            status: 400,
            body: { error: 'Please pass first/last properties in the input object'}
        };
    }

    context.done();
}
