const express = require('express');
const config = require('../config.js');

app = express();
app.use(express.static('client/dist'))

app.listen(config.PORT, console.log(`server is running on port ${config.PORT}`));
