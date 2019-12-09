const bcrypt = require('bcryptjs');
const User = require('../models/admin');
const jwt = require('jsonwebtoken');

const adminReg = async (req, res, next) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        var data = await User.findOne({ email });
        if (data) {
            return res.status(400).json({
                message: 'User has been registered already'
            })
        } else {
            var salt = await bcrypt.genSalt(10);
            var hash = await bcrypt.hash(password, salt);
            const newUser = new User({
                name,
                password: hash,
                email,
                isAdmin
            });
            await newUser.save();
            console.log(newUser)
            return res.status(201).json({
                message: 'User created successfully'
            })
        }
    }
    catch (err) {
        return next(err);
    }
}

const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        var data = await User.findOne({ email });
        if (!data) {
            return res.status(401).json({
                message: "Invalid email/password"
            });
        } else {
            var isMatch = await bcrypt.compare(password, data.password)
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid email/password"
                });
            } else {
                const token = await jwt.sign({ isAdmin: data.isAdmin }, process.env.SECRET, { expiresIn: '5h'});
                return res.status(200).json({
                    message: "Logged in Successfully",
                    token
                })
            }
        }
    }
    catch (err) {
        return next(err);
    }
}
const adminShow = async (req, res, next) => {
    try {
        var data = await User.find();
        return res.status(201).json({
            data
        })
    }
    catch (err) {
        return next(err);
    }
}

module.exports = { adminReg, adminLogin, adminShow };