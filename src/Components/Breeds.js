import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Breeds = (props) => {
  const [breeds, setBreed] = useState([{ id: "", name: "" }]);
  const [images, setImages] = useState([{ id: "", url: "", breeds: "" }]);
  const [breedId, setBreedId] = useState("select");
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [page, setPage] = useState(0);
  const breedParam = new URLSearchParams(props.location.search).get("breed");
  const apiKey = "b4b25f05-3a1e-4ace-9d08-b3c3fad8e02a";
  const baseUrl = "https://api.thecatapi.com/v1/";

  const handleSelectChange = (e) => {
    setImages([{ id: "", url: "", breeds: "" }]);
    setBreedId(e.target.value);
    setPage(0);
  };

  const handleClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const getList = async () => {
      const url = `${baseUrl}breeds?attach_breed=0`;
      const result = await axios(url, {
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
      });
      setBreed(result.data);
      setBreedId(breedParam || breedId);
    };
    getList();
  }, []);

  useEffect(() => {
    setLoading(true);
    const getImages = async () => {
      let imageList = images;
      const url = `${baseUrl}images/search?limit=10&order=asc&page=${page}&breed_id=${breedId}`;
      const result = await axios(url, {
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
      });
      const imageCount = parseInt(result.headers["pagination-count"]);
      result.data.map(
        ({ id, url, breeds }) =>
          (imageList = [...imageList, { id, url, breeds }])
      );
      setImages(imageList);
      setLoading(false);
      setHidden(imageCount && imageCount < imageList.length);
    };
    getImages();
  }, [breedId, page]);

  return (
    <Fragment>
      <Container style={{ marginTop: "2.1vh", marginBottom: "2.1vh" }}>
        <Row>
          <Col>
            <h1>Cat Browser</h1>
          </Col>
        </Row>
        <Row style={{ marginTop: "1vh" }}>
          <Col xs={3}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Breed</Form.Label>
              <Form.Control
                as="select"
                value={breedId}
                disabled={loading}
                onChange={(e) => handleSelectChange(e)}
              >
                <option key="select">Select breed</option>
                {breeds.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginTop: "1vh" }}>
          <Col>
            <span>{images.length < 2 ? "No cats available" : ""}</span>
          </Col>
        </Row>
        <Row>
          {images.map(({ id, url, breeds }) => (
            <Col
              key={id}
              hidden={id ? false : true}
              xs={{ span: 3, offset: 0 }}
            >
              <Card
                className="text-center"
                style={{ width: "13.3vw", marginBottom: "2.1vh" }}
              >
                <Card.Img variant="top" src={url} />
                <Card.Body>
                  <Card.Text>
                    <Link
                      to={{
                        pathname: `/${id}`,
                        state: { id, url, breeds },
                      }}
                    >
                      <Button variant="primary" style={{ width: "11vw" }}>
                        View details
                      </Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row style={{ marginTop: "2vh" }}>
          <Col>
            <Button
              variant="success"
              hidden={hidden && !loading}
              disabled={images.length < 2 || loading}
              onClick={() => handleClick()}
            >
              {loading && (breeds.length < 2 || images.length < 2)
                ? "Loading cats..."
                : "Load more"}
            </Button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Breeds;
