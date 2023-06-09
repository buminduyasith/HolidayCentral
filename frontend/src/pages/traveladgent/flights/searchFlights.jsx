import Layout from "@/components/layout/layout";
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';
import FlightList from "@/components/FlightCard";


export default function SearchFlights() {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState([]);
  const [flightList, setFlightList] = useState([]);
  const [error, setError] = useState(null);
  // Search Params
  const [departureCountry, setDepartureCountry] = useState('LK');
  const [arrivalCountry, setArrivalCountry] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [cabinClass, setCabinClass] = useState('Economy');
  // Filter Params
  const [priceRangeFilter, setPriceRangeFilter] = useState('');
  const [airlineFilter, setAirlineFilter] = useState('');
  const [stopFilter, setStopFilter] = useState('');
  const [tripTypeFilter, setTripTypeFilter] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:5000/flights'
  });

  useEffect(() => {
    api.get("/allflights")
      .then((res) => {
        // console.log(res);
        setData(res.data);
        setError(null);
      })
      .catch((error) => {
        console.error(`Error fetching data from API: ${error.message}`);
        setError("Error fetching data from API");
      })
  }, [])

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setFlightList(data);
    } else {
      setError("No data received");
    }
  }, [data])

  // Search Param Handlers
  const departureCountryHandler = useCallback((event) => {
    setDepartureCountry(event.target.value);
  }, []);

  const arrivalCountryandler = useCallback((event) => {
    setArrivalCountry(event.target.value);
  }, []);

  const departureDatehandler = useCallback((event) => {
    setDepartureDate(event.target.value);
  }, []);

  const arrivalDateHandler = useCallback((event) => {
    setArrivalDate(event.target.value);
  }, []);

  const cabinClassHandler = useCallback((event) => {
    setCabinClass(event.target.value);
  }, []);

  // Filter Param Handlers
  const priceRangeHandler = useCallback((event) => {
    setPriceRangeFilter(event.target.value);
  }, []);

  const airlineHandler = useCallback((event) => {
    setAirlineFilter(event.target.value);
  }, []);

  const stopsHandler = useCallback((event) => {
    setStopFilter(event.target.value);
  }, []);

  const tripTypeHandler = useCallback((event) => {
    setTripTypeFilter(event.target.value);
  }, []);

  const handleReset = () => {
    setFlightList(data);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    try {
      const res = await api.get('/searchflights', {
        params: {
          fromCountry: departureCountry,
          toCountry: arrivalCountry,
          departureDate: departureDate,
          landingDate: arrivalDate,
          class: cabinClass
        }
      });

      console.log(res)
      setFlightList(res.data)
    } catch (error) {
      console.log(error);
    }

  };

  const handleFilterSubmit = () => {
    let filteredData = data;

    // Price Range Filter
    if (priceRangeFilter !== "") {
      filteredData = filteredData.filter((flight) => {
        return flight.price >= priceRangeFilter.split("-")[0] && flight.price <= priceRangeFilter.split("-")[1];
      });
    }

    // Airline filter
    if (airlineFilter !== "") {
      filteredData = filteredData.filter((flight) => {
        return flight.airline === airlineFilter;
      });
    }

    // Stops filter
    if (stopFilter !== "") {
      filteredData = filteredData.filter((flight) => {
        if (stopFilter === "0") {
          return flight.stops === 0;
        } else if (stopFilter === "1") {
          return flight.stops === 1;
        } else if (stopFilter === "2") {
          return flight.stops >= 2;
        }
        return true;
      });
    }

    // Trip Type filter
    if (tripTypeFilter !== "") {
      filteredData = filteredData.filter((flight) => {
        return flight.tripType === tripTypeFilter;
      });
    }

    setFlightList(filteredData);

  }

  return (
    <Layout>
      <Container>
        <Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <div className="mb-4">
                <h6 className=" text-uppercase">Search Flights</h6>
                <hr style={{ borderTop: '2px dashed #999' }} />
              </div>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Departure</Form.Label>
                <Form.Control
                  as="select"
                  name="departureCountry"
                  placeholder="From"
                  value={departureCountry} onChange={departureCountryHandler}
                >
                  <option value="LK">Sri Lanka</option>
                  <option value="US">United States</option>
                  <option value="DE">Germany</option>
                  <option value="CA">Canada</option>
                  <option value="NL">NetherLands</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Arrival</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="To"
                  name="arrivalCountry"
                  value={arrivalCountry} onChange={arrivalCountryandler}
                >
                  <option value="LK">Sri Lanka</option>
                  <option value="US">United States</option>
                  <option value="DE">Germany</option>
                  <option value="CA">Canada</option>
                  <option value="NL">NetherLands</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Departure Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dDate"
                  placeholder="Select Date"
                  value={departureDate} onChange={departureDatehandler}
                />
                <Form.Control.Feedback type="invalid">Please provide a valid Date</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Arrival date</Form.Label>
                <Form.Control
                  type="date"
                  name="aDate"
                  placeholder="Select Date"
                  value={arrivalDate} onChange={arrivalDateHandler}
                />
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Cabin Class</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="From"
                  value={cabinClass} onChange={cabinClassHandler}
                >
                  <option value="First">First Class</option>
                  <option value="Business">Business Class</option>
                  <option value="Economy">Economy</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Col md={8} >
                <Button className="mb-3" onClick={handleSubmit}>Search</Button>
              </Col>
              <Col md={8} >
                <Button className="mb-3" onClick={handleReset}>Reset Search</Button>
              </Col>
            </Row>
            <Row className="mb-3">
              <div className="mb-4">
                <h6 className=" text-uppercase">Filter Flights</h6>
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
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Airline</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="From"
                  value={airlineFilter} onChange={airlineHandler}
                >
                  <option value="Sri Lankan Airlines">Sri Lankan Airlines</option>
                  <option value="Signapoor Airlines">Signapoor Airlines</option>
                  <option value="Malaysian Airlines">Malaysian Airlines</option>
                  <option value="Emirates Airlines">Emirates Airlines</option>
                  <option value="American Airlines">American Airlines</option>
                  <option value="Air Asia Airlines">Air Asia Airlines</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Stops</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="From"
                  value={stopFilter} onChange={stopsHandler}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Trip Type</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="From"
                  value={tripTypeFilter} onChange={tripTypeHandler}
                >
                  <option value="One Way">One Way</option>
                  <option value="Round Trip">Round Trip</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Col md={8} >
                <Button className="mb-3" onClick={handleFilterSubmit}>Filter</Button>
              </Col>
              <Col md={8} >
                <Button className="mb-3" onClick={handleReset}>Reset Filter</Button>
              </Col>
            </Row>
          </Form>
        </Row>
        {/* Loop Row with all Flight Data */}
        {error ? (
          <div>{error}</div>
        ) : (
          <FlightList flights={flightList} />
        )}
      </Container>
    </Layout>
  )
}