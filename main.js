// i am a child of fire, i am a lion, i have desires

// declare variables

const url = 'https://itunes.apple.com/search?term='
let searchSubmit = document.querySelector('#search-submit')
let searchResults = document.querySelector('#results')
let audioPlayer = document.querySelector('#audio-player-container')
let container = document.querySelector('.container')
let playerContainer = document.querySelector('.player-container')
let imgContainer = document.querySelector('.img-container')

// event listeners
searchSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    clearResults();
    searchList();
    
    // fetch request to API for iTunes search
    
    function searchList() {
        let searchTerm = document.querySelector('#search-bar').value
        fetch (`${url}+${searchTerm}`)
        .then (res => res.json())
        .then (data => {
            console.log(data)
            for (let song of data.results) {
                renderResults(song)
            }
        })
    }
})



    
searchResults.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('clicked', event)
    console.log(event.target.dataset.songUrl)
    
    if (event.target.className === 'preview-button') {
    audioPlayer.src = event.target.dataset.songUrl
    audioPlayer.autoplay = 'true'
    audioPlayer.volume = .5;
    displaySong()    
    }
    else {
        // do nothing
    }
})

function displaySong() {

    let playerImg = document.createElement('img')
        playerImg.className = "player-div"
        playerImg.src = song.artworkUrl100
        console.log('playerImg', playerImg)

    imgContainer.appendChild(playerImg)
}

function renderResults(song) {
    let resultDiv = document.createElement('div')
        resultDiv.className = "results-div"

    let trackInfoDiv = document.createElement('div')
        trackInfoDiv.className = "track-info"

    let trackImgDiv = document.createElement('div')
        trackImgDiv.className = "track-img"

    let audioDiv= document.createElement('div')
        audioDiv.className = "audio"
        audioDiv.classList.add('hidden')
        
    let audio = document.createElement('audio')
        audio.className = 'track-preview'
        audio.src = song.previewUrl
        audio.controls = true

        audioDiv.appendChild(audio)
        audioPlayer.appendChild(audioDiv)
    
    let collectionImg = document.createElement('img')
        collectionImg.className = "collection-img"
        collectionImg.src = song.artworkUrl100
    
    let artistName = document.createElement('p')
        artistName.className = "artist-name"
        artistName.innerHTML = song.artistName
    
    let songTitle = document.createElement('p')
        songTitle.className = "song-title"
        songTitle.innerHTML = song.trackName

    
    let collectionTitle = document.createElement('p')
        collectionTitle.className = "collection-title"
        collectionTitle.innerHTML = song.collectionName
    
    let releaseDate = document.createElement('p')
        releaseDate.className = "release-date"
        let releaseYear = new Date(song.releaseDate)
        const options = { year: 'numeric'}
        releaseDate.innerHTML = "Year: "+releaseYear.toLocaleDateString('de-De', options);

    let previewButton = document.createElement('button')
        previewButton.className = "preview-button"
        previewButton.innerText ='Play Preview'
        previewButton.dataset.songUrl = song.previewUrl

    trackImgDiv.appendChild(collectionImg)
    trackInfoDiv.appendChild(artistName)
    trackInfoDiv.appendChild(songTitle)
    trackInfoDiv.appendChild(collectionTitle)
    trackInfoDiv.appendChild(releaseDate)
    trackInfoDiv.appendChild(previewButton)

    resultDiv.appendChild(trackImgDiv)
    resultDiv.appendChild(trackInfoDiv)
    searchResults.appendChild(resultDiv)
}

function clearResults() {
    let songs = document.querySelectorAll('.results-div')
    for (let song of songs) {
        song.remove();
    }
}