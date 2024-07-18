const mongoose = require("mongoose");
const { Schema } = mongoose;

const BankSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  accountno: {
    type: String,
    required: true,
  },
  bankname: {
    type: String,
    required: true,
  },
  ifsccode: {
    type: String,
    required: true,
  },

  branch: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("bankdetails", BankSchema);
