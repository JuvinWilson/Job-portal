import { Routes,Route,Navigate} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Notfound from "./pages/Notfound";
import { ToastContainer } from "react-toastify";
import Updateprofile from "./pages/Updateprofile";

function App() {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <Dashboard/>
          </ProtectedRoutes>
        }/>
        <Route path="/user/profile" element={<Updateprofile/>} />
        <Route path="/*" element={<Notfound/>} />
      </Routes>
      
    </div>
  );
}
export function ProtectedRoutes(props){
  if(localStorage.getItem('user') && localStorage.getItem('token')){
    return props.children
  }else{
    return <Navigate to='/login'/>
  }
};

export default App;
