const mongoose = require('mongoose');

mongoose
.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USER_PASSWORD}@cluster0.bptff.mongodb.net/socialNetworkReact`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Failed to connect to MongoDB", err));