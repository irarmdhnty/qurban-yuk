import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";

import { API } from "../../config/api";

const Register = ({ show, setShow, setShowLogin }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    fullname: "",
    password: "",
    phone: "",
  });

  // console.log(form)
  const { email, fullname, password, phone } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/regist", form);

      setTimeout(() => {
        setShow(false);
        setShowLogin(true);
      }, 1000);

      const alert = <Alert variant="success">Resgister Success</Alert>;

      setMessage(alert);
    } catch (error) {
      console.log(error);
      const alert = <Alert variant="danger">{e.response.data.message}</Alert>;

      setMessage(alert);
    }
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {message && message}
          <form>
            <div className="m-3">
              <h2 className="text-color text-center">Register</h2>
            </div>
            <input
              label="Email"
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="p-2 w-100 rounded rounded-3 my-2 bg-light text-dark"
              required
            />
            <input
              label="password"
              type="password"
              placeholder="password"
              value={password}
              name="password"
              onChange={handleChange}
              className="p-2 w-100 rounded rounded-3 my-2 bg-light text-dark"
              required
            />
            <input
              label="Full Name"
              type="text"
              placeholder="Full Name"
              value={fullname}
              name="fullname"
              onChange={handleChange}
              className="p-2 w-100 rounded rounded-3 my-2 bg-light text-dark"
              required
            />

            <input
              label="Phone Number"
              type="text"
              placeholder="Phone Number"
              value={phone}
              name="phone"
              onChange={handleChange}
              className="p-2 w-100 rounded rounded-3 my-2 bg-light text-dark"
              required
            />

            <Button
              type="submit"
              className="btn-color w-100 mt-3 text-center fw-bold"
              onClick={(e) => handleSubmit.mutate(e)}
            >
              Register
            </Button>
          </form>
          <p className="mt-3 text-center text-dark">
            Already have an account ? Klik{" "}
            <span
              className="fw-bold"
              onClick={() => {
                setShow(false);
                setShowLogin(true);
              }}
            >
              Here
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
