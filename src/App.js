import './App.css';

import { Routes, Route, BrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from './pages/Login';
import AddTodo from './pages/AddTodo';
import TodoManage from './pages/TodoManage';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}></Route>   
          <Route path='/login' element={<LoginPage/>}></Route>          
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/add' element={<AddTodo/>}></Route> 
          <Route path='/manage' element={<TodoManage/>}></Route>    
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
