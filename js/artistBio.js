const fetchData = async () => {
    const response = await fetch(endpointUrl);
    return await response.json();
}

const queryParams = new URLSearchParams(window.location.search);
const artistDataName = queryParams.get('artist');

// PRODUCTION ENDPOINT HERE:
const endpointUrl = `https://lfa-project1-backend.onrender.com/artist-bio?artist=${artistDataName}`;
// DEVELOPMENT ENDPOINT HERE:
// const endpointUrl = `http://localhost:3000/artist-bio?artist=${artistDataName}`;

// Wrapped in a asynchronous 'self-executing anonymous function', 
// because it uses the data Fetched from the backend.  
(async () => {

    const data = await fetchData(artistDataName);

    // Fill in the artist text data with the fetched backend data
    document.getElementById('artist-bio-page__artist-name').textContent = data.artist.name;
    document.getElementById('artist-bio-page__artist-birth-death-years').textContent = 'Born '
        + data.artist.birthYear
        + ' | Died ' + data.artist.deathYear;

    const bioTextContainer = document.getElementById('artist-bio-page-bio-text-container');
    bioTextContainer.innerHTML = '';  // Clear the placeholder 'Loading...' text
    const paragraphs = data.artist.bio.split('\n').forEach(
        (string) => {
            const paragraph = document.createElement('p');
            paragraph.innerText = string;
            bioTextContainer.append(paragraph);
        }
    )

    // Set the artist's portrait with the fetched backend data 
    const artistPortrait = document.querySelector('#artist-bio-page__bio-portrait');
    artistPortrait.src = data.artist.portraitImage.src;
    artistPortrait.alt = data.artist.portraitImage.alt;

    const paintings = document.querySelectorAll('#artist-bio-page__paintings-image-container img');

    for (let i = 0; i < 3; i++) {
        // Populate the painting `<img>` elements with the fetched backend data 
        const currentPainting = paintings[i];
        currentPainting.src = data.paintings[i].src;
        currentPainting.alt = data.paintings[i].alt;

        // Populate the painting captions with the fetched backend data
        const caption = currentPainting.nextElementSibling;
        caption.querySelector('[data-caption-section="title"]').innerText = data.paintings[i].title;
        caption.querySelector('[data-caption-section="date"]').innerHTML = data.paintings[i].date;
    }
})();