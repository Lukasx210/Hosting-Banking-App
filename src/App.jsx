import store from "@/store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import {Toaster} from "react-hot-toast";
import {lazy, Suspense} from "react";
import PageLoader from "@/components/PageLoader";
const AppOs = lazy(() => import("./apps/AppOs"));

function App() {
    return (
        <BrowserRouter>
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
