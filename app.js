const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function (req, res) {

    res.render("list", { listType: date.getDay(), newAddItems: items })

});

app.post("/", function (req, res) {
    const item = req.body.newItem;
    console.log(req.body.item);
    if (req.body.item === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }


});

app.get("/work", function (req, res) {
    res.render("list", { listType: "Work List", newAddItems: workItems });
});

app.get("/about", function (req, res) {
    res.render("about");
})

app.listen(3000, function () {
    console.log("server started on port 3000");
});