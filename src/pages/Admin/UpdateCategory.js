import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../config/api";

const AddCategory = () => {
  const navigate = useNavigate();
  const params = useParams().id;

  const [isLoading, setIsLoading] = useState(false);
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

  let { data: updateCat, refetch: refetchCat } = useQuery(
    "updateCategoryCache",
    async () => {
      const response = await API.get(`/category/${params}`);
      return response.data;
      // console.log("data",response.data)
    }
  );

  useEffect(() => {
    if (updateCat) {
      setForm({
        ...form,
        name: updateCat.name,
        description: updateCat.description,
        price: updateCat.price,
        image: updateCat.image,
      });
    }
  }, [updateCat]);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("description", form.description);
      formData.set("price", form.price);
      formData.set("image", form.image[0], form.image[0].name);

      const data = await API.patch(`/category/update/${params}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      navigate("/category-list");
    } catch (error) {
      console.log(error);
    }
  });

  React.useEffect(() => {
    refetchCat();
  });

  return (
    <Container className="add-form rounded rounded-3 p-5 my-5">
      <h1 className="text-color mt-3 mb-5">Update Category</h1>
      {message && message}
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Row>
          <Col className="col-12 col-md-9 ">
            <input
              label="Name"
              type="text"
              name="name"
              value={form?.name|| ""}
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
          value={form?.price || ""}
          placeholder="Price"
          onChange={handleChange}
          className="p-2 w-100 rounded rounded-3 my-2 text-dark border boder-none"
        />

        <textarea
          label="description"
          name="description"
          placeholder="Description"
          value={form?.description || ""}
          onChange={handleChange}
          className="p-2 w-100 rounded rounded-3 my-2 text-dark border boder-none"
        ></textarea>
        <div className="d-flex justify-content-end align-item-end">
          <Button className="btn-color w-25 mt-5 mb-5 " type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddCategory;
