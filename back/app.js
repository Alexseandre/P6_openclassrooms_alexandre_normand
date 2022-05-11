
const express = require('express');
const path = require('path');
const db = require('./db/mongoose');
const cors = require('cors');


const app = express();
const port = process.env.PORT || '3000';

app
.use(express.json())
.use(cors())
.use('/img', express.static(path.join(__dirname, 'img')));

db.connectDb()

require('./routes/likeSauce')(app);
require('./routes/deleteSauce')(app);
require('./routes/getAllSauce')(app);
require('./routes/getOneSauce')(app);
require('./routes/createSauce')(app);
require('./routes/updateSauce')(app);
require('./routes/signup')(app);
require('./routes/login')(app);

    app.use(({res}) => {
        const message = 'Impossible de trouver la ressource demandée! Essayer une autre URL'
        res.status(404).json({message})
    });

    app.listen( port, () => {console.log(`Notre application Node est démarrée sur : http://localhost:${port}`)});