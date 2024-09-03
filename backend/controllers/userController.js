//Add Bcrypt
const bcrypt = require("bcrypt");
//Model User
const User = require("../models/user");
//User Controller
const userController = {
  //-------------------------------------
  //Thêm user
  //-------------------------------------
  AddNew: async (req, res) => {
    try {
      bcrypt
        .hash(req.body.password, 10)
        .then((hashed) => {
          const newUser = new User({
            userName: req.body.userName,
            hoTen: req.body.hoTen,
            password: hashed,
            monHoc: req.body.monHoc || null,
            quyen: {
              chucNang: req.body.chucNang || null,
              thuMuc: req.body.thuMuc || [],
            },
          });
          newUser
            .save()
            .then((user) => User.populate(newUser, "monHoc"))
            .then((user) => {
              delete user["password"];
              const NewUser = {
                _id: user._id,
                userName: user.userName,
                hoTen: user.hoTen,
                quyen: user.quyen,
                monHoc: user.monHoc,
              };
              res.status(200).json(NewUser);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        })
        .catch((err) => console.log(err.message));
    } catch (err) {
      res.status(501).json(err.message);
    }
  },
  //------------------------------------
  //Get all
  //-------------------------------------
  GetAll: async (req, res) => {
    try {
      const users = await User.find({}).select("userName hoTen quyen monHoc");
      await User.populate(users, "monHoc");
      res.status(200).json(users);
    } catch (err) {
      res.status(501).json(err.message);
    }
  },
  //-------------------------------------------
  // Đổi pass
  //-------------------------------------------
  ChangPassword: async (req, res) => {
    try {
      bcrypt.hash(req.body.password, 10).then((hashed) => {
        User.findByIdAndUpdate(req.body.id, { password: hashed }).then(
          (user) => {
            return res.status(200).json(user);
          }
        );
      });
    } catch (err) {
      res.status(501).json(err.message);
    }
  },
  //----------------------------------------------
  //Update user
  //----------------------------------------------
  UpdateUser: async (req, res) => {
    try {
      User.findByIdAndUpdate(
        req.body.id,
        {
          hoTen: req.body.hoTen,
          userName: req.body.userName,
          monHoc: req.body.monHoc,
          quyen: {
            chucNang: req.body.chucNang,
          },
        },
        { returnDocument: "after" }
      )
        .then((user) => User.populate(user, "monHoc"))
        .then((user) => {
          delete user["password"];
          const NewUser = {
            _id: user._id,
            userName: user.userName,
            hoTen: user.hoTen,
            quyen: user.quyen,
            monHoc: user.monHoc,
          };
          res.status(200).json(NewUser);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      res.status(501).json(err.message);
    }
  },
  //-----------------------------------------
  // Xóa user
  //-----------------------------------------
  DeleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.body.id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(501).json(err.message);
    }
  },
};
module.exports = userController;
