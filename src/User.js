import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



function User() {
    const [data, setData] = useState([])
    const [editRowId, setEditRowId] = useState(null)
    const [editData, setEditData] = useState({})


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/items', {
                    headers: {
                        Authorization: `${localStorage.getItem('usertoken')}`
                    }

                })
                console.log(response.data)
                setData(response.data.data)
            } catch (error) {
                console.log("updated error", error)
            }
        }
        fetchData();
    }, [])

    const handleEdit = (row) => {
        setEditRowId(row._id)
        setEditData(row)

    }

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8000/api/items/${editRowId}`, editData)
            const updatedData = data.map((row) =>
                row._id === editRowId ? { ...row, ...editData } : row
            )
            setData(updatedData)
            setEditRowId(null)
        } catch (error) {
            console.log("error created", error)
        }
    }


    const handleInputChange = (event) => {
        const { name, value } = event.target
        setEditData({ ...editData, [name]: value })
    }

    const handleDelete = async (id) => {
        try {
            axios.delete(`http://localhost:8000/api/items/${id}`);
            setData(data.filter((row) => row._id !== id))
        } catch (error) {
            console.log("error created", error)
        }
    };

    return (


        <Table className='mt-4' striped bordered hover style={{ width: "80%" }}>
            <thead className='table-dark' >
                <tr>
                    <th>Id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>password</th>
                    <th>mobile</th>
                    <th>gender</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row._id}>
                        {editRowId === row.id ? (
                            <>
                                <td><input name="Id" value={editData.Id} onChange={handleInputChange} /></td>
                                <td><input name="name" value={editData.name} onChange={handleInputChange} /></td>
                                <td><input name="email" value={editData.email} onChange={handleInputChange} /></td>
                                <td><input name="password" value={editData.password} onChange={handleInputChange} /></td>
                                <td><input name="mobile" value={editData.mobile} onChange={handleInputChange} /></td>
                                <td><input name="gender" value={editData.gender} onChange={handleInputChange} /></td>
                                <td><button onClick={handleSave}></button></td>
                            </>
                        ) : (
                            <>
                                <td>{row.Id}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.password}</td>
                                <td>{row.mobile}</td>
                                <td>{row.gender}</td>

                                <td>
                                    <button style={{ color: "red" }} onClick={() => handleEdit(row)}>Edit</button>
                                    <button style={{ color: "red", backgroundColor: "blue" }} onClick={() => handleDelete(row._id)}>Delete</button>



                                </td>

                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </Table>



    )
}
export default User;


