import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    currency: JSON.parse(window.localStorage.getItem('currency')) || 'pesos',
    loading: false,
    error: null,
};


export const CurrencyContext = createContext(INITIAL_STATE);

const CurrencyReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_CURRENCY_START':
            return {
                currency: state.currency,
                loading: true,
                error: null,
            };
        case 'CHANGE_CURRENCY_SUCCESS':
            return {
                currency: action.payload,
                loading: false,
                error: null,
            };
        case 'CHANGE_CURRENCY_ERROR':
            return {
                currency: state.currency,
                loading: false,
                error: action.payload,
            };
        case 'RESET_CURRENCY':
            return {
                currency: 'pesos',
                loading: false,
                error: null,
            };
        default:
            return state
    }
};


export const CurrencyContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(CurrencyReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem('currency', JSON.stringify(state.currency));
    }, [state.currency])

    return (
        <CurrencyContext.Provider value={{currency: state.currency, loading: state.loading, error: state.error, dispatch}}>
            {children}
        </CurrencyContext.Provider>
    )
}