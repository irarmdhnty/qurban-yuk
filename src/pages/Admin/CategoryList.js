import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Sapi from "../../assets/sapi.jpg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import convertRupiah from "rupiah-format";
import { API } from "../../config/api";
import Delete from "../../Components/Delete";

const CategoryList = () => {
  const navigate = useNavigate();
  const [idDelete, setIdDelete] = useState();
  const [showDelete, setShowDelete] = useState(false);

  let { data: list, refetch } = useQuery("listCache", async () => {
    const response = await API.get("/categories");
    return response.data;
    // console.log(response.data, "list");
  });

  React.useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-end mx-5">
        <Button
          className="btn-color fs-4 mt-5"
          onClick={() => navigate("/add-category")}
        >
          Add Category
        </Button>
      </div>
      <div className="d-flex">
        {list?.map((item, index) => (
          <Card
            key={index}
            style={{ width: "20rem" }}
            className="m-5 border border-1 rounded rounded-3 shadow shadow-xl"
          >
            <Card.Img variant="top" src={item?.image} />
            <Card.Body>
              <Card.Title className="text-center">{item?.name}</Card.Title>
              <Card.Body>{convertRupiah.convert(item?.price)}</Card.Body>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between">
                <Button
                  className="btn-primary w-100 m-2"
                  onClick={() => navigate(`/update-category/${item?.id}`)}
                >
                  update
                </Button>
                <Button
                  className="btn-danger w-100 m-2"
                  onClick={() => {
                    setIdDelete(item.id);
                    setShowDelete(true);
                  }}
                >
                  delete
                </Button>
              </div>
            </Card.Footer> 
          </Card>
        ))}
      </div>
      <Delete
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        idDelete={idDelete}
      />
    </div>
  );
};

export default CategoryList;
