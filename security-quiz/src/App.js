import React, { useState } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';

const initialQuestions = [
  {
    question: "What does HTTPS stand for?",
    answers: [
      { text: "HyperText Transfer Protocol Secure", correct: true },
      { text: "HyperText Transfer Protocol Standard", correct: false },
      { text: "HyperText Transfer Plaintext Secure", correct: false },
      { text: "HyperText Transfer Protocol Simple", correct: false }
    ]
  },
  {
    question: "What is a common method used in phishing attacks?",
    answers: [
      { text: "Email Spoofing", correct: true },
      { text: "Brute Force", correct: false },
      { text: "SQL Injection", correct: false },
      { text: "Cross-Site Scripting", correct: false }
    ]
  },
  {
    question: "What is the primary purpose of a firewall?",
    answers: [
      { text: "To block unauthorized access", correct: true },
      { text: "To encrypt data", correct: false },
      { text: "To manage passwords", correct: false },
      { text: "To scan for malware", correct: false }
    ]
  },
  {
    question: "What does VPN stand for?",
    answers: [
      { text: "Virtual Private Network", correct: true },
      { text: "Virtual Public Network", correct: false },
      { text: "Visible Private Network", correct: false },
      { text: "Virtual Protected Network", correct: false }
    ]
  },
  {
    question: "Which of the following is a strong password?",
    answers: [
      { text: "password123", correct: false },
      { text: "P@ssw0rd!", correct: true },
      { text: "12345678", correct: false },
      { text: "qwerty", correct: false }
    ]
  },
  {
    question: "What does malware do?",
    answers: [
      { text: "Protect your data", correct: false },
      { text: "Access unauthorized data", correct: true },
      { text: "Encrypt your files", correct: false },
      { text: "Create backups", correct: false }
    ]
  },
  {
    question: "What is the function of antivirus software?",
    answers: [
      { text: "To enhance computer speed", correct: false },
      { text: "To protect against malware", correct: true },
      { text: "To manage user passwords", correct: false },
      { text: "To increase internet bandwidth", correct: false }
    ]
  },
  {
    question: "What is social engineering?",
    answers: [
      { text: "An attack on networks", correct: false },
      { text: "Manipulating people into revealing information", correct: true },
      { text: "A type of software attack", correct: false },
      { text: "Hardware malfunction", correct: false }
    ]
  },
  {
    question: "What is phishing?",
    answers: [
      { text: "A method to catch fish", correct: false },
      { text: "Tricking users into giving sensitive information", correct: true },
      { text: "A way to secure data", correct: false },
      { text: "An online shopping scam", correct: false }
    ]
  },
  {
    question: "What does two-factor authentication provide?",
    answers: [
      { text: "Extra protection by requiring two forms of identification", correct: true },
      { text: "A backup password", correct: false },
      { text: "A way to recover lost passwords", correct: false },
      { text: "Single sign-on", correct: false }
    ]
  },
];

// Shuffle function to randomize the order of questions
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function App() {
  const [questions, setQuestions] = useState(shuffleArray([...initialQuestions])); // Shuffle questions initially
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (isCorrect, index) => {
    if (selectedAnswer === null) {
      if (isCorrect) {
        setScore(score + 1);
      }
      setSelectedAnswer(index);
      setShowNextButton(true);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null);
      setShowNextButton(false);
    } else {
      setShowScore(true);
    }
  };

  const handleTryAgain = () => {
    setQuestions(shuffleArray([...initialQuestions])); // Shuffle questions on retry
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowNextButton(false);
    setSelectedAnswer(null);
    setShowScore(false);
  };

  const getScoreFeedback = () => {
    if (score > 7) return "Excellent";
    if (score > 5) return "Good";
    return "Try Again";
  };

  return (
    <div className="container">
      <h1 style={{ color: "white" }}>Security Quiz</h1>
      {showScore ? (
        <>
          <h2>Your Score: {score} / {questions.length}</h2>
          <h3>{getScoreFeedback()}</h3>
          {score < 5 && (
            <button className="btn try-again-btn" onClick={handleTryAgain}>Try Again</button>
          )}
        </>
      ) : (
        <>
          <QuestionCard
            question={questions[currentQuestionIndex]}
            onAnswerClick={handleAnswerClick}
            selectedAnswer={selectedAnswer}
          />
          {showNextButton && (
            <button className="btn next-btn" onClick={handleNextQuestion}>Next</button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
