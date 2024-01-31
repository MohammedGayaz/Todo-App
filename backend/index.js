const express = require("express")
const cors = require("cors")
const {PORT} = require("./config")
const mainRouter = require("./routes/index")
const app = express()

app.use(cors())
//middle ware for body parsing
app.use(express.json())

// routs 
app.use("/api/v1", mainRouter);

app.listen(PORT,()=>{
    console.log("listening at port, ", PORT)
})
