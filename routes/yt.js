const express = require('express');
const ytdl = require('ytdl-core');
const yts = require('yt-search')

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('pages/yt', { title: '' });
});

router.get('/url/:url', async (req, res) => {
    const { url } = req.params;
    if (!url) return res.send("No Url Given")
    const getYt = await ytdl.getInfo(url);
    const filter = ytdl.filterFormats(getYt.formats, 'audioonly');
    const direct = filter[0].url
    const long = getYt.videoDetails.thumbnails.length - 1;
    const thumb = getYt.videoDetails.thumbnails[long].url;
    const title = getYt.videoDetails.title;
    res.render("pages/player", { direct, title, thumb });
})

router.get('/title/:title', async (req, res) => {
    const { title } = req.params;
    if (!title) return res.send("No Title Given")
    const search = await yts(title);
    const url = search.all[0].url;
    const getYt = await ytdl.getInfo(url);
    const filter = ytdl.filterFormats(getYt.formats, 'audioonly');
    const direct = filter[0].url
    const long = getYt.videoDetails.thumbnails.length - 1;
    const thumb = getYt.videoDetails.thumbnails[long].url;
    const theTitle = getYt.videoDetails.title;
    res.render("pages/player", { direct, title: theTitle, thumb });
});

// router.get('/random', async (req, res) => {
//     const playlist = [
//         "PLeCdlPO-XhWFzEVynMsmosfdRsIZXhZi0",
//         "PLhsz9CILh357zA1yMT-K5T9ZTNEU6Fl6n"
//         //"another playlist id"
//     ];
//     const random = Math.floor(Math.random() * Math.floor(playlist.length));
//     const choose = playlist[random];
//     const getList = await ytlist(choose);
//     const getRandom = Math.floor(Math.random() * Math.floor(getList.items.length));
//     const filterUrl = getList.items[getRandom].url.split('&')[0];

//     const getYt = await ytdl.getInfo(filterUrl);
//     const result = getYt.formats;
//     const long = getYt.videoDetails.thumbnails.length - 1;
//     const thumb = getYt.videoDetails.thumbnails[long].url;
//     const title = getYt.videoDetails.title;
//     for (let i = 0; i < result.length; i++) {
//         if (result[i].hasVideo == false) {
//             directUrl = result[i].url;
//         }
//     }
//     res.render("player.html", { direct: directUrl, title: title, thumb: thumb });
// });

// else if (req.query.playlist) {
//     let awal = req.query.playlist
//     let link = awal.split('=')[1]
//     ytlist(link).then(async (oi) => {
//         let listRandom = getRandomInt(oi.items.length)
//         let filterUrl = oi.items[listRandom].url.split('&')[0]

//         const hasil = await ytdl.getInfo(filterUrl);
//         const jsonnya = hasil.formats;
//         let direct = ""
//         let long = hasil.videoDetails.thumbnails.length - 1
//         let thumb = hasil.videoDetails.thumbnails[long].url
//         let title = hasil.videoDetails.title
//         for (let i = 0; i < jsonnya.length; i++) {
//             if (jsonnya[i].hasVideo == false) {
//                 direct = jsonnya[i].url
//             }
//         }
//         res.render('index.html', { direct: direct, title: title, thumb: thumb });
//     })
// }

module.exports = router;
