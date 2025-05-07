import {Routes, Route, Navigate} from "react-router-dom";

import {useSelector} from "react-redux";
import Register from "@/views/auth/Register";
import Login from "@/views/auth/Login";
import NotFound from "@/views/NotFound";
import {selectAuth, selectCurrentAdmin} from "@/store/auth/selectors";
import Auth from "@/layout/Auth";
import BankingServices from "@/views/Index";
import Logout from "@/views/Logout";
import Wallet from "@/views/wallet/Wallet";
import {hasRole} from "@/auth";
import {ROLE_ADMIN} from "@/config/serverApiConfig";
import Index from "@/layout/Index";

export default function AuthRouter() {
    const {isLoggedIn} = useSelector(selectAuth);
    const currentAdmin = useSelector(selectCurrentAdmin);
    const isAdmin = hasRole(ROLE_ADMIN, currentAdmin?.data?.roles);
    return (
        <Routes>
            {/* enAabled for role based access and admin panels
      
      {isLoggedIn &&
        (hasRole(ROLE_ADMIN, currentAdmin?.data?.roles) ||
          hasRole(ROLE_MANAGER, currentAdmin?.data?.roles)) && (
          <Route path="/admin" element={<Admin />}>
            <Route index path="users" element={<Dashboard />} />
            <Route path="transactions" element={<Product />} />
            <Route path="product-category" element={<ProductCategory />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        )} */}
            {/* Protected Banking Routes */}
            {/* {isLoggedIn && !isAdmin && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="account-details" element={<AccountDetails />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="transfer-money" element={<TransferMoney />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/dashboard" element={<Navigate to="/dashboard/account-details" replace />} />
          </Route>
        )} */}

            {/* Protected Admin Routes */}
            {/* {isAdmin && (
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index path="account-settings" element={<AccountSettings />} />
            <Route path="user-management" element={<AccountSettings />} />
            <Route path="/admin" element={<Navigate to="/admin/account-settings" replace />} />
          </Route>
        )} */}
            {/* Auth Routes */}
            <Route path="/auth" element={<Auth />}>
                <Route
                    path="/auth"
                    element={<Navigate to="/auth/login" replace />}
                />
                <Route index path="login" element={<Login />} />
                <Route index path="logout" element={<Logout />} />
                <Route path="register" element={<Register />} />
            </Route>

            {/* Routes for Regular Users */}
            {isLoggedIn && !isAdmin && (
                <Route path="/profile" element={<Index />}>
                    <Route path="wallet" element={<Wallet />} />
                    <Route
                        path="/profile"
                        element={<Navigate to="/profile/wallet" replace />}
                    />
                </Route>
            )}

            {/* Routes for Admins */}
            {/* {isLoggedIn && isAdmin && (
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="settings" element={<AdminSettings />} />
          <Route path="product-category" element={<ProductCategory />} />
          <Route path="product" element={<Product />} />
          <Route path="/" element={<Navigate to="/admin/settings" replace />} />
        </Route>
      )} */}

            {/* Landing Page */}
            <Route path="/" element={<BankingServices />} />

            {/* 404 Page Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
