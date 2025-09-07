const mongoose = require('mongoose');
const connectionstring = process.env.MONGO_URI;
const connectodb = async () => {
    try {
        const connection = await mongoose.connect(connectionstring);
        console.log("Connected to database...");
    }catch(err){
        console.log(err);
    }
}
module.exports=connectodb;
