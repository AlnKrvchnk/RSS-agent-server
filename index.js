import cors from "cors"
import express from "express"
import  {getFilteredNews}  from "./getData.js"
import  links from "./linkList.js"



let app =express()
app.use(cors())
app.get('/links',(req, res)=>{
res.send([links])
})

app.get('/news', (req, res)=>{
    res.send(getFilteredNews(req.query))
})

const server = app.listen('4000', ()=>{})
export default server