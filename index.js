const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL =
  "mongodb+srv://vaishu:vaishu@cluster0.qskmh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let options = { origin: "*" };
app.use(cors(options));
app.use(express.json());

app.post("/userpost", async function (req, res) {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("myFirstDatabase");
    let b = await db.collection("user").insertOne(req.body);
    await connection.close();
    res.json({ message: "user-added" });
  } catch (error) {
    console.log(error);
  }
});
app.post("/userposts", async function (req, res) {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("myFirstDatabase");
    let b = await db.collection("user").insertOne(req.body);
    await connection.close();
    res.json({ message: "user-added" });
  } catch (error) {
    console.log(error);
  }
});
app.get("/userall", async function (req, res) {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("myFirstDatabase");
    let b = await db.collection("user").find({}).toArray();
    await connection.close();
    res.json(b);
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/:id", async function (req, res) {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("myFirstDatabase");
    let objId = mongodb.ObjectId(req.params.id);
    let a = await db.collection("user").findOne({ _id: objId });
    await connection.close();
    res.json(a);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/userdelete/:id", async function (req, res) {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("myFirstDatabase");
    let objId = mongodb.ObjectId(req.params.id);
    let b = await db.collection("user").deleteOne({ _id: objId });
    await connection.close();
    res.json({ message: "user-deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 5000);
