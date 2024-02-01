import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        setShow(response.data);
      })
      .catch((error) => {
        console.error('Error fetching show details:', error);
      });
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  function stripHtmlTags(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  const apiContent = show.summary;
  const plainTextContent = stripHtmlTags(apiContent);

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.ceil(rating / 2)) {
        stars.push(<span key={i}>&#9733;</span>);
      } else if (i < rating) {
        stars.push(<span key={i}>&#9734;</span>);
      } else {
        stars.push(<span key={i}>&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <div style={{ margin: '2%' }}>
      <h1 style={{ color: '#D80032', fontSize: '35px', fontWeight: '900' }}>{show.name}</h1>
      <div className='outer-div' style={{ }}>
        <img src={show.image.medium} alt={show.name} style={{ width: '14rem' }} />
        <div className='inner-div'>
          <p style={{ color: 'black', fontWeight: '600', fontSize: '17px' }}>{plainTextContent}</p>
          <div style={{ color: '#D80032', fontSize: '25px' }}>
            {renderStarRating(show.rating.average)}
          </div>
          <div style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '15px' }}>
            Genres:
            {show.genres.map((genre, index) => (
              <span key={index} style={{ color: 'gray' }}> {genre}{index !== show.genres.length - 1 && ' / '}</span>
            ))}
          </div>
          <div style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '15px' }}>
            Language:
            <span style={{ color: 'gray' }}> {show.language}</span>
          </div>
          
          <Link className='btn' to={`/show/${id}/book`} style={{ textDecoration:'none' }}>
            <button style={{ backgroundColor: '#D80032', color: 'white', padding: '5px 20px', border: 'none', borderRadius: '20px' }}>Book Ticket</button>
          </Link>
        
        </div>
      </div>
      <style>
        {`
        @media only screen and (max-width: 767px) {
            .outer-div{
                display : flex;
                flex-direction : column;
                gap: 25px;
                flex-wrap: wrap;
                align-items : center;
            }
            .inner-div{
                width : 90%;
            }
            .btn{
                display : flex ;
                justify-content : center ;
            }
          }
          @media (min-width: 768px) {
            .outer-div {
              display : flex;
              flex-direction : row;
              justifyContent : center;
              align-items: flex-start;
              gap: 25px;
                flex-wrap: wrap;
            }
            .inner-div{
                width : 70%;
            }
            img {
              width: auto;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ShowDetails;
