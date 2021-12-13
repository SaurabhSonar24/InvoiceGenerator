import React,{useEffect,useState} from 'react'
import axios from 'axios'
import NavbarDash from './NavbarDash'

export default function Home() {
    const [postdata, setPostdata] = useState([])
 useEffect(() => {
    let user=localStorage.getItem("userdetails")
    axios({
      url:"http://localhost:8000/api/dashboard/"+user,
      method:"GET",
     
  }).
  then((res)=>{
      
      console.log(res)
      setPostdata(res.data)
  })
 }, [])
 console.log(postdata)
    return (
        <div>
            <NavbarDash/>
            <div className="col-md-6  bg-light" style={{marginTop:"50px",width:"700px",marginLeft:"300px"}}>
                <h1 className='text-center'>Welcome User : <span style={{fontFamily:"serif",fontStyle:"italic"}}>{localStorage.getItem("userdetails")}</span></h1><br/><br/>
                <h5 className='text-center'>Invoice Generated So Far :<span className="text-primary">{postdata.invoice}</span></h5>
                <h5 className='text-center'>Amount Pending :<span className='text-danger'>{postdata.total}</span></h5>
         </div>
        </div>
    )
}
