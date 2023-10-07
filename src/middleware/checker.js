const bcrypt = require('bcrypt')

const checker = async (req, res, next) => {
  const { uni_id } = req.body
  const bearerHeader = req.headers.authorization
  const bearer = bearerHeader.split(' ')
  // console.log(bearer[1], uni_id)
  const password = await bcrypt.compare(uni_id, bearer[1])
  // console.log('yes')
  if (password) {
    next()
    // console.log('Yes this is a password!')
  } else {
    res.json({ Error: 'Authentication Failed' })
  }
}

module.exports = checker
