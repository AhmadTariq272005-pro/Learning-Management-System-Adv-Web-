import Announcement from "../models/Announcement.js";

export async function createAnnouncement(req, res) {
  try {
    const body = req.body ?? {};
    const requiredFields = "title, message, createdBy".split(", ");
    const missing = requiredFields.filter((field) =>
      body[field] === undefined || body[field] === null || body[field] === ""
    );
    if (missing.length) {
      return res.status(400).json({ message: "Missing required fields", fields: missing });
    }
    const allowed = ["title", "message", "course", "createdBy", "publishedAt"];
    const payload = Object.fromEntries(allowed
      .filter((key) => body[key] !== undefined)
      .map((key) => [key, body[key]]));
    const record = await Announcement.create(payload);
    return res.status(201).json({ message: "Announcement created successfully", data: record });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "A record with a unique field already exists" });
    }
    if (error?.name === "ValidationError" || error?.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }
    console.error("createAnnouncement:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
