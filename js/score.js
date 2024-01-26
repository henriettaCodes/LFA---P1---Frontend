
const getScore = () => localStorage.getItem('score');

document.querySelector('#score-page__score-display').innerText = getScore();