const User = require('../models/usersModel')
const bcrypt = require('bcrypt')
const checker = require('../middleware/checker')

//create wardens
module.exports.createUser = async (req, res) => {
  try {
    const { name, uni_id, password } = req.body
    const existingUser = await User.findOne({ uni_id })

    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'User with this uni_id already exists' })
    }
    const user = await User.create({
      name,
      uni_id,
      password,
    })

    if (user) res.json({ message: 'User registered', user })
  } catch (error) {
    console.log(error)
  }
}

//login
module.exports.login = async (req, res) => {
  try {
    const { uni_id, password } = req.body
    const warden = await User.findOne({ uni_id })
    if (warden.password === password) {
      const random_uuid = await bcrypt.hash(uni_id, 10)
      const uuid = uni_id

      const users = await User.find({})
      const user = users.filter((item) => item.uni_id != uni_id)

      return res.status(200).json({ bearer_token: random_uuid, user, uuid })
    } else {
      res.send('Incorrect ID or Password!')
    }
  } catch (error) {
    console.log('error')
  }
}

//slots registration
module.exports.slotsRegistration = async (req, res) => {
  try {
    const { uni_id, day, userId } = req.body

    const user1 = await User.findOne({ uni_id })
    const user2 = await User.findOne({ uni_id: userId })
    if (user1[day]) {
      res.json({ message: `You have already booked a slot on ${day}` })
    } else if (user2[day]){
      res.json({ message: `${user2.name}'s slot is already filled on ${day}` })
    }
    else {
      user1[day] = user2._id
      user2[day] = user1._id
      // console.log(user1,user2)
      await user1.save()
      await user2.save()
      res.json({ success: 'Slot Booked!' })
    }
  } catch (error) {
    res.json({ message: error.message })
    console.log(error)
  }
}
