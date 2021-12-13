import React, { useState } from 'react'
import { VscAdd } from 'react-icons/vsc'
import { VscChromeMinimize } from 'react-icons/vsc'
import axios from 'axios'
import NavbarDash from './NavbarDash';
const regForName = RegExp(/^[A-Za-z]/);
const regForQuantity = RegExp(/^[0-9]/);

export default function InvoiceForm() {
    const [inputField, setInputField] = useState([
        { item: "", description: "", quantity: "", price: "", discount: "" },

    ])
    const [name, setName] = useState("")
    const [address, setAdd] = useState("")
    const [date, setDate] = useState("")
    const add = () => {
        setInputField([...inputField, { item: "", description: "", quantity: "", price: "", discount: "" }])
    }
    const [err, setErr] = useState("")
    const subtract = (index) => {
        const values = [...inputField]
        values.splice(index, 1)
        setInputField(values)
    }
    const handleChange = (index, event) => {
        event.preventDefault();
        // console.log(index," ",event.target.name)
        const { name, value } = event.target
        const values = [...inputField];

        values[index][name] = value;
        setInputField(values)



    }
    const handle = (e) => {
        console.log(e.target.value)
        switch (e.target.name) {
            case 'name': setName(e.target.value)
                break;
            case 'address': setAdd(e.target.value)
                break;
            case 'due_date': setDate(e.target.value)
                break;
            default: break;
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log("InputFields" + inputField)
        console.log(name);
        console.log(address)
        console.log(date)
        console.log(inputField)

        const URL = "http://localhost:8000/api/add"
        axios.post(URL, {
            item: inputField,
            date:date,
            name:name,
            address:address,
            user:localStorage.getItem("userdetails")
        })
            .catch(err => { console.log(err) })
            alert("Invoice Data Added!!")
    }
    return (
        <div className='container-fluid'>
            <NavbarDash/>
            <div className='container row'>
                <div className='col-md-6 bg-light' style={{ marginLeft: "320px", marginTop: "50px", width: "730px" }}>
                    <h3 className='text-center'>Enter Invoice Data</h3>
                    <form method='post'>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">Receive's Name</span>
                            <input type="text" class="form-control" aria-label="Sizing example input" name="name" aria-describedby="inputGroup-sizing-default" onChange={handle} />

                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default"><span>Receiver's Address</span><span>(Company Name)</span></span>
                            <input type="text" class="form-control" aria-label="Sizing example input" name="address" aria-describedby="inputGroup-sizing-default" onChange={handle} />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">Due Date</span>
                            <input type="date" class="form-control" aria-label="Sizing example input" name="due_date" aria-describedby="inputGroup-sizing-default" onChange={handle} />
                        </div>
                        <table class="table" style={{ width: "700px" }}>
                            <thead>

                                <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">description</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">price</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col" colSpan={2}></th>

                                </tr>
                            </thead>
                            <tbody>
                                {inputField.map((input, index) =>
                                    <tr >
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td> <input type="text" class="form-control" name="description" onChange={event => handleChange(index, event)} placeholder="Enter Quantity" value={input.description}></input>
                                        </td>
                                        <td><input type="text" class="form-control" name="quantity" onChange={event => handleChange(index, event)} placeholder="Enter Quantity" value={input.quantity} />

                                        </td>
                                        <td><input type="text" class="form-control" name="price" onChange={event => handleChange(index, event)} placeholder="Enter price" value={input.price} /></td>
                                        <td><input type="text" class="form-control" name="discount" onChange={event => handleChange(index, event)} placeholder="Enter Discount" value={input.discount} /></td>
                                        <td><a onClick={add}><VscAdd /></a></td>
                                        <td><a onClick={subtract}><VscChromeMinimize /></a></td>
                                    </tr>)}


                            </tbody>
                        </table>
                        <button type="submit" class="btn btn-dark" onClick={handleSubmit}>Add</button>
                    </form>

                </div>
            </div>

        </div>
    )
}
