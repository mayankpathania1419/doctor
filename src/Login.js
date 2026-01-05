import { Formik } from 'formik';
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'



const Login = () => {
    const navigate = useNavigate()

    return (

     <div className='template'>
            <img src="/image/pexelsimage.jpg" alt='natural beauty'></img>  
            <h1 className='moments'>Capturing Moments</h1>
            <h2 className='memories'>Creating Memories</h2>
            <div className='border'>
                <h1 className='titles'>EmpIo</h1>
                <div className="form-border">
                    <p className='login'>Log in</p>
                    <p className='signup'><Link to="/signup">signup</Link></p>
                    <Formik
                        initialValues={{ email: "", password: "" }}




                        validate={values => {
                            const errors = {}

                            if (!values.email) {
                                errors.email = "email is required"
                            }

                            if (!values.password) {
                                errors.password = "password is required"
                            } return errors
                        }}


                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            try {
                           
                                console.log('>>>>>>>>>>>values of login>>>>>>>>', values)
                                const response = await axios.post('http://localhost:8000/api/items/login', values)
                                console.log("response", response.data)


                                const data = response.data
                                window.localStorage.setItem('usertoken', data.token)
                            
                                toast.success("login successfully")
                                navigate('/layout', { replace: true })
                                resetForm()

                            } catch (error) {

                                toast.error(error.response?.data?.message || "Invalid email or password");
                            } finally {
                                setSubmitting(false)
                            }



                        }}


                    >
                        {({
                            errors,
                            values,
                            touched,
                            isSubmitting,
                            handleSubmit,
                            handleChange,
                            resetForm

                        }) => (
                            <form onSubmit={handleSubmit}>



                                <label className='label1'>your email</label>
                                <br></br>
                                <input className="text-border" type='text'
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange} />
                                <br></br>
                                {errors.email && touched.email && errors.email}

                                <br></br>

                                <label className='label2'>your Password</label>
                                <br></br>
                                <input className='text-border' type='password'
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange} />
                                <br></br>
                                {errors.password && touched.password && errors.password}
                                <br></br>
                                <br></br>
                                <button className='submit-button' type='submit' disabled={isSubmitting}>Log in</button>
                                <button type='reset' onClick={() => resetForm()}>reset</button>

                            </form>
                        )}
                    </Formik>
                    <p className='p-1'>I forgot my Password</p>

                    {/* <p>Do you have signup Account <a href="/signup">sign up here</a> </p> */}
                </div>
            </div>
        </div>
    )
}
export default Login;