import mongoose from "mongoose";

let database = null;
mongoose.Promise = global.Promise;

function startDatabase() {
  mongoose.connect(process.env.DB_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  database = mongoose.connection;
  database.on("error", (err)=>{console.error(err)})
  database.once("open", () => {console.log(">>>>> MONGODB Service started successfully")})
}

function getDatabase() {
  if (!database) startDatabase();
  return database;
}

export default {
  getDatabase,
  startDatabase,
};