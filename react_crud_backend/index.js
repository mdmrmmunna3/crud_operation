const express = require("express");
const cors = require("cors");
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('react crud operation making running!');
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.le2w9sh.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const userCollection = client.db('coffeCrudDB').collection('users');
        const coffeeCollection = client.db('coffeCrudDB').collection('coffee');

        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            // console.log(result);
            res.send(result);
        })

        // get coffe 
        app.get('/coffee', async (req, res) => {
            const result = await coffeeCollection.find().toArray();
            // console.log(cursor);
            res.send(result);
        })

        app.get('/coffee/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await coffeeCollection.findOne(query);
            // console.log(cursor);
            res.send(result);
        })
        // add new coffee 
        app.post('/coffee', async (req, res) => {
            const newCoffee = req.body;
            const result = await coffeeCollection.insertOne(newCoffee);
            // console.log(result);
            res.send(result);
        });

        app.put('/coffee/:id', async (req, res) => {
            const id = req.params.id;
            const updateCoffee = req.body;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const coffee = {
                $set: {
                    name: updateCoffee.name,
                    category: updateCoffee.category,
                    details: updateCoffee.details
                }
            }
            const result = await coffeeCollection.updateOne(filter, coffee, options);
            res.send(result);
        })

        // delete coffee

        app.delete('/coffee/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await coffeeCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.log);





app.listen(port, () => {
    console.log(`Coffe crud making running on port: ${port}`);
})