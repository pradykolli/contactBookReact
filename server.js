const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const app = express()
const path = require('path')
const contacts = require('./routes/api/contacts')
const cors = require('cors')
// Middlewares
app.use(bodyparser.json())
app.use(cors())
const db = require('./config/keys').mongoURI
// connect mongo
mongoose.connect(db, {useNewUrlParser: true},{ useUnifiedTopology: true })
        .then(() => console.log("Mongo DB connected"))
        .catch(err => console.log("Could not connect to the DB" + err))

app.use('/api/contacts',contacts)

// Serve static assets if in prod
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('/',(req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build' , 'index.html'))
    });
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server up and running on port: ${port}`))