const MonHoc = require("../models/monhoc");
const monHocController = {
  //--------------------------------------
  //Index
  //--------------------------------------
  GetAll: async (req, res) => {
    try {
      const monHocs = await MonHoc.find({});
      return res.status(200).json(monHocs);
    } catch (err) {
      return res.status(501).json(err.message);
    }
  },
  //-----------------------------------
  // AddNew
  //===================================
  AddNew: async (req, res) => {
    try {
      let newMonHoc = new MonHoc({
        maMonHoc: req.body.maMonHoc,
        tenMonHoc: req.body.tenMonHoc,
      });
      await newMonHoc.save();
      return res.status(200).json(newMonHoc);
    } catch (err) {
      res.status(501).json(err.message);
    }
  },
  //---------------------------------------
  // Delete
  //----------------------------------------
  DeleteMonHoc: async (req, res) => {
    try {
      const newMonHoc = await MonHoc.findByIdAndDelete(req.body.id);
      return res.status(200).json(newMonHoc);
    } catch (err) {
      res.status(501).json(err.message);
    }
  },
  //---------------------------------------
  // Update
  //----------------------------------------
  UpdateMonHoc: async (req, res) => {
    try {
      const newMonHoc = await MonHoc.findById(req.body.id);
      newMonHoc.maMonHoc = req.body.maMonHoc;
      newMonHoc.tenMonHoc = req.body.tenMonHoc;
      await newMonHoc.save();
      return res.status(200).json(newMonHoc);
    } catch (err) {
      res.status(501).json(err.message);
    }
  },
};

module.exports = monHocController;
