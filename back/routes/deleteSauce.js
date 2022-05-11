const Sauce = require('../models/Sauce');
const auth = require('../middleware/auth.js/auth');
const fs = require('fs');

module.exports = (app) => {

    app.delete('/api/sauces/:id', auth, (req, res, next) => {
        Sauce.findOne({ _id: req.params.id})
        .then((sauce) => {
            if(!sauce) {
                res.status(404).json({
                    error : new Error ('No such Sauce')
                });
            };
            if(sauce.userId !== req.auth.userId) {
                res.status(400).json({
                    error: new Error ('Non autorisé')
            });
        };
        const filename = sauce.imageUrl.split('/img/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message : "Objet supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        })
    })
    .catch((error) => res.status(500).json({ error }))
}
)}