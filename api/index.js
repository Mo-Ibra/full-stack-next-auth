const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const authRoutes = require('./routes/auth.routes.js');

const { PORT } = require('./constants/constants.js');
const cookieParser = require('cookie-parser');

/** Middleware */
app.use(cors({ origin: 'http://localhost:3000', credentials: true, }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

/** Routes */
app.get('/', function(req, res) {
    res.send('Application is Works');
});

app.use(authRoutes);

/** Server */
app.listen(PORT, () => `Application is works on port ${PORT}`);