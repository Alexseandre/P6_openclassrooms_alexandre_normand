const Sauce = require('../models/Sauce');
const auth = require('../middleware/auth.js/auth');
const multer = require('../middleware/multer-config');
const fs = require('fs')

module.exports = (app) => {

    app.put('/api/sauces/:id',auth, multer, (req, res, next) => {
        
        if(req.file) {
            Sauce.findOne({ _id : req.params.id })
            .then((sauce) => {
                const filename = sauce.imageUrl.split("/img/")[1];
                fs.unlink(`img/${filename}`, (error) => {
                    if(error) throw error;
                })
            })
            .catch((error) => res.status(400).json({ error }));
        } 
        const sauceObject = req.file ? 
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
        } : { ...req.body};
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({ message : "Objet modifiée !" }))
        .catch((error) => res.status(400).json({ error }));
    }
    )};


