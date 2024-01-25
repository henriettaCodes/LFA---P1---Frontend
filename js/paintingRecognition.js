/* 
    Represents a single, clickable painting on the page 
*/
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
                const paintingsDiv = document.getElementById('paintings');

                // Player can only choose a painting once! 
                if (!chosen) {
                    if (this.artistDataName === correctArtistDataName) displayMessage({ success: true });
                    else displayMessage({ success: false });
                }
                chosen = true;  // Update the global state variable

                // Remove interactivity styling for paintings,
                // as they can no longer be interacted with
                paintingsDiv.classList.remove('painting-recognition-page__paintings-image-container--not-yet-chosen');

                // Reveal the captions underneath each painting
                Array.from(document.getElementsByClassName('painting-recognition-page__painting-caption')).forEach(
                    element => {
                        element.style['display'] = 'flex';
                    }
                );

                // Show the 'Next' navigation button 
                document.querySelector('.layout__next-button').style['display'] = 'flex';
            }
        )
    }

    // Populate the captions underneath each image with using Fetched data
    setPageText(artistData) {
        const caption = this.imgElement.nextElementSibling;
        caption.querySelector('[data-caption-section="title"]').innerText = artistData.painting.title;
        caption.querySelector('[data-caption-section="artist"]').innerHTML = artistData.artistName;
        caption.querySelector('[data-caption-section="date"]').innerHTML = artistData.painting.date;
    }
}


/*
    Gets the the data for all the images from the backend.
    Data returned must include one painting for the correct artist,
    and three incorrect paintings from three other artists. 
*/
const fetchData = async () => {
    const response = await fetch(endpointUrl);
    return await response.json();
}

const displayMessage = ({ success }) => {

    // Helper function 
    const createMessage = ({ success, text }) => {
        const message = document.createElement('div');
        message.innerText = text;
        message.className = success ? 'feedback__message feedback__message--success' : 'feedback__message feedback__message--failure';
        document.getElementById('feedback__success-message-container').append(message);
    }

    if (success) createMessage({
        success: true,
        text: "Correct!"
    });
    else createMessage({
        success: false,
        text: "Incorrect!"
    });
}


/* 
    Get the artist 'data name' from the URL query string 
    Example: 
        URL: `website.com/painting-recognition?artist=pablo-picasso`
        Artist data name: pablo-picasso
*/
const queryParams = new URLSearchParams(window.location.search);
const correctArtistDataName = queryParams.get('artist');

const endpointUrl = `https://lfa-project1-backend.onrender.com/painting-recognition?artist=${correctArtistDataName}`;

// Number of paintings visible on the page, that the user can choose between 
const numberOfPaintings = 4;

// Holds state: has the player chosen a painting yet?
let chosen = false;


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
        }
    }
})();