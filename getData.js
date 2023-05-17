import RSSParser from 'rss-parser';
import links from './linkList.js';
const parser = new RSSParser();

const testData = [
    {
        items: [
            {
                title: 'Выручка VK по итогам I квартала увеличилась на 39,5% и составила 27,3 млрд рублей',
                link: 'https://www.vedomosti.ru/business/news/2023/05/15/975155-viruchka-vk-uvelichilas',
                pubDate: 'Mon, 15 May 2023 19:09:48 +0300',
                enclosure: {
                    url: 'https://cdn.vdmsti.ru/image/2023/3r/nbrhz/normal-u8d.jpg',
                    type: 'image/jpeg',
                },
            },
            {
                title: 'Еврокомиссия  сообщила об обсуждении запрета транзит товаров через Россию',
                link: 'https://www.vedomosti.ru/politics/news/2023/05/15/975152-evrokomissiya-obsuzhdenii-zapreta-tranzit-tovarov',
                pubDate: 'Mon, 15 May 2023 18:48:19 +0300',
                enclosure: {
                    url: 'https://cdn.vdmsti.ru/image/2023/3r/nbrhz/normal-u8d.jpg',
                    type: 'image/jpeg',
                },
            },
            {
                title: 'Белгородский губернатор сообщил об обстреле базы отдыха',
                link: 'https://www.vedomosti.ru/society/news/2023/05/15/975151-belgorodskii-obstrele-bazi-otdiha',
                pubDate: 'Mon, 15 May 2023 18:45:11 +0300',
                enclosure: {
                    url: 'https://cdn.vdmsti.ru/image/2023/3r/nbrhz/normal-u8d.jpg',
                    type: 'image/jpeg',
                },
            },
        ],
        image: {
            link: 'https://www.vedomosti.ru',
            url: 'https://cdn.vdmsti.ru/assets/rss_logo.gif',
            title: '"Ведомости". Ежедневная деловая газета',
        },
        title: '"Ведомости". Ежедневная деловая газета',
        description: '"Ведомости". Новости, 16.05.2023',
        link: 'https://www.vedomosti.ru',
    },
];

const getUrl = (id) => {
    return links.find((link) => link.id === id).url;
};

async function getFilteredNews(req) {
    const filterLink = req.link;
    const findBy = req.find;
    let articles = [];
    try {
        const promisList = filterLink
            ? Array.isArray(filterLink)
                ? filterLink.map((id) => parser.parseURL(getUrl(id)))
                : [parser.parseURL(getUrl(filterLink))]
            : links.map((link) => parser.parseURL(getUrl(link)));

        const news = await Promise.all(promisList);

        // const news = testData;
        if (findBy) {
            if (Array.isArray(findBy)) {
                for (let newsItem of news) {
                    for (let item of newsItem.items) {
                        let rating = 0;
                        for (let filter of findBy) {
                            item.title
                                .toLowerCase()
                                .split(' ')
                                .includes(filter.toLowerCase()) && rating++;
                        }
                        if (rating !== 0) {
                            articles.push({
                                rating: rating,
                                description: item.description,
                                title: item.title,
                                pubDate: item.pubDate,
                                img: item.enclosure,
                                link: item.link,
                            });
                        }
                    }
                }
            } else {
                for (let newsItem of news) {
                    for (let item of newsItem.items) {
                        item.title
                            .toLowerCase()
                            .split(' ')
                            .includes(findBy.toLowerCase()) &&
                            articles.push({
                                rating: 1,
                                description: item.description,
                                title: item.title,
                                pubDate: item.pubDate,
                                img: item.enclosure,
                                link: item.link,
                            });
                    }
                }
            }
        } else {
            for (let newsItem of news) {
                for (let item of newsItem.items) {
                    articles.push({
                        rating: 0,
                        description: item.description,
                        title: item.title,
                        pubDate: item.pubDate,
                        img: item.enclosure,
                        link: item.link,
                    });
                }
            }
        }

        return articles;
    } catch (err) {
        return console.log(err);
    }
}

export { getFilteredNews };
