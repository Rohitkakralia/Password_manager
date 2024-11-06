import app from "./app";  // Use default import for app
import { connectDb } from "./db";  // Named import is fine for connectDb

connectDb()
    .then(() => {
        app.listen(5000, () => console.log("Server started at port 5000"));
    })
    .catch((err) => {
        console.log("Failed to connect to the database:", err);
    });
