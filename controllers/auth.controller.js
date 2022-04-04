const UserModel = require('../models/user_model');

exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body;
    console.log(req.body);
    try {
        const user = await UserModel.create(
        {pseudo, email, password});
        res.status(201).json({message: "Le nouvel utilisateur a bien été créé !"});
    }
    catch(err) {
        res.status(200).send({err});
    }
};