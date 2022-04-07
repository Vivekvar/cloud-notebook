const connectToMongo = require('./db.js');
const express = require('express');
const app = express();
connectToMongo();
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.listen(5000, () => {
    console.log("Listening on port 5000.....");
})
