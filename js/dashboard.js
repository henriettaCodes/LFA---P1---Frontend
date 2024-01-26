const fetchData = async () => {
    const response = await fetch(endpointUrl);
    return await response.json();
}

// PRODUCTION ENDPOINT HERE:
const endpointUrl = 'https://lfa-project1-backend.onrender.com/';