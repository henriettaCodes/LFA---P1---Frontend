/*
    Fire a generic HTTP GET request to the root of the production backend, 
    to 'spin it up' in advance of data requests from subsequent pages 
*/
const prepareBackend = async () => {
    try {
        const response = await fetch(endpointUrl);
        console.log(await response.ok ? "Backend available and ready for requests." : "Backend unavailable")
    } catch (error) {
        console.error("Unable to connect to backend:", error);
    }
}

// PRODUCTION ENDPOINT
const endpointUrl = 'https://lfa-project1-backend.onrender.com/';

prepareBackend();