import { useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Hero from "./pages/Hero";
import Nav from "./layouts/Nav";
import NavFoot from "./layouts/NavFoot";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <NavFoot />,
      children: [{ path: "", element: <Hero /> }],
    },
    {
      path: "/app",
      element: <Nav />,
      children: [{ path: "", element: <Dashboard /> }],
    },
  ]);
}
