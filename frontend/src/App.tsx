import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductModal from "./components/ProductModal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import type { ReactNode } from "react";
import { useStore } from "./store/useStore";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#e1e1e1]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
             <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path="/shop/:seller" element={<Shop />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ProductModal />
    </>
  )
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useStore((s) => s.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>
}

export default App
