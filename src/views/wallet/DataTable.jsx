import { get } from "@/utils/helpers";
import { useEffect, useState } from "react";

const DataTable = ({data, columns, fetchData, pageSize, pageNumber}) => {
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const safeData = Array.isArray(data?.content) ? data?.content : [];
    var totalItems = data?.totalElements;
    var totalPages = data?.totalPages;

    const [currentData, setCurrentData] = useState(safeData);

    // Update current data when page changes or data changes
    useEffect(() => {
        const fetchPaginatedData = () => {
            // Fetch data for the current page (this can be your API call)
            const safeData = Array.isArray(data?.content) ? data?.content : [];

            setCurrentData(safeData);
        };
        fetchPaginatedData();
    }, [data, currentPage, pageSize]);

    // Function to handle page changes
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            fetchData(newPage, pageSize); // Call parent function if needed to update data
        }
    };
    const getColorbyTransactionType = (transactionType) => {
        switch (transactionType) {
            case "CREDIT":
                return " text-green-300";
            case "DEBIT":
                return " text-red-300";
            default:
                return "";
        }
    };
    return (
        <div>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        {columns?.map((column) => (
                            <th
                                key={column.accessor}
                                className="px-4 py-2 text-left border-b"
                            >
                                {column.Header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData?.length == 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-center py-4"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        currentData?.map((row) => (
                            <tr
                                key={row.id}
                                className={
                                    (row?.senderWallet == null ||
                                        row?.receiverWallet == null) &&
                                    getColorbyTransactionType(
                                        row?.transactionType
                                    )
                                }
                            >
                                {columns?.map((column) => (
                                    <td
                                        key={column.accessor}
                                        className="px-4 py-2 border-b"
                                    >
                                        {get(row, column.accessor)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-400"
                >
                    Previous
                </button>

                <span>
                    Page{" "}
                    <strong>
                        {currentPage + 1} of {totalPages}
                    </strong>
                </span>
                <span>
                    Total{" "}
                    <strong>
                        {currentData.length} of {totalItems}
                    </strong>
                </span>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataTable;
