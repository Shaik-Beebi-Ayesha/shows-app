import React from 'react';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import ShowList from './Components/ShowList';
import ShowDetails from './Components/ShowDetails';
import MovieBookingForm from './Components/MovieBookingForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<><ShowList/></>} />
        <Route exact path="/show/:id" element={<><ShowDetails/></>} />
        <Route exact path="/show/:id/book" element={<><MovieBookingForm/></>} />
      </Routes>
    </Router>
  );
}

export default App;
