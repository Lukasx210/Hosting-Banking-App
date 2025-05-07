import {LoaderCircle} from "lucide-react";
import React from "react";

const PageLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-10 h-10 rounded-full border-4 border-sky-600 border-t-white animate-spin"></div>
        </div>
    );
};
export default PageLoader;
