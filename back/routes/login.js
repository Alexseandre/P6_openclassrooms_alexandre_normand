const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
module.exports = (app) => {

    app.post('/api/auth/login',(req, res, next) => {

        User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(400).json({ error: 'Utilisateur non trouvé'})
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect'})
                }
                res.status(200).json({
                    userId: user._id,
                    token : jwt.sign(
                        { userId: user._id},
                        "l",
                        { expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
            })
            .catch(error => res.status(500).json({error}));
        }

    )};