const questions = [
   {
      question: "What 2+2?",
      answers: [
         {
            text: "3",
            correct: false,
         },
         {
            text: "4",
            correct: true,
         },
         {
            text: "5",
            correct: false,
         },
         {
            text: "6",
            correct: false,
         },
      ],
   },
   {
      question: "What 5+5?",
      answers: [
         {
            text: "3",
            correct: false,
         },
         {
            text: "4",
            correct: false,
         },
         {
            text: "10",
            correct: true,
         },
         {
            text: "6",
            correct: false,
         },
      ],
   },
];

// ambil elemen html
const questionElement = document.querySelector(".questionElement");
const answerBtns = document.querySelector(".answer-buttons");
const nextBtn = document.querySelector(".next-btn");

let score = 0;
let currentQuestionIndex = 0;

// tampilkan pertanyaan
function showQuestion() {
   resetState();
   let currentQuestion = questions[currentQuestionIndex];
   questionElement.innerHTML = `${currentQuestion.question}`;

   currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerBtns.appendChild(button);

      if (answer.correct) {
         button.dataset.correct = answer.correct;
      }

      button.addEventListener("click", selectAnswer);
   });
}

function selectAnswer(e) {
   const selectedBtn = e.target;
   const isCorrect = selectedBtn.dataset.correct === "true";

   if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
   } else {
      selectedBtn.classList.add("incorrect");
   }

   Array.from(answerBtns.children).forEach((button) => {
      if (button.dataset.correct === "true") {
         button.classList.add("correct");
      }

      button.disabled = true;
   });

   nextBtn.style.display = "block";
}

// reset keadaan
function resetState() {
   while (answerBtns.firstChild) {
      answerBtns.removeChild(answerBtns.firstChild);
   }
}

// fungsi menampilkan score
function showScore() {
   resetState();
   questionElement.innerHTML = `ur score ${score} out of ${questions.length}`;
   nextBtn.innerHTML = "play again";
}

// fungsi tombol next ditekan
function handleNextButton() {
   currentQuestionIndex++;
   if (currentQuestionIndex < questions.length) {
      showQuestion();
   } else {
      showScore();
   }
}

nextBtn.addEventListener("click", () => {
   if (currentQuestionIndex < questions.length) {
      handleNextButton();
   } else {
      main();
   }
});

// main function
function main() {
   score = 0;
   currentQuestionIndex = 0;
   nextBtn.innerHTML = "Next";
   showQuestion();
}
main();
