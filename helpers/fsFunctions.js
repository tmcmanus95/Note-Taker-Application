const { json } = require("express");
const fs = require("fs");
const util = require("util");

const readNote = util.promisify(fs.readFile);
const writeNote = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\NNote saved to ${destination}`)
  );

const appendNote = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeNote(file, parsedData);
    }
  });
};

module.exports = { writeNote, readNote, appendNote };
