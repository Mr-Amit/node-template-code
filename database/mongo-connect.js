/* 

import { MongoDB_URL, ENVIRONMENT } from "../configs.js";
import mongoose from "mongoose";

mongoose.set('strictQuery', true);
// mongoose.set('debug', true);
mongoose.set('autoIndex', false);

const connectDB = () => {
  try {
    const connection = mongoose.connect(MongoDB_URL,  {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    // console.log('-------->', connection);

    return connection;

  } catch (err) {
      console.error(err);
  }
}

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');
});
export default connectDB; 

*/