// Number of paintings visible on the page, that the user can choose between 
const numberOfPaintings = 4;

const queryParams = new URLSearchParams(window.location.search);
const correctArtistDataName = queryParams.get('artist');  // Example: `website.com/painting-recognition?artist=pablo-picasso`

const endpointUrl = `https://lfa-project1-backend.onrender.com/painting-recognition?artist=${correctArtistDataName}`;

// Gets the the data for all the images from the backend.
// Data returned must include one painting for the correct artist,
// and three incorrect paintings from three other artists. 
const fetchData = async () => {
    const response = await fetch(endpointUrl);
    return await response.json();
}

const displayMessage = (type) => {
    const body = document.querySelector('body');

    const createMessage = (text) => {
        const message = document.createElement('div');
        // message.innerText = 'Correct!';
        message.innerText = text;
        message.className = 'feedback__success-message';
        body.append(message);
    }

    if (type === 'success') {
        const message = document.createElement('div');
        message.innerText = 'Correct!';
        body.append(message);
        // Call the function lol
    } else if (type === 'incorrect') {

    }
}

class Painting {
    constructor(artistData, imgElement, imageUrl) {
        this.artistDataName = artistData.dataName;
        this.imgElement = imgElement;
        this.imageUrl = imageUrl;
        this.imgElement.setAttribute('src', this.imageUrl);
        this.makeClickHandler(imgElement);
        this.setPageText(artistData);
    }

    makeClickHandler(imgElement) {
        imgElement.addEventListener(
            'click',
            () => {
                if (this.artistDataName === correctArtistDataName) {
                    console.log("Correct artist clicked! :)")
                } else {
                    console.log("Incorrect artist clicked! :(");
                }
            }
        )
    }

    setPageText(artistData) {
        const caption = this.imgElement.nextElementSibling;
        caption.querySelector('[data-caption-section="title"]').innerText = artistData.painting.title;
        caption.querySelector('[data-caption-section="artist"]').innerHTML = artistData.artistName;
        caption.querySelector('[data-caption-section="date"]').innerHTML = artistData.painting.date;
    }
}

// Wrapped in a asynchronous 'self-executing anonymous function', 
// because it uses the data Fetched from the backend.  
(async () => {
    const randomNumber = Math.floor(Math.random() * numberOfPaintings);
    const paintingElements = document.querySelectorAll('#paintings img');
    const data = await fetchData(correctArtistDataName);

    // Initialise a counter for the 'incorrect' paintings
    let j = 0;

    // For each painting on the page 
    for (let i = 0; i < numberOfPaintings; i++) {
        if (i === randomNumber) {
            new Painting(
                data.correctArtist,
                paintingElements[i],
                data.correctArtist.painting.url,
            )
        } else {
            new Painting(
                data.incorrectArtists[j],
                paintingElements[i],
                data.incorrectArtists[j].painting.url,
            )
            // Increment the counter to cycle through the 'incorrect' paintings
            j++;
            console.log('j:', j);
        }
    }
})();