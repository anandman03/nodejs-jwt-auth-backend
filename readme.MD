# NodeJS – JWT based Authentication & Authorization example with JSONWebTokens, Redis & SequelizeORM

- A nodejs based backend for authentication and authorization using jwt.
- Used Redis to store the refresh token post successful login.
- Used SequelizeORM (PostgreSQL) to store user information.
- Performed validations for password and emails at db and server side.

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.13.0

    $ npm --version
    8.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

  $ npm install -g yarn

---

## Install

    $ git clone https://github.com/anandman03/nodejs-jwt-auth-backend
    $ cd nodejs-jwt-auth-backend
    $ npm install


## Running the project

    $ npm run dev

## Simple build for production

    $ npm run build