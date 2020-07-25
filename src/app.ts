import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import todoRoutes from "./routes";

console.log("Attempting to start");
const app = express();

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());
app.use(todoRoutes);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@local-lib-ehrob.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose.set("useFindAndModify", false);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join("client", "build")));
    app.get("*", (_req, resp) => {
        resp.sendFile(path.resolve("client", "build", "index.html"));
    });
}
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
