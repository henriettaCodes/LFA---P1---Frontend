/* 
    Represents a single, clickable painting on the page 
*/
class Painting {
    constructor(artistData, imgElement, imageUrl) {
        this.artistDataName = artistData.dataName;
        this.imgElement = imgElement;
        this.imageUrl = imageUrl;
        this.imgElement.setAttribute('src', this.imageUrl);
        this.setPageText(artistData);

        this.clickHandler = this.makeClickHandler();
        this.imgElement.addEventListener('click', this.clickHandler);
    }

    makeClickHandler() {
        return () => {
            // Player can only choose a painting once per round! 
            if (!chosen) {
                // Check game condition 
                if (this.artistDataName === correctArtistDataName) {
                    incrementScore();
                    displayMessage({ success: true });
                } else {
                    displayMessage({ success: false });
                }
            }
            chosen = true;  // Update the global state variable

            // Remove interactivity styling for paintings,
            // as they cannot be interacted with until the next round starts 
            paintingsDiv.classList.remove('painting-recognition-page__paintings-image-container--not-yet-chosen');

            // Show the captions for each paining, before the next round starts
            showCaptions();

            // Show the 'Next' navigation button 
            document.querySelector('.layout__next-button').style['display'] = 'flex';
        }
    }

    // Important to prevent bugs 
    removeClickHandler() {
        this.imgElement.removeEventListener('click', this.clickHandler);
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
const fetchData = async (round) => {

    // DEVELOPMENT BACKEND ENDPOINT:
    const endpointUrl = `http://localhost:3000/painting-recognition?artist=${correctArtistDataName}&round=${round}`;
    // PRODUCTION BACKEND ENDPOINT:
    // const endpointUrl = `https://lfa-project1-backend.onrender.com/painting-recognition?artist=${correctArtistDataName}`;

    const response = await fetch(endpointUrl);
    return await response.json();
}

const incrementScore = () => {

}

// Reveal the captions underneath each painting
const showCaptions = () => {
    captions.forEach(
        element => {
            element.style['display'] = 'flex';
        }
    );
}

// Hide the captions underneath each painting 
const hideCaptions = () => {
    captions.forEach(
        element => {
            element.style['display'] = 'none';
        }
    );
}

const displayMessage = ({ success }) => {

    // Internal helper function 
    const createMessage = ({ success, text }) => {
        const message = document.createElement('div');
        message.innerText = text;
        message.id = 'feedback_message';
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

const game = async () => {
    // Reset global state variable to allow the player to choose again
    chosen = false;

    const randomNumber = Math.floor(Math.random() * numberOfPaintings);
    const data = await fetchData(round);

    pageHeading.innerHTML = `Which painting is by <span class="painting-recognition-page__heading-artist-name">${data.correctArtist.artistName}</span>?`;
    roundNumberDisplay.innerText = `Round #${round}`;

    // Initialise a counter for the 'incorrect' paintings
    let j = 0;

    // For each painting on the page 
    for (let i = 0; i < numberOfPaintings; i++) {
        if (i === randomNumber) {
            paintingObjects.push(new Painting(
                data.correctArtist,
                paintingElements[i],
                data.correctArtist.painting.url,
            ));
        } else {
            paintingObjects.push(new Painting(
                data.incorrectArtists[j],
                paintingElements[i],
                data.incorrectArtists[j].painting.url,
            ));
            // Increment the counter to cycle through the 'incorrect' paintings
            j++;
        }
    }
}

// The 'Next' button starts the next round, 
// or takes the player to the Score page when all rounds have been played 
document.querySelector('#layout__next-button').addEventListener(
    'click',
    () => {
        if (round >= 1 && round < numberOfRounds) {
            // Next round! 
            round++;

            // Destroy the "Correct!"/"Incorrect" feedback message 
            document.querySelector('#feedback_message').remove();

            // Add the interactivity styling to the painting frames again 
            paintingsDiv.classList.add('painting-recognition-page__paintings-image-container--not-yet-chosen');

            // Hide the captions underneath each painting 
            hideCaptions();

            // Important to prevent bugs in game logic
            paintingObjects.forEach(painting => painting.removeClickHandler());

            // Empty the array of `Painting` objects for garabage collection
            paintingObjects.length = 0;

            // Start a new game
            game();
        } else {
            // The game is finished! 
            // Take the player to the Score page
            window.location.href = 'score.html';
        }
    }
)


/* 
    Get the artist 'data name' from the URL query string 
    Example: 
        URL: `website.com/painting-recognition?artist=pablo-picasso`
        Artist data name: pablo-picasso
*/
const queryParams = new URLSearchParams(window.location.search);
const correctArtistDataName = queryParams.get('artist');

const numberOfRounds = 3;

// Number of paintings visible on the page, that the user can choose between 
const numberOfPaintings = 4;

// Initialise an empty array, 
//so the `Painting` objects and their click event handlers can be destroyed after each round 
const paintingObjects = [];

const pageHeading = document.querySelector('#painting-recognition-page__heading');
const roundNumberDisplay = document.querySelector('#painting-recognition-page__round-number');
const paintingsDiv = document.getElementById('paintings');
const paintingElements = document.querySelectorAll('#paintings img');
const captions = Array.from(document.getElementsByClassName('painting-recognition-page__painting-caption'));

let chosen = false;  // Holds state: has the player chosen a painting yet?
let round = 1;

// Start the first game!
game();