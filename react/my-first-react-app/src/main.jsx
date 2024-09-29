import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomeApp from './demos/WelcomeApp';
import Profile2 from './demos/Profile2';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeApp />,
  },
  {
    path: "profile/:name",
    element: <Profile2 />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

// The convention is to name this pair like const [something, setSomething].
// You could name it anything you like, but conventions make things easier to understand across projects.
// import App from './App.jsx'
// import Greeting from "./Greeting.jsx";
// import TodoList from "./TodoList.jsx";
// import Bio from "./Bio.jsx";
// import Avatar from "./demos/Avatar.jsx";
// import Animals from "./Animals.jsx";
// import AnimalProps from "./AnimalProps.jsx";
// import PackingList from "./PackingList";
// import ListPeople from "./demos/ListPeople";
// import ButtonR1 from "./ButtonR1";
// import ButtonR2 from "./ButtonR1";
// import ButtonR3 from "./ButtonR3";