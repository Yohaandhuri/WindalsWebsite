import React, { useEffect } from "react";
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import './addStation.css'
import { useState, useLocation } from "react";
import { Formik, useFormik } from "formik";
import { addStation, deleteStation, getOneProductAllParameters, getOneStation, getOneStationOneProduct, getProductNames, updateStation, getAllStationNames, deleteMachine, copyProductStations, getInfoFromStationMasterWithMachine } from "../../helper/helper";
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import WindalsNav from "../navbar";
import * as Yup from "yup";
import Footer from '../footer';
import Select from 'react-select';
import { useParams } from "react-router-dom";
import Table from '../table';
//import { useLocation } from 'react-router-dom'

function AddStation(action) {
    //const location = useParams()
    const stationOpr=1;
    //const { stationOpr } = location.state
    const [productNames, setProductNames] = useState([]);
    const [productParameters, setProductParameters] = useState([]);
    const [stationId,setStationId] = useState("") //used when we have searched for a 
    //const [productNames, setProductNames] = useState([]);

    const [stations, setStations] = useState([]);
    const columns = [
      { field: 'process_number', label: 'Process Number' },
      { field: 'station_name', label: 'Process Name' },
      { field: 'product_name', label: 'Product Name' },
      { field: 'report', label: 'Report' },
      { field: 'station_parameters', label: 'Station Parameters' },
      { field: 'machine_name', label: 'Machine Name' },
      { field: 'cycle_time', label: 'Cycle Time' },
      { field: 'daily_count', label: 'Daily Count' },
      { field: 'product_per_hour', label: 'Product per hour' },
      { field: 'next_station_name', label: 'Next Station Name' },
      // { field: 'multiple_machine', label: 'Multiple Machine' },
    ];
      var destProduct="";
    //const { userName } = useParams()

    const stationValidationSchema = Yup.object().shape({
        stationName: Yup.string().required("Required"),
        productName: Yup.string().required("Required"),
        reportType: Yup.string().required("Required"),
        stationParameter:Yup.array().min(1, "At least one option must be selected").required("Required"),
        parameters: Yup.array().of(
            Yup.object().shape({
                machineName: Yup.string()
                    .required('Required'),
                cycleTime: Yup.number()
                    .required('Required'),
                dailyCount: Yup.number()
                    .required('Required'),
                productPerHour: Yup.number().required('Required'),
            })
        ),
    })

    const addFormFormik = useFormik({
        initialValues: {
            process_number:'',
            stationName: '',
            productName: '',
            reportType: '',
            cycleTime:'',
            dailyCount:'',
            productPerHour:'',
            stationParameter: [],
            machines: [],
            multipleMachines:false,

        },
        // validationSchema: stationValidationSchema,
        onSubmit: async (values) => {
            console.log(values)
            if(stationId==="")
            {
                const addStationPromise = addStation(values)
                toast.promise(
                    addStationPromise,
                    {
                        loading: 'Adding station',
                        success: (result) => {
                            addFormFormik.resetForm()
                            getStationNames()
                            return result.msg
                        },
                        error: (err) => {
                            return err.msg
                        }
                    }
                )
            }
            else
            {
                const updatedValues = {...values,stationId}
                const updateStationPromise = updateStation(updatedValues)
                toast.promise(
                    updateStationPromise,
                    {
                        loading: "Updating data",
                        success: result => {
                            handleClear()
                            getStationNames()
                            return <b>{result.msg}</b>; // Return a React element
                        },
                        error: err => <b>{err.msg}</b>, // Return a React element
                    }
                )
            }
        }
    })

    const addRow = () => {
        addFormFormik.setFieldValue('machines', [
            ...addFormFormik.values.machines,
            { machineName: '', cycleTime: '', dailyCount: '', productPerHour: '' },
        ]);
    };

    const handleClear = () => {
        addFormFormik.resetForm()
        searchFormFormik.resetForm()
        setStationId("")
        setProductParameters([])
    }

    const handleMachineChange = (index, field, value) => {
        const updatedMachines = [...addFormFormik.values.machines];
        updatedMachines[index][field] = value;
        addFormFormik.setFieldValue('machines', updatedMachines);
      };

    const searchValidationSchema = Yup.object().shape({
        stationName: Yup.string().required("Required"),
        productName: Yup.string().required("Required")
    })

    const searchFormFormik = useFormik({
        initialValues: {
            stationName: "",
            productName: "",
        },
        validationSchema: searchValidationSchema,
        onSubmit: (values) => {
            handleSearch()
        }
    })

    useEffect(() => {
        console.log("Hello in Station")
        //console.log({ParameterReceived:location.state})
        const getProductNamesPromise = getProductNames()
        getProductNamesPromise.then(async (result) => {
            console.log(result);
            const productnames = await result.map((product) => product)
            setProductNames(productnames)
        }).catch((err) => { })
    }, [])

    useEffect(() => {
        if (addFormFormik.values.productName !== "") {
            const productName = addFormFormik.values.productName.label
            const getProductParametersPromise = getOneProductAllParameters(productName)
            getProductParametersPromise.then(async (result) => {
                const parameters = await result.map((product) => product.parameter)
                setProductParameters(parameters)
            }).catch((err) => {console.log(err); })
        }
    }, [addFormFormik.values.productName])

    useEffect(() => {
        handleReportTypeChangeForAdd(addFormFormik.values.reportType)
    }, [addFormFormik.values.reportType])

    useEffect(()  => {
        if (addFormFormik.values.productName !== "") {
            console.log("Fetching info:");
            console.log(addFormFormik.values.productName.label);
        }
    }, [addFormFormik.values.productName]);

    const handleReportTypeChangeForAdd = (value) => {          //use to empty stationParameters if reportType changed to ok/notok
        if (value === "0") {
            addFormFormik.setFieldValue('stationParameter', [])
        }
    };
   
    // useEffect(() => {
    //     // Fetch stations data
    //     const fetchData = async () => {
    //       try {
    //         // const result = await getStations();
    //         const result = await getInfoFromStationMasterWithMachine();
    //         const modifiedStations = result.map((station) => {
    //           if (station.report === 1) {
    //             station.report = "parameters";
    //           } else if (station.report === 0) {
    //             station.report = "Ok/NotOk";
    //           }
    //           if(station.next_station_name===null){
    //             station.next_station_name = "Not configured yet"
    //           }
    
    //           if(station.multiple_machine === 1){
    //             station.multiple_machine = "Yes"
    //           }
    
    //           else if(station.multiple_machine === 0){
    //             station.multiple_machine = "No"
    //           }
    //           return station;
    //         });
    //         setStations(modifiedStations);
    //         toast.success(<b>Data fetched successfully</b>);
    //       } catch (error) {
    //         toast.error(error.message || 'An error occurred');
    //       }
    //     };
    
    //     // Call the fetchData function
    //     fetchData();
    //   }, []); // Empty dependency array to run only once
    
    const handleSearch = async () => {
        try {
            let result;
            if (searchFormFormik.values.productName === "") {
                result = await getOneStation(searchFormFormik.values.stationName);
            } else {
                result = await getOneStationOneProduct(searchFormFormik.values);
            }
            console.log({SearchedData:result})
            if (result) {
                const flattenedMachines = result.machines.map((machine) => ({
                    machineId: machine.machine_id,
                    machineName: machine.machine_name,
                    cycleTime: machine.cycle_time,
                    dailyCount: machine.daily_count,
                    productPerHour: machine.product_per_hour,
                }));

                const updatedValues = {
                    process_number:result.process_number,
                    stationName: result.station_name,
                    productName: { label: result.product_name, value: result.product_name },
                    cycleTime:result.cycle_time,
                    dailyCount:result.daily_count,
                    productPerHour:result.product_per_hour,        
                    reportType: result.report === 1 ? "1" : "0",
                    stationParameter: result.station_parameters!==null ? result.station_parameters.split(', '):[],
                    multipleMachines: result.multiple_machine === 1 ? true : false,
                    machines: flattenedMachines,
                };
                addFormFormik.setValues(updatedValues);
                setStationId(result.station_id)
                // setUpdateMode(true);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.msg);
        }
    };

    const handleMachineDelete = (index, machine) => {
        const {machineId} = machine
        const updatedMchines = [...addFormFormik.values.machines];
        updatedMchines.splice(index, 1);
        addFormFormik.setFieldValue('machines', updatedMchines);
        if(machineId!==undefined)
        {
            const deleteMachinePromise = deleteMachine(machineId)
            toast.promise(deleteMachinePromise,
                {
                    loading: "Deleteing Data",
                    success: result => {
                        return <b>{result.msg}</b>; // Return a React element
                    },
                    error: err => <b>{err.msg}</b>, // Return a React element
                }
            )
        }
        

    };

    const handleDeleteStation = () => {
        const machineId = addFormFormik.values.machines.map((machine)=>{return machine.machineId})
        const values = {stationId,machineId}
        const deleteStationPromise = deleteStation(values)
        toast.promise(
            deleteStationPromise,
            {
                loading: "Deleting data",
                success: result => {
                    handleClear()
                    getStationNames()
                    return result.msg
                },
                error: err => { return err.msg }
            }
        )
    }

    const handleParameterTickBoxChangeForAdd = (parameterName) => {
        if (addFormFormik.values.stationParameter.includes(parameterName)) {
            addFormFormik.setFieldValue(
                'stationParameter',
                addFormFormik.values.stationParameter.filter((name) => name !== parameterName)
            );
        } else {
            addFormFormik.setFieldValue(
                'stationParameter',
                [...addFormFormik.values.stationParameter, parameterName]
            );
        }
    };

    const [productnames, setproductnames] = useState([]);
    useEffect(() => {
        const getProductNamesPromise = getProductNames()
        const arr = [];
        getProductNamesPromise.then(async (result) => {
            const productnames = await result.map((product) => {
                return arr.push({ value: product.product_name, label: product.product_name })
            })
            setproductnames(arr)
        }).catch((err) => { })
    }, [])

    const [stationnames, setstationnames] = useState([]);
    useEffect(() => {
        getStationNames()
    }, [])

    const getStationNames = () => {
        const getStationNamesPromise = getAllStationNames();
        const arr = [];
        getStationNamesPromise.then(async (result) => {
            const stationnames = await result.map((station) => {
                return arr.push({ value: station.station_name, label: station.station_name })
            })
            setstationnames(arr)
        }).catch((err) => { })
    }
   
    function copyData(data)
    {
        destProduct=data;
        console.log(data,":",addFormFormik.values.productName);
        console.log("Machines:",addFormFormik.values.multipleMachines);
    }
    function getStationList()
    {
        console.log("Product Info:",addFormFormik.values.productName);
    }
    function addStations()
    {
        console.log("Copying Data")
        console.log(destProduct,":",addFormFormik.values.productName);
        
        const status = copyProductStations(destProduct,addFormFormik.values.productName);
        
        status.then(async (result) => {
            console.log("result:",result.msg);
            if(result.msg.includes("Done"))
            {
                toast.success(<b>Data Transfered successfully</b>);
            }
            else
            {
                toast.error(result.msg || 'An error occurred');
             
            }
            console.log(result)
        }).catch((err) => { })
    }
    const [searchItem, setSearchItem] = useState('')

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    addFormFormik.setFieldValue('stationName', searchTerm)
  }
    return (
        <div >
            <WindalsNav />
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            {/* <div className="header-add-station">
                <h2 className="add-station-header">Add Station</h2>
            </div> */}


            <div className="add-station-container">
                <div className="add-station-inputs">
                    <Form>
                        {stationOpr==1 &&
                        <>
                        <h3>Add Station</h3>
                        </>}
                        {stationOpr==2 &&
                        <>
                        <h3>Update Station</h3>
                        </>}
                        {stationOpr==3 &&
                        <>
                        <h3>Delete Station</h3>
                        </>}
                        <div className="station-name-id">
                        <label htmlFor="" style={{fontWeight:600, margin:0}} className="inplab">Select Product</label>
                        <div className="row">
                            <div className="col">
                            <Form.Group controlId="productName" >
                            <Select 
                        options={productNames.map((product) => ({ label: product.product_name, value: product.product_name }))}
                        value={addFormFormik.values.productName}
                        name="productName"
                        onChange={(data) => addFormFormik.setFieldValue("productName", data)}
                        isSearchable={true}
                        placeholder="Select Product"
                    />
                    {addFormFormik.errors.productName && addFormFormik.touched.productName ? (
                        <Alert variant="danger" className="error-message">{addFormFormik.errors.productName}</Alert>
                    ) : null}
                        </Form.Group>
                            </div>
                            <div className="col align-self-center">
                                <div className="row">
                                    <div className="col-md-auto align-self-center">
                                    <label style={{fontWeight:600, margin:10}} className="inplab">Same as</label>
                                    </div>
                                    <div className="col align-self-center">
                                        <Select 
                                            options={[
                                                ...productNames
                                                .filter((product) => (addFormFormik.values.productName.label!==product.product_name))
                                                    .map((product) => ({
                                                        label: product.product_name,
                                                        value: product.product_id
                                                    })),
                                            ]}
                                            //options={productNames.map((product) => {if(addFormFormik.values.productName.label!==product.product_name){label: product.product_name, value: product.product_id} })}
                                            name="fetchProductName"
                                            onChange={(data) => copyData(data)}
                                            isSearchable={true}
                                            placeholder="Select Product"
                                        />
                                    </div>
                                    <div className="col-md-auto align-self-center">
                            <Button variant="danger" type="button" className="add-button-stn" onClick={addStations}>COPY</Button>
                                        </div>
                                </div>
                            </div>

                        </div>
                            <div className="row">
                                <div className="col col-lg-2">
                                    <label htmlFor="" style={{fontWeight:600, margin:0}} className="inplab">Process Number</label>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="number" placeholder="Process Number" value={addFormFormik.values.process_number} name="process_number" onChange={addFormFormik.handleChange} />
                                        {addFormFormik.errors.process_number && addFormFormik.touched.process_number ? (
                                        <Alert variant="danger" className="error-message">{addFormFormik.errors.process_number}</Alert>) : null}
                                    </Form.Group>
                                </div>
                                <div className="col">
                                    <label htmlFor="" style={{fontWeight:600, margin:0}} className="inplab">Process Name</label>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Process Name" value={addFormFormik.values.stationName} name="stationName" onChange={addFormFormik.handleChange} />
                                        {/* <Select
                                            className="select"
                                            options={stationnames}
                                            value={{
                                                value: addFormFormik.values.stationName,
                                                label: addFormFormik.values.stationName
                                            }}
                                            onChange={(selectedOption) =>
                                                addFormFormik.setFieldValue('stationName', selectedOption.value)
                                            }
                                            name="stationName"
                                            isSearchable={true}
                                        /> */}
                                        {/* <input
                                            type="text"
                                            value={searchItem}
                                            onChange={handleInputChange}
                                            placeholder='Product Name'
                                        />
                                        <ul>
                                            {stationnames.map((user) => <li key={user.value}>{user.label}</li>)}
                                        </ul> */}
                                        {addFormFormik.errors.stationName && addFormFormik.touched.stationName ? (
                                            <Alert variant="danger" className="error-message">{addFormFormik.errors.stationName}</Alert>) : null}
                                    </Form.Group>                                    
                                </div>
                            </div>
                            <div className="row">
                                <div className="col align-items-start">
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{ width: '12vw' }}>
                                        <input name="multipleMachines" checked={addFormFormik.values.multipleMachines} type="checkbox" id="formBasicCheckbox" onChange={(e)=>{addFormFormik.setFieldValue("multipleMachines",e.target.checked)}} className="form-check-input" style={{margin:3, border:'1px solid black'}}/>
                                        <label title="" for="formBasicCheckbox" className="form-check-label">Multiple Machines</label>
                                    </Form.Group>
                                </div>
                                {!addFormFormik.values.multipleMachines && 
                                <>
                                <div className="col align-items-start">
                                    {/* <label htmlFor="" style={{fontWeight:600, margin:0}} className="inplab">Cycle Time</label> */}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="number" placeholder="Cycle Time" value={addFormFormik.values.cycleTime} name="cycleTime" onChange={addFormFormik.handleChange} />
                                        {addFormFormik.errors.cycleTime && addFormFormik.touched.cycleTime ? (
                                            <Alert variant="danger" className="error-message">{addFormFormik.errors.cycleTime}</Alert>) : null}
                                    </Form.Group>
                                </div>
                                
                                <div className="col align-items-start">
                                    {/* <label htmlFor="" style={{fontWeight:600, margin:0}} className="inplab">Daily Count</label> */}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Daily Count" value={addFormFormik.values.dailyCount} name="dailyCount" onChange={addFormFormik.handleChange} />
                                        {addFormFormik.errors.dailyCount && addFormFormik.touched.dailyCount ? (
                                            <Alert variant="danger" className="error-message">{addFormFormik.errors.dailyCount}</Alert>) : null}
                                    </Form.Group>                                    
                                </div>
                                <div className="col align-items-start">
                                    {/* <label htmlFor="" style={{fontWeight:600, margin:0}} className="inplab">Product Per Hour</label> */}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Product/Hour" value={addFormFormik.values.productPerHour} name="productPerHour" onChange={addFormFormik.handleChange} />
                                        {addFormFormik.errors.productPerHour && addFormFormik.touched.productPerHour ? (
                                            <Alert variant="danger" className="error-message">{addFormFormik.errors.productPerHour}</Alert>) : null}
                                    </Form.Group>                                    
                                </div>
                                </>
                                }
                                {addFormFormik.values.multipleMachines && 
                                <div className="col-md-auto align-self-center justify-content-start">
                                    <Button variant="success" type="button" className="add-button-stn" onClick={addRow}>Add Machine</Button>
                                </div>
                                }
                            </div>

                            <label htmlFor="" style={{fontWeight:600, margin:0}} className="inplab">Select Report Type</label>
                            <Form.Select className="mb-3 select-param" aria-label="Default select example" value={addFormFormik.values.reportType} name="reportType" onChange={addFormFormik.handleChange}>
                                <option value=''>--Select Report Type--</option>
                                <option value="0">Okay/Not okay</option>
                                <option value="1">Parameters</option>
                            </Form.Select>
                            {addFormFormik.errors.reportType && addFormFormik.touched.reportType ? (
                                <Alert variant="danger" className="error-message">{addFormFormik.errors.reportType}</Alert>) : null}
                            {
                                addFormFormik.values.reportType === "1" &&
                                <Form>
                                    <h3>Select Parameters</h3>
                                    {productParameters.map((parameter, index) => (
                                        <div key={index}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={addFormFormik.values.stationParameter.includes(parameter)}
                                                    onChange={() => handleParameterTickBoxChangeForAdd(parameter)}
                                                />
                                                {parameter}
                                            </label>
                                            {addFormFormik.errors.stationParameter && addFormFormik.touched.stationParameter ? (
                                                <Alert variant="danger" className="error-message">{addFormFormik.errors.stationParameter}</Alert>) : null}
                                        </div>
                                    ))}
                                </Form>
                            }

                            <div className="machinetab">

                                <br />
                                { addFormFormik.values.machines.length>0 &&
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Machine Name</th>
                                                <th>Cycle time</th>
                                                <th>Daily Count</th>
                                                <th>Product per hour</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {/* <tr>
                                                <td><input type="text" /></td>
                                                <td><input type="number" /></td>
                                                <td><input type="number" /></td>
                                                <td><input type="number" /></td>
                                            </tr> */}

                                            {addFormFormik.values.machines.map((machine, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'light-red-row' : 'red-row'}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={machine.machineName}
                                                            onChange={(e) =>
                                                                handleMachineChange(index, 'machineName', e.target.value)
                                                            }
                                                            name={`machines[${index}].machineName`}
                                                        />
                                                        {addFormFormik.touched.machines && addFormFormik.touched.machines[index] && addFormFormik.errors.machines?.[index]?.machineName && (
                                                            <Alert variant="danger" className="error-message">
                                                                {addFormFormik.errors.machines[index].machineName}
                                                            </Alert>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={machine.cycleTime}
                                                            onChange={(e) =>
                                                                handleMachineChange(index, 'cycleTime', e.target.value)
                                                            }
                                                            name={`machines[${index}].cycleTime`}
                                                        />
                                                        {addFormFormik.touched.machines && addFormFormik.touched.machines[index] && addFormFormik.errors.machines?.[index]?.maxVal && (
                                                            <Alert variant="danger" className="error-message">
                                                                {addFormFormik.errors.machines[index].cycleTime}
                                                            </Alert>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={machine.dailyCount}
                                                            onChange={(e) =>
                                                                handleMachineChange(index, 'dailyCount', e.target.value)
                                                            }
                                                            name={`machines[${index}].dailyCount`}
                                                        />
                                                        {addFormFormik.touched.machines && addFormFormik.touched.machines[index] && addFormFormik.errors.machines?.[index]?.minVal && (
                                                            <Alert variant="danger" className="error-message">
                                                                {addFormFormik.errors.machines[index].dailyCount}
                                                            </Alert>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={machine.productPerHour}
                                                            onChange={(e) =>
                                                                handleMachineChange(index, 'productPerHour', e.target.value)
                                                            }
                                                            name={`machines[${index}].productPerHour`}
                                                        />
                                                        {addFormFormik.touched.machines && addFormFormik.touched.machines[index] && addFormFormik.errors.machines?.[index]?.unit && (
                                                            <Alert variant="danger" className="error-message">
                                                                {addFormFormik.errors.machines[index].productPerHour}
                                                            </Alert>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="delete-button"
                                                            onClick={() => handleMachineDelete(index, machine)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                        <br />

                        <div className="add-station-button">
                            <Button variant="success" type="button" className="add-button-stn" onClick={addFormFormik.handleSubmit}>{stationId==="" ?"Add Station":"Update Station"}</Button>
                        </div>
                    </Form>
                </div>
                <div className="search-station-form">
                    <h4>Search station </h4>
                    <br />
                    <h5>Enter Station Name</h5>
                    <Select
                        className="select"
                        options={stationnames}
                        value={{
                            value: searchFormFormik.values.stationName,
                            label: searchFormFormik.values.stationName
                        }}
                        onChange={(selectedOption) =>
                            searchFormFormik.setFieldValue('stationName', selectedOption.value)
                        }
                        name="stationName"
                        isSearchable={true}
                    />
                    <br />
                    <h5>Enter product name</h5>
                    <Select
                        className="select"
                        options={productnames}
                        value={{
                            value: searchFormFormik.values.productName,
                            label: searchFormFormik.values.productName
                        }}
                        onChange={(selectedOption) =>
                            searchFormFormik.setFieldValue('productName', selectedOption.value)
                        }
                        name="productName"
                        isSearchable={true}
                    />
                    <br />
                    {/* <Form>
                        <Form.Group className="mb-3" aria-label="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Station Name" value={searchFormFormik.values.stationName} name="stationName" onChange={searchFormFormik.handleChange}/>
                            { searchFormFormik.errors.stationName ? (
                                <Alert variant="danger" className="error-message">{searchFormFormik.errors.stationName}</Alert>) : null}
                        </Form.Group>

                        <Form.Group className="mb-3" aria-label="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Product Name" value={searchFormFormik.values.productName} name="productName" onChange={searchFormFormik.handleChange}/>
                            { searchFormFormik.errors.productName ? (
                                <Alert variant="danger" className="error-message">{searchFormFormik.errors.productName}</Alert>) : null}
                        </Form.Group>
                    </Form> */}
                    <Button variant="danger" className="search-station-button" onClick={searchFormFormik.handleSubmit}>Search</Button>
                    
                    <Button variant="danger" className="search-station-button" onClick={handleClear}>Clear</Button>
                    {stationId!=="" && <Button variant="danger" className="search-station-button" onClick={handleDeleteStation}>Delete Station</Button>}
                </div>
            </div>
            {/* <div style={{marginTop:'15vh'}}>
                <h1 className='heading'>Station Details</h1>
                <Table columns={columns} data={stations} />
            </div> */}
            <Footer />
        </div>

    )
}

export default AddStation;


