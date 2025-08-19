const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Hackathon = require("../models/Hackathon");

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const hackathons = await Hackathon.find({
      lastDate: { $gte: currentDate },
    }).sort({ createdAt: -1 });

    console.log(
      `📅 Found ${hackathons.length} active hackathons (not expired)`
    );
    res.json(hackathons);
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ createdAt: -1 });
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const hackathonsWithStatus = hackathons.map((hackathon) => ({
      ...hackathon.toObject(),
      isExpired: new Date(hackathon.lastDate) < currentDate,
    }));

    console.log(
      `📋 Found ${hackathons.length} total hackathons (including expired)`
    );
    res.json(hackathonsWithStatus);
  } catch (error) {
    console.error("Error fetching all hackathons:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const hackathonData = {
      ...req.body,
      image: req.file ? req.file.path : undefined,
    };

    const hackathon = new Hackathon(hackathonData);
    const savedHackathon = await hackathon.save();
    res.status(201).json(savedHackathon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }
    res.json(hackathon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const hackathonData = {
      ...req.body,
      image: req.file ? req.file.path : undefined,
    };

    const hackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      hackathonData,
      { new: true }
    );

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    res.json(hackathon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }
    res.json({ message: "Hackathon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
