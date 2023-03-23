// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'API_CURRENCIES':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: action.payload,
    };
  case 'TOTAL_VALUE': {
    const result = state.total + action.payload;
    return {
      ...state,
      total: parseFloat(result.toFixed(2)),
    };
  }
  default:
    return state;
  }
};

export default wallet;
