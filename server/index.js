let express = require("express");
const UserRoutes = require("./Routes/User.routes");
let cookieParser = require("cookie-parser");
const DataRoutes = require("./Routes/Data.routes");
let cors = require("cors");


let app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/user", UserRoutes);
app.use("/api/data", DataRoutes);



app.listen(5000, () => {
    try {
        console.log("Server was Create")
    } catch (error) {
        console.log(error);
    }
})