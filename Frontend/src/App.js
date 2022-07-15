import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Navbar';
import { Route, Routes } from 'react-router-dom';
import AddCategories from './Pages/AddCategories';
import AddTodo from './Pages/AddTodo';
import AddUser from './Pages/AddUser';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/addCategories' element={<AddCategories></AddCategories>}></Route>
        <Route path='/addTodo' element={<AddTodo></AddTodo>}></Route>
        <Route path='/addUser' element={<AddUser></AddUser>}></Route>
      </Routes>
    </div>
  );
}

export default App;
