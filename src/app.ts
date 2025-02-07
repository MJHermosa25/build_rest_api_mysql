import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { userRouter} from "./user/user.route";
import { productRouter } from "./product/product.route";


// Configure dotenv
dotenv.config();

if (!process.env.PORT) {
  console.log('No port value specified...');
}

const PORT = parseInt(process.env.PORT as string, 10);
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Use userRouter and productRouter for the routes
app.use('/users', userRouter);
app.use('/products', productRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

