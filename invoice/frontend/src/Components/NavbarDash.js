import React from 'react'
import {  Route, Switch, Link,useHistory } from "react-router-dom";


function NavbarDash(props) {
  let History=useHistory();
const logout=(e)=>{
  e.preventDefault();
  localStorage.clear();
  History.push("/")

}
    return (
        <div>
             
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">InvoiceGenerator</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
      <a class="nav-link active" aria-current="page" ><Link to="/home" class="nav-link">Home</Link></a>
        <a class="nav-link active" aria-current="page" ><Link to="/invoiceform" class="nav-link">Create</Link></a>
        <a class="nav-link"> <Link to="/edit" class="nav-link">Edit</Link></a>
        <a class="nav-link"> <Link to="/settings" class="nav-link">Settings</Link></a>
        <a class="nav-link" onClick={logout} style={{marginTop:"8px"}}>Logout</a>
    
      </div>
    </div>
  </div>
</nav>
          
           
        </div>
    )
}
export default NavbarDash;
