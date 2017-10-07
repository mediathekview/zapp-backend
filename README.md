# zapp-backend

Program info API for German public broadcasting services.

This is a small **node.js** server to get current programm information (start and end time, title, description, etc.) from many German public broadcasting services as JSON. It is used by the Android app [Zapp](https://github.com/cemrich/zapp)


## Getting started

1. You need [node.js](http://nodejs.org/) installed on your machine to run this project.
1. Check out the project using Git.
1. Run `npm install` inside the newly created directory.
1. Set PORT as an environment variable inside your console. Eg. `PORT=3000` on linux or `SET PORT=3000` on windows.
1. Run `npm start`.
1. Open your browser and head to `http://localhost:3000/v1/shows/das_erste` (or replace 3000 with your PORT value) to get program info for ARD.
