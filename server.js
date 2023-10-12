const express = require("express");
const path = require("path");
const notesDb = require("./db/db");
const { appendNote, readNote, writeNote } = require("./helpers/fsFunctions");
const uuid = require("./helpers/uuid");
const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static("public"));

// This view route is a GET route for the homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// This view route is a GET route for the feedback page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readNote("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
  // Alerting that a post request has been made.
  console.info(`${req.method} request received to save note`);

  // Destructuring the title and text from the request body.
  const { title, text } = req.body;

  // Checks that all the necessary items are there.
  if (title && text) {
    // Creates a new Note variable and saves the necessary information. Also calls the uuid function to create and associate the post with a random ID.
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    //Uses the readAndAppend function to

    appendNote(newNote, "./db/db.json");

    //Variable for the response with the information from the note.
    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting feedback");
  }
});
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
