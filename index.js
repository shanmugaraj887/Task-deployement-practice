import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
const app = express();
import { MongoClient } from 'mongodb';
const PORT = process.env.PORT;

const Mongo_URL = process.env.Mongo_URL;
const client = new MongoClient(Mongo_URL)
await client.connect()
console.log("Mongo is connected")


app.get("/", async function (request, response) {
    const books = await client.db("books").collection("books").find({}).toArray()
    response.send(books);
});

app.post("/books/insertbooks", express.json(), async function (request, response) {
    const data = request.body
    const books = await client.db("books").collection("books").insertMany(data)
    response.send(books);
});

app.put("/books/updatebooks/:id", express.json(), async function (request, response) {
    const data = request.body
    const { id } = request.params
    const books = await client.db("books").collection("books").updateOne({ isbn: id }, { $set: data })
    response.send(books);
});

app.delete("/books/deletebook/:id", async function (request, response) {
    const { id } = request.params
    const books = await client.db("books").collection("books").deleteOne({ isbn: id })
    response.send({ message: "successfully deleted" });
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));












