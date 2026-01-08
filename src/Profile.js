import React from 'react'
import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { Table } from 'react-bootstrap'
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'


const Profile = () => {
    const [data, setData] = useState([])
    const [editRowId, setEditRowId] = useState(null)
    const [editData, setEditData] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/items/Profile')



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
        setIsModalOpen(true)
    }

    const handleAdd = () => {
        setEditRowId(null)
        setEditData({})
        setIsModalOpen(true)
    }


    const handleInputChange = (event) => {
        const { name, value } = event.target
        setEditData({ ...editData, [name]: value })
    }


    return (
        <div>
            <button className='button-add' onClick={handleAdd}>Add</button>
            <Table className='table-profile' striped bordered hover style={{ width: "80%" }} >
                <thead className='table-dark'>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>phone number</th>
                        <th>email</th>
                        <th>address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row._id} className='table-dark'>
                            {editRowId === row._id ? (
                                <>
                                    <td><input name="id" value={editData.id} onChange={handleInputChange} /></td>
                                    <td><input name="name" value={editData.name} onChange={handleInputChange} /></td>
                                    <td><input name="phone number" value={editData.mobile} onChange={handleInputChange} /></td>
                                    <td><input name="email" value={editData.email} onChange={handleInputChange} /></td>
                                    <td><input name="address" value={editData.address} onChange={handleInputChange} /></td>

                                </>
                            ) : (
                                <>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.mobile}</td>
                                    <td>{row.email}</td>
                                    <td>{row.address}</td>
                                    <td>
                                        <button onClick={() => handleEdit(row)}>Edit</button>

                                    </td>
                                </>

                            )}

                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal className='Modal'
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}>
                <Formik
                    initialValues={{
                        id: editData.id || "", name: editData.name || "", mobile: editData.mobile, email: editData.email || "",
                        address: editData.address
                    }}
                    enableReinitialize={true}
                    validate={(values) => {
                        const errors = {}
                        if (!values.id) {
                            errors.id = "field are required"
                        }
                        if (!values.name) {
                            errors.name = "field are required"
                        }
                        if (!values.mobile) {
                            errors.mobile = "field are required"
                        }
                        if (!values.email) {
                            errors.email = "field are required"
                        } return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            let updatedData = data

                            if (editRowId){
                                await axios.put(`http://localhost:8000/api/items/Profile/${editRowId}`, values)
                            updatedData = data.map((row) =>
                                row._id === editRowId ? { ...row, ...values } : row
                            )
                        }else{
                        const response=await axios.post('http://localhost:8000/api/items/Profile',values)
                        console.log("response",response.data)
 
            
                    updatedData = [...updatedData, { id: Date.now(), ...values }]
                }
    
                setData(updatedData)
                setSubmitting(false)
                setIsModalOpen(false)
                setEditRowId(null)
              }catch(error){
                    console.log("profile not create successfully", error)
                }
    
           
        }}
        >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit}>

                        <label>id</label>
                        <input type="text"
                            name="id"
                            value={values.id}
                            onChange={handleChange} />

                        {errors.id && touched.id && errors.id}

                        <br></br>
                        <label>name</label>
                        <input type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange} />

                        {errors.name && touched.name && errors.name}

                        <label>phone number</label>
                        <input type="text"
                            name="mobile"
                            value={values.mobile}
                            onChange={handleChange} />

                        {errors.mobile && touched.mobile && errors.mobile}

                        <label>email</label>
                        <input type="text"
                            name="email"
                            value={values.email}
                            onChange={handleChange} />

                        {errors.email && touched.email && errors.email}

                        <label>address</label>
                        <input type="text"
                            name="address"
                            value={values.address}
                            onChange={handleChange} />

                        {errors.address && touched.address && errors.address}

                        <button style={{ color: "red" }} type='submit' disabled={isSubmitting}>Submit</button>

                    </form>
                )}
            </Formik>
        </Modal>
        </div >
    )
}
export default Profile;