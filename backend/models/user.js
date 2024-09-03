const mongoose = require("mongoose");
const MonHoc = require("./monhoc");
const userSchema = mongoose.Schema(
  {
    //Nhóm đăng nhập
    userName: {
      type: String,
      unique: true,
      required: "Phải có userName",
    },
    password: {
      type: String,
      required: "Phải có password",
    },
    //Nhóm thông tin
    hoTen: {
      type: String,
      required: "Phải có họ tên",
    },
    //Nhóm quyền
    quyen: {
      chucNang: {
        //Admin - TT - GV
        type: String,
        default: null,
      },
      thuMuc: [
        {
          //Id của thư mục được phân quyền
          type: mongoose.Schema.Types.ObjectId,
          default: null,
          //{ type: mongoose.Schema.Types.ObjectId, ref: Course }
        },
      ],
    },
    //Môn học - Tham chiếu đến môn học
    monHoc: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "MonHoc",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
