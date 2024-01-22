import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SplashPage from './components/splash/splashPage';
import SignUp from './components/session/signUp/signUp';
import FeedPage from './components/feed/feedPage';
import { restoreSession } from './store/reducers/session';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreSession()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);
  return (
    <>
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  { 
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SplashPage />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: ':feed',
        element: <FeedPage />,
      },
      {
        path: "*",
        element: <SplashPage/>
      }
    ],
  },
]);



function App() {
  return (
    <div>
      <RouterProvider router={router} />
      {/* <h1> Connectify </h1>; */}
    </div>
  );
}

export default App;
