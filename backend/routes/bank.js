const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const BankDetails = require("../models/BankDetails");
const { body, validationResult } = require("express-validator");

//Route 1: Get all details Get "/api/bank/" Login required
router.get("/fetchbank", fetchuser, async (req, res) => {
  try {
    const bank = await BankDetails.find({ user: req.user.id });

    res.json(bank);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});

//Route 2: Add new bank details  "/api/bank/" Login required
router.post(
  "/addbank",
  fetchuser,
  [
    body("accountno").isLength({ min: 11 }),
    body("bankname").isLength({ min: 3 }),
    body("ifsccode").isLength({ min: 11 }),
    body("branch").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { accountno, bankname, ifsccode, branch } = req.body;
      // If errors return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const bank = new BankDetails({
        accountno,
        bankname,
        ifsccode,
        branch,
        user: req.user.id,
      });
      const savedbank = await bank.save();
      res.json(savedbank);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//Route 3: Update a existing bank details  "/api/bank/" Login required
router.put("/updatebank/:id", fetchuser, [], async (req, res) => {
  const { accountno, bankname, ifsccode, branch } = req.body;
  try {
    // create a new bankdetail object
    const newBank = {};
    if (accountno) {
      newBank.accountno = accountno;
    }
    if (bankname) {
      newBank.bankname = bankname;
    }
    if (ifsccode) {
      newBank.ifsccode = ifsccode;
    }
    if (branch) {
      newBank.branch = branch;
    }

    // find the bank to be updated
    let bank = await BankDetails.findById(req.params.id); //params means id from/updatebank/:id
    if (!bank) {
      return res.status(404).send("Not found");
    }

    if (bank.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    bank = await BankDetails.findByIdAndUpdate(
      req.params.id,
      { $set: newBank },
      { new: true }
    );
    res.json({ bank });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});

//Route 4: delete a existing bank details  "/api/bank/" Login required
router.delete("/deletebank/:id", fetchuser, async (req, res) => {
  const { accountno, bankname, ifsccode, branch } = req.body;

  try {
    // find the bank to be deleted
    let bank = await BankDetails.findById(req.params.id); //params means id from/updatebank/:id
    if (!bank) {
      return res.status(404).send("Not found");
    }

    if (bank.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    bank = await BankDetails.findByIdAndDelete(req.params.id);
    res.json({ Success: "bank details has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});
module.exports = router;
