const mongoose = require('mongoose');

const connectDb =  () => {
    mongoose.connect('mongodb://localhost:27017/opc-training', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
}
module.exports = { connectDb }