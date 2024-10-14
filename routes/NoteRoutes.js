const Note = require("../models/NotesModel.js");

module.exports = (app) => {
  app.post("/notes", async (req, res) => {
    try {
      const { noteTitle, noteDescription, priority } = req.body;
      if (!noteTitle || !noteDescription || !priority) {
        return res.status(400).send({ message: "All fields are required" });
      }
      const note = new Note({ noteTitle, noteDescription, priority });
      await note.save();
      res.status(201).send(note);
    } catch (error) {
      res.status(500).send({ message: "ERROR" });
    }
  });

  app.get("/notes", async (req, res) => {
    try {
      const notes = await Note.find();
      res.status(200).send(notes);
    } catch (error) {
      res.status(500).send({ message: "ERROR" });
    }
  });

  app.get("/notes/:noteId", async (req, res) => {
    try {
      const note = await Note.findById(req.params.noteId);
      if (!note) {
        return res.status(404).send({ message: "not found" });
      }
      res.status(200).send(note);
    } catch (error) {
      res.status(500).send({ message: "ERROR" });
    }
  });

  app.put("/notes/:noteId", async (req, res) => {
    try {
      const { noteTitle, noteDescription, priority } = req.body;
      const note = await Note.findByIdAndUpdate(req.params.noteId, {
        noteTitle,
        noteDescription,
        priority,
        dateUpdated: Date.now(),
      });
      if (!note) {
        return res.status(404).send({ message: "not found" });
      }
      res.status(200).send(note);
    } catch (error) {
      res.status(500).send({ message: "ERROR" });
    }
  });

  app.delete("/notes/:noteId", async (req, res) => {
    try {
      const note = await Note.findByIdAndRemove(req.params.noteId);
      if (!note) {
        return res.status(404).send({ message: "not found" });
      }
      res.status(200).send({ message: "deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "ERROR" });
    }
  });
};
