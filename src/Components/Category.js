import React from "react";
import { Button, Card } from "react-bootstrap";
import Sapi from "../assets/sapi.jpg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";

const Category = () => {
  const navigate = useNavigate();

 let { data: categoryList } = useQuery("categoryListCache", async () => {
   const response = await API.get("/categories");
   return response.data;
 });

  return (
    <div className="d-flex">
      {categoryList?.map((item, index) => (
        <Card
          key={index}
          style={{ width: "20rem" }}
          className="m-5 border border-1 rounded rounded-3 shadow shadow-xl"
        >
          <Card.Img variant="top" src={item?.image} />
          <Card.Body>
            <Card.Title className="text-center">{item?.name}</Card.Title>
            <Card.Body>{convertRupiah.convert(item?.price)}</Card.Body>
            <div className="d-flex justify-content-between">
              <Button
                className="btn-color w-100"
                onClick={() => navigate(`/detail/${item?.id}`)}
              >
                Detail
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Category;
