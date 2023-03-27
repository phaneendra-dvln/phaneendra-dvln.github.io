let responseObj = {};
const path = './JSON/content.json';
const doc = document;
let questionsArray = [];
let filterQuestions = [];
let counter = 0;
const xmlRequestObject = new XMLHttpRequest();
let points = 0;

xmlRequestObject.overrideMimeType('appilication/json');

xmlRequestObject.open('GET', path);

xmlRequestObject.onreadystatechange = function () {
    if (xmlRequestObject.readyState === 4) {
        responseObj = JSON.parse(xmlRequestObject.responseText);
        console.log(responseObj);
        questionsArray = responseObj.questions;
        filterQuestions = questionsArray.length ? questionsArray.filter(question => question.type === 'fill-in') : [];
        console.log(filterQuestions);
        doc.getElementsByTagName('button')[0].innerHTML = responseObj.buttonText;
        for (let i = 0; i < filterQuestions.length; i++) {
            doc.querySelector('.question-text').innerHTML = filterQuestions[counter].questionText;
        }
    }
}

xmlRequestObject.send(null);

window.addEventListener('load', function () {

    const textArea = document.querySelector('.fill-in');

    let btns = doc.getElementsByClassName('navigation');
    btns[0].addEventListener('click', function () {
        if (counter !== 0) {
            counter--;
            console.log(counter);
            doc.querySelector('.question-text').innerHTML = filterQuestions[counter].questionText;
        }
    });
    btns[1].addEventListener('click', function () {
        if (counter < filterQuestions.length - 1) {
            counter++;
            console.log(counter);
            doc.querySelector('.question-text').innerHTML = filterQuestions[counter].questionText;
            textArea.value = '';
            doc.querySelector('.no-answer').innerHTML = '';
            doc.querySelector('.correct').innerHTML = '';
            doc.querySelector('.incorrect').innerHTML = '';
            doc.querySelector('.no-answer').style.opacity = 0;
            doc.querySelector('.correct').style.opacity = 0;
            doc.querySelector('.incorrect').style.opacity = 0;
        }
    });

    doc.getElementsByTagName('button')[0].addEventListener('click', function() {
        console.log(filterQuestions);
        if (textArea.value) {
            if (textArea.value === filterQuestions[counter].correctResp.toLowerCase()) {
                doc.querySelector('.correct').style.opacity = 1;
                doc.querySelector('.incorrect').style.opacity = 0;
                doc.querySelector('.correct').innerHTML = filterQuestions[counter].feedback.correctAnswer;
                points += filterQuestions[0].weight;
                console.log('points: ' + points);              
            } else {
                doc.querySelector('.incorrect').style.opacity = 1;
                doc.querySelector('.incorrect').innerHTML = filterQuestions[counter].feedback.wrongAnswer;                
            }
            doc.querySelector('.no-answer').style.opacity = 0;
        } else {
            doc.querySelector('.no-answer').style.opacity = 1;
            doc.querySelector('.no-answer').innerHTML = filterQuestions[counter].feedback.noAnswer;
        }
    });
});




var str = 'JS';

if ('10' == 10) {
    var str = '10';
}

console.log(str); // 10

var str = 'JS';

if ('10' !== 10) {
    var str = '10';
}

console.log(str); // 10

console.log(isNaN('10')); // false
console.log(isNaN('hello')); // true