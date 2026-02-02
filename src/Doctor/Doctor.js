import React from 'react'
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import './doctor.css'
import {FaEdit} from 'react-icons/fa'
import {FaTrash} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import { MdOutlineVisibility } from 'react-icons/md';


function Doctor() {

    const navigate=useNavigate()
    const [data, setData] = useState([])
    const [editRowId, setEditRowId] = useState(null)
    const [editData, setEditData] = useState({})


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/items/doctor')
                setData(response.data.data)
            } catch (error) {
                console.log("error created", error)
            }
        }
        fetchData()
    }, [])


     const handleView=(id)=>{
        navigate(`/doctor/detail/${id}`)
     }
    // const handleEdit = (row) => {
    //     setEditRowId(row._id)
    //     setEditData(row)
    // }
    // const handleSave = async() => {
    //     try {
    //         await axios.put(`http://localhost:8000/api/items/doctor/${editRowId}`,editData)
    //         const updatedData = data.map((row) =>
    //             row._id === editRowId ? { ...row, ...editData } : row
    //         )
    //         setData(updatedData)
    //         setEditRowId(null)
    //     } catch (error) {
    //         console.log("error developed", error)
    //     }
    // }

    const handleDelete = (id) => {
        try {
            axios.delete(`http://localhost:8000/api/items/doctor/${id}`)
            setData(data.filter((row) => row._id !== id))
        } catch (error) {
            console.log("error developed", error)
        }

    }
    // const handleInputChange = (event) => {
    //     const { name, value } = event.target
    //     setEditData({ ...editData, [name]: value })
    // }

    return (
<div className='table-container'>
        <Table className='doctor-table'  bordered hover responsive>
            <thead >
                <tr>
                    <th>Name</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Professionalism</th>
                    <th>Address</th>
                    <th>Photo</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row._id} >
                        {/* {editRowId === row._id ? (
                            <>
                                <td><input name="name" value={editData.name} onChange={handleInputChange} /></td>
                                <td><input name="lastname" value={editData.lastname} onChange={handleInputChange}/></td>
                                <td><input name="email" value={editData.email} onChange={handleInputChange}/></td>
                                <td><input name="phone" value={editData.phone} onChange={handleInputChange} /></td>
                                <td><input name="professionalism" value={editData.professionalism} onChange={handleInputChange} /></td>
                                <td><input name="address" value={editData.address} onChange={handleInputChange} /></td>
                                <td><img src={`http://localhost:8000/uploads/${row.image}`} className='doctor-avatar' alt="doctor" /></td>
                                <td>

                                    <button className='action-btn btn-save' onClick={handleSave} >Save</button>
                                </td>
                            </>
                        ) : ( */}
                            <>
                                <td>{row.name}</td>
                                <td>{row.lastname}</td>
                                <td>{row.email}</td>
                                <td>{row.phone}</td>
                                <td>{row.professionalism}</td>
                                <td>{row.address}</td>
                                <td> <img src={`http://localhost:8000/uploads/${row.image}`}  className='doctor-avatar' alt="doctor" /> </td>
                                <td>
                                    <div className='action-cell'>
                                    <button  className='action btn btn-edit' onClick={() => navigate(`/doctor/edit/${row._id}`)}><FaEdit></FaEdit></button>
                                    <button className='action btn btn-delete' onClick={() => handleDelete(row._id)}><FaTrash></FaTrash></button>
                                    <button className='action btn btn-view' onClick={()=>handleView(row._id)}> <MdOutlineVisibility></MdOutlineVisibility></button>
                                    </div>
                                </td>
                            </>

                    
                    </tr>
                ))}

            </tbody>
        </Table>
</div>
    )


}
export default Doctor;