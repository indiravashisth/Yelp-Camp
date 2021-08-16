const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const CampGround = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/campground", async (req, res) => {
  const campgrounds = await CampGround.find({});
  res.render("campground/index", { campgrounds });
});
app.get("/campground/new", (req, res) => {
  res.render("campground/new");
});
app.get("/campground/:id", async (req, res) => {
  const camp = await CampGround.findById(req.params.id);
  res.render("campground/show", { camp });
});
app.get("/campground/:id/edit", async (req, res) => {
  const camp = await CampGround.findById(req.params.id);
  res.render("campground/edit", { camp });
});

app.post("/campground", async (req, res) => {
  const campground = new CampGround(req.body.campground);
  await campground.save();
  //res.send(campground);
  res.redirect(`campground/${campground._id}`);
});

app.put("/campground/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await CampGround.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campground/${campground._id}`);
});

app.delete("/campground/:id", async (req, res) => {
  const { id } = req.params;
  await CampGround.findByIdAndDelete(id);
  res.redirect(`/campground`);
});

app.listen(8080, () => {
  console.log("listening to port 8080");
});
