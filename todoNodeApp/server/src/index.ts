/** External packages */ 
import express = require("express");
//Routes middlewares
import tasksRouter from './routes/tasks'
import usersRouter from './routes/users'

//app setup
const app = express();

//middleware setup
app.use(express.json()); // use express.json to get data from request.body

app.use('/api/tasks',tasksRouter)
app.use('/api/users',usersRouter)

app.listen(5000,() => {
  console.log("Start server on local");
})