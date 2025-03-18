const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
  visitorName: { type: String, required: true },
  visitorPurpose: { type: String, required: true },
  visitorTime: { type: Date, default: Date.now },
  flatNo: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

module.exports = mongoose.model("visitors", VisitorSchema);
