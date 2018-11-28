# Anchore Slack Notifications

## How to configure Slack webhooks to receive Anchore notifications via Azure Functions

In this example, we will walkthrough how to configure Slack webhooks to receive Anchore notifications. We will consume the webhook with an Azure Function and pass the notification data into a Slack channel.


You will need the following:

- Anchore Engine service: [Anchore](https:;//anchore.com)
- Slack account: [Slack](https://slack.com)
- Azure account: [Azure](https://azure.microsoft.com)

## Slack Configuration

Configure incoming webhooks to work with the Slack application you would like to send Anchore notifications to. The Slack documentation gives a very detailed walkthrough on how to set this up. 

https://api.slack.com/incoming-webhooks

## Azure Configuration

Once you have an Azure account, begin by creating a Function App. In this example I will use the following configuration: 

![Screenshot](images/function_config.png)

Choose In-Portal development environment and then Webhook + API: 

![config](images/create_function_config.png)

Once the function has been setup, navigate to the integrate tab and edit the configuration: 

![integrate](images/integrate_config.png)

## Anchore Engine Configuration

If you have not setup Anchore Engine there are a couple choices:
- Navigate to our github repo: https://github.com/anchore/anchore-engine 
- Head to our support documentation: https://anchore.freshdesk.com/support/solutions/36000112471

Once you have a running Anchore Engine, we need to configure 