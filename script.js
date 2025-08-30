let currentInput = "";
let operator = null;
let previousInput = "";
let history = [];

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function appendDot() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay();
  }
}

function setOperation(op) {
  if (currentInput === "") return;
  if (previousInput !== "") calculateResult();
  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay();
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function sqrt() {
  if (currentInput === "") return;
  currentInput = Math.sqrt(parseFloat(currentInput)).toString();
  addToHistory(`√(${currentInput})`);
  updateDisplay();
}

function calculateResult() {
  if (previousInput === "" || currentInput === "") return;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result;
  switch (operator) {
    case "+": result = prev + current; break;
    case "-": result = prev - current; break;
    case "*": result = prev * current; break;
    case "/": result = current === 0 ? "Error" : prev / current; break;
    case "%": result = prev % current; break;
    default: return;
  }
  addToHistory(`${previousInput} ${operator} ${currentInput} = ${result}`);
  currentInput = result.toString();
  operator = null;
  previousInput = "";
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("display").value = currentInput;
}

function addToHistory(entry) {
  history.unshift(entry);
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) appendNumber(e.key);
  else if (["+", "-", "*", "/", "%"].includes(e.key)) setOperation(e.key);
  else if (e.key === "Enter") calculateResult();
  else if (e.key === "Backspace") backspace();
  else if (e.key === "Escape") clearDisplay();
  else if (e.key === ".") appendDot();
});
