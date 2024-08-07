import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, onAnswerClick, selectedAnswer }) => {
  return (
    <div className="question-card">
      <div className="question">
        {question.question}
      </div>
      <div className="answers">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className={`btn answer-btn ${
              selectedAnswer !== null
                ? answer.correct
                  ? 'correct'
                  : selectedAnswer === index
                  ? 'wrong'
                  : ''
                : ''
            }`}
            onClick={() => onAnswerClick(answer.correct, index)}
            disabled={selectedAnswer !== null}
          >
            {selectedAnswer !== null && answer.correct && '✔ '}
            {selectedAnswer !== null && selectedAnswer === index && !answer.correct && '✘ '}
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
