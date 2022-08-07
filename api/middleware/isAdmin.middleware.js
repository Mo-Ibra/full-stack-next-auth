const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');

const { TOKEN_SECRET_KEY } = require('../constants/constants');

const prisma = new PrismaClient();

const isAuth = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];

    if (token == null) {
        return res.status(500).json({ error: 'Token is null' });
    }

    jwt.verify(token, TOKEN_SECRET_KEY, async (err, decode) => {

        if (err) {
            return res.status(500).json(err);
        }

        const user = await prisma.user.findUnique({
            where: {
                id: decode.id,
            }
        });
    
        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }
    
        if (user.token != token) {
            return res.status(500).json({ error: 'Invalid Token' });
        }

        if (!decode.isAdmin) {
            return res.status(401).json({ error: 'You cant access here!' })
        }

        req.name = decode.name;
        req.email = decode.email;
        req.isAdmin = decode.isAdmin;

        next();
    });
}

module.exports = isAuth;