const userRouter = require("express").Router();
const userController = require("../controllers/userController");

//Router
//addnew
userRouter.post("/addnew", userController.AddNew);
//GetAll
userRouter.get("/index", userController.GetAll);
//ChangePasss
userRouter.post("/changepass", userController.ChangPassword);
//Update
userRouter.post("/update", userController.UpdateUser);
//Delete
userRouter.post("/delete", userController.DeleteUser);
//export
module.exports = userRouter;
