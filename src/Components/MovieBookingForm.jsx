import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TicketBookingForm = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showPopUp,setShowPopUp] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    tickets: 1, 
    showName: '',
    date: '',
    time: '',
    city: '',
    language: '',
    email: '',
  });

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        setShow(response.data);
        setFormData(prevState => ({
          ...prevState,
          showName: response.data.name,
          language: response.data.language,
          time : response.data.schedule.time
        }));
      })
      .catch((error) => {
        console.error('Error fetching show details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.username &&
      formData.mobile &&
      formData.tickets > 0 &&
      formData.showName &&
      formData.date &&
      formData.time &&
      formData.city &&
      formData.language &&
      formData.email
    ) {
      const ticketNumber = generateTicketNumber();
      const ticketDetails = {
        ticketNumber,
        Name : formData.username,
        showName: formData.showName,
        tickets: formData.tickets,
        language: formData.language,
        date: formData.date,
        time: formData.time,
      };
      let existingUserData = JSON.parse(localStorage.getItem('userData'));
      if (!Array.isArray(existingUserData)) {
        existingUserData = [];
      }
      const updatedUserData = [...existingUserData, ticketDetails];
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
  
      setShowPopUp(true);
      setTicketDetails(ticketDetails);
      setFormData({
        username: '',
        mobile: '',
        tickets: 1,
        showName: '',
        date: '',
        time: '',
        city: '',
        language: '',
        email: '',
      });
    } else {
      alert('Please fill in all the fields and select at least 1 ticket.');
    }
  };
  
  
  
  
  const generateTicketNumber = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ticketNumber = '';
    for (let i = 0; i < 10; i++) {
      ticketNumber += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return ticketNumber;
  };
  
  const navigate = useNavigate();
  const closePopup = () => {
   setShowPopUp(false);
   navigate('/')
  };
  
  

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
   <div className='outer-div m-auto'>
    <h1 className="text-center" style={{color:'#D80032' , margin : '10px 0' , fontWeight : '900'}}>BOOK YOUR SHOW</h1>
    {showPopUp && (
        <div className="popup-container" style={{
          position: 'fixed', 
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999, 
        }}
      >
          <div className="ticket-details-popup">
            <p className="close-popup" style={{float:'right',cursor:'pointer',}} onClick={closePopup}><i className='bx bxs-x-circle' style={{fontSize:'30px'}}></i></p>
            <br/>
            <h3 style={{color:'red'}}>Ticket Details</h3>
            <p><strong>Ticket Number:</strong> {ticketDetails.ticketNumber}</p>
            <p><strong>Show Name:</strong> {ticketDetails.showName}</p>
            <p><strong>Tickets:</strong> {ticketDetails.tickets}</p>
            <p><strong>Language:</strong> {ticketDetails.language}</p>
            <p><strong>Date:</strong> {ticketDetails.date}</p>
            <p><strong>Time:</strong> {ticketDetails.time}</p>
          </div>
        </div>
      )}
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label" style={{fontWeight: 700}}>Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className='inner-div'>
        <div className="mb-3 inner-subdiv">
          <label htmlFor="email" className="form-label" style={{fontWeight: 700}}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3 inner-subdiv">
          <label htmlFor="mobile" className="form-label" style={{fontWeight: 700}}>Mobile Number</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        </div>
        <div className='inner-div'>
        <div className="mb-3 inner-subdiv">
          <label htmlFor="showName" className="form-label" style={{fontWeight: 700}}>Show Name</label>
          <input
            type="text"
            id="showName"
            name="showName"
            value={formData.showName}
            onChange={handleChange}
            className="form-control"
            required
            readOnly
          />
        </div>
        <div className="mb-3 inner-subdiv">
          <label htmlFor="tickets" className="form-label" style={{fontWeight: 700}}>Tickets</label>
          <input
            type="number"
            id="tickets"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
            min="1"
            className="form-control"
            required
          />
        </div>
        </div>
        <div className='inner-div'>
        <div className="mb-3 inner-subdiv">
          <label htmlFor="date" className="form-label" style={{fontWeight: 700}}>Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3 inner-subdiv">
          <label htmlFor="time" className="form-label" style={{fontWeight: 700}}>Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        </div>
        <div className='inner-div'>
        <div className="mb-3 inner-subdiv">
          <label htmlFor="city" className="form-label" style={{fontWeight: 700}}>City Name</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3 inner-subdiv">
          <label htmlFor="language" className="form-label" style={{fontWeight: 700}}>Language</label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="form-control"
            required
            readOnly
          />
        </div>
        </div>
        <div className='d-flex justify-content-center '>
        <button style={{ backgroundColor: '#D80032', color:'white',padding : '5px 20px',border:'none', borderRadius:'20px' }}>Book Tickets</button>
        </div>
      </form>
    </div>
    <style>
        {`
        @media only screen and (max-width: 767px) {
            h1{
                font-size : 30px;
            }
            .outer-div{
                width : 100%;
            }
            .inner-div{
                display : block;
            }
            .inner-subdiv{
                width : 100%;
            }
          }
          @media (min-width: 768px) {
            h1{
                font-size : 45px;
            }
            .outer-div {
              width : 70%;
            }
            .inner-div{
                display : flex ;
                gap : 30px;
            }
            .inner-subdiv{
                width : 50%;
            }
          }
        `}
      </style>
   </div>
  );
};

export default TicketBookingForm;
