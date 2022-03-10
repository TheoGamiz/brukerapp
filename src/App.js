// layout.js
import React from "react"
import PropTypes from "prop-types"
import Map from "./Map"
import DataFetching from "./DataFetching"

const Layout = ({ children }) => {
  return (
    <>
      <Map />
      <DataFetching/>
      <main>{children}</main>
    </>
  )
}


export default Layout





//         https://bruker-api.herokuapp.com/s8tiger
//         https://api-adresse.data.gouv.fr/search/?q="ville"&limit=1