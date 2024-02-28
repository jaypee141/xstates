import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.css";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState("");
  const [stateData, setStateData] = useState([]);
  const [state, setState]= useState("");
  const [cityData, setCityData] = useState([]);
  const [city, setCity] = useState("")


  useEffect(()=>{
    const getData= async() =>{
      try{
    let response = await axios(`https://crio-location-selector.onrender.com/countries`);
    setCountryData(response.data);
  } catch (e) {
    console.error("something went wrong", e);
  }
}
getData();  
  }, []);

     
  

  const getCountry = (e) => {
    console.log("hiiiiiiiiii");
    setCountry(e.target.value);

    console.log(country);
  };

  useEffect(() => {
    const getData= async() =>{
      try{
    let response = await axios(`https://crio-location-selector.onrender.com/country=${country}/states`);
    setStateData(response.data);
    setState("");
    setCity("");
  } catch (e) {
    console.error("something went wrong", e);
  }
}
getData(); 
  }, [country]); // useEffect will be triggered whenever the 'country' state changes

  useEffect(() => {
    const getData= async() =>{
      try{
    let response = await axios(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
    setCityData(response.data);
    setCity("");
  } catch (e) {
    console.error("something went wrong", e);
  }
}
getData(); 
  }, [state]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <select value={country} onChange={getCountry}>
        <option value="" disabled>Select Country</option>
        {
        // console.log("countryData", countryData)
        countryData.map((item, index) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      {/* <h1>Select Location</h1> */}
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="" disabled>Select State</option>
        {stateData.map((item, index) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      {/* <h1>Select Location</h1> */}
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="" disabled>Select City</option>
        {cityData.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      {city && <p className="headin">You selected <span style={{fontWeight: "bolder"}}>{city}, </span><span style={{color: "grey"}}>{state}, {country}</span></p>}
    </div>
  );
}

export default App;
