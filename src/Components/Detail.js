import React, { useContext, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Sapi from "../assets/sapi.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
import { UserContext } from "../Usercontext/Usercontext";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, dispatch] = useContext(UserContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: detail } = useQuery("categoryCache", async () => {
    const response = await API.get(`/category/${id}`);
    //   console.log(response.data, "det")
    return response.data.data;
  });

  let timeoutID = null;
  const buyProduct = () => {
    navigate('/profile');
    // console.log('CLICKED');

    if(state.user?.role) {
      dispatch({
        type: "ADD_TRANSACTION",
        payload: {
          userId: state.user.id,
          productId: parseInt(id),
          product: detail,
        },
      });

    }
  };

  const handleBuyProduct = () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(buyProduct, 1000);
  }

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-between home">
        <Col className="col-12 col-lg-6">
          <img src={detail?.image} width="100%" />
        </Col>
        <Col className="col-12 col-lg-5">
          <div>
            <p className="text-center fw-bold fs-2">{detail?.name}</p>
            <p className="fs-5">
              <span className="fw-bold">Keterangan :</span>{" "}
              {detail?.description}
            </p>
            <p className="fs-5">
              <span className="fw-bold">Harga : </span>
              <span className="text-danger fw-bold">
                {convertRupiah.convert(detail?.price)}
              </span>
            </p>
          </div>
          <Row>
            <Col className="col-12 col-lg-6">
              <Button
                className="btn-secondary btn-detail w-100"
                onClick={() => navigate("/category")}
              >
                Kembali
              </Button>
            </Col>
            <Col className="col-12 col-lg-6">
              <Button
                className="btn-color btn-detail w-100"
                onClick={() => handleShow()}
              >
                Beli
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="fw-bold fs-4 text-center">
          Lanjutkan Membeli
        </Modal.Body>
        <Modal.Body className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose} className="w-25">
            Tidak
          </Button>
          <Button onClick={handleBuyProduct} className="btn-color w-25">
            Lanjut
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Detail;
