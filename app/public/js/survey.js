const submit = document.querySelector('.submit-survey');

const emptyFields = new Error('Please fill out all fields.');
const invalidImg = new Error('Unable to load image. Please enter a valid image URL.')

const userName = document.querySelector('.user-name');
const userPhoto = document.querySelector('.user-img');
const errorBox = document.querySelector('.error');
const questionsBox = document.querySelector('.questions');

function getAbout() {
    const name = userName.value;
    const photo = userPhoto.value;
    if (!name || !photo) throw emptyFields;
    return {
        name: userName.value,
        photo: userPhoto.value
    }
}

function scoresForEach(cb) {
    Array.from(
        questionsBox.children
    ).forEach((question, i) => {
        cb(question.querySelector('select'), i);
    })
};
function getScores() {
    let scores = [];
    scoresForEach((select, i) => {
        scores.push(
            Number(select.value)
        );
        if (!scores[i]) throw emptyFields;
    })
    return scores;
}
function clearScores() {
    scoresForEach((select) => {
        select.options[0].selected = true;
    });
}

function clearInput() {
    userName.value = '';
    userPhoto.value = '';
    clearScores();
}
function clearError() {
    document.querySelector('.highlight-error').classList.remove('highlight-error');
    errorBox.innerHTML = '';
}

const postUser = new XMLHttpRequest();
postUser.open('POST', '/api/employees');
postUser.setRequestHeader('Content-Type', 'application/json');
postUser.onload = () => {
    console.log(JSON.parse(postUser.response));
};
submit.addEventListener('click', (e) => {
    e.preventDefault();
    try {
        const about = getAbout();
        const scores = getScores();
        clearInput();

        postUser.send(JSON.stringify({
            name: about.name,
            photo: about.photo,
            scores: scores
        }));
    } catch (err) {
        errorBox.innerHTML = `<p>*${err.message}<p>`;
        throw err;
    }
});