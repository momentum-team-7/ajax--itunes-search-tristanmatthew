// i am a child of fire, i am a lion, i have desires

// declare variables

const url = 'https://itunes.apple.com/search?term='
let searchSubmit = document.querySelector('#search-submit')
let searchResults = document.querySelector('#results')
let audioPlayer = document.querySelector('#audio-player-container')


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
    // searchList();
})


    
document.addEventListener('click', e=> {
    
        if (e.target.className === ".resultDiv" ) {
            let audioPlayerContainer = e.target.parentElement.querySelector("#audio-player-container")
            let audioPlayer = audioPlayerContainer.querySelector('.track')
    
            if (audioPlayerContainer.classList.contains('hidden')) {
                audioPlayerContainer.classList.remove('hidden')
                audioPlayer.play();
            }
            else {
                audioPlayerContainer.classList.add('hidden')
                audioPlayer.pause()
            }
        }
    })


// a failed experiment for now. 
// function renderAudio(song) {
//     let audioDiv= document.createElement('div')
//         audioDiv.className = "audio"
//         audioDiv.classList.add('hidden')
        
//     let audio = document.createElement('audio')
//         audio.className = 'track-preview'
//         audio.src = song.previewUrl
//         audio.controls = true


//     audioDiv.appendChild(audio)
//     audioPlayer.appendChild(audioDiv)
// }
// renderAudio()


function renderResults(song) {
    let resultDiv = document.createElement('div')
        resultDiv.className = "results"

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
        releaseDate.innerHTML = "Year: "+releaseYear.toLocaleDateString('de-DE', options);

    resultDiv.appendChild(collectionImg)
    resultDiv.appendChild(artistName)
    resultDiv.appendChild(songTitle)
    resultDiv.appendChild(collectionTitle)
    resultDiv.appendChild(releaseDate)

    searchResults.appendChild(resultDiv)
}

function clearResults() {
    let songs = document.querySelectorAll('.results')
    for (let song of songs) {
        song.remove();
    }
}
// searchList()