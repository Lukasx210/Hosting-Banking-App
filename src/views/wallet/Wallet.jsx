import React, {useState, useEffect} from "react";
import DataTable from "./DataTable"; // Import the DataTable component you created earlier
import {ArrowDownCircle, ArrowUpCircle, CreditCard, Search} from "lucide-react";
import {useForm} from "react-hook-form";
import Card from "@/components/Card";
import {useDispatch, useSelector} from "react-redux";
import {
    depositAmount,
    fetchTransactionHistory,
    fetchWalletDetails,
    sendAmount,
    withdrawAmount,
} from "@/store/wallet/actions";
import {
    selectTransactions,
    selectWallet,
    selectWalletError,
    selectWalletLoading,
} from "@/store/wallet/selectors";
import {selectCurrentAdmin} from "@/store/auth/selectors";
import Loading from "@/components/Loading";

const Wallet = () => {
    const dispatch = useDispatch();

    const wallet = useSelector(selectWallet);
    const transactions = useSelector(selectTransactions);

    const loading = useSelector(selectWalletLoading);
    const error = useSelector(selectWalletError);

    useEffect(() => {
        dispatch(fetchWalletDetails());
    }, [dispatch]);

    // Fetch transaction history after wallet is loaded
    useEffect(() => {
        if (wallet?.id) {
            dispatch(fetchTransactionHistory(wallet?.id));
        }
    }, [wallet?.id, dispatch]);

    const [totalItems, setTotalItems] = useState(0); // Total items for pagination
    const [pageSize, setPageSize] = useState(10); // Items per page
    const [pageNumber, setPageNumber] = useState(0); // Items per page
    const [activeTab, setActiveTab] = useState("deposit"); // State to handle active tab
    const currentAdmin = useSelector(selectCurrentAdmin);

    // Fetch transactions with pagination
        const fetchTransactions =  (pageNumberF,pageSizeF) => {
            // Replace with your actual API endpoint
            setPageNumber(pageNumberF);
            setPageSize(pageSizeF);
            if (wallet?.id) 
                dispatch(fetchTransactionHistory(wallet?.id,pageSizeF,pageNumberF));
        };

    // Define the columns for the table
    const columns = React.useMemo(
        () => [
            {
                Header: "Sender",
                accessor: "senderWallet.walletAddress",
            },
            {
                Header: "Receiver",
                accessor: "receiverWallet.walletAddress",
            },
            {
                Header: "Amount",
                accessor: "amount",
            },
            {
                Header: "Transaction Type",
                accessor: "transactionType",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Date",
                accessor: "createdAt",
            },
        ],
        []
    );

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        // Handle form submission
        var walletId = wallet?.id && parseInt(wallet?.id);
        if (!walletId) {
            return;
        }
        if (activeTab === "deposit" && data && data?.depositAmount) {
            dispatch(
                depositAmount({
                    walletId,
                    amount: data.depositAmount.toString(), // keep precision
                })
            );
        }

        if (activeTab === "withdraw" && data.withdrawAmount) {
            dispatch(
                withdrawAmount({
                    walletId,
                    amount: data.withdrawAmount.toString(), // BigDecimal-safe
                })
            );
        }

        if (activeTab === "send" && data?.sendAmount && data?.searchUser) {
            dispatch(
                sendAmount({
                    walletId,
                    receiverUsername: data?.searchUser,
                    amount: data.sendAmount.toString(),
                })
            );
        }
        console.log(data);
    };

    return (
        <Loading isLoading={loading}>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Wallet Balance Section */}
                    <div className="">
                        <Card className="w-full max-w-[350px] aspect-[1.586] bg-gradient-to-r from-sky-500 to-sky-700 text-white flex flex-col justify-between p-6 rounded-2xl shadow-md">
                            <div>
                                <h2 className="text-sm uppercase tracking-wide">
                                    Balance
                                </h2>
                                <p className="text-3xl font-bold mt-2 text-slate-50">
                                    $ {wallet?.balance.toFixed(2)}
                                </p>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm">
                                    {currentAdmin?.data?.username}
                                </p>
                                {/* Replace with actual user name */}
                                <p className="text-xs text-white/70">
                                    Wallet address: {wallet?.walletAddress}
                                </p>
                                {/* Replace dynamically */}
                            </div>
                        </Card>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 md:col-span-2">
                        {/* Tab Navigation */}
                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={() => setActiveTab("deposit")}
                                className={`text-xl p-2 ${
                                    activeTab === "deposit"
                                        ? "text-sky-600 border-b-2 border-sky-600"
                                        : "text-gray-600"
                                }`}
                            >
                                Deposit
                            </button>
                            <button
                                onClick={() => setActiveTab("withdraw")}
                                className={`text-xl p-2 ${
                                    activeTab === "withdraw"
                                        ? "text-sky-600 border-b-2 border-sky-600"
                                        : "text-gray-600"
                                }`}
                            >
                                Withdraw
                            </button>
                            <button
                                onClick={() => setActiveTab("send")}
                                className={`text-xl p-2 ${
                                    activeTab === "send"
                                        ? "text-sky-600 border-b-2 border-sky-600"
                                        : "text-gray-600"
                                }`}
                            >
                                Send
                            </button>
                        </div>

                        {/* Form Content Based on Active Tab */}
                        {activeTab === "deposit" && (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-2 mt-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <ArrowDownCircle className="text-sky-600" />
                                    <input
                                        {...register("depositAmount")}
                                        type="number"
                                        placeholder="Deposit Amount"
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-sky-600 text-white p-2 rounded-md w-full"
                                >
                                    Deposit
                                </button>
                            </form>
                        )}
                        {activeTab === "withdraw" && (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-2 mt-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <ArrowUpCircle className="text-sky-600" />
                                    <input
                                        {...register("withdrawAmount")}
                                        type="number"
                                        placeholder="Withdraw Amount"
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-sky-600 text-white p-2 rounded-md w-full"
                                >
                                    Withdraw
                                </button>
                            </form>
                        )}
                        {activeTab === "send" && (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-2 mt-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <CreditCard className="text-sky-600" />
                                    <input
                                        {...register("sendAmount")}
                                        type="number"
                                        placeholder="Send Amount"
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                                {/* Search Input for Send Form */}
                                <div className="flex items-center space-x-2 mt-4">
                                    <Search className="text-gray-600" />
                                    <input
                                        {...register("searchUser")}
                                        type="text"
                                        placeholder="Search User"
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-sky-600 text-white p-2 rounded-md w-full"
                                >
                                    Send
                                </button>
                            </form>
                        )}
                    </div>
                </div>
                {/* Transaction History Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">
                        Transaction History
                    </h2>
                    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                        <DataTable
                            data={transactions}
                            columns={columns}
                            pageSize={pageSize}
                            pageNumber={pageNumber}
                            fetchData={fetchTransactions}
                        />
                        {/* Add the DataTable component here */}
                    </div>
                </div>
            </div>
        </Loading>
    );
};

export default Wallet;
