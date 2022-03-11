// map.js
import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import bbox from "@turf/bbox"
import { multiPoint } from "@turf/helpers"
import Markers from "./Markers"
import "mapbox-gl/dist/mapbox-gl.css"
import DataFetching from "./DataFetching"

const MAPBOX_TOKEN = "pk.eyJ1IjoidGhlb2dteiIsImEiOiJjbDBtNjd2engwMDIyM2NvM3BpN3dobW9wIn0.YrYYwwyoml0_U7J9rieyjw"


const places = [
    
      {
        id: 12326254,
        Serialno: 209717,
        Model: "S8 TIGER",
        Company: "A.R.F.",
        Country: "",
        city: "CHAUNY",
        location: [3.21959,
            49.616318]
      },
      {
        id: 12326296,
        Serialno: 209716,
        Model: "S8 TIGER",
        Company: "A.R.F. SA",
        Country: "",
        city: "VENDEUIL",
        location: [3.35066,
            49.714375]
      },
      {
        id: 12140835,
        Serialno: 208470,
        Model: "S8 TIGER",
        Company: "ADDIPLAST S.A.",
        Country: "",
        city: "SAINT-PAL-DE-MONS",
        location: [4.279497,
            45.246756]
      },
      {
        id: 12971778,
        Serialno: 216107,
        Model: "S8 TIGER",
        Company: "ALVANCE ALUMINIUM DUNKERQUE",
        Country: "Guillaume MAHIEU",
        city: "LOON PLAGE",
        location: [2.239231,
            50.988252]
      },
      {
        id: 12269893,
        Serialno: 209248,
        Model: "S8 TIGER",
        Company: "ARCELORMITTAL MAIZIERES RESEARCH SA",
        Country: "",
        city: "MAIZIERES LES METZ CEDEX",
        location: [6.154495,
            49.212658]
      },
      {
        id: "CA10027324",
        Serialno: 206771,
        Model: "S8 TIGER",
        Company: "Arkema France Centre de Recherches Rhône Alpes",
        Country: "",
        city: "PIERRE-BÉNITE CEDEX",
        location: [4.819773,
            45.701814]
      },
      {
        id: "CA10023810",
        Serialno: 206029,
        Model: "S8 TIGER",
        Company: "ARKEMA FRANCE SA Groupement de Recherche de Lacq",
        Country: "",
        city: "LACQ",
        location: [-0.612215,
            43.415052]
      },
      {
        id: 12611915,
        Serialno: 213585,
        Model: "S8 TIGER",
        Company: "ARKEMA Usine d'Honfleur",
        Country: "Nicolas CLAIR",
        city: "HONFLEUR",
        location: [0.22466,
            49.409689]
      },
      {
        id: "CA10024344",
        Serialno: 206159,
        Model: "S8 TIGER",
        Company: "ASCO INDUSTRIES FOS Service Analyse",
        Country: "",
        city: "FOS SUR MER CEDEX",
        location: [4.949367,
            43.452932]
      },
      {
        id: "CA10021946",
        Serialno: 205595,
        Model: "S8 TIGER",
        Company: "ASCOVAL Etablissement Saint Saulve",
        Country: "",
        city: "SAINT SAULVE",
        location: [	3.561715,
            50.376565]
      },
      {
        id: 12573318,
        Serialno: 213105,
        Model: "S8 TIGER",
        Company: "AXENS PROCATALYSE Usine de Salindres / Magasin généra",
        Country: "James PELLIER",
        city: "SALINDRES",
        location: [	4.157438,
            44.164543]
      },
      {
        id: 12334581,
        Serialno: 209795,
        Model: "S8 TIGER",
        Company: "BIGARREN BIZI Usine Cadaujac",
        Country: "",
        city: "CADAUJAC",
        location: [-0.534845,
            44.742434]
      },
      {
        id: 12751946,
        Serialno: 214786,
        Model: "S8 TIGER",
        Company: "Bruker France S.A.S.",
        Country: "",
        city: "WISSEMBOURG CEDEX",
        location: [7.95218,
            49.015546]
      },
      {
        id: 12999892,
        Serialno: "216293#",
        Model: "S8 TIGER",
        Company: "C-TEC CONSTELLIUM Technology Center",
        Country: "Laura PIERRARD-OHANESSIAN",
        city: "VOREPPE CEDEX",
        location: [5.624617,
            45.28858]
      },
      {
        id: 13001828,
        Serialno: 216293,
        Model: "S8 TIGER",
        Company: "C-TEC CONSTELLIUM Technology Center",
        Country: "Laura PIERRARD-OHANESSIAN",
        city: "VOREPPE CEDEX",
        location: [5.624617,
            45.28858]
      },
      {
        id: 12733106,
        Serialno: 214577,
        Model: "S8 TIGER",
        Company: "CEA Le Ripault DMAT/SCMF/LMMO",
        Country: "Vincent Frotte",
        city: "MONTS",
        location: [	0.646241,
            47.281716]
      },
      {
        id: 12632593,
        Serialno: 213782,
        Model: "S8 TIGER",
        Company: "CELSA FRANCE SAS",
        Country: "Steve Dumora",
        city: "BOUCAU",
        location: [-1.480556,
            43.526146]
      },
      {
        id: 12432054,
        Serialno: 210640,
        Model: "S8 TIGER",
        Company: "CENTRE TECHNIQUE INDUSTRIES FONDERI",
        Country: "",
        city: "SEVRES CEDEX",
        location: [2.212296,
            48.820019]
      },
      {
        id: "CA10016612",
        Serialno: 204368,
        Model: "S8 TIGER",
        Company: "CIMENTS CALCIA Usine de Cruas",
        Country: "",
        city: "CRUAS",
        location: [4.765935,
            44.66121]
      },
      {
        id: 12047269,
        Serialno: 208029,
        Model: "S8 TIGER",
        Company: "CNRS - Maison de l'orient - UMR 513 Lab. Archéométrie / Archéologie",
        Country: "",
        city: "LYON CEDEX 7",
        location: [4.835,
            45.758]
      },
      {
        id: 12982715,
        Serialno: 216178,
        Model: "S8 TIGER",
        Company: "COMMISSARIAT A L'ENERGIE ATOMIQUE BP 17171",
        Country: "Pascal ANTONUCCI",
        city: "BAGNOLS SUR CEZE CEDEX",
        location: [4.624846,
            44.158589]
      },
      {
        id: 12405709,
        Serialno: 210287,
        Model: "S8 TIGER",
        Company: "DIMOTRANS SA",
        Country: "",
        city: "MARSEILLE",
        location: [5.405,
            43.282]
      },
      {
        id: 12487836,
        Serialno: 212036,
        Model: "S8 TIGER",
        Company: "EQIOM",
        Country: "",
        city: "LUMBRES",
        location: [2.115072,
            50.706951]
      },
      {
        id: "CA10023852",
        Serialno: 206037,
        Model: "S8 TIGER",
        Company: "Eqiom - LE L.A.B.",
        Country: "",
        city: "LESQUIN",
        location: [3.109167,
            50.586969]
      },
      {
        id: "CA10025588",
        Serialno: 206412,
        Model: "S8 TIGER",
        Company: "EQIOM Usine de Héming",
        Country: "",
        city: "HEMING",
        location: [6.966496,
            48.693545]
      },
      {
        id: "CA10026965",
        Serialno: 206696,
        Model: "S8 TIGER",
        Company: "ESIREM UNIVERSITE DE DIJON",
        Country: "",
        city: "DIJON",
        location: [5.034852,
            47.331938]
      },
      {
        id: "CA10021169",
        Serialno: 205440,
        Model: "S8 TIGER",
        Company: "ESSO RAFFINAGE SAS ERSAF",
        Country: "",
        city: "FOS SUR MER",
        location: [4.949367,
            43.452932]
      },
      {
        id: 12060999,
        Serialno: 208101,
        Model: "S8 TIGER",
        Company: "EURECAT FRANCE SAS",
        Country: "",
        city: "LA VOULTE SUR RHONE",
        location: [4.785479,
            44.802569]
      },
      {
        id: 12357636,
        Serialno: 209950,
        Model: "S8 TIGER",
        Company: "FERROPEM SAS",
        Country: "",
        city: "PIERREFITTE NESTALAS",
        location: [	-0.072728,
            42.962236]
      },
      {
        id: 12531181,
        Serialno: 212618,
        Model: "S8 TIGER",
        Company: "FERROPEM Usine de Montricher",
        Country: "",
        city: "MONTRICHER ALBANNE",
        location: [6.411719,
            45.236134]
      },
      {
        id: 12574062,
        Serialno: 213101,
        Model: "S8 TIGER",
        Company: "FUCHS LUBRIFIANT FRANCE SA",
        Country: "Karine Boitel",
        city: "NANTERRE CEDEX",
        location: [2.20237,
            48.897]
      },
      {
        id: "CA10016595",
        Serialno: 204362,
        Model: "S8 TIGER",
        Company: "IFREMER Centre Bretagne",
        Country: "",
        city: "PLOUZANE",
        location: [-4.590113,
            48.371873]
      },
      {
        id: 11759758,
        Serialno: 207018,
        Model: "S8 TIGER",
        Company: "Imerys Talc Europe",
        Country: "",
        city: "TOULOUSE",
        location: [1.434497,
            43.603746]
      },
      {
        id: 12387518,
        Serialno: 210210,
        Model: "S8 TIGER",
        Company: "Ineos Chemicals Lavera Sas Magasin Central",
        Country: "",
        city: "LAVERA",
        location: [5.021622,
            43.380449]
      },
      {
        id: 11755193,
        Serialno: 206997,
        Model: "S8 TIGER",
        Company: "INES Savoie Technolac",
        Country: "",
        city: "LE BOURGET DU LAC",
        location: [5.8588,
            45.641834]
      },
      {
        id: 12252553,
        Serialno: 209136,
        Model: "S8 TIGER",
        Company: "INRA - Centre de Nancy Biogéochimie des Ecosystèmes",
        Country: "",
        city: "CHAMPENOUX",
        location: [6.347031,
            48.742208]
      },
      {
        id: 12535745,
        Serialno: 212656,
        Model: "S8 TIGER",
        Company: "INRS Centre de Lorraine Institut national de recherche",
        Country: "Céline EYPERT BLAISON",
        city: "VANDOEUVRE LES NANCY CEDE",
        location: [6.162826,
            48.661967]
      },
      {
        id: 12505111,
        Serialno: 212239,
        Model: "S8 TIGER",
        Company: "LAFARGE Centre de Recherche",
        Country: "",
        city: "SAINT QUENTIN FALLAVIER",
        location: [5.107681,
            45.643128]
      },
      {
        id: 12611298,
        Serialno: 213560,
        Model: "S8 TIGER",
        Company: "LAFARGE CIMENTS",
        Country: "Estelle RAYNAUD",
        city: "PORT-LA-NOUVELLE",
        location: [3.048412,
            43.01161]
      },
      {
        id: 12612209,
        Serialno: 213561,
        Model: "S8 TIGER",
        Company: "LAFARGE CIMENTS",
        Country: "Estelle RAYNAUD",
        city: "PORT-LA-NOUVELLE",
        location: [3.048412,
            43.01161]
      },
      {
        id: "CA10023205",
        Serialno: 205929,
        Model: "S8 TIGER",
        Company: "LAFARGE CIMENTS LC SDB SETE 2",
        Country: "",
        city: "SETE",
        location: [3.686958,
            43.407114]
      },
      {
        id: "CA10017056",
        Serialno: 204484,
        Model: "S8 TIGER",
        Company: "LAFARGE CIMENTS USINE DU TEIL",
        Country: "",
        city: "LE TEIL",
        location: [4.668061,
            44.545776]
      },
      {
        id: 12583716,
        Serialno: 213231,
        Model: "S8 TIGER",
        Company: "LafargeHolcim France Laboratoire",
        Country: "Claire CAPRA",
        city: "SAINT QUENTIN FALLAVIER",
        location: [5.107681,
            45.643128]
      },
      {
        id: "CA10016563",
        Serialno: 204355,
        Model: "S8 TIGER",
        Company: "M LEGO SAS Service Comptabilité",
        Country: "",
        city: "LA FERTE BERNARD",
        location: [0.639754,
            48.18624]
      },
      {
        id: 11812329,
        Serialno: 207290,
        Model: "S8 TIGER",
        Company: "Magnesita Refractories S.C.S.",
        Country: "",
        city: "VALENCIENNES",
        location: [3.510438,
            50.358552]
      },
      {
        id: 12455489,
        Serialno: 210856,
        Model: "S8 TIGER",
        Company: "MAPE",
        Country: "",
        city: "LIEVIN",
        location: [2.769683,
            50.424192]
      },
      {
        id: 12538307,
        Serialno: 212703,
        Model: "S8 TIGER",
        Company: "NICHE FUSED ALUMINA Usine de la Bathie-Aiguebelle",
        Country: "Pierre Grentzinger",
        city: "LA BATHIE",
        location: [6.448332,
            45.625046]
      },
      {
        id: 12038870,
        Serialno: 207976,
        Model: "S8 TIGER",
        Company: "Orano Chimie-Enrichissement Etablissement de Pierrelatte",
        Country: "",
        city: "PIERRELATTE CEDEX",
        location: [4.689504,
            44.357315]
      },
      {
        id: 12336277,
        Serialno: 209064,
        Model: "S8 TIGER",
        Company: "PAREXGROUP S.A.",
        Country: "",
        city: "SAINT QUENTIN FALLAVIER",
        location: [5.107681,
            45.643128]
      },
      {
        id: "CA10021894",
        Serialno: 205582,
        Model: "S8 TIGER",
        Company: "PEUGEOT CITROEN AUTOMOBILES S.A. Service PMXP/TAC/PSM",
        Country: "",
        city: "VOUJEAUCOURT",
        location: [6.77872,
            47.474047]
      },
      {
        id: 12406712,
        Serialno: 210206,
        Model: "S8 TIGER",
        Company: "RICOH INDUSTRIE FRANCE SAS",
        Country: "",
        city: "WETTOLSHEIM - COLMAR",
        location: [7.332036,
            48.067485]
      },
      {
        id: 12826422,
        Serialno: 210206,
        Model: "S8 TIGER",
        Company: "RICOH INDUSTRIE FRANCE SAS",
        Country: "Laurence DAUDIN",
        city: "WETTOLSHEIM - COLMAR",
        location: [7.332036,
            48.067485]
      },
      {
        id: 12776722,
        Serialno: 214951,
        Model: "S8 TIGER",
        Company: "RIO TINTO ALCAN LRF",
        Country: "Marie-Catherine JOLAS",
        city: "SAINT JEAN DE MAURIENNE C",
        location: [6.35192,
            45.281794]
      },
      {
        id: 12319906,
        Serialno: 209661,
        Model: "S8 TIGER",
        Company: "SA L'OREAL Research & Innovation",
        Country: "",
        city: "SAINT OUEN",
        location: [1.075854,
            47.821297]
      },
      {
        id: 12047330,
        Serialno: 208030,
        Model: "S8 TIGER",
        Company: "SAMIN Laboratoire Central",
        Country: "",
        city: "PONTPOINT",
        location: [2.648517,
            49.304144]
      },
      {
        id: 12578267,
        Serialno: 213179,
        Model: "S8 TIGER",
        Company: "SERVICE COMMUN DES LABORATOIRES Laboratoire du Havre",
        Country: "Bernadette DEVOS",
        city: "LE HAVRE",
        location: [0.129995,
            49.507345]
      },
      {
        id: 12382408,
        Serialno: 210156,
        Model: "S8 TIGER",
        Company: "SNCF Direction du materiel et de la",
        Country: "",
        city: "VITRY SUR SEINE",
        location: [2.39571,
            48.789495]
      },
      {
        id: 12104753,
        Serialno: 208301,
        Model: "S8 TIGER",
        Company: "SOKA",
        Country: "",
        city: "QUESSOY",
        location: [-2.658352,
            48.425889]
      },
      {
        id: 12292340,
        Serialno: 209437,
        Model: "S8 TIGER",
        Company: "TOTAL FRANCE Raffinerie des Flandres",
        Country: "",
        city: "MARDYCK",
        location: [2.312076,
            51.02638]
      },
      {
        id: "CA10028061",
        Serialno: 206945,
        Model: "S8 TIGER",
        Company: "TOTAL MARKETING SERVICES CRES - Centre de Recherche",
        Country: "",
        city: "SOLAIZE CEDEX",
        location: [4.842332,
            45.644442]
      },
      {
        id: 12252018,
        Serialno: 209056,
        Model: "S8 TIGER",
        Company: "TOTAL S.A. Comptabilité Fournisseurs - DGEP",
        Country: "",
        city: "PAU CEDEX",
        location: [	-0.343106,
            43.313159]
      },
      {
        id: "CA10022912",
        Serialno: 205838,
        Model: "S8 TIGER",
        Company: "TRB LABORATOIRE SAS",
        Country: "",
        city: "NESLES",
        location: [1.655314,
            50.62733]
      },
      {
        id: 13019831,
        Serialno: 216405,
        Model: "S8 TIGER",
        Company: "TREDI",
        Country: "Agnès GRANGE",
        city: "SALAISE SUR SANNE",
        location: [4.818681,
            45.3442]
      },
      {
        id: 13024451,
        Serialno: 216439,
        Model: "S8 TIGER",
        Company: "TREDI Centre de Recherche",
        Country: "Mathilde LEONE",
        city: "ST VULBAS",
        location: [5.275121,
            45.813063]
      },
      {
        id: 12507058,
        Serialno: 212287,
        Model: "S8 TIGER",
        Company: "UNIVERSITE PIERRE ET MARIE CURIE Laboratoire Chimie de la Matière",
        Country: "",
        city: "PARIS CEDEX 05",
        location: [2.350554,
            48.845277]
      },
      {
        id: 12965192,
        Serialno: 216054,
        Model: "S8 TIGER",
        Company: "Université de Lorraine IJL (Institut Jean Lamour)",
        Country: "Sébastien DILIBERTO",
        city: "METZ",
        location: [6.194897,
            49.108385]
      },
      {
        id: 12711490,
        Serialno: 214407,
        Model: "S8 TIGER",
        Company: "Université Savoie Mont Blanc Laboratoire EDYTEM",
        Country: "DEVELLE Anne-Lise",
        city: "LE BOURGET DU LAC",
        location: [5.8588,
            45.641834]
      },
      {
        id: "CA10019888",
        Serialno: 205066,
        Model: "S8 TIGER",
        Company: "VERESCENCE FRANCE Service Compta Fournisseurs",
        Country: "",
        city: "MERS LES BAINS",
        location: [1.397758,
            50.067474]
      },
      {
        id: 12327299,
        Serialno: 209737,
        Model: "S8 TIGER",
        Company: "VERRERIE DE SAINT JUST SA",
        Country: "",
        city: "SAINT JUST SAINT RAMBERT",
        location: [4.251132,
            45.494348]
      },
      {
        id: 12468029,
        Serialno: 211041,
        Model: "S8 TIGER",
        Company: "VICAT",
        Country: "",
        city: "CRECHY",
        location: [3.428126,
            46.257684]
      },
      {
        id: 12876172,
        Serialno: 215640,
        Model: "S8 TIGER",
        Company: "Vicat",
        Country: "Julie Bertola",
        city: "L'ISLE D'ABEAU CEDEX",
        location: [5.226655,
            45.613568]
      },
      {
        id: "CA10023840",
        Serialno: 206035,
        Model: "S8 TIGER",
        Company: "VM BUILDING SOLUTIONIS SAS",
        Country: "",
        city: "VIVIEZ",
        location: [2.225325,
            44.559288]
      },
      {
        id: 12252557,
        Serialno: 209137,
        Model: "S8 TIGER ECO",
        Company: "Ciments Calcia Usine de Gargenville",
        Country: "",
        city: "GARGENVILLE",
        location: [1.813979,
            48.98556]
      }
    
]


  console.log("HELLOOOOOOO.    " + places)
    console.log("HELLOOOOOOO.    " + places)



