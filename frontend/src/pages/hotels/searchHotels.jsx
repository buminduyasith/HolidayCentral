import Layout from "@/components/layout/hotelLayout";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import axios from 'axios';
import HotelList from "@/components/HotelCard";


export default function SearchHotels() {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState(null);
  // Search Params
  const [city, setCity] = useState('LK');
  const [rating, setRating] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  // Filter Params
  const [priceRangeFilter, setPriceRangeFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [facilitiesFilter, setFacilitiesFilter] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:5000/hotels'
  });

  useEffect(() => {
    api.get("/allhotels")
      .then((res) => {
        // console.log(res);
        setData(res.data)
      })
      .catch((error) => {
        console.error(`Error fetching data from API: ${error.message}`);
      })
  }, [])

  // Search Param Handlers
  const cityHandler = useCallback((event) => {
    setCity(event.target.value);
  }, []);

  const ratingHandler = useCallback((event) => {
    setRating(event.target.value);
  }, []);

  const checkInDateHandler = useCallback((event) => {
    setCheckInDate(event.target.value);
  }, []);

  const checkOutDateHandler = useCallback((event) => {
    setCheckOutDate(event.target.value);
  }, []);

  // Filter Param Handlers
  const priceRangeHandler = useCallback((event) => {
    setPriceRangeFilter(event.target.value);
  }, []);

  const ratingHandlerFil = useCallback((event) => {
    setRatingFilter(event.target.value);
  }, []);

  const facilitiesHandler = useCallback((event) => {
    setFacilitiesFilter(event.target.value);
  }, []);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    try {
      const res = await api.get('/searchhotels', {
        params: {
          city: city,
          rating: rating,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate
        }
      });

      console.log(res)
      setData(res.data)
    } catch (error) {
      console.log(error);
    }

  };

  const handleFilterSubmit = () => {
    let filteredData = data;

    // Price Range Filter
    if (priceRangeFilter !== "") {
      filteredData = filteredData.filter((hotel) => {
        return hotel.price >= priceRangeFilter.split("-")[0] && hotel.price <= priceRangeFilter.split("-")[1];
      });
    }

    // Rating filter
    if (ratingFilter !== "") {
      filteredData = filteredData.filter((hotel) => {
        console.log("hotel rat-->", hotel.rating);
        console.log("hotel comp-->", hotel.rating === ratingFilter);
        console.log("ratingFilter-->",  ratingFilter);
        return hotel.rating == ratingFilter;
      });
    }

    // Facilities filter
    if (facilitiesFilter !== "") {
        filteredData = filteredData.filter((hotel) => {
          return hotel.facilities === facilitiesFilter;
        });
      }

    setData(filteredData);

  }

  return (
    <Layout>
      <Container>
        <Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <div className="mb-4">
                <h6 className=" text-uppercase">Search Hotels</h6>
                <hr style={{ borderTop: '2px dashed #999' }} />
              </div>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  as="select"
                  name="city"
                  placeholder="location"
                  value={city} onChange={cityHandler}
                >
                  <option value="Matara">Matara</option>
                  <option value="Galle">Galle</option>
                  <option value="Hambanthota">Hambanthota</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Negombo">Negombo</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="1-5"
                  name="rating"
                  value={rating} onChange={ratingHandler}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid rating</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Check In Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkInDate"
                  placeholder="Select Date"
                  value={checkInDate} onChange={checkInDateHandler}
                />
                <Form.Control.Feedback type="invalid">Please provide a valid Date</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>check Out Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOutDate"
                  placeholder="Select Date"
                  value={checkOutDate} onChange={checkOutDateHandler}
                />
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Col md={8} >
                <Button className="mb-3" onClick={handleSubmit}>Search</Button>
              </Col>
            </Row>
            <Row className="mb-3">
              <div className="mb-4">
                <h6 className=" text-uppercase">Filter Hotels</h6>
                <hr style={{ borderTop: '2px dashed #999' }} />
              </div>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="From"
                  value={priceRangeFilter} onChange={priceRangeHandler}
                >
                  <option value="0-100000">0-100000</option>
                  <option value="100000-500000">100000-500000</option>
                  <option value="500000-1000000">500000-1000000</option>
                  <option value="1000000-5000000">1000000-5000000</option>
                  <option value="5000000-10000000">5000000-10000000</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Price Range</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="From"
                  value={ratingFilter} onChange={ratingHandlerFil}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Facilities</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="From"
                  value={facilitiesFilter} onChange={facilitiesHandler}
                >
                  <option value="Swimming Pool,Kids play area">Swimming Pool,Kids play area</option>
                  <option value="Swimming Pool,Bar,Spa facilities">Swimming Pool,Bar,Spa facilities</option>
                  <option value="Swimming Pool,Bar,Spa facilities,Conference room">Swimming Pool,Bar,Spa facilities,Conference room</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Col md={8} >
                <Button className="mb-3" onClick={handleFilterSubmit}>Filter</Button>
              </Col>
            </Row>
          </Form>
        </Row>
        {/* Loop Row with all Flight Data */}
        <HotelList hotels={data} />
      </Container>
    </Layout>
  )
}