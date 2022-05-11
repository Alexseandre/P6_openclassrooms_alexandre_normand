const auth = require('../middleware/auth.js/auth');
const Sauce = require('../models/Sauce')


module.exports = (app) => {
app.get('/api/sauces/:id',auth, (req, res, next) => {
     Sauce.findOne({ _id: req.params.id })
     .then(sauce => {
          if (sauce === null) {
          message = "La sauce demandé n'existe pas"
          return res.status(404).json({message})
       }
       const message = 'La sauce demandé à bien été trouvé'
       res.status(200).json(sauce)
     })
     .catch(error => {
       const message = `La sauce n'a pas été trouvé, veuillez réessayer dans quelque instants `
       res.status(500).json({message, data : error})
     })
}
)}