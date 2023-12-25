import { useRoutes } from "react-router-dom";
import Nav from "./layouts/Nav";
import NavFoot from "./layouts/NavFoot";
import { Dashboard, Blog, Image, Seo, Hero,YtDetail,BlogDetail } from "./pages";

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
      children: [
        { path: "yt", element: <Dashboard /> },
        { path: "blog", element: <Blog /> },
        { path: "image", element: <Image /> },
        { path: "seo", element: <Seo /> },
        { path: "yt/:id", element: <YtDetail /> },
        { path: "blog/:id", element: <BlogDetail /> },
      ],
    },
  ]);
}
