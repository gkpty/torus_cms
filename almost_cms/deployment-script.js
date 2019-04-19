//load files from the .env file
require('dotenv').load();

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Load credentials and set region from JSON file
// AWS.config.loadFromPath('./config.json');    
// Currently loading from env file

// Load the other scripts
var websiteScript = require('./website-script')

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});
route53 = new AWS.Route53({apiVersion: '2013-04-01'});
const path = require("path");
const fs = require('fs');

// Package to open browser window
const open = require('open');

// package to use stdin/out
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

//converts console input to y and n
function convertInput(input) {
    var mininput =  input.toLowerCase()
    if (mininput == 'y' || mininput == 'yes') {
        output = 'y';
    }
    else if(mininput == 'n' || mininput == 'no') {
        output = 'n';
    }
    else {
        output = '';   
    }
    return output;
}

function stmt1(){
    readline.question(`Want to deploy a new static website? [Y/n]`, (res) => {
        switch(convertInput(res)) {
            case 'y':
                stmt3();
                break;
            case 'n':
                stmt2();
                break;
            default:
                console.log('please enter a valid yes/no response');
                stmt1();
        }
    });
}

function stmt2(){
    readline.question(`I guess you want to install a backend for an existing static website [Y/n]`, (res2) => {
        switch(convertInput(res2)) {
            case 'y':
                sitebackend();
                break;
            case 'n':
                console.log('Sorry there isnt much we can do for you right now.')
                readline.close();
                break;
            default:
                console.log('please enter a valid yes/no response');
                stmt2();
        }
    });
}

function stmt3(){
    readline.question(`Will you want to install a backend for your site? [Y/n]`, (res3) => {
        switch(convertInput(res3)) {
            case 'y':
                stmt4();
                break;
            case 'n':
                console.log(`please create a new IAM user and enter the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env variables`)
                console.log(`for more info check out https://github.com/gkpty/almost_cms`);
                (async () => {
                    await open('https://console.aws.amazon.com/iam/home?region=us-east-1#/users$new?step=details');
                })();
                stmt5();
                break;
            default:
                console.log('please enter a valid yes/no response');
                stmt3();
        }
    });
}

function stmt4(){
    readline.question(`Have you laready configured the backend? [Y/n]`, (res4) => {
        switch(convertInput(res4)) {
            case 'y':
                // EXECUTE THE WEBSITE FUNCTION
                siteFunc();
                console.log('Please Re-run the deployment script and select no for the first option');
                readline.close();
                break;
            case 'n':
                console.log('Please configure Amplify');
                console.log('run: amplify init');
                console.log('run: amplify configure');
                console.log('Add AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env variables with the credentials of the IAM user created for Amplify');
                console.log('then re-run the deployment script.')
                readline.close();
                break;
            default:
                console.log('please enter a valid yes/no response');
                stmt4();
        }
    });
}

function stmt5(){
    readline.question(`Have you finished configuring the env variables? [Y/n]`, (res5) => {
        switch(convertInput(res5)) {
            case 'y':
                // EXECUTE THE WEBSITE FUNCTION
                siteFunc();
                break;
            default:
                console.log('please enter a valid yes/no response');
                stmt5();
        }
    });
}

function sitebackend(){
    readline.question(`Have you already configured Amplify? [Y/n]`, (res6) => {
        switch(convertInput(res6)) {
            case 'y':
                console.log('Deploying your backend...');
                // EXECUTE THE LAMBDA SCRIPT
                console.log('EXECUTE THE LAMBDA SCRIPT')
                readline.close();
                break;
            case 'n':
                console.log('Please configure Amplify');
                console.log('run: amplify init');
                console.log('run: amplify configure');
                console.log('Add AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env variables with the credentials of the IAM user created for Amplify');
                console.log('then re-run the deployment script.')
                readline.close();
                break;
            default:
                console.log('please enter a valid yes/no response');
                sitebackend();
        }
    }); 
}

function siteFunc() {
    readline.question(`Please enter the domain name of your site ex. yourdomain.com `, (domainName) => {
        if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domainName)) {
            console.log("Valid Domain Name");
            websiteScript.script(s3, route53, path, fs, domainName);
            readline.close();
        } else {
            console.log("Enter Valid Domain Name");
            siteFunc();
        }
    });
}


    



console.log('Hi, welcome to the almost installer!');
stmt1();


