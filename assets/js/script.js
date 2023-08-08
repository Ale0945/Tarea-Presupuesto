let budget = 0;
let balance = 0;
let expenses = [];

// Variables de ES6
const budgetInput = document.getElementById('budgetInput');
const budgetValueElement = document.getElementById('budgetValue');
const balanceValueElement = document.getElementById('balanceValue');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expensesList = document.getElementById('expensesList');

// Funciones de flecha
const calculateBudget = () => {
  budget = parseFloat(budgetInput.value);
  budgetValueElement.textContent = budget.toFixed(2);
  updateBalance();
};

const updateBalance = () => {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  balance = budget - totalExpenses;
  balanceValueElement.textContent = balance.toFixed(2);
};

const addExpense = () => {
  const name = expenseNameInput.value;
  const amount = parseFloat(expenseAmountInput.value);

  if (name.trim() === '' || isNaN(amount) || amount <= 0) {
    alert('Ingrese un nombre y un valor válido para el gasto.');
    return;
  }

  expenses.push({ name, amount });
  updateExpensesList();
  updateBalance();
  clearExpenseInputs();
};

const updateExpensesList = () => {
  expensesList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.innerHTML = '&#128465;';
    deleteIcon.onclick = () => deleteExpense(index);
    li.appendChild(deleteIcon);
    expensesList.appendChild(li);
  });
};

const deleteExpense = (index) => {
  expenses.splice(index, 1);
  updateExpensesList();
  updateBalance();
};

const clearExpenseInputs = () => {
  expenseNameInput.value = '';
  expenseAmountInput.value = '';
};

// Bucle if
if (budgetInput.value === '') {
  budgetInput.placeholder = 'Ingrese su presupuesto';
}

// Bucle for
for (let i = 0; i < expenses.length; i++) {
  console.log(expenses[i].name, expenses[i].amount);
}

// Inicializar la aplicación
updateBalance();