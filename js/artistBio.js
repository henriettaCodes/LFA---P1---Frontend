const mockData = {
    artist: {
        name: "Pablo Picasso",
        birthYear: 1881,
        deathYear: 1973,
        bio: "Pablo Picasso, born on October 25, 1881, in Málaga, Spain, was a highly influential artist known for his versatile and pioneering contributions to art in the 20th century.\nHe co-founded the Cubist movement, was instrumental in the invention of constructed sculpture, and made significant contributions to Symbolism and Surrealism.\nHis prolific output included over 20,000 paintings, prints, drawings, sculptures, ceramics, theater sets, and costumes.\nPicasso's revolutionary artistic accomplishments brought him universal renown and immense fortune throughout his life, making him one of the best-known figures in 20th-century art.",
        portraitImage: {
            src: "/images/picasso/picasso_portrait.webp",
            alt: "Photograph of Pablo Picasso"
        }
    },
    paintings: [
        {
            title: "Les Demoiselles d'Avignon",
            date: 1907,
            src: "images/picasso/demoiselles.jpg",
            alt: "Les Demoiselles d'Avignon (1907) by Pablo Picasso",
        },
        {
            title: "Guernica",
            date: 1937,
            src: "images/picasso/guernica.webp",
            alt: "Guernica (1937) by Pablo Picasso"
        },
        {
            title: "The Weeping Woman",
            date: 1937,
            src: "images/picasso/weeping_woman.jpg",
            alt: "The Weeping Woman (1937) by Pablo Picasso"
        }
    ]
};

const data = mockData;

// Fill in the artist text data with the fetched backend data
document.getElementById('artist-bio-page__artist-name').textContent = data.artist.name;
document.getElementById('artist-bio-page__artist-birth-death-years').textContent = 'Born '
    + data.artist.birthYear
    + ' | Died ' + data.artist.deathYear;

const bioTextContainer = document.getElementById('artist-bio-page-bio-text-container');
bioTextContainer.innerHTML = '';  // Clear the placeholder 'Loading...' text
const paragraphs = mockData.artist.bio.split('\n').forEach(
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