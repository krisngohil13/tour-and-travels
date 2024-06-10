import React from 'react';
import { MDBBadge, MDBBtn, MDBTable,MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useEffect,useState } from "react";
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import { Link ,useNavigate} from 'react-router-dom';



const BookingTable = ({ booking }) => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBookings(booking);
  }, [booking]);

  const handleDelete = async (_id) => {
    try {
      const { success, message } = await axios.delete(`${BASE_URL}/${_id}`);
      navigate("/");

    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    useEffect(() => {
      window.scrollTo(0, 0); 
    }, []);
  

return (
    <MDBTable align='middle'>
        
        <MDBTableHead>
        <tr>
        <th scope='col'>UserName</th>
          <th scope='col'>Name</th>
          {/* <th scope='col'>Date</th> */}
          <th scope='col'>Title</th>
          <th scope='col'>Group Size</th>
          <th scope='col'>Phone No</th>
          <th scope='col'>Actions</th>

        </tr>
      </MDBTableHead>
      <MDBTableBody >
        {bookings.map(({_id,userId,fullName,userEmail,tourName,groupSize,phone})=>{return <>
            <tr onClick={handleScrollToTop} key={_id}>
            <td>
                <p className='fw-bold mb-1'>{userId}</p>
            </td>
          <td>
            <div className='d-flex align-items-center'>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{fullName}</p>
                <p className='text-muted mb-0'>{userEmail}</p>
              </div>
            </div>
          </td>
          {/* <td>
            <p className='fw-normal mb-1'>{bookAt ? new Date(bookAt).toLocaleString() : "date"}</p>
          </td> */}
          <td>
            <MDBBadge color='success' pill>
            {tourName}
            </MDBBadge>
          </td>
          <td>{groupSize}</td>
          <td>{phone}</td>
          <td>
            <MDBBtn color='link' rounded size='sm'  onClick={()=>{handleDelete(`booking/${_id}`);  setTimeout(() => {
        navigate("/");
      }, 1000);}}  >
            Delete
            </MDBBtn>
          </td>
        </tr>
        </> })}
        
      </MDBTableBody>
    </MDBTable>
  );
  };

export default BookingTable;