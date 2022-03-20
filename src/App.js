// layout.js
import React from "react"
import PropTypes from "prop-types"
import Map from "./Map"
import DataFetching from "./DataFetching"

const Layout = ({ children }) => {

  localStorage.setItem("ePlaces",localStorage.getItem("markerss8tiger"))

  const handleClick = () => {
    //places = S8_Tiger
    var exportPlaces = localStorage.getItem("markerss8tiger")
    localStorage.setItem("ePlaces",exportPlaces)
    console.log(localStorage.getItem("ePlaces"))
  }

  console.log("hello" + localStorage.getItem("ePlaces"))

  return (
    <div className="home">   
      <h5>Hello</h5>
      <Map>
      </Map>
      
      <main>{children}</main>
    </div>
  )
}
//<button onClick={handleClick}>Click me</button>

export default Layout





//         https://bruker-api.herokuapp.com/s8tiger
//         https://api-adresse.data.gouv.fr/search/?q="ville"&limit=1