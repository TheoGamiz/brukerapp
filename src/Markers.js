// markers.js
import React, { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"

const Marker = ({ map, place }) => {
  const markerRef = useRef()

  useEffect(() => {
    const marker = new mapboxgl.Marker({color: 'green', draggable: false, scale: 0.5, backgroundImage: 'https://docs.mapbox.com/mapbox.js/assets/images/astronaut1.png'})
      .setLngLat(place.location)
      .setPopup(new mapboxgl.Popup({offset: 30})
      .setHTML('<h4>' + "id: "+ place.id  + '<br>' 
      +"Serialno: " + place.Serialno + '<br>' 
      + "Model: "+ place.Model + '<br>' 
      + "Company: "+ place.Company + '<br>' 
      + "Country: "+ place.Country + '<br>' 
      + "City: "+ place.city +'</h4>')
      )
      .addTo(map)

    return () => marker.remove()
  })

  return <div ref={markerRef} />
}

const Markers = ({ map, places }) => {
  return (
    <>
      {places &&
        places.map(place => (
          <Marker key={place.name} map={map} place={place} />
        ))}
    </>
  )
}

export default Markers