import Layout from "@/components/layout/layout";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import axios from "axios";
import HotelList from "@/components/packageCard";

export default function searchpackages() {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState(null);
  // Search Params
  const [destination, setdestination] = useState("matara");
  const [numberOfTravelers, setnumberOfTravelers] = useState("1");
  const [duration, setduration] = useState("1");
  //   const [travelEndDate, settravelEndDate] = useState('');
  const [specialty, setspecialty] = useState("honeymoon");
  // Filter Params
  const [priceFilter, setpriceFilter] = useState("");
  const [packageRatingFilter, setpackageRatingFilter] = useState("");
  const [durationFilter, setdurationFilter] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:5000/packages",
  });

  useEffect(() => {
    api
      .get("/allPackages")
      .then((res) => {
        console.log("res--->", res);
        setData(res.data);
      })
      .catch((error) => {
        console.error(`Error fetching data from API: ${error.message}`);
      });
  }, []);

  // Search Param Handlers
  const destinationHandler = useCallback((event) => {
    setdestination(event.target.value);
  }, []);

  const numberOfTravelersHandler = useCallback((event) => {
    setnumberOfTravelers(event.target.value);
  }, []);

  const durationHandler = useCallback((event) => {
    setduration(event.target.value);
  }, []);

  //   const travelEndDateHandler = useCallback((event) => {
  //     settravelEndDate(event.target.value);
  //   }, []);

  const specialtyHandler = useCallback((event) => {
    setspecialty(event.target.value);
  }, []);

  // Filter Param Handlers
  const priceFilterHandler = useCallback((event) => {
    setpriceFilter(event.target.value);
  }, []);

  const packageRatingHandler = useCallback((event) => {
    setpackageRatingFilter(event.target.value);
  }, []);

  const durationFilterHandler = useCallback((event) => {
    setdurationFilter(event.target.value);
  }, []);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    try {
      const res = await api.get("/searchpackages", {
        params: {
          destination: destination,
          numberOfTravelers: numberOfTravelers,
          duration: duration,
          specialty: specialty,
        },
      });

      console.log(res,'pack');
      setData(res.data);
    } catch (error) {
      console.log(error);
    }

  };

  const handleFilterSubmit = () => {
    let filteredData = data;

    // Price Range Filter
    if (priceFilter !== "") {
      filteredData = filteredData.filter((packages) => {
        return (
          packages.price >= priceFilter.split("-")[0] &&
          packages.price <= priceFilter.split("-")[1]
        );
      });
    }

    // packageRating filter
    if (packageRatingFilter !== "") {
      filteredData = filteredData.filter((packages) => {
        return packages.packageRating === packageRatingFilter;
      });
    }

    // duration Filter
    if (durationFilter !== "") {
      filteredData = filteredData.filter((packages) => {
        return packages.duration === durationFilter;
      });
    }

    setData(filteredData);
  };
 

  return (
    <Layout>
      <Container>
        <Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <div className="mb-4">
                <h6 className=" text-uppercase">Search packages</h6>
                <hr style={{ borderTop: "2px dashed #999" }} />
              </div>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  as="select"
                  name="destination"
                  placeholder="location"
                  value={destination}
                  onChange={destinationHandler}
                >
                  <option value="matara">matara</option>
                  <option value="galle">galle</option>
                  <option value="hambanthota">hambanthota</option>
                  {/* <option value="Co">Colombo</option>
                  <option value="Ne">Negombo</option> */}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Location
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>numberOfTravelers</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="1-5"
                  name="numberOfTravelers"
                  value={numberOfTravelers}
                  onChange={numberOfTravelersHandler}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid rating
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>how many dates</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="1-5"
                  name="duration"
                  value={duration}
                  onChange={durationHandler}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>

                <Form.Control.Feedback type="invalid">
                  Please provide a valid Date
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
              

                <Form.Label>speciality</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="select speciality"
                  name="speciality"
                  value={specialty}
                  onChange={specialtyHandler}
                >
                  <option value="honeymoon">honeymoon</option>
                  <option value="family">family</option>
                  <option value="wild life">wild life</option>
                  <option value="beach">beach</option>
                </Form.Control>

                <Form.Control.Feedback type="invalid">
                  Please provide a valid Location
                </Form.Control.Feedback>
              </Form.Group>
           
            </Row>
            <Row>
              <Col md={8}>
                <Button className="mb-3" onClick={handleSubmit}>
                  Search
                </Button>
              </Col>
            </Row>
            <Row className="mb-3">
              <div className="mb-4">
                <h6 className=" text-uppercase">Filter packages</h6>
                <hr style={{ borderTop: "2px dashed #999" }} />
              </div>

              {/* //filter */}

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="From"
                  value={priceFilter}
                  onChange={priceFilterHandler}
                >
                  <option value="0-10000">0-100000</option>
                  <option value="10000-20000">100000-500000</option>
                  <option value="20000-50000">500000-1000000</option>
                  <option value="50000-100000">1000000-5000000</option>
                  <option value="100000-500000">5000000-10000000</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Price Range
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="From"
                  value={packageRatingFilter}
                  onChange={packageRatingHandler}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Input
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Input
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>how many dates</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="1-5"
                  name="duration"
                  value={duration}
                  onChange={durationFilterHandler}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>

                <Form.Control.Feedback type="invalid">
                  Please provide a valid Input
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Col md={8}>
                <Button className="mb-3" onClick={handleFilterSubmit}>
                  Filter
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        {/* Loop Row with all Flight Data */}
        <HotelList packageD={data} />
      </Container>
    </Layout>
  );
}
