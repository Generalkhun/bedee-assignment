/** External packages */ 
import express = require("express");
//Routes middlewares
import tasksRouter from './routes/tasks'

//app setup
const app = express();

//middleware setup
app.use(express.json()); // use express.json to get data from request.body


//import userRouter from './routes/users'
app.use('/api/tasks',tasksRouter)
//app.use('/api/users',userRouter)

app.listen(5000,() => {
  console.log("Start server on local");
})