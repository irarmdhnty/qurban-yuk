import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
  transactions: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;

  const addTransaction = () => {
    
  }

  switch (type) {
    // add case "USER_SUCCESS" here ..
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      // console.log('ADDING LOGIN');
      // Set localstorage item with key "token" here ...
      localStorage.setItem("user", JSON.stringify(payload));
      localStorage.setItem("token", payload?.token);
      
      return {
        ...state,
        isLogin: true,
        user: payload,
      };
    // add case "AUTH_ERROR" here ..
    case "AUTH_ERROR":
    case "LOGOUT":
      // Remove localstorage item with key "token" here ...
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        user: {},
      };
    case "ADD_TRANSACTION":
      // console.log('ADDING TRX');
      let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      
      transactions.push({
        ...payload,
        'id': Math.floor(Math.random() * 1000),
      });

      transactions = transactions.filter(transaction => (
        transaction.userId === payload.userId
      ));

      localStorage.setItem('transactions', JSON.stringify(transactions));
      return {
        ...state,
        transactions,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);  

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
