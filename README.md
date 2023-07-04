# omni-file-converter
Static website for converting various file types to another type via web APIs

# Project Overview

Omni is a Cloud-based, serverless application for converting files from one format to another in an asynchronous, queue-based manner. It consists of a React front end application and a AWS + Java based backend.

![omnifileconverter-architecture drawio](https://github.com/kenmhayes/omni-file-converter/assets/6184153/8b63a29a-900f-4555-8363-04a9016787b2)

It consists of Cognito authentication paired with API Gateway REST APIs and S3 file access. Behind the scenes, Lambda functions handle the conversion and handling of the user session state in a persistent way via DynamoDB.

There are two accompanying reposistories consisting of code packages for the Lambda functions and templates that can be used to create the AWS resources via CloudFormation.

- [Conversion Session Lambda](https://github.com/kenmhayes/conversion-session-lambda)
- [File Converter Lambda](https://github.com/kenmhayes/file-converter-lambda)

## Current Status & Roadmap

__Note: This project is mostly proof of concept for a serverless architecture using AWS. There are currently no plans in commercializing this.__

### Currently implemented
- Uploading files to S3 and downlading converted versions of those files
- - Currently supports basic image types
- Creation of user session pages that can be returned to before expiration time
- - Automatic deletion of session data from DynamoDB
- API Gateway to call Lambda functions via front end
- Cognito authentication for API calls and S3 access

### Not yet implemented
- SQS queue to handle conversion status updates so front end can poll if file download is ready
- Error handling and user input validation

# Web Application
## Build & Deploy
This is a React application built using Create-React-App and used the Yarn package manager.

Use the following commands:
- sudo yarn build
- sudo yarn test
- sudo yarn start (local development server)

There are several environment variables referencing AWS resources that need to be set. These are found in the .env file. Instead of writing values to that file directly, you can create override files such as .env.local

