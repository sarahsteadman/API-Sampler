async function triviaAPI() {

    const data = await apiFetch("https://opentdb.com/api.php?amount=1&category=20&difficulty=easy&type=multiple");
    let questionObj = data.results[0];
    let mixed_answers = questionObj.incorrect_answers;
    mixed_answers.push(questionObj.correct_answer);
    questionObj["mixed_answers"] = shuffleArray(mixed_answers);

    const correct_count = parseInt(localStorage.getItem("correct_count")) || 0;
    const total = parseInt(localStorage.getItem("total")) || 0;

    let htmlString = `
    <p id="score">Correct Answers: ${correct_count}/${total}</p>
    <div id="question1">
        <p>Question 1: ${questionObj.question}</p>
        <div id="multiple-choice">
            <label>
            <input type="radio" name="q1" value="${questionObj.mixed_answers[0]}"> ${questionObj.mixed_answers[0]}
            </label><br>
            <label>
            <input type="radio" name="q1" value="${questionObj.mixed_answers[1]}"> ${questionObj.mixed_answers[1]}
            </label><br>
            <label>
            <input type="radio" name="q1" value="${questionObj.mixed_answers[2]}"> ${questionObj.mixed_answers[2]}
            </label><br>
            <label>
            <input type="radio" name="q1" value="${questionObj.mixed_answers[3]}"> ${questionObj.mixed_answers[3]}
            </label><br>
        </div>
    </div>
    <p id="answer1" class="hidden">Correct answer: ${questionObj.correct_answer}<br> Your answer: <span id="userAnswer"></span></p>
    <button id="submitBtn" class="small-btn">Submit</button>
    <button id="newQuestionBtn" class="small-btn">New Question</button>`;

    display.innerHTML = htmlString;

    document.getElementById("newQuestionBtn").addEventListener('click', triviaAPI);
    document.getElementById("submitBtn").addEventListener('click', () => {
        const answers = document.getElementsByName("q1");
        let chosenAnswer;

        for (a of answers) {
            if (a.checked) {
                let correct;
                answerSubmitted(a.value);
                localStorage.setItem('total', total + 1);
                if (a.value == questionObj.correct_answer) {
                    chosenAnswer = a.value;
                    document.getElementById("score").innerHTML = `${correct_count + 1} / ${total + 1}`;
                    localStorage.setItem('correct_count', correct_count + 1);
                }
                else {
                    document.getElementById("score").innerHTML = `${correct_count} / ${total + 1}`;
                }
                pastString = `
                <div id="question1">
                    <p>Question 1: ${questionObj.question}</p>
                    <p>${questionObj.mixed_answers[0]}</p>
                    <p>${questionObj.mixed_answers[1]}</p>
                    <p>${questionObj.mixed_answers[2]}</p>
                    <p>${questionObj.mixed_answers[3]}</p>
                </div>
                <p id="answer1">Correct answer: ${questionObj.correct_answer}<br> Your answer: ${chosenAnswer}<span id="userAnswer"></span></p>`;
                console.log("addTime");
                addToHistory("trivia", pastString);

                return;
            }
        }
        localStorage.setItem('total', total + 1);
        answerSubmitted();

    });

    renderDisplay("trivia");
}
function answerSubmitted(answer = "No answer selected") {
    document.getElementById("userAnswer").innerText = answer;
    document.getElementById("question1").classList.add("hidden");
    document.getElementById("submitBtn").classList.add("hidden");
    document.getElementById("answer1").classList.remove("hidden");
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}