import logo from './logo.svg';
import './App.css';
import InvoiceForm from './Components/InvoiceForm';
import {Switch,Route} from 'react-router-dom'
import Edit from './Components/Edit';
import Settings from './Components/Settings'
import Register from './Components/Register';
import Login from './Components/Login'
import Home from './Components/Home';


function App() {
  return (
   <div>
  
   <Switch>
     <Route path="/invoiceform" exact component={InvoiceForm}/>
     <Route path="/" exact component={Login}/>
     <Route path="/edit" exact component={Edit}/>
     <Route path="/settings" exact component={Settings}/>
     <Route path="/register" exact component={Register}/>
     <Route path="/home" exact component={Home}/>

   </Switch>
   </div>
  );
}

export default App;
