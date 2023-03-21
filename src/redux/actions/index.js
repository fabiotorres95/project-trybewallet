// Coloque aqui suas actions

export const actionCreator = (userEmail) => ({
  type: 'SAVE_EMAIL',
  payload: userEmail,
});

export const saveCurrenciesList = (currencies) => ({
  type: 'API_CURRENCIES',
  payload: currencies,
});

export const expensesList = (expenses) => ({
  type: 'SAVE_EXPENSE',
  payload: expenses,
});
