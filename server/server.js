import express from 'express'
import cors from 'cors'

const  app = express()
app.use(cors())

app.listen(8081, () => {
    console.log("dsds")
})
app.post('/tasks', (req, res) =>{

})