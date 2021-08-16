const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");
const CampGround = require("/Users/indiravashisthmedepalli/Desktop/practice/yelpcamp/models/campground.js");

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

const seedDB = async () => {
  await CampGround.deleteMany({});
  for (let i = 0; i < 30; i++) {
    const random77 = Math.floor(Math.random() * 77);
    const randomPlace = Math.floor(Math.random() * 20);
    const randomDescriptor = Math.floor(Math.random() * 20);
    const camp = new CampGround({
      description: `${descriptors[randomDescriptor]} ${places[randomPlace]}`,
      location: `${cities[random77].city},${cities[random77].state}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
