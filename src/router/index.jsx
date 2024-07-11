import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import {
    SignIn,
    SignUp,
    Main,
    Service,
    Home,
    Order,
    ForgotPassword,
} from "@pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Main />}>
                <Route index element={<Home />} />
                <Route path="/services" element={<Service />} />
                <Route path="/orders" element={<Order />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/sign-up" element={<SignUp />} />
        </Route>
    )
);

const Index = () => {
    return <RouterProvider router={router} />;
};

export default Index;
