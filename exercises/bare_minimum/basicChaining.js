// import { read } from 'fs';

/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
//import files from
//require(path).someName is the location of exported modules
var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;
var writeFileAsync = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
    // 1) reads a GitHub username from a `readFilePath`
  return pluckFirstLineFromFileAsync(readFilePath)
    // (2) then, sends a request to the GitHub API for the user's profile
    .then(getGitHubProfileAsync)
    // (3) then, writes the JSON response of the API to `writeFilePath`
    .then(function(profile) {
      return writeFileAsync(writeFilePath, JSON.stringify(profile));
    });
  };
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

