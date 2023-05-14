import React, { useContext } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import profile from "../assets/profile.jpg";
import { UserContext } from "../Usercontext/Usercontext";

const Profile = () => {
  const [state, dispatch] = useContext(UserContext);

  // console.log(state);
  // console.table(state?.transactions);

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2 className="mb-5 text-color">My Profile</h2>
          <Row>
            <Col className="col-5 col-lg-4">
              <img alt="user" src={profile} width="180px" />
            </Col>
            <Col>
              <div className="mb-3">
                <p className="text-color fw-bold fs-4">FullName</p>
                <p className="text-secondary fs-5">{state?.user?.fullName}</p>
              </div>
              <div className="mb-3">
                <p className="text-color fw-bold fs-4">Email</p>
                <p className=" text-secondary fs-5"> {state?.user?.email}</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="col-12 col-md-6">
          <h2 className="mb-5 text-color text-center">History Transaction</h2>
          <div style={{ maxHeight: "400px", overflow: "scroll" }}>
            {state?.transactions?.map((transaction) => (
              <Card className="shadow shadow-md p-2 mt-3">
                <Card.Title>Name: {transaction?.product?.name}</Card.Title>
                <Card.Title>Harga: {transaction?.product?.price}</Card.Title>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile