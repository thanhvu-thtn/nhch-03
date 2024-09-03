const mongoose = require("mongoose");
monHocSchema = mongoose.Schema(
  {
    //Tên đầy đủ
    tenMonHoc: {
      type: String,
      unique: true,
      required: "Phải có tên môn học",
    },
    //Tên tắt
    maMonHoc: {
      type: String,
      unique: true,
      required: "Phải có mã môn học",
      minlength: [2, "Độ dài của tên tên tắt phải là 2 kí tự"],
      maxlength: [2, "Độ dài của tên tên tắt phải là 2 kí tự"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MonHoc", monHocSchema);
