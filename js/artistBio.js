const mockData = {
    artist: {
        name: "Pablo Picasso",
        birthYear: 1881,
        deathYear: 1973,
        biography: "Pablo Picasso, born on October 25, 1881, in Málaga, Spain, was a highly influential artist known for his versatile and pioneering contributions to art in the 20th century.\nHe co-founded the Cubist movement, was instrumental in the invention of constructed sculpture, and made significant contributions to Symbolism and Surrealism.\nHis prolific output included over 20,000 paintings, prints, drawings, sculptures, ceramics, theater sets, and costumes.\nPicasso's revolutionary artistic accomplishments brought him universal renown and immense fortune throughout his life, making him one of the best-known figures in 20th-century art."
    },
    artworks: [
        {
            title: "Les Demoiselles d'Avignon",
            year: 1907,
            imageUrl: "url_of_the_image"
        },
        {
            title: "Guernica",
            year: 1937,
            imageUrl: "url_of_the_image"
        },
        {
            title: "The Weeping Woman",
            year: 1937,
            imageUrl: "url_of_the_image"
        }
    ]
};

const data = mockData;

document.getElementById('artist-bio-page__artist-name').textContent = data.artist.name;
document.getElementById('artist-bio-page__artist-birth-death-years').textContent = 'Born '
    + data.artist.birthYear
    + ' | Died ' + data.artist.deathYear;

const bioTextContainer = document.getElementById('artist-bio-page-bio-text-container');
bioTextContainer.innerHTML = '';  // Clear the placeholder 'Loading...' text
const paragraphs = mockData.artist.biography.split('\n').forEach(
    (string) => {
        const paragraph = document.createElement('p');
        paragraph.innerText = string;
        bioTextContainer.append(paragraph);
    }
)
