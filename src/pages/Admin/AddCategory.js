import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";

const AddCategory = () => {
  let ctg = null;
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("description", form.description);
      formData.set("price", form.price);
      formData.set("image", form.image[0], form.image[0].name);

      const data = await API.post("/category/create", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      // console.log("data", data);

      const alert = <Alert variant="success">Success Add Category!</Alert>;

      setMessage(alert);
      navigate("/category-list");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container className="add-form rounded rounded-3 p-5 my-5">
      <h1 className="text-color mt-3 mb-5">Add Category</h1>
      {message && message}
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Row>
          <Col className="col-12 col-md-9 ">
            <input
              label="Name"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="p-2 w-100 rounded rounded-3 my-2 text-dark border boder-none"
            />
          </Col>
          <Col className="col-12 col-md-3">
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
            <Form.Group
              className="mb-3 p-1 mt-1 rounded border border-form  border-grey3 bg-light"
              controlId="formBasicEmail"
            >
              <Form.Control
                name="image"
                type="file"
                placeholder="Attach Image"
                hidden
                onChange={handleChange}
              />
              <Form.Label className="d-flex justify-content-between btn-full align-items-center bg-light mt-1">
                <div className="text-dark text-dark bg-light">
                  Attach Image{" "}
                </div>
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <input
          label="Price"
          type="text"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="p-2 w-100 rounded rounded-3 my-2 text-dark border boder-none"
        />

        <textarea
          label="description"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="p-2 w-100 rounded rounded-3 my-2 text-dark border boder-none"
        ></textarea>
        <div className="d-flex justify-content-end">
          <Button className="btn-color w-25 mt-5 mb-5 " type="submit">
            Add Category
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddCategory;
