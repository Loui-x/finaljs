// Fill in the missing code
import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
//import App from './components/tours';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';

const Index = function ({user}) {
const [tours, setTours] = useState([]);

          useEffect(()=>{
            (async () => {
              await getTours();
            })();
          },[]);
         const getTours = async()=>{
            const tourResp = await Axios.get('/api/tours');
            if (tourResp.status === 200 ) setTours(tourResp.data);
          };
const deleteTour = async tour => {
  try{
    const resp = await Axios.post('/api/tours/delete',{
      id: tour._id
    });
    if (resp.status === 200) toast('The Tour was Deleted successfully' ,{type: toast.TYPE.SUCCESS});}

  catch (error){
    toast("There was an error deleting the tour", {type: toast.TYPE.ERROR});
  }
};

  return (
    <Container className="my-5">
      <header>
        <h1>Tours</h1>
      </header>

      <hr/>

      <div className="content">
        {tours && tours.map((tour, i) => (
          <div key={i} className="card my-3">
            <div className="card-header">
              <h5 className="card-title">
                {tour.title}
              </h5>
            </div>

            <div className="card-body">
              <p className="card-text">
                A {tour.groupSize} {tour.groupSize > 1 ? 'people' : 'person'} group for the "{tour.tourType}" haunted tour on the date of {tour.date}.
              </p>
            </div>

            {user ? (
              <div className="card-footer">
                <Link to={{
                  pathname: "/api/tours/edit",
                  state: {
                    id: tour._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>

                <button type="button" onClick={() => deleteTour(tour)} >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Container>
  );

};

export default Index;