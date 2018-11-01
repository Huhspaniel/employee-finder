const express = require('express');
const path = require('path');

const PORT = 4200;

const app = express();
app.use(express.static(path.join(__dirname, './app/public')));
app.use(express.json());

require('./app/routes/apiRoutes')(app);
require('./app/routes/htmlRoutes')(app);

app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
})

