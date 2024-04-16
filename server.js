const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const restaurantRouter = require('./routes/restaurant.router');
require('dotenv').config();

const app = express();

const { default: mongoose } = require('mongoose');

app.use(express.json());
app.use((req, res, next) => {
    const start = Date.now();
    console.log(`start: ${req.method} ${req.url}`);
    next();
    const diffTime = Date.now() - start;
    console.log(`end: ${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`);
});

// app.use(express.static(path.join(__dirname, 'react-app/build')));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/react-app/build/index.html'));
// });
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/', (req, res, next) => {
//     setImmediate(() => {
//         next(new Error('it is an Error'));
//     });
// });

// app.use((error, req, res, next) => {
//     res.json({ message: error.message });
// });

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('mongodb connect!'))
    .catch((err) => console.log(err));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/restaurant', restaurantRouter);

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});
