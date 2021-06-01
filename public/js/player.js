function getLirk(judul) {
    fetch('https://rasyidrafi.glitch.me/api/lirik?q=' + judul)
        .then(res => res.json())
        .then(hasil => {
            var lirik = hasil.lyrics
            lirik = lirik.replace(/\n/g, "<br>")
            document.getElementById('isiLirik').innerHTML = lirik;
        })
}

document.getElementById('cariManual').onclick = () => {
    getLirk(document.getElementById("manual").value.toString());
    document.getElementById("manual").value = ''
}