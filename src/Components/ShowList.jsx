import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm || 'all'}`);
        setShows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShows();
  }, [searchTerm]);

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.ceil(rating / 2)) {
        stars.push(<span key={i}>&#9733;</span>);
      } else {
        stars.push(<span key={i}>&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <div className="m-auto" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-center" style={{ color: '#D80032', margin: '10px 0', fontSize: '45px', fontWeight: '900' }}>TV SHOWS</h1>
      <div className="mb-3" style={{ width: '100%', maxWidth: '300px' }}>
        <input
          type="text"
          placeholder="Search shows..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '5px', fontSize: '16px', width: '100%' }}
        />
      </div>
      <ul className="d-flex justify-content-center align-items-center flex-wrap" style={{ listStyleType: 'none', padding: 0 }}>
        {shows.map((show) => (
          <li key={show.show.id} className="m-lg-3 m-3">
            {show.show.image && (
              <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={show.show.image.medium} />
                <Card.Body>
                  <Card.Title style={{ color: 'black', textDecoration: 'none', fontWeight: '900', fontSize: '25px' }}>{show.show.name.toUpperCase()}</Card.Title>
                  <div style={{ color: '#D80032', fontSize: '25px' }}>
                    {renderStarRating(show.show.rating.average)}
                  </div>
                  <div style={{ margin: '0 0 10px 0', fontWeight: '600', fontSize: '15px' }}>
                    {show.show.genres.map((genre, index) => (
                      <span key={index} style={{ color: 'gray' }}>{genre}{index !== show.show.genres.length - 1 && ' / '}</span>
                    ))}
                  </div>
                  <Link to={`/show/${show.show.id}`}>
                    <button style={{ backgroundColor: '#D80032', color: 'white', padding: '5px 20px', border: 'none', borderRadius: '20px' }}>Know More</button>
                  </Link>
                </Card.Body>
              </Card>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
