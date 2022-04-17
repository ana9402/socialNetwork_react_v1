const UserModel = require('../models/user_model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 21 * 60 * 60 * 1000
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: maxAge});
}

module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body;
    console.log(req.body);
    try {
        const user = await UserModel.create(
        {pseudo, email, password});
        res.status(201).json({message: "Le nouvel utilisateur a bien été créé !"});
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors });
    }
};

module.exports.signIn = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge})
        res.status(200).json({user: user._id})
    } catch(err) {
        const errors = signInErrors(err)
        console.log(err);
        res.status(200).json({errors});
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}