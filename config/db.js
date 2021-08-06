const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToDB = async () => {
  // console.log("string here: ", "");
  let connect = await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });

  console.log(
    `mongodb connected: ${connect.connection.host}`.cyan.underline.bold
  );
};

connectToDB();
