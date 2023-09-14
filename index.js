const express = require("express");
const app = express();
const PORT = 8081;
const bodyParser = require('body-parser')


const router = require("./router/router.js");
const db = require("./db/config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

db.database.sync().then(() => {
    console.log("Synced db.")
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. `);
}); 