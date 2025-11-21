const fs = require('fs');
const path = require('path');

// Пути к файлам
const inputFile = path.join(__dirname, 'input.txt');
const outputFile = path.join(__dirname, 'output.json');

// Читаем txt
const data = fs.readFileSync(inputFile, 'utf-8');

// Каждая строка = одна задача
const lines = data.split('\n').filter(Boolean);

const tasks = lines.map((line, index) => {
  const parts = line.split('|').map(p => p.trim());

  const text = parts[1] || '';
  const correctAnswer = parts[2] || '';
  
  // Подсказки
  const hints = [];
  if (parts.length > 3) {
    for (let i = 3; i < parts.length; i++) {
      const hintParts = parts[i].split(':').map(h => h.trim());
      if (hintParts.length === 2) {
        hints.push({
          question: hintParts[0],
          correctAnswer: hintParts[1],
        });
      }
    }
  }

  return {
    id: index + 1,       // новые ID начиная с 1
    text,
    correctAnswer,
    hints
  };
});

// Сохраняем в JSON
fs.writeFileSync(outputFile, JSON.stringify(tasks, null, 2), 'utf-8');

console.log(`Конвертация завершена! ${tasks.length} задач сохранены в output.json`);
