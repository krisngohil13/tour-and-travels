import React from 'react'
import TourCard from '../../Shared/TourCard';
import { Button, Col } from 'reactstrap';

import { NavLink } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ToureAdmin from '../../Shared/ToureAdmin';

export default function AdminMain() {
    const { data: featuredTours, loading } = useFetch(`tours`);
  console.log("hello");
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {Array.isArray(featuredTours) &&
        featuredTours.map((tour) => (
          <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
            <ToureAdmin tour={tour} />
          </Col>
        ))}
        <div className="viall__btn">
          <NavLink to={"/tours"}>
            <Button className='btn primary__btn'>View All Tours</Button>
          </NavLink>
        </div>
    </>
  );
}
