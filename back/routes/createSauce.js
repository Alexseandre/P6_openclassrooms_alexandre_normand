const Sauce = require('../models/Sauce');
const auth = require('../middleware/auth.js/auth');
const multer = require('../middleware/multer-config');



module.exports = (app) => {

    app.post('/api/sauces', auth, multer, (req, res, next) => {
        const sauceObject = JSON.parse(req.body.sauce);
        delete sauceObject._id; 
        const sauce = new Sauce({
            ...sauceObject, //operateur spread title: req.body.title
            imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
        });
        sauce.save()
        .then(() => res.status(201).json({ message : "Objet enregistrée" }))
        .catch((error) => console.log(error));
      }
)}