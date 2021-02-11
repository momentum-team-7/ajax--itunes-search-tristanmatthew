// i am a child of fire, i am a lion, i have desires

// declare variables

const url = 'https://itunes.apple.com/search?term='
let searchSubmit = document.querySelector('#search-submit')
let searchResults = document.querySelector('#results')
let audioPlayer = document.querySelector('#audio-player-container')
let container = document.querySelector('.container')
let imgContainer = document.querySelector('.img-container')
let playerInfo = document.querySelector('.player-info')

// event listeners- on submisison run the following functions. 
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

// event listener on the search button - if it hits the preview button, then it's go time

searchResults.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('clicked', event)
    console.log(event.target.dataset)
    
    if (event.target.className === 'preview-button') {
    audioPlayer.src = event.target.dataset.songUrl
    audioPlayer.autoplay = 'true'
    audioPlayer.volume = .5;
    displaySong(event.target.dataset)    
    }
    else {
        // do nothing
    }
})

// function to display the dynamic song information in the player area
function displaySong(song) {

    imgContainer.innerHTML = ""
    playerInfo.innerHTML = ""

    let playerImg = document.createElement('img')
        playerImg.className = "player-img-div"
        playerImg.src = song.artworkUrl100
        console.log(song.artworkUrl100)
        console.log('playerImg', playerImg)

    let songTitle = document.createElement('p')
        songTitle.className = "player-song-title"
        songTitle.innerHTML = song.trackName
        console.log(song.trackName)
        console.log('songTitle', songTitle)

    let artistName = document.createElement('p')
        artistName.className = "player-artist-name"
        artistName.innerHTML = song.artistName
        console.log(song.artistName)
        console.log('artistName', artistName)
    
    imgContainer.appendChild(playerImg)
    playerInfo.appendChild(songTitle)
    playerInfo.appendChild(artistName)

}

// function to display the results of the search
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
        previewButton.dataset.artworkUrl100 = song.artworkUrl100
        previewButton.dataset.trackName = song.trackName
        previewButton.dataset.artistName = song.artistName

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

// function for clearing the results on new search
function clearResults() {
    let songs = document.querySelectorAll('.results-div')
    for (let song of songs) {
        song.remove();
    }
}