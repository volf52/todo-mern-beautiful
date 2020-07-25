"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
console.log("Attempting to start");
const app = express_1.default();
const PORT = process.env.PORT || 4000;
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(routes_1.default);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@local-lib-ehrob.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose_1.default.set("useFindAndModify", false);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join("client", "build")));
    app.get("*", (_req, resp) => {
        resp.sendFile(path_1.default.resolve("client", "build", "index.html"));
    });
}
mongoose_1.default
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
