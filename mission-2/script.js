let salary = 0;
let totalExpenses = 0;
let expenses = [];
let chartInstance = null;

const salaryElem = document.getElementById('salary');
const totalExpenseElem = document.getElementById('totalExpense');
const balanceElem = document.getElementById('balance');
const expenseList = document.getElementById('expenseList');
const ctx = document.getElementById('expenseChart').getContext('2d');

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('setSalaryBtn').addEventListener('click', setSalary);
    document.getElementById('addExpenseBtn').addEventListener('click', addExpense);
    loadData();
});

function setSalary() {
    const salaryInput = document.getElementById('salaryInput').value;

    if (salaryInput === '' || Number(salaryInput) <= 0) {
        alert('Please enter a valid salary');
        return;
    }

    salary = Number(salaryInput);
    salaryElem.innerText = salary;
    saveData();
    updateBalance();
    renderChart();
}

function addExpense() {
    const name = document.getElementById('expenseName').value.trim();
    const amountInput = document.getElementById('expenseAmount').value;

    if (name === '' || amountInput === '' || Number(amountInput) <= 0) {
        alert('Invalid expense input');
        return;
    }

    const amount = Number(amountInput);
    totalExpenses += amount;
    expenses.push({ name, amount });

    totalExpenseElem.innerText = totalExpenses;
    appendExpenseItem(name, amount);

    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';

    saveData();
    updateBalance();
    renderChart();
}

function appendExpenseItem(name, amount) {
    const li = document.createElement('li');
    li.textContent = `${name} : ₹${amount}`;

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.innerHTML = '<i class="fas fa-trash"></i>';
    del.addEventListener('click', () => removeExpense(li, amount));

    li.appendChild(del);
    expenseList.appendChild(li);
}

function removeExpense(listItem, amount) {
    expenseList.removeChild(listItem);
    totalExpenses -= amount;
    if (totalExpenses < 0) totalExpenses = 0;
    totalExpenseElem.innerText = totalExpenses;

    const idx = expenses.findIndex(e => e.amount === amount && listItem.textContent.includes(e.name));
    if (idx !== -1) expenses.splice(idx, 1);

    saveData();
    updateBalance();
    renderChart();
}

function updateBalance() {
    const balance = salary - totalExpenses;
    balanceElem.innerText = balance;
}

function saveData() {
    const payload = {
        salary,
        totalExpenses,
        expenses
    };
    localStorage.setItem('expenseTracker', JSON.stringify(payload));
}

function loadData() {
    const stored = localStorage.getItem('expenseTracker');
    if (!stored) return;
    try {
        const { salary: s, totalExpenses: t, expenses: exp } = JSON.parse(stored);
        salary = s || 0;
        totalExpenses = t || 0;
        expenses = exp || [];

        salaryElem.innerText = salary;
        totalExpenseElem.innerText = totalExpenses;
        exp.forEach(item => appendExpenseItem(item.name, item.amount));
        updateBalance();
        renderChart();
    } catch (e) {
        console.error('Failed to load stored data', e);
    }
}

function renderChart() {
    const remaining = salary - totalExpenses;
    const data = {
        labels: ['Remaining', 'Expenses'],
        datasets: [{
            data: [remaining > 0 ? remaining : 0, totalExpenses],
            backgroundColor: ['#2e7d32', '#e53935']
        }]
    };

    if (chartInstance) {
        chartInstance.data = data;
        chartInstance.update();
        return;
    }

    chartInstance = new Chart(ctx, {
        type: 'pie',
        data,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}