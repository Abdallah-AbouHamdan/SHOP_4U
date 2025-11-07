import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <>
    <div className="flex min-h-screen flex-col bg-[#e1e1e1]">
      <Navbar />
      <Home />
    </div>
    </>
  )
}

export default App
