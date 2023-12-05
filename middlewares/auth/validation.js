const jwt = require('jsonwebtoken');

function validationRegister(req, res, next){
    const { username, password} = req.body

    if ( !username || !password ) {
        res.status(400).send({
            message: 'Fields is not complete!',
            statustext: 'Fields is not complete!',
            statusCode: 400,  
        })
    } else {
        next()
    }
}

function validationLogin(req, res, next) {
    const { username, password} = req.body

    if ( !username || !password) {
        res.status(400).send({
         message: 'Fields is not complete!',
         statustext: 'Fields is not complete!',
         statusCode: 400,   
        })
    } else {
        next()
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, 'kunci', (err, user) => {
      if (err) {
        console.error(err); // Tambahkan log untuk pesan error
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
}


module.exports = {
    validationRegister,
    validationLogin,
    authenticateToken
}