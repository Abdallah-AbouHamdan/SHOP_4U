import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductModal from "./components/ProductModal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import type { ReactNode } from "react";
import { useStore } from "./store/useStore";

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
            }/>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ProductModal />
    </>
  )
}

function ProtectedRoute({ children }: {children: ReactNode }) {
  const user = useStore((s) => s.user);
  const location = useLocation();
  if(!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>
}

export default App
