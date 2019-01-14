# Favourite [Book] Tracker 🎬

A CRUD app with Vue.js and Node.js API to track favourite books, organize them and have a reminder of future releases.

### _coming features:_
- option to add tags and format to books (hard copy / eBook)
- Movie/Series section: using The Movie Database API ([TMDb](https://www.themoviedb.org/))
- Blogs section: tracking favourite blogs using RSS

This is a **demo version** of the [original repository](https://github.com/jpacsai/Track_Favourites):
I have removed the Okta authentication and the book database is stored in a local JSON file instead reached through the Goodreads API (which requires an API key).
There are some future release books added to the library to try out the Reminders feature.

## 📑 Table of Contents
* [Getting started](#-getting-started)
* [How to use](#-how-to-use)
* [Screenshots](#-screenshots)
* [Licence](#-licence)
* [Credits](#-credits)

## 🏁 Getting started

### Installation  
The system expected to have the following dependencies installed
* Node.js
* npm
* [ yarn ]
* Git

1. Clone [repository](https://github.com/jpacsai/Track_Favourites)
2. Navigate into project folder and then install dependencies with `npm install`
3. Run the server: ```node ./src/server``` (runs on localhost:8081)
4. Run the client: ```npm run dev```
5. the aplication runs on http://localhost:8080

### Built with  
* Vue.js with vue-cli, vue-router
* Node with Express, Sequelize, and Epilogue

### Browser compatibility  
The site was tested on Google Chrome only

## 🍴 How to use  

Look up books, authors, series from Goodreads and add books library.
Set the
- bookshelf: want to read / currently reading / read,
- ownership: yes / no,
If book is released in the future, a reminder is added.

## 📷 Screenshots


## 📜 Licence

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/jpacsai/Track_Favourites_DEMO/blob/master/LICENSE) file for details

## 💰 Credits
- based on the Basic CRUD app in [this tutorial](https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node)
