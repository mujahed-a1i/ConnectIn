import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import SplashPage from './components/splash/splashPage';
import SignUp from './components/session/signUp/signUp';

const router = createBrowserRouter([
  { path: "/", 
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <SplashPage />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      // {
      //   path: "*",
      //   element: <SplashPage/>
      // }
    ],
  },
]);



function App() {
  return (
    <div>
      <RouterProvider router={router} />
      {/* <h1> Connectify </h1>; */}
    </div>
  )
}

export default App;
