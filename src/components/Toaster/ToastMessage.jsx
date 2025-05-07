import {toast} from "react-hot-toast";
import {CheckCircle, XCircle, Info} from "lucide-react"; // Import Lucide React icons

const ToastMessage = ({type = "info", title, description}) => {
    // Default type set to 'info'
    const toastStyles = {
        success: {
            icon: <CheckCircle className="text-green-500" />, // Success icon
            borderColor: "border-green-500", // Green border for success
            textColor: "text-green-500", // Green text for success
        },
        error: {
            icon: <XCircle className="text-red-500" />, // Error icon
            borderColor: "border-red-500", // Red border for error
            textColor: "text-red-500", // Red text for error
        },
        info: {
            icon: <Info className="text-sky-500" />, // Info icon
            borderColor: "border-sky-500", // Blue border for info
            textColor: "text-sky-500", // Blue text for info
        },
    };

    // Determine the correct type and style
    const {icon, borderColor, textColor} =
        toastStyles[type] || toastStyles.info; // Default to 'info' if type is not provided

    // Show the toast with specific content and style
    toast[type](
        <div
            className={`flex items-center space-x-2 p-3 rounded border ${borderColor} bg-white`}
        >
            <span className="text-xl">{icon}</span>
            <div className="ml-2">
                <strong className={`block font-semibold ${textColor}`}>
                    {title}
                </strong>
                <p className={`text-sm text-gray-600`}>{description}</p>
            </div>
        </div>,
        {
            duration: 5000, // Duration in ms
        }
    );
};

export default ToastMessage;
