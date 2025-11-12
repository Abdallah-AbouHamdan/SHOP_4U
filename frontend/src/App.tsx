import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductModal from "./components/ProductModal";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#e1e1e1]">
        <Navbar />
        <Home />
        <Footer />
      </div>
      <ProductModal />
    </>
  )
}

export default App
