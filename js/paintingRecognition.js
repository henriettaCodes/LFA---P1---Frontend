// console.log('hello!')

// Number of paintings visible on the page, that the user can choose between 
const numberOfPaintings = 4;

// console.log(window.location.search);
// var currentUrl = window.location.href;

// const artistName = window.location.search

const queryParams = new URLSearchParams(window.location.search);
const correctArtistDataName = queryParams.get('artist');

// console.log(artistName)

// Gets the the data for all the images from the backend.
// Data returned must include one painting for the correct artist,
// and three incorrect paintings from three other artists. 
function fetchData(correctArtistDataName) {

    // Add a Fetch to the backend

    // Mock data 
    const data = {
        correctArtist: {
            artistName: "Pablo Picasso",
            dataName: 'pablo-picasso',
            painting: {
                title: "Girl before a Mirror",
                date: '1932',
                url: 'images/picasso/girl_before_a_mirror.jpg'
            }

        },
        incorrectArtists:
            [
                {
                    artistName: "Leonardo Da Vinci",
                    dataName: 'da-vinci',
                    painting: {
                        title: "The Last Supper",
                        date: '1495–1498',
                        url: 'images/da-vinci/last_supper.jpg'
                    }
                },
                {
                    artistName: "Vincent van Gogh",
                    dataName: 'van-gogh',
                    painting: {
                        title: "Cafe Terrace at Night",
                        date: '1888',
                        url: 'images/van-gogh/cafe_terrace_at_night.jpg'
                    }
                },
                {
                    artistName: "Andy Warhol",
                    dataName: 'andy-warhol',
                    painting: {
                        title: "Campbell's Soup Cans",
                        date: '1962',
                        url: 'images/andy-warhol/campbells-soup.png'
                    }
                },
            ]
    }

    return data;
}

class Painting {
    constructor(artistData, imgElement, imageUrl) {

        // console.log('artistData:', artistData);

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
                if (this.artistDataName === data.correctArtist.dataName) {
                    console.log("Correct artist clicked! :)")
                } else {
                    console.log("Incorrect artist clicked! :(");
                }
            }
        )
    }

    setPageText(artistData) {
        const caption = this.imgElement.nextElementSibling;
        caption.querySelector('[data-caption-section="title"]').innerHTML = artistData.painting.title;
        caption.querySelector('[data-caption-section="artist"]').innerHTML = artistData.artistName;
        caption.querySelector('[data-caption-section="date"]').innerHTML = artistData.painting.date;

        // const title = caption.querySelector('[data-caption-section="title"]');
        // console.log(title); 
    }

    // getImageUrl() {
    //     return "image_url.jpg";
    // }
}

const artistNames = [
    'pablo-picasso',
    'van-gogh',
    'andy-warhol',
    'da-vinci'
];

const paintingElements = document.querySelectorAll('#paintings img');

// console.log(paintingElements);
// for (const paintingElement of paintingElements) {
//     // console.log(paintingElement.src);
// }
// console.log(paintingElements);

const randomNumber = Math.floor(Math.random() * numberOfPaintings);

// console.log("fetchData():", fetchData());

const data = fetchData(correctArtistDataName);

console.log('data.incorrectArtists:', data.incorrectArtists)

let j = 0;

// For each painting on the page 
for (let i = 0; i < numberOfPaintings; i++) {
    // console.log(i);
    // Counter to cycle through the incorrect artists

    // console.log(paintingElements[i]);
    paintingElements[i].setAttribute('src', '#')

    if (i === randomNumber) {
        const paintingObj = new Painting(
            // correctArtistDataName,
            data.correctArtist,
            paintingElements[i],
            data.correctArtist.painting.url,

        )
        // console.log("Correct painting obj:", paintingObj);
    } else {
        const paintingObj = new Painting(
            data.incorrectArtists[j],
            paintingElements[i],
            data.incorrectArtists[j].painting.url,
        )
        // console.log("Incorrect painting obj:", paintingObj);
        // console.log("data.incorrectArtist[j]", data.incorrectArtists[j]);
        // Increment that counter yo
        j++;
        console.log('j:', j);
    }



    // const paintingObj = new Painting()

    // console.log(paintingElements[i]);


}
    // const data = fetchData();
    // console.log(data[i]);

    // Make a painting for the correct artist

    // Make paintings for the incorrect artists (x3)

    // Randomise the array 


