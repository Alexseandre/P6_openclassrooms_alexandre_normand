const auth = require('../middleware/auth.js/auth');
const Sauce = require('../models/Sauce')

module.exports = (app) => {
    app.get('/api/sauces',auth, (req, res) => {
        Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(404).json({ error }))
    }
    )}
