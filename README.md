# Anchore Slack Notifications

## How to configure Slack webhooks to receive Anchore notifications via Azure Functions

With Anchore you can subscribe to TAGs and Images to receive notifications when images are updated, when CVEs are added or removed and when the policy status of an image changes so you can take a proactive approach to ensuring security and compliance. Having the ability to stay on top the notifications above allows for the appropriate methods for remidiation and triage to take place. One of the most common alerting tools Anchore users leverage is Slack. 

In this example, we will walkthrough how to configure Slack webhooks to receive Anchore notifications. We will consume the webhook with an Azure Function and pass the notification data into a Slack channel.


You will need the following:

- Anchore Engine service: [Anchore](https:;//anchore.com)
- Slack account: [Slack](https://slack.com)
- Azure account: [Azure](https://azure.microsoft.com)

## Slack Configuration

Configure incoming webhooks to work with the Slack application you would like to send Anchore notifications to. The Slack documentation gives a very detailed walkthrough on how to set this up. 

https://api.slack.com/incoming-webhooks

Should look similar to the configuration below (I am just posting to the #general channel):

![screenshot](images/slack_config.png)

## Azure Initial Configuration

Once you have an Azure account, begin by creating a Function App. In this example I will use the following configuration: 

![Screenshot](images/function_config.png)

Choose In-Portal development environment and then Webhook + API: 

![config](images/create_function_config.png)

Once the function has been setup, navigate to the integrate tab and edit the configuration: 

![integrate](images/integrate_config.png)

Finally, we will to select 'Get function URL' to retrieve the URL for the funtion we've just created. It should look similar to this format: https://jv-test-anchore-webhook.azurewebsites.net/api/general/policy_eval/admin

## Anchore Engine Configuration

If you have not setup Anchore Engine there are a couple choices:
- Navigate to our github repo: https://github.com/anchore/anchore-engine 
- Head to our support documentation: https://anchore.freshdesk.com/support/solutions/36000112471

Once you have a running Anchore Engine, we need to configure engine to send out webhook notifications to the URL of our Function App in Azure. Navigate here to learn how to edit the 'config,yaml' file for our Anchore Engine installation: https://anchore.freshdesk.com/support/solutions/articles/36000003890-working-with-subscriptions

Once the configuration is complete, you will need to activate a subscription, you can follow the documentation link above for more info on that. 

In this example, I have subscribed to a particular tag and am listening for 'policy_eval' changes. From the documentation: 

"This class of notification is triggered if a Tag to which a user has subscribed has a change in its policy evaluation status. The policy evaluation status of an image can be one of two states: Pass or Fail. If an image that was previously marked as Pass changes status to Fail or vice-versa then the policy update notification will be triggered."

## Azure Function Code

I kept this as minimal as possible in order to keep it open ended. In short, Anchore will be sending out the notification data to the webhook endpoint we've specified, we just need to write some code to consume it, and then send it to Slack. 

You can view the code here: https://raw.githubusercontent.com/valancej/Anchore-Slack-Notifications/master/index.js

Quick note: In the example, the alert to Slack is very basic. However, feel free to experiment with the notification data that Anchore sends to Azure and configure the POST data to Slack. 

## Testing

In my example, I'm going to swap between two policy bundles and evaluate them against an image and tag I've subscribed to. The easiest way to accomplish this is via the CLI or the API.

The CLI command to activate a policy: `anchore-cli policy activate <PolicyID>`
The CLI command to evaluate an image:tag against the newly activated policy: `anchore-cli evaluate check docker.io/jvalance/sampledockerfiles:latest`

This should trigger a notification give I've motified the policy bundles to create two different final actions. In my example, I'm toggling the exposed port 22 in the default bundle between 'WARN' and 'STOP'

Once Anchore has finished evaluating the image against the newly activated policy, a notification should be created and sent out to our Azure Function App. Based on the logic we've written, we will handle the request, and send out a Slack notification to our Slack app that has been set up to receive incoming webhooks. 

You should be able to view the notification in the Slack workspace and channel:

![screen](images/slack_notification.png)