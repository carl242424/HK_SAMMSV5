const mongoose = require('mongoose');

const checkerAttendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
   
  checkInTime: { type: Date, required: true, default: Date.now },
  location: { type: String, required: true },
  status: { type: String, default: "Pending" },
  verifiedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CheckerAttendance', checkerAttendanceSchema);