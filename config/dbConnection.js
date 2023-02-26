const mongoose = require("mongoose");

// Setting up Mongoose with MongoDB
const mongodbURI = process.env.mongodbURI;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const connect = await mongoose.connect(mongodbURI, {
      useNewUrlParser: true,
    });

    console.log("MongoDB connected!!");
    console.log("Host: ", connect.connection.host);
    console.log("Name: ", connect.connection.name);
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;

// module.exports = () => {
//   mongoose.connect(
//     mongodbURI,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     },
//     (err, res) => {
//       if (err)
//         console.error(`Error Occured while connecting to MongoDB! \n${err}`);
//       else console.log(`MongoDB Connected...`);
//     }
//   );
// };
// const connect = await mongoose.connect(process.env.CONNECTION_STRING);
// console.log(
// "Database connected: ", connect.connection.host, connect.connection.name
// );
