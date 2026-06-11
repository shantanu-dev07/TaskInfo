import Aos from "aos"
import 'aos/dist/aos.css'
import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Navbar from './components/Navbar'
import { MainContextProvider } from "./context/MainContext"
import ProtectedLayout from "./layout/ProtectedLayout"
import AddTaskPage from "./pages/AddTaskPage"
import Dashboard from './pages/Dashboard'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
const App = () => {

  useEffect(()=>{

    Aos.init();
    Aos.refresh();

  },[])
  return (
    <BrowserRouter>
      <MainContextProvider>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <ToastContainer/>
          <Navbar />
          <main className="flex-1">
            <Routes>

              <Route Component={ProtectedLayout}>
              <Route path="/" Component={Dashboard } />
              <Route path="/add-task" Component={AddTaskPage}/>
            </Route>

            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={Register} />
            <Route path="*" Component={ErrorPage} />

            </Routes>
          </main> 
          <footer className="h-16 flex items-center justify-center bg-gray-200">
              Copyright @2026 
          </footer>
          </div>
      </MainContextProvider>
    </BrowserRouter>
  );
};

export default App;
