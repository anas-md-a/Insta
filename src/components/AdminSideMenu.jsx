import React from 'react'
import { Button, Col, Nav, NavLink, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap'
import { toast } from 'react-toastify';
import ToastedMessage from './ToastedMessage';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminSideMenu = ({ show, handleClose, isOffcanvas = false }) => {

    const navigate = useNavigate();

    const handleLogout = () => {

        sessionStorage.clear();
        toast.success("Logout Successfully");

        setTimeout(() => {
            navigate("/");
        }, 1500);

    }

    const MenuContent = (
        <>
            <Nav variant="underline" className='mt-5'>

                <ul className='list-unstyled'>
                    <li >
                        <NavLink
                            to="/adminPage" as={Link}
                            className=' mb-3 d-inline-block text-dark' >
                            Admin user
                        </NavLink></li>
                    <li>
                        <NavLink to="/normal-user" as={Link} className='text-dark'>
                            Registered user
                        </NavLink>

                    </li>
                </ul>

            </Nav>

            <div className='border-top pt-4 '>
                <p className='mb-1 fw-bold'>{localStorage.getItem('name') || 'Anas Mohamed'}</p>
                <p className='mb-3 text-muted' style={{ fontSize: '0.9rem' }}>
                    {localStorage.getItem('email') || 'anasmohamed@gmail.com'}
                </p>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

        </>
    );

    if (isOffcanvas) {
        return (
            <Offcanvas show={show} onHide={handleClose} backdrop={false}>
                <OffcanvasHeader closeButton>
                    <OffcanvasTitle>Menu</OffcanvasTitle>
                </OffcanvasHeader>
                <OffcanvasBody className="d-flex flex-column justify-content-between">
                    {MenuContent}
                </OffcanvasBody>
            </Offcanvas>
        );
    }


    return (


        <Col xs={12} md={2} className='d-none d-md-flex flex-column justify-content-between bg-light p-3'>

        {MenuContent}

        </Col>





    )
}

export default AdminSideMenu