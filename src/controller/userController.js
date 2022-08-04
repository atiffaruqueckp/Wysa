const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")

const isValid = function (value) {
    if (typeof value == "undefined" || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}


const createUser = async (req, res) => {
    try {
        let data = req.body;
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, msg: "Bad request, No data provided." }) };

        let { nickname, password } = data

        if (!isValid(nickname)) { return res.status(400).send({ status: false, msg: "nickname is required" }) }

        // Password number Validation :
        if (!isValid(password)) { return res.status(400).send({ status: false, msg: "password is required" }) }
        if (!(/^.{8,15}$/).test(password)) {
            return res.status(400).send({ status: false, msg: "Password Length should be between 8 and 15" })}
            // if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone))) { return res.status(400).send({ status: false, msg: "please provide a valid moblie Number" }) }
            let duplicateNickname = await userModel.findOne({ nickname: nickname })
            if (duplicateNickname) return res.status(400).send({ status: false, msg: 'Nickname is already exist' })


            let userCreated = await userModel.create(data);
            res.status(201).send({ status: true, message: "User created successfully", data: userCreated })
        }

    catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }



const login = async function (req, res) {
        try {
            // Getting data from user :
            const data = req.body
            const { password, nickname } = data

            // Input Validation :
            if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "Bad Request, No data provided" })

            // password Validation :
            if (!isValid(password)) { return res.status(400).send({ status: false, msg: "password is required" }) }
            if (!(/^.{8,15}$/).test(password)) {
                return res.status(400).send({ status: false, msg: "Password Length should be between 8 and 15" })}
            // Nickname Validation :
            if (!isValid(nickname)) { return res.status(400).send({ status: false, msg: "Nickname is required" }) };
            //if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.nickname))) { return res.status(400).send({ status: false, msg: "phone or nickname is incorrect" }) }

            // Searching provided nickname in database :
            let user = await userModel.findOne({ nickname: nickname,password:password })
            if (!user) { return res.status(400).send({ status: false, msg: "password or nicknameis incorrect" }) }

            // Token generate using JWT :
            const token = jwt.sign({
                userId: user._id,
            }, "secret-key", { expiresIn: "120m" })
            return res.status(200).send({ status: true, msg: "You are successfully logged in", userId: user._id, token })
        }
        catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    }




    module.exports = {
        createUser,
        login
    }