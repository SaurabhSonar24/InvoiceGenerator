import React,{useState,useEffect} from 'react'
import {getinvoice, getPosts} from '../config/MyService'
import axios from 'axios'
import FileDownload from 'js-file-download'
import { VscEdit } from "react-icons/vsc";
import {VscChromeClose} from 'react-icons/vsc'
import { BsBoxArrowInDown } from "react-icons/bs";
import NavbarDash from './NavbarDash';

export default function Edit() {
    const [postdata, setPostdata] = useState([])
    const [editField,setEditField]=useState(1)
    const [id1,setId]=useState('')
    const [status1,setStatus]=useState('')
    
    // console.log(postdata[0].invoice)
    useEffect(() => {
      let user=localStorage.getItem("userdetails")
      axios({
        url:"http://localhost:8000/api/fetch_invoice_data/"+user,
        method:"GET",
       
    }).
    then((res)=>{
        
        console.log(res)
        setPostdata(res.data.data)
    })
       
    }, [])
    console.log(postdata)
 const generate=(e,index)=>{
        e.preventDefault();
        console.log(postdata[index]._id)
        const URL = "http://localhost:8000/api/generate_pdf"
        axios.post(URL, {
           id:postdata[index]._id
     
        })
            .catch(err => { console.log(err) })
            // alert("Invoice Generated !!!!")
            axios({
              url:"http://localhost:8000/api/fetch/"+postdata[index]._id,
              method:"GET",
              responseType:"blob"
          }).
          then((res)=>{
              FileDownload(res.data,"invoice.pdf")
          })

      
      
 }

 const statusselect=(e)=>{
   console.log(e.target.value)
   setStatus(e.target.value)
 }
 const showEdit=(e,index,id)=>{
  //  e.preventDefault()
    console.log(postdata[index]._id)
    setId(postdata[index])
    setEditField(0)
 }
 const newStatus=(e)=>{
   e.preventDefault();
   console.log(status1)
   const URL = "http://localhost:8000/api/update_status"
   axios.post(URL, {
      status:status1,
      id:id1._id

   })
       .catch(err => { console.log(err) })
       alert("Status has been updated !!")
       window.location.reload();

 }
 const del=(e,index,id)=>{
      e.preventDefault();
      console.log(postdata[index]._id)
      const URL = "http://localhost:8000/api/delete_data"
   axios.post(URL, {
    
      id:postdata[index]._id

   })
       .catch(err => { console.log(err) })
       window.location.reload();
      // setId(postdata[index])
      // console.log(id1)
 }

 console.log(postdata)
    return (
        <div className='container-fluid'>
          <NavbarDash/>
         
                <div className='container row'>
                  <h2  style={{marginTop:"30px",marginLeft:"520px"}}>Invoice data</h2>
                        <div className="col-md-6 " style={{marginTop:"30px",marginLeft:"150px"}}>
                        <table className="table table-dark table-striped" style={{width:"900px"}}>
  <thead>
    <tr>
      <th scope="col" >#</th>
      <th scope="col">Invoice Number</th>
      <th scope="col">Receiver's Name</th>
      <th scope="col">Total</th>
      <th scope="col">Status</th>
      <th scope="col" colspan={3}>Options</th>
      {/* <th scope="col"></th> */}
    </tr>
  </thead>
  <tbody>
    {postdata.map((val,index)=>
    <tr>
        <td>{index+1}</td>
        <td className="text-center">{val.invoice_number}</td>
        <td>{val.receiver_name}</td>
        <td>{val.invoice_amount}</td>
        <td>{val.status}
       
   
        </td>
        <td><a onClick={e => showEdit(e,index,val._id)}><VscEdit/></a>&nbsp; &nbsp;&nbsp;&nbsp;<a onClick={e => del(e,index,val._id)}><VscChromeClose/></a> &nbsp; &nbsp;&nbsp;&nbsp;<button onClick={e=>generate(e,index,val._id)} className='btn btn-primary'>Generate Invoice</button></td>
        {/* <td><button onClick={e=>download(e,index,val._id)} className='btn btn-primary' style={{marginLeft:"190px"}}>Generate Invoice</button></td> */}
    </tr>
    )}
     
  </tbody>
</table>

{editField?"":
<div className="col-md-6  bg-light" style={{marginTop:"50px",width:"525px",marginLeft:"200px"}}>
  <form >
    <h3 className='text-center'>Edit Invoice</h3>
  <span>Receivers Name-</span><span style={{fontStyle:"italic",fontWeight:"bolder"}}>{id1.receiver_name}</span><br/>
  <span>Invoice Number-</span><span style={{fontStyle:"italic",fontWeight:"bolder"}}>{id1.invoice_number}</span><br/><br/>
  
  <span>Status- &nbsp;&nbsp;&nbsp;</span>
         <select onChange={event => statusselect(event)} style={{height:"35px"}}>
           <option value="unpaid" >Unpaid</option>
           <option value="paid" >Paid</option>
           <option value="partially-paid" >Partially-Paid</option>
         </select>
         
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <input type="submit" className='btn btn-dark' value="Submit" onClick={newStatus}/>
         </form>
         </div>
}

                        </div>
                </div>
        </div>
    )
}
