import RSSParser from "rss-parser"
const parser =new RSSParser();

 async function getData (url) {
    let articles=[]
    const feed = await parser.parseURL(url)
    feed.items.forEach((item)=>{
        articles.push({
            title:item.title,
            pubDate:item.pubDate,
            img:item.img,
            link:item.link
        })
    })
    return articles
   
}
export {getData}
