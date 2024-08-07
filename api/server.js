import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();


// Initial connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});


//Middleware 
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/backend/auth", authRoute)
app.use("/backend/users", usersRoute)
app.use("/backend/hotels", hotelsRoute)
app.use("/backend/rooms", roomsRoute)






app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    // Give more details about the error 
    stack: err.stack
  })
})




app.listen(8000, () => {
  connect();
  console.log("Connected to backend!");
});
