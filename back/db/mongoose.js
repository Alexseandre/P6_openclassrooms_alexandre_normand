const mongoose = require('mongoose');

const connectDb =  () => {
    mongoose.connect('mongodb+srv://alex:motdepassevisiblesurgithub@cluster0.vdyiu.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
}
module.exports = { connectDb }