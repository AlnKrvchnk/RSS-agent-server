import cors from "cors"
import express from "express"
import  {getData}  from "./getData.js"
import  links from "./linkList.js"

let app =express()
app.use(cors())
app.get('/links',(req, res)=>{
res.send([links])
})
app.get('/news', (req, res)=>{
    let linkList= req.query.link;
    let filterList=req.query.filter;
res.send("<p>link=" +(linkList.map((i)=>i))+"</p><p>filter=" +(filterList.map((i)=>i))+"</p>");
    // res.send([getData(links.Lenta.url),...getData(links.Vedomosti.url)])
})
// app.get('/'+links.Lenta.id, (req, res)=>{
//     res.send(getData(links.Lenta.url))
// })
// app.get('/'+links.Vedomosti.id, (req, res)=>{
//     res.send(getData(links.Vedomosti.url))
// })
const server = app.listen('4000', ()=>{})
export default server