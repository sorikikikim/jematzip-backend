const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');

const PORT = 8080;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    const start = Date.now();
    console.log(`start: ${req.method} ${req.url}`);
    next();
    const diffTime = Date.now() - start;
    console.log(`end: ${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`);
});

app.use(express.static(path.join(__dirname, 'react-app/build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/react-app/build/index.html'));
});

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
