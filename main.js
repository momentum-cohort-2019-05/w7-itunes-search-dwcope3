const searchInput = document.querySelector('#search-field'); 
const searchButton = document.querySelector('.search-button');
const showResults = document.querySelector('#show-results');
const startURL = "https://itunes-api-proxy.glitch.me/search?term=";
const mediaPlayer = document.querySelector('#media-player');


searchButton.addEventListener('click', function () {
    const searchInput = document.querySelector('#search-field').value; 
    const searchFilter = document.querySelector('#filter').value
    const createURL = startURL + encodeURIComponent(searchInput) + "&entity=song" + searchFilter;
    fetch(createURL)
        .then(function (response) {
            return response.json()
    })
        .then(function (data) {
            console.log(data);
            populateResults(data.results);
    })
})

searchInput.addEventListener("keydown", function(event){
    if(event.key === 'Enter') {
        searchButton.click()
    }
})

function populateResults(results){
    showResults.innerHTML = ""
    for (result of results){
        const indiCard = document.createElement("div")
        indiCard.innerHTML = 
        `<div class="indicard dt fl center bg-transparent br3 pa3 pa2 ba b--black-10">
            <div class="dtc v-mid tc">
                <img src="${result.artworkUrl100}" class="br-100 h3 w3 dib">
                <div class="body-card">
                    <p><strong>Song:</strong><br>${result.trackName}</br></p>
                    <p><strong>Artist:</strong><br>${result.artistName}</br></p>
                    <p><strong>Album:</strong><br>${result.collectionName}</br></p>
                    <button class="playbutton" value=${result.previewUrl}>▶︎</button>
                </div>
            </div>
        </div>`
        showResults.appendChild(indiCard)
    }
    const playButton = document.querySelectorAll(".playbutton");
    for (let button of playButton){
        button.addEventListener('click', function (){
            const trackCard = button.parentElement
            mediaPlayer.src = button.value;
            mediaPlayer.autoplay = true;
        })
    }
}

 



