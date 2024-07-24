import React from 'react';

const questions = [
  {
    type: "text",
    question: "1. Who is known as the father of Artificial Intelligence?",
  },
  {
    type: "radio",
    question: "2. Which of the following is a commonly used programming language for AI?",
    options: ["Python", "Java", "C++", "Ruby"],
  },
  {
    type: "checkbox",
    question: "3. Which of the following are types of machine learning? (Select all that apply)",
    options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Semi-supervised Learning"],
  },
  {
    type: "dropdown",
    question: "4. What is the full form of NLP?",
    options: ["Natural Logic Processing", "Neural Language Processing","Natural Language Processing", "Natural Learning Process"],
  },
  {
    type: "text",
    question: "5. What is the purpose of a Turing Test?",
  },
  {
    type: "radio",
    question: "6. Which algorithm is used for clustering in Machine Learning?",
    options: ["K-Means", "Decision Tree", "SVM", "Linear Regression"],
  },
  {
    type: "checkbox",
    question: "7. Which of the following are deep learning frameworks? (Select all that apply)",
    options: ["TensorFlow", "PyTorch", "SciKit-Learn", "Keras"],
  },
  {
    type: "dropdown",
    question: "8. What does SVM stand for?",
    options: ["Sequential Vector Machine", "Support Vector Machine", "Supervised Vector Machine", "Statistical Vector Machine"],
  },
  {
    type: "text",
    question: "9. Which dataset is commonly used for training image processing algorithms?",
  },
  {
    type: "radio",
    question: "10. Which neural network is primarily used for sequential data processing?",
    options: ["CNN", "DNN", "RNN", "ANN"],
  },
  {
    type: "checkbox",
    question: "11. Which of the following are activation functions used in neural networks? (Select all that apply)",
    options: ["ReLU", "Sigmoid", "Tanh", "Softmax"],
  },
  {
    type: "dropdown",
    question: "12. Which programming language is widely used for web development?",
    options: ["Python", "JavaScript", "C#", "PHP"],
  },
  {
    type: "text",
    question: "13. What does API stand for?",
  },
  {
    type: "radio",
    question: "14. Which data structure follows the Last In First Out (LIFO) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
  },
  {
    type: "checkbox",
    question: "15. Which of the following are NoSQL databases? (Select all that apply)",
    options: ["MySQL", "MongoDB", "PostgreSQL", "CouchDB"],
  },
  {
    type: "dropdown",
    question: "16. What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Common Style Sheets"],
  },
  {
    type: "text",
    question: "17. What is the main purpose of HTML?",
  },
  {
    type: "radio",
    question: "18. Which protocol is used for secure communication over a computer network?",
    options: ["HTTP", "FTP", "SSH", "HTTPS"],
  },
  {
    type: "checkbox",
    question: "19. Which of the following are common cyber security threats? (Select all that apply)",
    options: ["Phishing", "SQL Injection", "DDoS", "Malware"],
  },
  {
    type: "text",
    question: "20. What does GPU stand for?",
  },
];

const Questions = ({ currentPage, userAnswers, onAnswerChange }) => {
  const questionsPerPage = 5;
  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div>
      {currentQuestions.map((q, index) => {
        const questionIndex = startIndex + index;
        const userAnswer = userAnswers[questionIndex];

        return (
          <div key={questionIndex} className="question-container">
            <label>{q.question}</label>
            {q.type === "text" && (
              <input
                type="text"
                value={userAnswer || ""}
                onChange={(e) => onAnswerChange(questionIndex, e.target.value)}
              />
            )}
            {q.type === "radio" && (
              q.options.map((option, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option}
                    checked={userAnswer === option}
                    onChange={(e) => onAnswerChange(questionIndex, e.target.value)}
                  />
                  {option}
                </div>
              ))
            )}
            {q.type === "checkbox" && (
              q.options.map((option, i) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    name={`question-${questionIndex}`}
                    value={option}
                    checked={userAnswer ? userAnswer.includes(option) : false}
                    onChange={(e) => {
                      const newAnswer = userAnswer ? [...userAnswer] : [];
                      if (e.target.checked) {
                        newAnswer.push(option);
                      } else {
                        const index = newAnswer.indexOf(option);
                        newAnswer.splice(index, 1);
                      }
                      onAnswerChange(questionIndex, newAnswer);
                    }}
                  />
                  {option}
                </div>
              ))
            )}
            {q.type === "dropdown" && (
              <select
                value={userAnswer || ""}
                onChange={(e) => onAnswerChange(questionIndex, e.target.value)}
              >
                <option value="">Select an option</option>
                {q.options.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Questions;
