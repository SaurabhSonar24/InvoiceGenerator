import React,{useState} from 'react'
import axios from 'axios';
import NavbarDash from './NavbarDash';

export default function Settings() {
    const [address, setAddress] = useState('')
    // const [file, setFile] = useState();
    const handler=(e)=>{
        e.preventDefault();
        switch(e.target.name){
            case 'address': setAddress(e.target.value)
                             break;
        }

    }
    const update=(e)=>{
       e.preventDefault();
       console.log(address)
       let user =localStorage.getItem("userdetails")
       const URL = "http://localhost:8000/api/update_settings/"+user;
       axios.post(URL, {
           address: address

       })
           .catch(err => { console.log(err) })
           alert("Address Updated !!")
    }
    return (
        <div>
            <NavbarDash/>
        <div className="container row">
            <div className="col-md-6 mx-auto bg-light" style={{marginTop:"50px"}}>
            <h3>Welcome User- <span>{localStorage.getItem("userdetails")}</span></h3>
            <form method='post'>
            <div class="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">Your Address</span>
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="address" onChange={handler}/><br/>
  
  
</div>
{/* <label htmlFor="file">Logo</label>
            <input
              type="file"
              id="file"
              accept=".jpg"
              onChange={event => {
                const file = event.target.files[0];
                setFile(file);
              }}
            /><br/><br/> */}
<button type="button" onClick={update} class="btn btn-secondary" style={{marginLeft:"190px"}}>Update Details</button>
            </form>
            </div>
        </div>
        </div>
    )
}











// import React, { useState } from "react";

// import "./App.css";
// import Axios from "axios";

// function App() {
//   const [name, setName] = useState();
//   const [file, setFile] = useState();

//   return (
//     <div className="App">
//       <header className="App-header">
//         <form action="#">
//           <div className="flex">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               onChange={event => {
//                 const { value } = event.target;
//                 setName(value);
//               }}
//             />
//           </div>
//           <div className="flex">
//             <label htmlFor="file">File</label>
//             <input
//               type="file"
//               id="file"
//               accept=".jpg"
//               onChange={event => {
//                 const file = event.target.files[0];
//                 setFile(file);
//               }}
//             />
//           </div>
//         </form>
//         <button onClick={send}>Send</button>
//       </header>
//     </div>
//   );
// }

// export default App;