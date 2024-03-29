import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { logout, getOneEmployee } from '../helper/helper';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../images/logo.png'
import logoutimg from '../images/logout.png'
import './navbar.css';

function WindalsNav() {

  const { userName } = useParams()
  const [workerAccess, setWorkerAccess] = useState("")
  const navigate = useNavigate()

  const accessOptions = ["0-ViewUser", "1-AddUser", "2-UpdateUser", "3-DeleteUser", "4-ViewProduct", "5-AddProduct", "6-UpdateProduct", "7-DeleteProduct",
    "8-ViewStation", "9-AddStation", "10-UpdateStation", "11-DeleteStation", "12-AllocateStationToWorker", "13-AllocateNextStation",
    "14-ViewShifs", "15-AddShifts", "16-UpdateShifts", "17-DeleteShifts", "18-Supervisor", "19-AdminPanel"]

  useEffect(() => {
    const access = localStorage.getItem("access")
    setWorkerAccess(access)
    const getWorkerDataPromise = getOneEmployee(userName)
    getWorkerDataPromise.then((result) => {
      //const access = result[0].access_given.split(' ').map((char) => parseInt(char));
      //console.log("User Access:",access)
      //setWorkerAccess(access)
      //console.log("worker Access:",workerAccess[0])
    }).catch((err) => {
      toast.error(err.msg)
    })
  }, [])

  const redirectToHome = () => {
    navigate(`/${userName}/LandingPage`)
  }

  // console.log({workerAccess:workerAccess,userName:userName});
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top" style={{ width: '100%' }} >
        <div class="col" style={{ marginLeft: 5 }} >
          <button type='button' style={{ backgroundColor: 'white' }} onClick={redirectToHome}><img src={logo} alt='' style={{ height: 40, width: 50 }} /></button>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div class="col">
            <Nav className="me-auto stroke">
              <NavDropdown title="User Configuration" id="basic-nav-dropdown" style={{ marginRight: 12 }} >
                {workerAccess[0] === "1" && <NavDropdown.Item as={Link} to={`/${userName}/ViewUser`}>View</NavDropdown.Item>}
                {workerAccess[1] === "1" && <NavDropdown.Item as={Link} to={`/${userName}/AddUser`}>Add</NavDropdown.Item>}
                {(workerAccess[2] === "1" || workerAccess[3] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/UpdateAndDeleteUser`} state={{ type: "1" }}>Update</NavDropdown.Item>}
                {(workerAccess[3] === "1" || workerAccess[3] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/UpdateAndDeleteUser`} state={{ type: "2" }}>Delete</NavDropdown.Item>}
              </NavDropdown>

              <NavDropdown title="Product Configuration" id="basic-nav-dropdown" style={{ marginRight: 4 }}>
                {workerAccess[4] === "1" && <NavDropdown.Item as={Link} to={`/${userName}/ViewProduct`}>View</NavDropdown.Item>}
                {workerAccess[5] === "1" && <NavDropdown.Item as={Link} to={`/${userName}/AddProduct`}>Add</NavDropdown.Item>}
                {workerAccess[6] === "1" && <NavDropdown.Item as={Link} to={`/${userName}/UpdateProduct`}>Update</NavDropdown.Item>}
                {(workerAccess[7] === "1" || workerAccess[7] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/UpdateProduct`}>Delete</NavDropdown.Item>}
              </NavDropdown>

              <NavDropdown title="Station Configuration" id="basic-nav-dropdown" style={{ marginRight: 4 }}>
                {workerAccess[8] === "1" && <NavDropdown.Item as={Link} to={`/${userName}/ViewStation`}>View</NavDropdown.Item>}
                {(workerAccess[9] === "1" || workerAccess[10] === 1 || workerAccess[11] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/Add`} state={{ stationOpr: "1" }}>Add</NavDropdown.Item>}
                {(workerAccess[10] === "1" || workerAccess[10] === 1 || workerAccess[11] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/UpdateAndDeleteStation`} state={{ stationOpr: "2" }}>Update</NavDropdown.Item>}
                {(workerAccess[11] === "1" || workerAccess[10] === 1 || workerAccess[11] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/UpdateAndDeleteStation`} state={{ stationOpr: "3" }}>Delete</NavDropdown.Item>}
                {/* <NavDropdown.Item as={Link} to={`/${userName}/updateStation`}>Update Station</NavDropdown.Item> */}

                {workerAccess[12] === "1" && <NavDropdown.Item as={Link} to={`/${userName}/AllocateStationToWorker`}>Station Allocation</NavDropdown.Item>}
                {workerAccess[13] === "1" && <NavDropdown.Item as={Link} to={`/${userName}/AllocateNextStation`}>Station Sequencing</NavDropdown.Item>}
              </NavDropdown>

              <NavDropdown title="Shift Configuration" id="basic-nav-dropdown" style={{ marginRight: 4 }}>
                {workerAccess[14] === "1" && <Nav.Link href={`/${userName}/ViewShifts`}>View</Nav.Link>}
                {workerAccess[15] === "1" && <Nav.Link href={`/${userName}/ShiftConfig`}>Add</Nav.Link>}
                {workerAccess[16] === "1" && <Nav.Link href={`/${userName}/ShiftConfig`}>Update</Nav.Link>}
                {workerAccess[17] === "1" && <Nav.Link href={`/${userName}/ShiftConfig`}>Delete</Nav.Link>}
              </NavDropdown>
              <NavDropdown title="Reports" id="basic-nav-dropdown" style={{ marginRight: 4 }}>
                <Nav.Link href={`/${userName}/ProductReport`}>Product</Nav.Link>
                <Nav.Link href={`/${userName}/JobReport`}>Job</Nav.Link>
                <Nav.Link href={`/${userName}/LoginLog`}>Login</Nav.Link>
                {/* <Nav.Link href={`/${userName}/LoginLog`}>Login Logs</Nav.Link> */}
              </NavDropdown>

            </Nav>
          </div>
          <div class="nav navbar-nav navbar-right" style={{ marginRight: 20 }}>
            <p style={{ marginRight: 10, marginTop: 12, color: 'black' }}>Welcome {userName} </p>
            <img src={logoutimg} style={{ width: 30, height: 28, marginTop: 12, marginLeft: 5, cursor: 'pointer' }} alt="" onClick={() => {
              logout()
            }} />

          </div>
        </Navbar.Collapse>
      </Navbar>

      {/* <br /> */}

    </>
  );
}

export default WindalsNav;