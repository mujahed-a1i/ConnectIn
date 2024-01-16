import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import SplashPage from './components/splash/splashPage';


const router = createBrowserRouter([
  { path: "/", element: <SplashPage />}
])



function App() {
  return (
    <div>
      <RouterProvider router={router} />
      {/* <h1> Connectify </h1>; */}
    </div>
  )
}

export default App;
