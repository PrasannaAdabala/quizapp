import React, { useState, useEffect } from 'react';
import './App.css'; // For styling

function App() {
  const [phase, setPhase] = useState('welcome'); // 'welcome', 'quiz', 'results'
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60); // Timer duration in seconds
  const [intervalId, setIntervalId] = useState(null);

  const questions = [
    { text: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
    { text: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'], answer: 'Paris' },
    { text: 'What is the boiling point of water?', options: ['90°C', '100°C', '110°C'], answer: '100°C' },
    { text: 'Who wrote "To Kill a Mockingbird"?', options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway'], answer: 'Harper Lee' },
    { text: 'What is the largest planet in our solar system?', options: ['Earth', 'Jupiter', 'Saturn'], answer: 'Jupiter' },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    let id;
    if (phase === 'quiz' && timer > 0) {
      id = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(id);
  }, [phase, timer]);

  const handleStartQuiz = () => {
    setPhase('quiz');
    setTimer(60); // Reset timer to 60 seconds
  };

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    const finalScore = answers.filter((ans, index) => ans === questions[index].answer).length;
    setScore(finalScore);
    setPhase('results');
  };

  const handleRestart = () => {
    setPhase('welcome');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setTimer(60);
  };

  return (
    <div className="App">
      {phase === 'welcome' && (
        <div className="welcome-container">
          <h1>Welcome to the Quiz App!</h1>
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      )}

      {phase === 'quiz' && (
        <div className="quiz-container">
          <h2>{questions[currentQuestionIndex].text}</h2>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className="timer">
            <h3>Time Remaining: {timer} seconds</h3>
          </div>
        </div>
      )}

      {phase === 'results' && (
        <div className="results-container">
          <h1>Your Score: {score} / {questions.length}</h1>
          <button onClick={handleRestart}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
