import express from "express"
import cors from "cors"
import plantsRouter from "./routes/plants.js"
import { initializeDB } from "./database.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", plantsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message });
});

const startServer = async () => {
    await initializeDB();
    app.listen(3021, () => console.log("Server is running on port 3021"));
};

startServer();