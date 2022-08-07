const express = require('express');

const router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const joiMiddleWare = require('express-joi-validation').createValidator({});

const { registerSchema, loginSchema } = require('../validation/auth.schema.js');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const isAuth = require('../middleware/isAuth.middleware.js');
const isAuthAdmin = require('../middleware/isAdmin.middleware.js');

const { TOKEN_SECRET_KEY, TOKEN_EXPIRES_TIME } = require('../constants/constants.js');

router.post('/users/register', joiMiddleWare.body(registerSchema), async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const createUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            }
        });

        res.status(201).json({ message: 'User has been created', user: createUser });

    } catch (err) {
        res.status(500).json({ error: err });
    }

});

router.post('/users/login', joiMiddleWare.body(loginSchema), async (req, res) => {

    try {

        const { email, password } = req.body;

        const getUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        
        if (!getUser) {
            return res.status(404).json({ error: 'Email or password is wrong. please try again.' });
        }

        const match = await bcrypt.compare(password, getUser.password);

        if (!match) {
            return res.status(404).json({ error: 'Password is invalid' });
        }

        const accessToken = jwt.sign({ id: getUser.id, name: getUser.name, email: getUser.email, isAdmin: getUser.isAdmin }, TOKEN_SECRET_KEY, {
            expiresIn: TOKEN_EXPIRES_TIME,
        });

        console.log(accessToken);

        // Update user.
        const updateUser = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                token: accessToken,
            }
        });

        // Save token to cookie;
        res.cookie('token', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(200).json({ user: updateUser, token: accessToken });

    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/users/logout', async (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(500).json({ error: 'You already out.' })
    }

    const { id } = jwt.decode(token);

    if (!token) return res.status(500);

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        }
    });

    if (!user) {
        return res.status(500);
    };

    await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            token: null,
        }
    });

    res.clearCookie('token');
    res.status(200).json({ message: 'User has been log out.' });

});

/* Testing Middlewares */
router.get('/users/profile', isAuth, async (req, res) => {
    res.status(200).json({ name: req.name, email: req.email, isAdmin: req.isAdmin });
});

router.get('/users/mustauth', isAuth, (req, res) => {
    res.status(200).json({ message: 'You auth', name: req.name, email: req.email, isAdmin: req.isAdmin });
});

router.get('/users/mustauthadmin', isAuthAdmin, (req, res) => {
    res.status(200).json({ message: 'You auth admin', name: req.name, email: req.email, isAdmin: req.isAdmin });
});

module.exports = router;