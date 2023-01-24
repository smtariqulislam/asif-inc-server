const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 4000;


//middleware
app.use(cors());
app.use(express.json());

//kzel3OROhVBIo4NZ
//asif-inc



const uri =
  "mongodb+srv://asif-inc:fCWrht7CZH29Vy0W@cluster0.781yldu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run (){
    try {
        const usercollection = client.db("asif-inc").collection("user-info");

        // const user = {
        //     FirstName: 'Tanjid',
        //     LastName : 'Islam',
        //     Email: 'tanjid.islam.eu@gmail',
        //     PhoneNumber: '01400740302'

        // }
        // const result = await usercollection.insertOne(user);

        // console.log(result);



         app.get("/users", async (req, res) => {
           const cursor = usercollection.find({});
           const users = await cursor.toArray();
           console.log(users);
           res.send(users);
         });

         app.post("/users", async (req, res) => {
           // const user = req.body;

           const user = req.body;

           const result = await usercollection.insertOne(user);
           // console.log(result);
           user._id = result.insertedId;
           // console.log(result)
           res.send(user);

           // console.log("post api called")
         });




          app.get("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await usercollection.findOne(query);
            // console.log(id);
            res.send(user);
          });

         
         




    }

    finally{

    }

}


run().catch(err => console.log(err))



app.get('/', (req,res)=>{
    res.send(" asif Inc sever is running goto client side");
});







app.listen(port,()=>{
    console.log(`sever is running goto client side port ${port}`);
})