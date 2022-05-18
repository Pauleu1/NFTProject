# api.flow-blockchain-service

This is a Node.js backend service which handles events from the Flow Blockchain.

## Prerequisites

Before initializing the service please make sure you have setup and properly configured a MySQL Database. For a detailed guide on the database installation and setup, please check the official MySQL documentation:
1. [Windows Setup](https://dev.mysql.com/doc/refman/5.7/en/windows-installation.html)
2. [MacOS Setup](https://dev.mysql.com/doc/refman/5.7/en/macos-installation.html)

## Installation
 
Make sure to have Node.js with NPM installed. Now run:
 
```sh
npm install
```
 
This will resolve and install all (development) dependencies.
 
## Usage
 
Here is a quick example to get you started. All you need is to run:
 
```sh
npm start
```
 
As a result this will start the development server, which runs locally and can be reached via [localhost:9000](http://localhost:9000). The port can be changed from the command line options. The used configuration is displayed in the line starting with "Service running on port {PORT}...".
 
## License
 
MIT [LICENSE](LICENSE).