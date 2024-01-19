import React, { useState,useEffect } from "react";
import './adduser.css'
import { useFormik } from "formik";
import { registerUser, getAllWorkerNames, getOneEmployee, updateEmployee,deleteEmployee, resetPassword  } from "../../helper/helper";
import toast, { Toaster } from 'react-hot-toast';
import WindalsNav from "../navbar";
import * as Yup from "yup";
import { Alert,Button,Form, Modal } from "react-bootstrap";
import Footer from '../footer';
import { useLocation } from 'react-router-dom'
import Select from 'react-select'

function WorkerReg() {
  const today = new Date();
  const location = useLocation()
  const { type } = location.state

  const [workerNames,setWorkerNames] = useState([])
  const [workerUserName,setWorkerUserName] = useState("")
  const [showResetPasswordModal,setShowResetPasswordModal] = useState(false)
  const [resetPasswordData,setResetPasswordData] = useState({
    userName: "",
    newPassword: "",
    confirmNewPassword: ""
  })

  const accessOptions = ["View User", "Add User", "Update User", " Delete User", " View Product", "Add Product", "Update Product", "Delete Product",
  "View Station", "Add Station", "Update Station", "Delete Station", "Allocate Station To Worker", "Allocate Next Station", 
  "View Shifs", "Add Shifts", "Update Shifts", "Delete Shifts","Supervisor","Admin Panel"] 
  
  const [accessGiven, setAccessGiven] = useState(new Array(20).fill(false));

  const userValidationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    firstName: Yup.string().required("Username is required"),
    lastName: Yup.string().required("Username is required"),
    nickName: Yup.string().required("Username is required"),
    password: type==="0" && Yup.string().required("Username is required"),
    confirmPassword: type==="0" && Yup.string().required("Username is required"),
    designation: Yup.string().required("Username is required"),
    mobileNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .test("is-positive", "Mobile number must be positive", (value) => {
        return parseInt(value) > 0;
      }),
    joiningDate: Yup.date()
      .required()
      .max(today, "Joining date cannot be in the future")
  })

  const formik = useFormik({
    initialValues:{
      employeId:"",
      userName:"",
      firstName:"",
      lastName:"",
      nickName:"",
      password:"",
      confirmPassword:"",
      designation:"",
      joiningDate:( type === "0" ? today.toISOString().substring(0, 10):""), // Set the initial value to the current date
      mobileNo:"",
      accessGiven: "00000000000000000000"
    },
    validationSchema: userValidationSchema,
    validateOnBlur: false,
    onSubmit: values => {
      // console.log("Access Settings")
      // console.log(accessGiven)
      // console.log(values.accessGiven)
      values.accessGiven = accessGiven.map(val => val ? "1" : "0").join("");
      // console.log(values);
      console.log("test")
      if(type==="1")
      {
        values.accessGiven = accessGiven.map(val => val ? "1" : "0").join("");
        const updateEmployeePromise = updateEmployee(values)
        toast.promise(updateEmployeePromise,{
          loading:"Updating data",
          success: (result) => {
            setWorkerUserName("")
            formik.resetForm()
            setAccessGiven(new Array(accessOptions.length).fill(false))
            getWorkerNames()
            return result.msg
          },
          error: (err) => err.msg 
        })
      }
      else if(type==="0")
      {
        const registerUserPromise = registerUser(values)
        toast.promise(registerUserPromise,{
          loading: "Registering user",
          success: (reuslt) => {
            formik.resetForm()
            setAccessGiven(new Array(accessOptions.length).fill(false))
            getWorkerNames()
            return reuslt.msg
          },
          error: err => err.msg
        })
      } 
    }
  })

  useEffect(()=>{
    formik.resetForm()
    setWorkerUserName("")
    setAccessGiven(new Array(accessOptions.length).fill(false))
    if(type==="1" || type==="2")
    {
      // console.log("Action:",type)
      getWorkerNames()
    } 
  },[type])

  const getWorkerNames = () => {
    const getWorkerNamePromise = getAllWorkerNames()
      getWorkerNamePromise.then((result)=>{
        setWorkerNames(result)
      }).catch((err)=>{
        toast.error(err.msg)
      })
    }
  

  const searchWorker = () => {
    if(workerUserName==="")
    {
      return toast.error("Select User first")
    }
    console.log(workerUserName);
    const getWorkerDataPromise = getOneEmployee(workerUserName.value)
    getWorkerDataPromise.then((result)=>{
      // console.log({result:result});
      formik.setFieldValue("employeeId",result[0].employee_id)
      formik.setFieldValue("userName",result[0].user_name)
      formik.setFieldValue("firstName",result[0].first_name)
      formik.setFieldValue("lastName",result[0].last_name)
      formik.setFieldValue("nickName",result[0].nick_name)
      formik.setFieldValue("designation",result[0].designation)
      formik.setFieldValue("mobileNo",result[0].mobile_no)
      formik.setFieldValue("joiningDate",result[0].joining_date.substring(0, 10))
      formik.setFieldValue("accessGiven",result[0].access_given)
      const accessArray = accessOptions.map((option, index) => result[0].access_given[index] === "1");
      setAccessGiven(accessArray);
    })
  }

  const handleEmployeeDelete = () => {
    const deleteEmployeePromise = deleteEmployee(formik.values.employeeId)
    toast.promise(deleteEmployeePromise,{
      loading:"Updating data",
      success: (result) => {
        setWorkerUserName("")
        formik.resetForm()
        getWorkerNames()
        return result.msg
      },
      error: (err) => err.msg 
    }) 
  }

  const handleAccessOptionCheck = (index) => {
    const updatedAccess = [...accessGiven];
    updatedAccess[index] = !updatedAccess[index];
    setAccessGiven(updatedAccess);
  }

  const openResetPasswordModal = () => {
    setShowResetPasswordModal(true)
  }

  const closeResetPasswordModal = () => {
    setShowResetPasswordModal(false)
    setResetPasswordData({
      userName: "",
      newPassword: "",
      confirmNewPassword: ""
    })
  }

  const handleClickOFResetPassword = () => { 
    if(resetPasswordData.newPassword !== resetPasswordData.confirmNewPassword){
      return toast.error("Password and confirm-password do not match.")
    }
    const resetPasswordPromise = resetPassword(resetPasswordData)
    toast.promise(resetPasswordPromise,{
      loading: "Resetting password",
      success: (result) => {
        closeResetPasswordModal()
        setResetPasswordData({
          userName: "",
          newPassword: "",
          confirmNewPassword: ""
        })  
        return result.msg
      },
      error: (err) => err.msg
    })
  }

  const handleResetPasswordModalChange = (e) => {
    const {name,value} = e.target
    setResetPasswordData((PrevData)=>{
      return {
        ...PrevData,
        [name]:value
      }
    })
  }
  
  console.log(accessGiven);
  return(

    <div>
      <WindalsNav />
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="adduser">
        <form className="workerreg">
          <h1 className="heading">{type==="0" ? "User Registration" : type==="1" ? "User Update" : "User Delete"}</h1>
          
          {
            type !=0 && 
            <div className='form' style={{margin: "10px"}}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ width: 300 }}>
                <Form.Label>Username</Form.Label>
                <Select
                        options={workerNames.map((worker) => ({ label: worker.user_name, value: worker.user_name }))}
                        value={workerUserName}
                        onChange={(data) => {
                          setWorkerUserName(data)
                        }}
                        isSearchable={true}
                    />
              </Form.Group>
    
              <Button variant="success" type="button" onClick={searchWorker}>
                Search User
              </Button>
            </div>
          }
          
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           
            <div className="worklist">
              
              <div className="inplab">
                <label htmlFor="">User ID</label>
                <input type="text" placeholder="" disabled={type==="2" || (type==="1" && workerUserName==="")?true:false} />
              </div>

              <div className="inplab">
                <label htmlFor="">Username</label>
                <input type='text' value={formik.values.userName} name="userName" onChange={formik.handleChange} disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}/>
                {formik.errors.userName && formik.touched.userName ? (
                  <Alert variant="danger" className="error-message">{formik.errors.userName}</Alert>
                ) : null}
              </div>
              
              <div className="inplab">
                <label htmlFor="">First Name</label>
                <input type='text' value={formik.values.firstName} name="firstName" onChange={formik.handleChange} disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}/>
                {formik.errors.firstName && formik.touched.firstName ? (
                  <Alert variant="danger" className="error-message">{formik.errors.firstName}</Alert>
                ) : null}
              </div>

              <div className="inplab">
                <label htmlFor="">Last Name</label>
                <input type='text' value={formik.values.lastName} name="lastName" onChange={formik.handleChange} disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}/>
                {formik.errors.lastName && formik.touched.lastName ? (
                  <Alert variant="danger" className="error-message">{formik.errors.lastName}</Alert>
                ) : null}
              </div>
            
            </div>
            
            <div className="worklist">

              <div className="inplab">
                <label htmlFor="">Nickname</label>
                <input type='text' value={formik.values.nickName} name="nickName" onChange={formik.handleChange} disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}/>
                {formik.errors.nickName && formik.touched.nickName ? (
                  <Alert variant="danger" className="error-message">{formik.errors.nickName}</Alert>
                ) : null}
              </div>
              
              <div className="inplab">
                <label htmlFor="">Mobile Number</label>
                <input type="text" value={formik.values.mobileNo} name="mobileNo" onChange={formik.handleChange} disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}/>
                {formik.errors.mobileNo && formik.touched.mobileNo ? (
                  <Alert variant="danger" className="error-message">{formik.errors.mobileNo}</Alert>
                ) : null}
              </div>

              {type === "0" && <div className="inplab">
                <label htmlFor="">Password</label>
                <input type='password' value={formik.values.password} name="password" onChange={formik.handleChange} />
                {formik.errors.password && formik.touched.password ? (
                  <Alert variant="danger" className="error-message">{formik.errors.password}</Alert>
                ) : null}
              </div>}

              {type === "0" && <div className="inplab">
                <label htmlFor="">Confirm Password</label>
                <input type='password' value={formik.values.confirmPassword} name="confirmPassword" onChange={formik.handleChange} />
                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                  <Alert variant="danger" className="error-message">{formik.errors.confirmPassword}</Alert>)
                  : null}
              </div>}

            </div>

            <div className="worklist">
            
              <div className="inplab">
                  <label htmlFor="">Designation</label>
                  <input type='text' value={formik.values.designation} name="designation" onChange={formik.handleChange} disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}/>
                  {formik.errors.designation && formik.touched.designation ? (
                    <Alert variant="danger" className="error-message">{formik.errors.designation}</Alert>
                  ) : null}
              </div>

              <div className="inplab" style={{width:180}}>
                <label>Joining date</label>
                <input type='date' value={formik.values.joiningDate} name="joiningDate" onChange={formik.handleChange} disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}/>
                {formik.errors.joiningDate && formik.touched.joiningDate ? (
                  <Alert variant="danger" className="error-message">{formik.errors.joiningDate}</Alert>
                ) : null}
              </div>
            
            </div>

          </div>
          <br />
        </form>
        
        <div className="checkbox-groups">
          <hr />
          <div className="checkbox-row">
            <h5>User Access - </h5>
            {accessOptions.slice(0, 4).map((option, index) => (
              <div key={option} style={{ marginLeft: 10, marginRight: 10 }}>
                  <input
                    type="checkbox"
                    checked={accessGiven[index]}
                    onChange={() => handleAccessOptionCheck(index)}
                    disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}
                  />
                <label className="checkbox-label" style={{marginLeft:10}}>
                  {option}
                </label>
              </div>
            ))}
          </div>
          <hr />
          <br />
          <div className="checkbox-row">
            <h5>Product Access - </h5>
            {accessOptions.slice(0, 4).map((option, index) => (
              <div key={option} style={{ marginLeft: 10, marginRight: 10 }}>
                <input
                  type="checkbox"
                  checked={accessGiven[index + 4]}
                  onChange={() => handleAccessOptionCheck(index + 4)}
                  disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}
                />
                <label className="checkbox-label" style={{marginLeft:10}}>
                  {option}
                </label>
              </div>
            ))}
          </div>
          <hr />
          <br />
          <div className="checkbox-row">
            <h5>Station Access - </h5>
            {accessOptions.slice(0, 4).map((option, index) => (
              <div key={option} style={{ marginLeft: 10, marginRight: 10 }}>
                  <input
                    type="checkbox"
                    checked={accessGiven[index + 8]}
                    onChange={() => handleAccessOptionCheck(index + 8)}
                    disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}
                  />
                <label className="checkbox-label" style={{marginLeft:10}}>
                  {option}
                </label>
              </div>
            ))}
          </div>
          <hr />
          <br />
          <div className="checkbox-row">
          <h5>Allocation Access - </h5>
            {accessOptions.slice(4,6).map((option, index) => (
              <div key={option} className="col-md-2">
                  <input
                    type="checkbox"
                    checked={accessGiven[index + 12]}
                    onChange={() => handleAccessOptionCheck(index + 12)}
                    disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}
                  />
                <label className="checkbox-label" style={{marginLeft:10}}>
                  {option}
                </label>
              </div>
            ))}
          </div>
          <hr />
          <br />
          <div className="checkbox-row">
          <h5>Shift Access - </h5>
            {accessOptions.slice(0,4).map((option, index) => (
              <div key={option} className="col-md-2">
                  <input
                    type="checkbox"
                    checked={accessGiven[index + 14]}
                    onChange={() => handleAccessOptionCheck(index + 14)}
                    disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}
                  />
                <label className="checkbox-label" style={{marginLeft:10}}>
                  {option}
                </label>
              </div>
            ))}
          </div>
          <br />
          <hr />
          <br />
          <div className="checkbox-row">
          <h5>Extra</h5>
            {accessOptions.slice(6,8).map((option, index) => (
              <div key={option} className="col-md-2">
                  <input
                    type="checkbox"
                    checked={accessGiven[index + 18]}
                    onChange={() => handleAccessOptionCheck(index + 18)}
                    disabled={type==="2" || (type==="1" && workerUserName==="")?true:false}
                  />
                <label className="checkbox-label" style={{marginLeft:10}}>
                  {option}
                </label>
              </div>
            ))}
          </div>
          <br />
        </div>

        {
          type === "1" && workerUserName!="" &&
          <div className="Delete-button">
            <button type='button' className="reset-button" onClick={()=>{
              setResetPasswordData((prevData)=>{
                return {
                  ...prevData,
                  userName:formik.values.userName
                }
              })
              openResetPasswordModal()
            }}>
              Reset-Password
            </button>
          </div>
        }

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2vh' }}>
          {(type==="1" || type==="0") && <button type="submit" className="buttoncss" onClick={formik.handleSubmit}>{type==="0" ? "Register" : "Update"}</button>}
          {type==="2" && <button className="delete-button" onClick={()=>{handleEmployeeDelete()}}> Delete User</button>}    
        </div>
        
        <br />
      </div>

      <Modal
          show={showResetPasswordModal}
          onHide={closeResetPasswordModal}
          backdrop="static"
          keyboard={false}
        >

          <Modal.Header closeButton>
            <Modal.Title>Enter the new password</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                    <label>New password</label>
                    <Form.Control type="password" placeholder="New password" name="newPassword" value={resetPasswordData.newPassword} onChange={(e)=>handleResetPasswordModalChange(e)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                    <label>Confirm new password</label>
                    <Form.Control type="password" placeholder="Confirm new password" name="confirmNewPassword" value={resetPasswordData.confirmNewPassword} onChange={(e)=>handleResetPasswordModalChange(e)} />
              </Form.Group>
              </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={closeResetPasswordModal}>
              Close
            </Button>
              <Button variant="danger" onClick={handleClickOFResetPassword}>
                Save
              </Button>
          </Modal.Footer>
        </Modal>

      <br />
      <Footer />
    </div>
  )
}

export default WorkerReg;