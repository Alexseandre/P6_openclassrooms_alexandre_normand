const jwt = require('jsonwebtoken')
const privateKey = require('../auth.js/private_keys')
  
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  
  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
}
    
try {
  const token = authorizationHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, "l");
  const userId = decodedToken.userId;
  req.auth = { userId };
  if (req.body.userId && (req.body.userId !== userId)) {
  throw 'Invalid user ID';
  } else {
  next();
  }
} catch {
  res.status(401).json({
  error: new Error('Invalid request!')
  });
}
}
