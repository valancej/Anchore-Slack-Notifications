const request = require('request');

module.exports = function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');
    
    if(req) {
        let slackUrl = 'https://hooks.slack.com/services/***********'; //Available when you configure incoming webhooks in Slack

        let payload = req.body;
        context.log(payload)

        let msg = {
            text: "Anchore Notification: \n" + "Notification Type: " + payload.data.notification_type + "\nUser: " + payload.data.notification_user
        }; 

        //Feel free to look at the payload data that comes from Anchore and format the Slack alerts to your liking
        
        let requestData = {
            url: slackUrl,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: msg
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