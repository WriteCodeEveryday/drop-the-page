# Drop The Page

A small POC that accepts jobs into an SQS queue, pulls from the SQS queue, scrapes the HTML using nightmare and pushes it into a MySQL DB.

## How to install

```bash
npm i
```

## How to use
Fill in the .env file with the following configuration variables

```
PORT=3000
AWS_REGION=us-east-1
AWS_ACCOUNT_ID=aws_account_id
AWS_SQS_QUEUE=aws_sqs_queue
AWS_SQS_URL=aws_sqs_url
MYSQL_HOST=hostname
MYSQL_PORT=port
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_DATABASE=database
```

Start the node project using npm

```bash
npm run start
```

Swagger documentation is available at http://localhost:PORT/docs