import React,{useState} from 'react'
import { login } from '../config/MyService';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import LoginDash from './LoginDash';
export default function Login(props) {
    let History =useHistory();
    const [state,setState]=useState({email:'',password:'',name:'',age:''});
    const handler=(event)=>{
        const {name,value}=event.target;
        setState({...state,[name]:value})
    }
    const postRegis=(event)=>{
        event.preventDefault();
        login(state)
        .then(res=>{
            console.log(res.data.err)
            if(res.data.err==0){
               localStorage.setItem("_token",res.data.token);
               localStorage.setItem("userdetails", state.email);
               History.push("/home")
            }
            if(res.data.err==1){
                console.log(res.data)
                alert(res.data.msg)
            }
        })
    }
    return (
        // <div>
        //     <h2> Login Here</h2>
        //     <div className="container">
        //     <form method="post" onSubmit={postRegis}>
        //         <div className="form-group">
        //             <label> Email</label>
        //             <input type="email" name="email" className="form-control" onChange={handler}/>
        //         </div>
        //         <div className="form-group">
        //             <label> Password</label>
        //             <input type="password" name="password" className="form-control" onChange={handler}/>
        //         </div>
             
        //         <input type="submit" value="Login" className="btn btn-success"/>
        //     </form>
        //     </div>
        // </div>
        <div>
            <LoginDash/>
            <div className="container row bg-light" style={{ marginLeft: "380px", width: "500px", marginTop: "100px",height:"300px"}}>


                <h1 className="text-center">Login</h1>
                <form method="post" onSubmit={postRegis}>
                Email:<input className="form-control" type="text" placeholder="Enter Email" name="email" aria-label="default input example" onChange={handler} />
                Password:<input type="password" className="form-control" id="inputPassword" name="password" placeholder="Enter Password" onChange={handler} />


                <button type="submit" class="btn btn-success" style={{ width: "100px", marginLeft: "180px", marginTop: "20px",marginBottom:"10px" }} >Log in</button>
                <br />
                </form>
            </div>
            <br/>
            <p className="text-center">If Not Registered, <Link to="/register">Register Here</Link></p>
        </div>
    )
}
