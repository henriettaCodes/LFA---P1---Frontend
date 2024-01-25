// Number of paintings visible on the page, that the user can choose between 
const numberOfPaintings = 4;

const queryParams = new URLSearchParams(window.location.search);
const correctArtistDataName = queryParams.get('artist');  // Example: `website.com/painting-recognition?artist=pablo-picasso`

const endpointUrl = `https://lfa-project1-backend.onrender.com/painting-recognition?artist=${correctArtistDataName}`;

// Holds state: has the player chosen a painting yet?
let chosen = false;

// Gets the the data for all the images from the backend.
// Data returned must include one painting for the correct artist,
// and three incorrect paintings from three other artists. 
const fetchData = async () => {
    const response = await fetch(endpointUrl);
    return await response.json();
}

const displayMessage = ({ success }) => {
    // const body = document.querySelector('body');

    const createMessage = ({ success, text }) => {
        // console.log(text);

        const message = document.createElement('div');
        // message.innerText = 'Correct!';
        message.innerText = text;
        message.className = success ? 'feedback__message feedback__message--success' : 'feedback__message feedback__message--failure';
        document.getElementById('feedback__success-message-container').append(message);
    }

    // console.log(success);

    if (success) createMessage({
        success: true,
        text: "Correct!"
    });
    else createMessage({
        success: false,
        text: "Incorrect!"
    });
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

                const paintingsDiv = document.getElementById('paintings');

                // Player can only choose a painting once! 
                if (!chosen) {
                    if (this.artistDataName === correctArtistDataName) {
                        // console.log("Correct artist clicked! :)");
                        // console.log('chosen:', chosen)
                        displayMessage({ success: true });
                        chosen = true;

                        // Remove interactivity styling for paintings,
                        // as they can no longer be interacted with
                        paintingsDiv.classList.remove('painting-recognition-page__paintings-image-container--not-yet-chosen');
                    } else {
                        // console.log('chosen:', chosen)
                        // console.log("Incorrect artist clicked! :(");
                        displayMessage({ success: false });
                        chosen = true;

                        // Remove interactivity styling for paintings,
                        // as they can no longer be interacted with
                        paintingsDiv.classList.remove('painting-recognition-page__paintings-image-container--not-yet-chosen');
                    }
                }

                // Reveal the captions underneath each painting
                Array.from(document.getElementsByClassName('painting-recognition-page__painting-caption')).forEach(
                    element => {
                        element.style['display'] = 'block';
                    }
                );

                // Show the 'Next' navigation button 
                document.querySelector('.layout__next-button').style['display'] = 'block';
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
            // console.log('j:', j);
        }
    }
})();