const mapContainerStyle = {
  width: "100%",
  height: "100vh",
}

const Map = () => {
  const mapContainerRef = useRef(null)

  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      // Empire State Building [lng, lat]
      center: [2.347, 48.859],
      zoom: 5,
    })
    map.addControl(new mapboxgl.NavigationControl(), "top-right")

    setMap(map)

    return () => map.remove()
  }, [])

  useEffect(() => {
    if (!map) return

    if (places.length !== 0) {
      const coords = []
      console.log("COORDS  " + coords)
      places.forEach(place => {
        coords.push([-0.587877, 44.851895])
      })
      const feature = multiPoint(coords)
      const box = bbox(feature)
      console.log("FEATURE  " + coords)
      console.log("BOXXX.  " + box)

      map.fitBounds(
        [
          [box[0], box[1]],
          [box[2], box[3]],
        ],
        {
          padding: 20,
          maxZoom: 5,
          duration: 2000,
        }
      )
    } else {
      map.easeTo({
        center: [-73.9856, 40.7497],
        zoom: 5,
        duration: 2000,
      })
    }
  }, [map])

  return (
    <div ref={mapContainerRef} style={mapContainerStyle}>
      {places && map && <Markers map={map} places={places} />}
    </div>
  )

 return <div ref={mapContainerRef} style={mapContainerStyle} />

  
}

export default Map