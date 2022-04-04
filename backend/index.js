const connectToMongo = require('./db.js');
const express = require('express');
const app = express();
connectToMongo();
const authRoutes = require('./routes/authRoutes');
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log("Listening on port 3000.....");
})
