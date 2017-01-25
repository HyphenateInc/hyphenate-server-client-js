# REST API demo
The project is an server-side example code that call Hyphenate's REST API using node.js



# Node.js
To install `Node.js`. Go to subfolder `/server-nodejs`.

### 1. Deployment
Install all the required node.js packages before running the project. 

```bash
npm install
```

### 2. Configuration
Update the configrations in the file `config.js` in directory `resources`. Update Organization name(org_name), application name(app_name), client_id, client_secret, host(host name), certificate file(ca) to corresponding values respect to app created from Hyphenate console. 

### 3. Project Structure
All files in directory `hyphenate` by calling `client.js` respectively implement modules includs request token, users, groups, chatrooms, upload and download files, messages, chat history.

### 4. Run
`test.js` provides an examples for all API invocation, you can change the value of variable `i` for running corresponding API.

Run the following command line in terminal to run the test script
```bash
$ node test
```
