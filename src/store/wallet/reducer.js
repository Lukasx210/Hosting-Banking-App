import {
  SET_WALLET_DETAILS,
  SET_TRANSACTION_HISTORY,
  SET_LOADING,
  SET_ERROR,
} from "./types";

const initialState = {
  wallet: null,
  transactions: [],
  loading: false,
  error: null,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET_DETAILS:
      return { ...state, wallet: action.payload };
    case SET_TRANSACTION_HISTORY:
      return { ...state, transactions: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default walletReducer;