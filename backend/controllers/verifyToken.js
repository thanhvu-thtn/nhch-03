const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const token = req.headers.token
  const refreshToken = req.cookies.refreshToken
  if (token) {
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(403).json('Token không hợp lệ')
      }
      req.user = user
      next()
    })
  } else {
    return res.status(401).json('Bạn chưa đăng nhập')
  }
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.quyen === 'Admin') {
      next()
    } else {
      return res
        .status(403)
        .json('Bạn không đủ thẩm quyền để thực hiện tác vụ này!')
    }
  })
}

module.exports = {
  verifyToken,
  verifyTokenAndAdmin
}
