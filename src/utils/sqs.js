const AWS = require('aws-sdk');
const { fetchHtml } = require('./nightmare');
const { commit } = require('./mysql');
AWS.config.update({ region: process.env.AWS_REGION });

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const queueUrl = `${process.env.AWS_SQS_URL}/${process.env.AWS_ACCOUNT_ID}/${process.env.AWS_SQS_QUEUE}`;

sqs.receiveMessage({
  QueueUrl: queueUrl,
  MaxNumberOfMessages: 1,
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0
}, async (err, data) => {
  if (err) {
    console.debug(err, err.stack);
  } else {
    if (!data.Message) { 
      console.debug('No message data'); 
      return;
    }
    const job = JSON.parse(data.Messages[0].Body);
    console.debug('Processing: ', job);

    const html = await fetchHtml(job.url);
    if (html) {
      const sql = await commit(job.id, job.url, html)
      if (sql[0]) {
        sqs.deleteMessage({
          QueueUrl: queueUrl,
          ReceiptHandle: data.Messages[0].ReceiptHandle
        }, (err, data) => {
          if (err) {
            console.debug('Error removing processed job', err, err.stack);
          } else {
            console.debug('Processing Completed');
          }
        });
      }
    }
  }                                                                                                                                              });

const push = (id, url) => {
  const params = {
    MessageBody: JSON.stringify({
      id,
      url
    }),
    QueueUrl: queueUrl
  };
  
  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.debug('Error', err);
    } else {
      console.debug('Successfully added message', data.MessageId);
    }
  });
}

module.exports = { push };