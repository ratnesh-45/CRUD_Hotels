const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem"); // MenuItem model

// ==========================
// Routes for MenuItem
// ==========================

// POST route to add a new menu item to the database
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Get menu item data from request body
    const newMenuItem = new MenuItem(data); // Create new MenuItem instance

    const response = await newMenuItem.save(); // Save to DB
    console.log("Data Saved Successfully");
    res.status(200).json(response); // Send saved item as response
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// GET route to fetch all menu items from the database
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find(); // Fetch all menu items
    console.log("Data Fetched Successfully");
    res.status(200).json(data); // Send fetched data
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // Extract taste type from URL parameter

    // Validate workType
    if (
      tasteType === "sweet" ||
      tasteType === "spicy" ||
      tasteType === "sour"
    ) {
      const response = await MenuItem.find({ taste: tasteType }); // Find menuitem by taste type
      console.log("TasteType Fetched");
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
    const menuItemId = req.params.id;
    const updatedMenuItemData = req.body;

    const response = await MenuItem.findByIdAndUpdate(
      menuItemId,
      updatedMenuItemData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      res.status(404).json({ error: "MenuItem not found" });
    }

    console.log("Updated data");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuItemId);

    if (!response) {
      res.status(404).json({ error: "MenuItem not found" });
    }

    console.log("Deleted data");
    res.status(200).json({ message: "Delete data successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
