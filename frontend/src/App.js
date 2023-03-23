import logo from './Components/mrf.png';
import './App.css';
import FormExample from './Components/Form.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from './Components/Loading';
import ResultScreen from './Components/ResultScreen';
import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap"
import axios from 'axios'
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo}></img>
          <h3 style={{ textAlign: 'center' }}>MIX_ 'N' RIDE</h3>
          <Routes>
            <Route exact path='/' element={
              <Apper />
            }></Route>
            <Route exact path='/loading' element={< Loading />}></Route>
            <Route exact path='/results' element={< ResultScreen />}></Route>
            {/* <Route exact path='/home' element={<StartingHomeScreen />}></Route> */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}




const Apper = () => {

  const [startingPinCode, setStartingPostalCode] = useState("")
  const [endingPinCode, setEndingPostalCode] = useState("")
  const [nameOfPlaylist, setNameOfPlaylist] = useState("")
  const [screenState, setScreenState] = useState(0)
  const [playlistLink, setPlaylistLink] = useState("Playlist not created")

  const onFormSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries())
    console.log(formDataObj["start"])
    setNameOfPlaylist(formDataObj["playlist_name"])
    mixRideRequest(formDataObj)

    setScreenState(2)
  }

  function StartingHomeScreen() {
    return (
      <>
        <div className='app-bio' style={{ width: "30%", border: "solid 0.1px white", marginTop: "5px", marginBottom: "20px", fontSize: "15px", padding: '10px' }}>
          <p>Create a playlist customized by your ride duration </p>
        </div>
        <Button type="submit" variant="primary" onClick={setScreenState(1)} >Mix Me!</Button>
      </>)
  }

  function InputScreen() {
    return (
      <>
        <Form onSubmit={onFormSubmit}>
          <h6 style={{ textAlign: "left" }}>Step 1 : Enter your playlist name</h6>
          <Form.Control type="text" name="playlist_name" placeholder='Name of Playlist' required />
          <h6 style={{ textAlign: "left" }}>Step 2 : Enter starting zip code</h6>
          <Form.Control type="text" name="start" placeholder='Starting Pincode' required />
          <div className='dot-design'></div>
          <h6 style={{ textAlign: "left" }}>Step 3 : Enter finishing zip code</h6>
          <Form.Control type="text" name="end" placeholder='Ending Pincode' required />
          <hr></hr>
          <Button type="submit" >
            Submit
          </Button>

        </Form>
      </>
    )
  }

  async function mixRideRequest(formDataObj) {
    await axios.post('http://127.0.0.1:8000/mrf/', {
      starting: formDataObj["start"],
      ending: formDataObj["end"],
      nameOfPlaylist: formDataObj["playlist_name"]
    }).then(function (response) {
      console.log(response.data)
      setPlaylistLink(response.data["playlist_link"])
    }).catch(function (error) {
      console.error(error);
    });
  }



  if (screenState === 0) {
    return (
      <>
        <InputScreen />
      </>
    )
  }
  else if (screenState === 1) {
    <>
      <Loading />
    </>
  }
  else if (screenState === 2) {
    return (
      <>
        <ResultScreen link={playlistLink} />
      </>)
  }
}




function GenreSelection() {
  return (
    <>
      <Container>
        <Row>
          <Col sm={6}>
            <img src=''></img>
          </Col>
          <Col sm={6}>
            <img src=''></img>
          </Col>
        </Row>
      </Container>
    </>
  )
}




export default App;
