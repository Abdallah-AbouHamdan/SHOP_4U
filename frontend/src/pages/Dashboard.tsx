import Home from "./Home";
import SellerDashboard from "./SellerDashboard";
import { useStore } from "../store/useStore";

export default function Dashboard() {
  const user = useStore((state) => state.user);
  if (user?.accountType === "seller") {
    return <SellerDashboard />;
  }
  return <Home />;
}
