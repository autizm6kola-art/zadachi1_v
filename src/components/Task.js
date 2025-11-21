import React, { useState, useEffect } from "react";
import '../styles/taskItem.css';

function Task({ task, onCorrect, alreadyCorrect }) {
  const [finalAnswer, setFinalAnswer] = useState('');
  const [finalCorrect, setFinalCorrect] = useState(null);
  const [hintsState, setHintsState] = useState([]);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    if (alreadyCorrect) {
      setFinalCorrect(true);
    }
    if (task.hints) {
      setHintsState(task.hints.map(() => ({ answer: '', isCorrect: null })));
    }
  }, [alreadyCorrect, task]);

  const checkFinalAnswer = () => {
  if (finalAnswer.trim().toLowerCase() === task.correctAnswer.toLowerCase()) {
    setFinalCorrect(true);
    onCorrect(task.id);
    setHintsState(hintsState.map(h => ({ ...h, isCorrect: true })));
    setShowHints(false); // Скрываем все подсказки
  } else {
    setFinalCorrect(false);
  }
};


  const checkHint = (index) => {
    const hint = task.hints[index];
    const userAnswer = hintsState[index].answer.trim().toLowerCase();
    const correctAnswer = hint.correctAnswer.toLowerCase();

    const updatedHints = [...hintsState];
    if (userAnswer === correctAnswer) {
      updatedHints[index].isCorrect = true;
    } else {
      updatedHints[index].isCorrect = false;
    }
    setHintsState(updatedHints);
  };

  const handleHintChange = (index, value) => {
    const updatedHints = [...hintsState];
    updatedHints[index].answer = value;
    updatedHints[index].isCorrect = null;
    setHintsState(updatedHints);
  };

  return (
    <div className="task-item" style={{ marginBottom: '20px' }}>
      <p><strong>Задача {task.id}</strong></p>
      <p>{task.text}</p>

      {/* Финальный ответ */}
      <input
        type="text"
        value={finalAnswer}
        onChange={e => { setFinalAnswer(e.target.value); setFinalCorrect(null); }}
        placeholder="Введите финальный ответ"
        disabled={finalCorrect === true}
        className={
          finalCorrect === null ? '' : finalCorrect ? 'correct' : 'incorrect'
        }
      />
      <button
        onClick={checkFinalAnswer}
        disabled={finalCorrect === true}
        className="check-button"
      >
        Проверить
      </button>

      {/* Кнопка показа подсказок */}
      {task.hints && task.hints.length > 0 && !showHints && (
        <button
          onClick={() => setShowHints(true)}
          className="help-button"
          title="Показать подсказки"
          style={{ marginTop: '10px' }}
        >
          ?
        </button>
      )}

      {/* Подсказки */}
      {showHints && task.hints && task.hints.map((hint, index) => (
        <div key={index} style={{ marginTop: '10px' }}>
          <p className="hint-text">{hint.question}</p>
          <input
            type="text"
            value={hintsState[index]?.answer || ''}
            onChange={e => handleHintChange(index, e.target.value)}
            disabled={finalCorrect === true || hintsState[index]?.isCorrect === true}
            className={
              hintsState[index]?.isCorrect === null
                ? ''
                : hintsState[index]?.isCorrect
                  ? 'correct'
                  : 'incorrect'
            }
          />
          <button
            onClick={() => checkHint(index)}
            disabled={finalCorrect === true || hintsState[index]?.isCorrect === true}
            className="check-hint-button"
          >
            ✓
          </button>
        </div>
      ))}
    </div>
  );
}

export default Task;
