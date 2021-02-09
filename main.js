// i am a child of fire, i am a lion, i have desires

// declare variables

const url = 'https://itunes.apple.com/search?term='
const searchSubmit = document.querySelector('#search-submit')
const searchResults = document.querySelector('#results')


// event listeners
searchSubmit.addEventListener('submit', (event) => {
    event.preventDefault()
    let searchTerm = document.querySelector('#search-bar').value
    console.log('search bar working', searchTerm)

    function search() {
        fetch (`${url}+${searchTerm}`)
            .then (res => res.json())
            .then (data => {
                console.log(data)
                let artist = data.artist
                console.log (artist)
            })
    }
    search()
})

// fetch request to API for iTunes search

