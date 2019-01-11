# Favourite [Book] Tracker 📚

A CRUD app with Vue.js and Node.js API to track favourite books, organize them and have a reminder of future releases.
In the future a Movie/Series and a Blog section will be added.

## 📑 Table of Contents
* [Live link](#-live-link)
* [Getting started](#-getting-started)
* [How to use](#-how-to-use)
* [Screenshots](#-screenshots)
* [Licence](#-licence)
* [Credits](#-credits)

## 🔗 Live link  


## 🏁 Getting started

### Installation  
The system expected to have the following dependencies installed
* Node.js
* npm
* [ yarn ]
* Git

1. Clone [repository](https://github.com/jpacsai/Track_Favourites)
2. Navigate into project folder and then install dependencies with `npm install`
3. Create an Application in Okta
4. Get a Goodreads API key
5. Rename ```keys.js``` file to ```apiKeys.js``` and type in the required ID/URL/key, save (git will ignore it so it's safe)
3. Run the server: ```node ./src/server```
4. Run the client: ```npm run dev```
5. the aplication runs on http://localhost:3000

### Create an Application in Okta

You will need to [create an OpenID Connect Application in Okta](https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node#add-authentication-with-okta) to get your values to perform authentication.

Log in to your Okta Developer account (or [sign up](https://developer.okta.com/signup/) if you don’t have an account) and navigate to **Applications** > **Add Application**. Click **Single-Page App**, click **Next**, and give the app a name you’ll remember, and click **Done**.


### Built with  
* Vue.js with vue-cli, vue-router, and Okta Vue SDK
* Node with Express, Okta JWT Verifier, Sequelize, and Epilogue

### Browser compatibility  
The site was tested on Google Chrome only

## 🍴 How to use  

Look up books, authors, series from Goodreads and add books to bookshelf.
Set:
- bookshelf: want to read / currently reading / read
- ownership
- format: hard copy / eBook (_coming..._)
If book is released in the future, a reminder is added.

## 📷 Screenshots


## 📜 Licence

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/jpacsai/Track_Favourites/blob/master/LICENSE) file for details

## 💰 Credits
- based on the Basic CRUD app in [this tutorial](https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node)
