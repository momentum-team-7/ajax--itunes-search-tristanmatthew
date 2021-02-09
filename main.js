// i am a child of fire, i am a lion, i have desires

// declare variables

const url = 'https://itunes.apple.com/search?term='
const searchSubmit = document.querySelector('#search-submit')
const searchResults = document.querySelector('#results')
// let searchList 


// event listeners
searchSubmit.addEventListener('submit', (event) => {
    event.preventDefault()
    let searchTerm = document.querySelector('#search-bar').value
    console.log('search bar working', searchTerm)

    // fetch request to API for iTunes search

    function searchList() {
        fetch (`${url}+${searchTerm}`)
            .then (res => res.json())
            .then (data => {
                console.log(data)
               for (let song of data.results) {
                    renderResults(song)
               }
            })
    }
    searchList()
})
function renderResults(song) {
    let resultDiv = document.createElement('div')
        resultDiv.className = "results"
    
    let collectionImg = document.createElement('img')
        collectionImg.className = "collection-img"
        collectionImg.src= song.artworkUrl100
    
    let artistName = document.createElement('p')
        artistName.className = "artist-name"
        artistName.innerHTML = song.artistName
    
    let songTitle = document.createElement('p')
        songTitle.className = "song-title"
        songTitle.innerHTML = song.trackName

    
    let collectionTitle = document.createElement('p')
        collectionTitle.className = "collection-title"
        collectionTitle.innerHTML = song.collectionName

    // resultDiv.appendChild(collectionImg, artistName, songTitle, collectionTitle)
    
    resultDiv.appendChild(collectionImg)
    resultDiv.appendChild(artistName)
    resultDiv.appendChild(songTitle)
    resultDiv.appendChild(collectionTitle)

    searchResults.appendChild(resultDiv)
}

// searchList()