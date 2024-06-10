import React from 'react'
import useFetch from "../hooks/useFetch";
import SearchBar from "../Shared/SearchBar";
import Newsletter from "../Shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../Shared/CommonSection";
import BookingTable from '../Shared/BookingTable';
import { useState } from 'react';



const Booked = ()=> {
  const {username}=JSON.parse(localStorage.getItem("user"))
    const [data, setData] = useState([])
    const { data: bookings, loading, error } = useFetch(`booking/${username}`);
  
    if (loading) {
      return (
        <div className="loader-container">
          <div className="loader" />
          <div className="loading-text">Loading...</div>
        </div>
      );
    }
  
    if (error) {
      return <div className="error__msg">Error loading booked details. Check your network</div>;
    }

  return (
    <div>
      <CommonSection title={"Booked Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
          {
                  <BookingTable booking={bookings} />
           
              }
          </Row>
        </Container>
      </section>
      
      <Newsletter />
    </div>
  )
}

export default Booked