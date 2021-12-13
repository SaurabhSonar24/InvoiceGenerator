import React from 'react'
import {  Link } from "react-router-dom";


export default function LoginDash() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">InvoiceGenerator</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
      <a class="nav-link"  ><Link to="/" class="nav-link">Login</Link></a>
      </li>
      <li className="nav-item">
      <a class="nav-link" ><Link to="/register" class="nav-link">Register</Link></a>
      </li>
    
      
    </ul>
  </div>
</nav>

        </div>
    )
}
