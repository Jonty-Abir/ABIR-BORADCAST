//@ts-ignore
import mongoose from "mongoose";

function connection() {
  /***_______ LOCAL= mongodb://127.0.0.1:27017/Abir    ________**/
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DataBase Connection successfull.....!");
    })
    .catch((err) => {
      console.log(err);
    });
}

export { connection };
