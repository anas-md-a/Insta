import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { FaInstagram } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Register from './Register'
import { toast } from 'react-toastify'
import ToastedMessage from '../components/ToastedMessage'
import AdminSideMenu from '../components/AdminSideMenu'
import { IoMdMenu } from 'react-icons/io'

const AdminPage = ({UserRegisterData = {} , isAdmin= true, isAdminList= true}) => {
    const navigate = useNavigate();

    const [UserData, setUserData] = useState([])
    const [filterText, setFilterText] = useState("")
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        value()
    }, [])

    
    
    const value = async (d) => {

        if(isAdmin) { 


        try {
            axios.get("http://localhost:8080/getAllAdminData")
                .then(res => setUserData(res.data))
                .catch(err => console.error(err));

        } catch (error) {
            console.log(error.message)
        }


    }else{
        try {
            axios.get("http://localhost:8080/getAllUserData")
                .then(res => setUserData(res.data))
                .catch(err => console.error(err));

                console.log(userData)

        } catch (error) {
            console.log(error.message)
        }
    }
}
    


    

    useEffect(() => {
        const lowerSearch = filterText.toLowerCase();
        // console.log(lowerSearch);

        const filtered = UserData.filter(item =>
            item.name?.toLowerCase().includes(lowerSearch) ||
            item.email?.toLowerCase().includes(lowerSearch) ||
            item.phone?.toLowerCase().includes(lowerSearch) ||
            item.customerId?.toString().includes(lowerSearch)

        )

        setFilteredData(filtered)
    }, [filterText, UserData])


    const [showModelForEdit, setShowModelForEdit] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const closeForEditModal = () => setShowModelForEdit(false);
    const handleEdit = (row) => {
        console.log(row);

        setEditUser(row);
        setShowModelForEdit(true)

    };

    const handleAdminEditSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios.put(`http://localhost:8080/editUserViaAdmin?customerId=${data.customerId}&name=${data.name}&phone=${data.phone}&email=${data.email}`);
            if (response.status === 200) {
                setShowModelForEdit(false);
                
                value();
                toast.success("Update Successfully")
            }
        } catch (error) {
            toast.error("Failed to update")
            console.error("Update Error:", error);
        }
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCustomerId, setDeleteCustomerId] = useState(null);
    const handleDelete = (row) => {
        setDeleteCustomerId(row.customerId);
        setShowDeleteModal(true);

    };

    const [showModel, setShowModel] = useState(false);
    const handleClose = () => setShowModel(false);
    const handleShow = () => setShowModel(true);

    // const handleLogout = () => {
        
    //     sessionStorage.clear();
    //       toast.success("Logout Successfully");
        
    //       setTimeout(() => {
    //         navigate("/");
    //       }, 1500);

    // }






    const columns = [
        {
            name: "Customer ID",
            selector: row => row.customerId,
            sortable: true,
            center: true
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
            center: true
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
            center: true
        }, {
            name: "phone",
            selector: row => row.phone,
            sortable: true,
            center: true
        },
        {
            name: "Number of Posts",
            selector: row => row.postCount,
            sortable: true,
            center: true
        },
        {
            name: "Action",
            selector: row => (
                <div className="d-flex justify-content-around">
                    <Button size="sm" className="me-2" onClick={() => handleEdit(row)}>
                        Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(row)}>
                        Delete
                    </Button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            center: true
        }

    ]

    
const [offcanvasVisible, setOffcanvasVisible] = useState(false);
const toggleOffcanvas = () => setOffcanvasVisible(!offcanvasVisible);



    return (
        <>

            <Row className="g-0" style={{ height: '100vh', overflow: 'hidden' }}> 

                <AdminSideMenu/>

                <AdminSideMenu
                    show={offcanvasVisible}
                    handleClose={() => setOffcanvasVisible(false)}
                    isOffcanvas={true}
                />
                
                 {/* <Col xs={12} md={2} className='d-none d-md-flex flex-column justify-content-between bg-light p-3'>
                    <div className='mt-5'>
                        <Button variant="light" className='text-start w-100 px-3 py-2 mb-3' onClick={() => value()}>
                            Admin Register
                        </Button>
                        <Button variant="light" className='text-start w-100 px-3 py-2 mb-4' onClick={() => getUserData()}>
                            User Register
                        </Button>
                    </div>

                    <div className='border-top pt-4 text-center '>
                        <p className='mb-1 fw-bold'>{localStorage.getItem('name') || 'Anas Mohamed'}</p>
                        <p className='mb-3 text-muted' style={{ fontSize: '0.9rem' }}>
                            {localStorage.getItem('email') || 'anasmohamed@gmail.com'}
                        </p>
                        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </Col>  */}

               
                <Col xs={12} md={10} className='bg-white overflow-auto' style={{ maxHeight: '100vh' }}>
                    <nav className='nav-light bg-light p-3'>
                       <div className='d-flex gap-2'>
                       <div className='d-md-none d-inline-block'>
                            <Button variant="outline-secondary" onClick={toggleOffcanvas} >
                            <IoMdMenu />
                            </Button>
                        </div>
                        
                        <div className='mx-2 d-inline-block'>
                            <a className='navbar-brand'>
                                <FaInstagram />
                                <span className='m-2'>Instagram</span>
                            </a>
                        </div>
                       </div>
                    </nav>

                    <div className="container my-4">
                        <h3 className="mb-3">{isAdminList ? 'List of Admin Users' : 'List of Registered users'}</h3>

                        <div className='d-flex align-items-center mb-3'>
                            <input
                                type='text'
                                className="form-control mb-3"
                                placeholder="Search"
                                value={filterText}
                                onChange={e => setFilterText(e.target.value)}
                                style={{ maxWidth: "400px" }}
                            />

                            {
                                isAdmin && (
                                    <>
                                    <Button className="ms-auto" onClick={handleShow}>Add User</Button>
                                    </>
                                )
                            }
                        </div>

                       
                            <DataTable
                                columns={columns}
                                data={ filteredData }
                                pagination
                                highlightOnHover
                                striped
                                responsive
                                fixedHeader
                            />
                          
                        
                        
                    </div>
                </Col>
            </Row>



            <Modal show={showModel} onHide={handleClose} size="lg">
                <ModalHeader closeButton>


                </ModalHeader>

                <ModalBody>

                    <Register fromAdmin={true} loginRedirect={false} confirmPassword={true} passwordShow={true} cardWidth="100%"
                        RegisterFormButtonName={'Add'}   contentForRegister= {'Create your admin account'}
                        onSuccess={() => {
                            handleClose();
                            value();
                        }} />

                </ModalBody>

            </Modal>



            <Modal show={showModelForEdit} onHide={closeForEditModal} size="lg">
                <ModalHeader closeButton>


                </ModalHeader>

                <ModalBody>

                    <Register fromAdmin={false} loginRedirect={false} confirmPassword={false} passwordShow={false} contentForRegister={true} cardWidth="100%" defaultValues={editUser}
                        RegisterFormButtonName={'Update'} onSubmitHandler={handleAdminEditSubmit} isEdit={true} />

                </ModalBody>

            </Modal>



            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <ModalHeader closeButton>
                    <ModalTitle>Confirm Deletion</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this Account?
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            axios
                                .put(`http://localhost:8080/deleteAccount?customerId=${deleteCustomerId}`)
                                .then((res) => {
                                    console.log(res.data);
                                    setShowDeleteModal(false);
                                    toast.success("Deleted Successfully")

                                })
                                .catch((err) => {
                                    toast.error("Failed to Delete")
                                    console.error(err)
                                });
                        }}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>










            

        </>
    )
}

export default AdminPage