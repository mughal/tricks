import App from "./App";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";

const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "profile/:name",
      element: <Profile />,
      // children: [
      //   { index: true, element: <DefaultProfile />},
      //   { path: "spinach", element: <Spinach />},
      //   { path: "popeye", element: <Popeye />},
      // ],
    },
  ];

export default routes;
  
