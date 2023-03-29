const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const usersRouter = require("./routes/api/users");
const app = express();
require("dotenv").config();
// Body parser middleware

app.use(express.urlencoded({extended: false}));
app.use(express.json());
// DB Config
const db = process.env.mongoURI;
// Connect to MongoDB
mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", usersRouter);

/* //Serve static assets if in production
if (process.env.NODE_ENV = "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
 */

const port = process.env.PORT ;
app.listen(port, () => console.log(`Server is running on port  ${port} `));