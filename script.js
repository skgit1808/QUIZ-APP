const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
      answer: "Shakespeare"
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean"
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
      answer: "Leonardo da Vinci"
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Oxygen", "Osmium", "Ozone", "Opium"],
      answer: "Oxygen"
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      answer: "8"
    },
    {
      question: "Who invented the telephone?",
      options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Isaac Newton"],
      answer: "Alexander Graham Bell"
    },
    {
      question: "What is the smallest planet in our solar system?",
      options: ["Mercury", "Venus", "Earth", "Mars"],
      answer: "Mercury"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeRemaining = 30;
  let userAnswers = [];
  
  function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").innerText = question.question;
  
    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";
  
    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.classList.add("answer-button");
      button.onclick = () => checkAnswer(option);
      answersContainer.appendChild(button);
    });
  
    // Enable "Next" button and reset timer
    document.getElementById("next-button").disabled = true;
    document.getElementById("timer").style.color = "#fff";
    startTimer();
    updateProgress();
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeRemaining--;
      document.getElementById("time").innerText = timeRemaining;
      updateProgress();
  
      if (timeRemaining <= 0) {
        clearInterval(timer);
        showNextQuestion();
      }
    }, 1000);
  }
  
  function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer;
  
    // Check if selected answer is correct
    if (selectedAnswer === correctAnswer) {
      score++;
    }
  
    userAnswers.push({
      question: questions[currentQuestionIndex].question,
      selectedAnswer,
      correctAnswer
    });
  
    // Disable all answer buttons
    const buttons = document.querySelectorAll(".answer-button");
    buttons.forEach(button => button.disabled = true);
  
    // Enable the "Next" button
    document.getElementById("next-button").disabled = false;
    clearInterval(timer); // Stop the timer
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    document.getElementById("quiz-content").classList.add("hidden");
    document.getElementById("results-container").classList.remove("hidden");
    document.getElementById("final-score").innerText = `${score} / ${questions.length}`;
  }
  
  function showAnswerSheet() {
    document.getElementById("results-container").classList.add("hidden");
    document.getElementById("answer-sheet-container").classList.remove("hidden");
  
    const answerSheetContainer = document.getElementById("answer-sheet");
    answerSheetContainer.innerHTML = "";  // Clear the container before populating it
  
    userAnswers.forEach((answer, index) => {
      const answerItem = document.createElement("li");
      answerItem.innerHTML = `
        <strong>Q${index + 1}:</strong> ${answer.question}<br>
        <strong>Your answer:</strong> ${answer.selectedAnswer} <br>
        <strong>Correct answer:</strong> ${answer.correctAnswer}
      `;
      answerSheetContainer.appendChild(answerItem);
    });
  }
  
  function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeRemaining = 30;
    userAnswers = [];
    document.getElementById("quiz-content").classList.remove("hidden");
    document.getElementById("results-container").classList.add("hidden");
    loadQuestion();
  }
  
  function backToQuiz() {
    document.getElementById("answer-sheet-container").classList.add("hidden");
    document.getElementById("results-container").classList.remove("hidden");
    loadQuestion();
  }
  
  function updateProgress() {
    const progress = document.getElementById("progress");
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progress.style.width = `${progressPercentage}%`;
  }
  
  loadQuestion();
  