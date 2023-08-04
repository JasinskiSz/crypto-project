import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles/Navbar.css";
import { Button, Form } from "react-bootstrap";
import PlayerBank from "./PlayerBank";

const Navbar = ({ logo, appName, balance }) => {
    const [name, setName] = useState("");
    const [registered, setRegistered] = useState(false);

    const handleRegistration = () => {
        setRegistered(true);
    };

    const handleChange = (event) => {
        setName(event.target.value);
    };

    return (
        <nav className="navbar navbar-light bg-light-green px-3">
            <div className="navbar-brand">
                <img
                    className="d-inline-block align-center"
                    src={logo}
                    alt="Logo"
                    height={100}
                />
                {appName}
            </div>
            <div>
                {!registered ? (
                    <Form className="d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Your name"
                            className="me-2"
                            value={name}
                            onChange={handleChange}
                        />
                        <Button variant="primary" onClick={handleRegistration}>
                            Register
                        </Button>
                    </Form>
                ) : (
                    <>
                        <p className="text-center fs-2 fw-bold">{name}</p>
                        <div>
                            <PlayerBank balance={balance} />
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    logo: PropTypes.string.isRequired,
    appName: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired
};

export default Navbar;
