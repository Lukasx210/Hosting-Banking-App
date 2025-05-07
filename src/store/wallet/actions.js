import {request} from "@/request";
import {
    SET_ERROR,
    SET_LOADING,
    SET_TRANSACTION_HISTORY,
    SET_WALLET_DETAILS,
} from "./types";
import apiInstance from "@/middleware/client-middleware";

export const fetchWalletDetails = () => async (dispatch) => {
    try {
        dispatch({type: SET_LOADING, payload: true});
        const res = await apiInstance.get("user/wallet/");
        dispatch({type: SET_WALLET_DETAILS, payload: res.data.result});
    } catch (err) {
        dispatch({
            type: SET_ERROR,
            payload:
                err.response?.data?.message || "Error fetching wallet details",
        });
    } finally {
        dispatch({type: SET_LOADING, payload: false});
    }
};
// export const fetchWalletDetails = () => async (dispatch) => {
//   try {
//     dispatch({ type: SET_LOADING, payload: true });
//     const res = await apiInstance.get("/user/wallet/details");
//     dispatch({ type: SET_WALLET_DETAILS, payload: res.data });
//   } catch (err) {
//     dispatch({ type: SET_ERROR, payload: err.response?.data?.message || "Error fetching wallet details" });
//   } finally {
//     dispatch({ type: SET_LOADING, payload: false });
//   }
// };
// Transaction History
export const fetchTransactionHistory = (walletId,pageSize=10,pageNumber=0) => async (dispatch) => {
    try {
        dispatch({type: SET_LOADING, payload: true});
        const res = await apiInstance.get(
            `/user/wallet/${walletId}/transactions?pageSize=${pageSize}&pageNumber=${pageNumber}` // Adjust the URL as per your API
        );
        dispatch({type: SET_TRANSACTION_HISTORY, payload: res.data.result});
    } catch (err) {
        dispatch({
            type: SET_ERROR,
            payload:
                err.response?.data?.message || "Error fetching transactions",
        });
    } finally {
        dispatch({type: SET_LOADING, payload: false});
    }
};

// Deposit
export const depositAmount =
    ({walletId, amount}) =>
    async (dispatch) => {
        try {
            dispatch({type: SET_LOADING, payload: true});
            await apiInstance.post(
                `/user/wallet/deposit?walletId=${walletId}&amount=${amount}`
            );
            dispatch(fetchWalletDetails());
            dispatch(fetchTransactionHistory(walletId));
        } catch (err) {
            dispatch({
                type: SET_ERROR,
                payload: err.response?.data?.message || "Deposit failed",
            });
        } finally {
            dispatch({type: SET_LOADING, payload: false});
        }
    };

// Withdraw
export const withdrawAmount =
    ({walletId, amount}) =>
    async (dispatch) => {
        try {
            dispatch({type: SET_LOADING, payload: true});
            await apiInstance.post(
                `/user/wallet/withdraw?walletId=${walletId}&amount=${amount}`
            );
            dispatch(fetchWalletDetails());
            dispatch(fetchTransactionHistory(walletId));
        } catch (err) {
            dispatch({
                type: SET_ERROR,
                payload: err.response?.data?.message || "Withdraw failed",
            });
        } finally {
            dispatch({type: SET_LOADING, payload: false});
        }
    };

// Send
export const sendAmount =
    ({walletId, receiverUsername, amount}) =>
    async (dispatch) => {
        try {
            dispatch({type: SET_LOADING, payload: true});
            await apiInstance.post(
                `/user/wallet/send?senderWalletId=${walletId}&receiverUsername=${receiverUsername}&amount=${amount}`
            );
            dispatch(fetchWalletDetails());
            dispatch(fetchTransactionHistory(walletId));
        } catch (err) {
            dispatch({
                type: SET_ERROR,
                payload: err.response?.data?.message || "Transfer failed",
            });
        } finally {
            dispatch({type: SET_LOADING, payload: false});
        }
    };
