const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {
  //--------------------------------
  // Generate token
  //--------------------------------
  generateAccessToken: user => {
    return jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        quyen: user.quyen.chucNang
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '300s' }
    )
  },

  generateRefreshToken: user => {
    return jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        quyen: user.quyen.chucNang
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '1d' }
    )
  },
  //--------------------------------
  // Login
  //--------------------------------
  loginUser: async (req, res) => {
    //res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    //res.header("Access-Control-Allow-Credentials", "true");
    try {
      const user = await User.findOne({ userName: req.body.userName })
      if (!user) {
        return res.status(404).json('Không tìm thấy user')
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (!validPassword) {
        return res.status(404).json('Mật khẩu không khớp')
      }
      if (user && validPassword) {
        await User.populate(user, 'monHoc')
        //Generate access token
        const accessToken = 'bare ' + authController.generateAccessToken(user)
        //Generate refresh token
        const refreshToken = authController.generateRefreshToken(user)
        //refreshTokens.push(refreshToken);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict'
        })
        const { password, ...others } = user._doc
        /*return res.status(200).json({ ...others, accessToken, refreshToken }); */
        return res.status(200).json({ ...others, accessToken })
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  //-------------------------------------------------
  // Làm mới token
  //-------------------------------------------------
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json('Bạn chưa đăng nhập')
    console.log(refreshToken)
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        //
        return res.status(403).json(err)
      }
      //create new access token, refresh token and send to user
      const newAccessToken = 'bare ' + authController.generateAccessToken(user)
      const newRefreshToken = authController.generateRefreshToken(user)

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict'
      })
      res.status(200).json({
        accessToken: newAccessToken
      })
    })
  }
}
module.exports = authController
