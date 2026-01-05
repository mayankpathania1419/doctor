import React from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import {toast} from 'react-toastify'


const Attend = () => (

    <div className="attendance">
        <img className="image" src="image/doctor.jpg"  alt="doctor attendance illustration"></img>
        <h1>doctor </h1>
        <h2>attendance</h2>
     
        
        <Formik
            initialValues={{ name: "", email: "", password: "", mobile: "", gender: "" }}
            validate={values => {
                let errors = {}
                if (!values.name) {
                    errors.name = "field are required"
                }

      

                if (!values.email) {
                    errors.email = "field are required"
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = "invalid email"
                }

                if (!values.password) {
                    errors.password = "field are required"
                } else if (!/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,}$/i.test(values.password)) {
                    errors.password = "invalid Password"
                }

                if (!values.mobile) {
                    errors.mobile = "field are required"
                } else if (/^d{10}$/.test(values.mobile)) {
                    errors.mobile = "invalid Mobile"
                }
                
                if(!values.gender){
                    errors.gender="input field required"
                }return errors;
            }}

            onSubmit={async(values, { setSubmitting }) => {
                  
       
                 console.log(">>>>parameters of data<<<", values)
            
            try{
                const response=await axios.post('http://localhost:8000/api/items',values)
                console.log("API response",response.data)
                
            }
                 catch(error){
                    toast.error("not update successfully")
                 }finally{
                    setSubmitting(false)
                 }
            }}
        >
            {({
                values,
                errors,
                touched,
                isSubmitting,
                handleChange,
                handleSubmit
            }) => (
               
                <form onSubmit={handleSubmit}>
                    
                    <div className='label'>
                        <label>Firstname</label>
                    </div>
                    <div>
                        <input  className="data" type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange} />
                            </div>
                   <div className='errors'>
                        {errors.name && touched.name && errors.name}
                    </div>


                    <br></br>
                   

                    



                    <div className='label'>
                        <label>Email</label>
                    </div>
                    <div >
                        <input className='data' type='text'
                            name="email"
                            value={values.email}
                            onChange={handleChange} />
                    </div>

                    <div className='errors'>
                        {errors.email && touched.email && errors.email}
                    </div>

                    <br></br>
                    <div className='label'>
                        <label>Password</label>
                    </div>
                    <div >
                        <input className='data'type='text'
                            name="password"
                            value={values.password}
                            onChange={handleChange} />
                    </div>
                    <div className='errors'>
                        {errors.password && touched.password && errors.password}
                    </div>
                    <br></br>


                  <div className='label'>
                        <label>Mobile</label>
                    </div>
                    <div >
                        <input className='data' type='text'
                            name="mobile"
                            value={values.mobile}
                            onChange={handleChange} />
                    </div>

                    <div className='errors'>
                        {errors.mobile && touched.mobile && errors.mobile}
                    </div>


                    <br></br>
                    <div>
                        <label>gender</label>
                    </div>
                    <div>
                        <input type='radio'
                            name="gender"
                            value="Male"
                            id="Male"
                            onChange={handleChange} />
                        <lable>Male</lable>

                        <input type='radio'
                            name="gender"
                            value="Female"
                            id="Female"
                             onChange={handleChange} />
                        <label>Female</label>




                    </div>
                    <br></br>
                    <button type='submit' disabled={isSubmitting}>Submit</button>
                   

                </form>
            )}
        </Formik>
    </div>
    

)
export default Attend;