const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use(express.json());

const shopifyRoute = require('./router/shopifyRoutes');
app.use('/api',shopifyRoute)

const httpServer = http.createServer(app);

httpServer.listen(4000, () => console.log('Your Slack-OAuth app is listening on port 3000.'));