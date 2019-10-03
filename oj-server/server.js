const express = require('express');
const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/COJ', { useNewUrlParser: true }, { useUnifiedTopology: true });



// if visit root, pass the request to index router and send back the client side
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, '../public')));

// pass all the requests start with /api/v1 to restRouter
app.use('/api/v1', restRouter);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});