const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');

const { TOKEN_SECRET_KEY } = require('../constants/constants');

const prisma = new PrismaClient();

const isAuth = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];

    if (token == null) {
        return res.status(500).json({ status: 500, error: 'Token is null' });
    }

    jwt.verify(token, TOKEN_SECRET_KEY, async (err, decode) => {

        if (err) {
            return res.status(500).json({ status: 500, err });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: decode.id,
            }
        });
    
        if (!user) {
            return res.status(404).json({ status: 404, error: 'User not found!' });
        }
    
        if (user.token != token) {
            return res.status(500).json({ status: 404,  error: 'Invalid Token' });
        }

        req.name = decode.name;
        req.email = decode.email;
        req.isAdmin = decode.isAdmin;

        next();
    });
}

module.exports = isAuth;