import store from "@/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import PageLoader from "@/components/PageLoader";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
const AppOs = lazy(() => import("./apps/AppOs"));

function App() {
    return (
        <BrowserRouter basename="/Hosting-Banking-App">
            <Provider store={store}>
                <Suspense fallback={<PageLoader />}>
                    <Toaster />
                    <AppOs />
                </Suspense>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
