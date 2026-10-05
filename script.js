const display = document.getElementById('display');
const expressionEl = document.getElementById('expression');

let current = '0';
let previous = null;
let operator = null;
let justEvaluated = false;

function updateDisplay() {
  display.textContent = current;
  if (operator && previous !== null) {
    expressionEl.textContent = `${formatNum(previous)} ${operatorSymbol(operator)}`;
  } else {
    expressionEl.textContent = '';
  }
}

function formatNum(n) {
  const num = Number(n);
  if (Number.isInteger(num)) return num.toString();
  return parseFloat(num.toFixed(8)).toString();
}

function operatorSymbol(op) {
  return { add: '+', subtract: '−', multiply: '×', divide: '÷' }[op] || '';
}

function inputDigit(digit) {
  if (justEvaluated) {
    current = digit;
    justEvaluated = false;
  } else {
    current = current === '0' ? digit : current + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (justEvaluated) {
    current = '0.';
    justEvaluated = false;
  } else if (!current.includes('.')) {
    current += '.';
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (operator && previous !== null && !justEvaluated) {
    evaluate();
  }
  previous = current;
  operator = op;
  current = '0';
  justEvaluated = false;
  updateDisplay();
}

function evaluate() {
  if (operator === null || previous === null) return;
  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result;

  switch (operator) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide':
      if (b === 0) {
        current = 'Error';
        previous = null;
        operator = null;
        justEvaluated = true;
        updateDisplay();
        return;
      }
      result = a / b;
      break;
    default: return;
  }

  current = formatNum(result);
  previous = null;
  operator = null;
  justEvaluated = true;
  updateDisplay();
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  justEvaluated = false;
  updateDisplay();
}

function toggleSign() {
  if (current === '0' || current === 'Error') return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
  updateDisplay();
}

function togglePercent() {
  if (current === 'Error') return;
  current = formatNum(parseFloat(current) / 100);
  updateDisplay();
}

document.querySelectorAll('.key').forEach(btn => {
  btn.addEventListener('click', () => {
    const num = btn.dataset.num;
    const action = btn.dataset.action;

    if (num !== undefined) {
      inputDigit(num);
      return;
    }

    switch (action) {
      case 'clear': clearAll(); break;
      case 'sign': toggleSign(); break;
      case 'percent': togglePercent(); break;
      case 'decimal': inputDecimal(); break;
      case 'equals': evaluate(); break;
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        chooseOperator(action);
        break;
    }
  });
});

// Keyboard support
window.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') inputDigit(e.key);
  else if (e.key === '.') inputDecimal();
  else if (e.key === '+') chooseOperator('add');
  else if (e.key === '-') chooseOperator('subtract');
  else if (e.key === '*') chooseOperator('multiply');
  else if (e.key === '/') { e.preventDefault(); chooseOperator('divide'); }
  else if (e.key === 'Enter' || e.key === '=') evaluate();
  else if (e.key === 'Escape') clearAll();
  else if (e.key === 'Backspace') {
    current = current.length > 1 ? current.slice(0, -1) : '0';
    updateDisplay();
  }
});

updateDisplay();
