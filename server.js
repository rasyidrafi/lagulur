const express = require('express');
const app = express();
const path = require('path');

// View Engine Setup & Tools
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const TheRouter = require('./routes');
app.use('/', TheRouter.home);
app.use('/yt', TheRouter.yt);

app.use((req, res, next) => {
    res.status(404).render("pages/404");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Listen on ${PORT}`));