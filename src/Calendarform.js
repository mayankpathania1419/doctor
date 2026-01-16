import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap'





const Calendarform = () => {

    const [showStartCal, setShowStartCal] = useState(false)
    const [showEndCal, setShowEndCal] = useState(false)
    const [data, setData] = useState([])
    const [editData, setEditData] = useState({})
    const [editRowId, setEditRowId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/items/appointment')
                setData(response.data.data)
            } catch (error) {
                console.log("error created")
            }
        }
        fetchData()
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

    const handleDelete = async (id) => {
        try {
            axios.delete(`http://localhost:8000/api/items/appointment/${id}`)
            setData(data.filter((row) => row._id !== id))
        } catch (error) {
            console.log("error created", error)
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setEditData({ ...editData, [name]: value })
    }

    return (
        <div>
            <button className="appointment-button" onClick={handleAdd}>Add</button>

            <Table className='calendar-table' striped bordered hover style={{ width: "85% " }}>
                <thead className='table-success'>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>startDate</th>
                        <th>endDate</th>
                        <th>role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row._id} className='table-success'>
                            {editRowId === row._id ? (
                                <>
                                    <td><input name="name" value={editData.name} onChange={handleInputChange} /></td>
                                    <td><input name="mobile" value={editData.mobile} onChange={handleInputChange} /></td>
                                    <td><input name="email" value={editData.email} onChange={handleInputChange} /></td>
                                    <td><input name="address" value={editData.address} onChange={handleInputChange} /></td>
                                    <td><input name="startDate" value={editData.startDate} onChange={handleInputChange} /></td>
                                    <td><input name="endDate" value={editData.endDate} onChange={handleInputChange} /></td>
                                    <td><input name="role" value={editData.role} onChange={handleInputChange} /></td>
                                </>
                            ) : (
                                <>
                                    <td>{row.name}</td>
                                    <td>{row.mobile}</td>
                                    <td>{row.email}</td>
                                    <td>{row.address}</td>
                                    <td>{row.startDate ? new Date(row.startDate).toDateString() : ""}</td>
                                    <td>{row.endDate ? new Date(row.endDate).toDateString() : ""}</td>
                                    <td>{row.role}</td>
                                    <td>

                                        <button className='appointment-edit-button' onClick={() => handleEdit(row)}>Edit</button>
                                        <button className='appointment-delete-button' onClick={() => handleDelete(row._id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal className='formik-border'
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}>

                <Formik
                    initialValues={{
                        name: editData.name || "",
                        mobile: editData.mobile || "",
                        email: editData.email || "",
                        address: editData.address || "",
                        startDate: editData.startDate ? new Date(editData.startDate) : null,
                        endDate: editData.endDate ? new Date(editData.endDate) : null,
                        role: editData.role || ""
                    }}
                    enableReinitialize={true}

                    validate={(values) => {
                        const errors = {}

                        if (!values.name) {
                            errors.name = "field are required"
                        }
                        if (!values.mobile) {
                            errors.mobile = "field are required"
                        }
                        if (!values.email) {
                            errors.email = "email are required"
                        }
                        if (!values.address) {
                            errors.address = "address are required"
                        }
                        if (!values.startDate) {
                            errors.startDate = "field are required"
                        }
                        if (!values.endDate) {
                            errors.endDate = "field are required"
                        }
                        if (!values.role) {
                            errors.role = "field are required"
                        } return errors;
                    }}



                    onSubmit={async (values, { setSubmitting }) => {
                        console.log("Form values", values)
                        try {
                            let updatedData = data

                            if (editRowId) {
                                await axios.put(`http://localhost:8000/api/items/appointment/${editRowId}`, values)
                                updatedData = data.map((row) =>
                                    row._id === editRowId ? { ...row, ...values } : row
                                )
                            } else {

                                const response = await axios.post('http://localhost:8000/api/items/appointment', values)
                                console.log("response", response.data)

                                updatedData = [...updatedData, { id: Date.now(), ...values }]

                            }
                            setData(updatedData)
                            setIsModalOpen(false)
                            setSubmitting(false)
                            setEditRowId(null)

                        } catch (error) {
                            console.log("there is any error", error)
                        }
                    }}
                >

                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue

                    }) => (
                        <Form className='calendar-form' onSubmit={handleSubmit}>


                            <h className='doctor-heading'>Doctor Appointment</h>
                            <br></br>
                            <br></br>

                            <label>Name</label>
                            <br />
                            <input type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange} />
                            <br></br>
                            {errors.name && touched.name && (
                                <span className='appointment-error'>{errors.name}
                                </span>)}
                            <br></br>
                            <label>Mobile</label>
                            <br></br>
                            <input type='text'
                                name="mobile"
                                value={values.mobile}
                                onChange={handleChange} />
                            <br></br>
                            {errors.mobile && touched.mobile && (
                                <span className='appointment-error'>{errors.mobile}
                                </span>)}
                            <br></br>
                            <label>Email</label>
                            <br></br>
                            <input type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange} />
                            <br></br>
                            {errors.email && touched.email && (
                                <span className='appointment-error'>{errors.email}
                                </span>)}

                            <br></br>
                            <label>Address</label>
                            <br></br>
                            <input type="text"
                                name="address"
                                value={values.address}
                                onChange={handleChange} />
                            <br></br>
                            {errors.address && touched.address && (
                                <span className='appointment-error'>{errors.address}
                                </span>)}

                            <br></br>


                            {/* 
                    <p>
                        selected date:{""}
                        {values.date ? values.date.toDateString():"None"}
                    </p>

                    <Calendar
                        value={values.date}
                        onChange={(date) => setFieldValue("date", date)}
                        className="react-calendar"
                       />

                    <ErrorMessage name="date" component="div" className="error" /> */}


                            <label>Start Date</label>
                            <div>
                                <input
                                    type='text'
                                    readOnly
                                    value={values.startDate ? values.startDate.toDateString() : ""}
                                    placeholder="enter start date"
                                    onClick={() => setShowStartCal(true)}
                                />
                                {/* <button type="button" className="start-button" onClick={()=>setShowStartCal(!showStartCal)}>
                        start
                    </button> */}
                            </div>

                            {showStartCal && (
                                <Calendar
                                    value={values.startDate}
                                    onChange={(date) => {
                                        setFieldValue("startDate", date)
                                        setShowStartCal(false)

                                    }}
                                />

                            )}

                            {errors.startDate && touched.startDate && (
                                <span className='appointment-error'>{errors.startDate}</span>
                            )}


                            <br />

                            <label>End Date</label>
                            <div>
                                <input
                                    readOnly
                                    value={values.endDate ? values.endDate.toDateString() : ""}
                                    placeholder="enter end Date"
                                    onClick={() => setShowEndCal(true)}
                                />
                                {/* <button type="button" className='end-button' onClick={()=>setShowEndCal(!showEndCal)}>
                            End</button> */}
                            </div>

                            {showEndCal && (
                                <Calendar
                                    value={values.endDate}
                                    minDate={values.startDate}
                                    onChange={(date) => {
                                        setFieldValue("endDate", date)
                                        setShowEndCal(false)
                                    }}
                                />
                            )}
                            {errors.endDate && touched.endDate && (
                                <span className='appointment-error'>{errors.endDate}</span>
                            )}


                            <br />

                            <label>role</label>
                            <br></br>
                            <input className='appointment-input' type='text'
                                name="role"
                                value={values.role}
                                onChange={handleChange} />
                            <br></br>

                            {errors.role && touched.role && (
                                <span className='appointment-error'>{errors.role}</span>
                            )}



                            <button className="calendar-button" type="submit">Submit</button>




                        </Form>
                    )}

                </Formik>
            </Modal>
        </div>

    )
}
export default Calendarform
