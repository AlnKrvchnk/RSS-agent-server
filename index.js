import cors from 'cors';
import express from 'express';
import { getFilteredNews } from './getData.js';
import links from './linkList.js';

let app = express();
app.use(cors());
app.get('/links', (req, res) => {
    res.send(
        links.map((link) => {
            return { id: link.id, title: link.title };
        })
    );
});

app.get('/news', async (req, res) => {
    const data = await getFilteredNews(req.query);
    res.send(data);
});

const server = app.listen('4000', () => {});
export default server;
