const express = require("express");
const router = express.Router();
const Person = require("../models/Person"); // Person model

// ==========================
// Routes for Person
// ==========================

// POST route to add a new person to the database
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Get person data from request body
    const newPerson = new Person(data); // Create new Person instance

    const response = await newPerson.save(); // Save to DB
    console.log("Data Saved Successfully");
    res.status(200).json(response); // Send saved person data as response
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// GET route to fetch all person data from the database
router.get("/", async (req, res) => {
  try {
    const data = await Person.find(); // Fetch all persons
    console.log("Data Fetched Successfully");
    res.status(200).json(data); // Send fetched data
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// GET route to fetch person(s) based on their work type (chef, manager, waiter)
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract work type from URL parameter

    // Validate workType
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const response = await Person.find({ work: workType }); // Find person by work type
      console.log("WorkType Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ err: "Invalid workType" }); // Invalid work type
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }
    console.log("Updated Data");
    res.status(200).json(response);
  } catch {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }
    console.log("Deleted Data");
    res.status(200).json({ message: "Delete Data Successfully" });
  } catch {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
