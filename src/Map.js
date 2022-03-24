// map.js
import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import bbox from "@turf/bbox"
import { multiPoint } from "@turf/helpers"
import Markers from "./Markers"
import "mapbox-gl/dist/mapbox-gl.css"
import DataFetching from "./DataFetching"
import styled from "styled-components"



const MAPBOX_TOKEN = "pk.eyJ1IjoidGhlb2dteiIsImEiOiJjbDBtNjd2engwMDIyM2NvM3BpN3dobW9wIn0.YrYYwwyoml0_U7J9rieyjw"


//France
const S8_Tiger = [
    
      {
        id: 12326254,
        Serialno: 209717,
        Model: "S8 TIGER",
        Company: "A.R.F.",
        Country: "FR",
        city: "CHAUNY",
        location: [3.21959,
            49.616318]
      },
      {
        id: 12326296,
        Serialno: 209716,
        Model: "S8 TIGER",
        Company: "A.R.F. SA",
        Country: "FR",
        city: "VENDEUIL",
        location: [3.35066,
            49.714375]
      },
      {
        id: 12140835,
        Serialno: 208470,
        Model: "S8 TIGER",
        Company: "ADDIPLAST S.A.",
        Country: "FR",
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
        Country: "FR",
        city: "MAIZIERES LES METZ CEDEX",
        location: [6.154495,
            49.212658]
      },
      {
        id: "CA10027324",
        Serialno: 206771,
        Model: "S8 TIGER",
        Company: "Arkema France Centre de Recherches Rhône Alpes",
        Country: "FR",
        city: "PIERRE-BÉNITE CEDEX",
        location: [4.819773,
            45.701814]
      },
      {
        id: "CA10023810",
        Serialno: 206029,
        Model: "S8 TIGER",
        Company: "ARKEMA FRANCE SA Groupement de Recherche de Lacq",
        Country: "FR",
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
        Country: "FR",
        city: "FOS SUR MER CEDEX",
        location: [4.949367,
            43.452932]
      },
      {
        id: "CA10021946",
        Serialno: 205595,
        Model: "S8 TIGER",
        Company: "ASCOVAL Etablissement Saint Saulve",
        Country: "FR",
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
        Country: "FR",
        city: "CADAUJAC",
        location: [-0.534845,
            44.742434]
      },
      {
        id: 12751946,
        Serialno: 214786,
        Model: "S8 TIGER",
        Company: "Bruker France S.A.S.",
        Country: "FR",
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
        Country: "FR",
        city: "SEVRES CEDEX",
        location: [2.212296,
            48.820019]
      },
      {
        id: "CA10016612",
        Serialno: 204368,
        Model: "S8 TIGER",
        Company: "CIMENTS CALCIA Usine de Cruas",
        Country: "FR",
        city: "CRUAS",
        location: [4.765935,
            44.66121]
      },
      {
        id: 12047269,
        Serialno: 208029,
        Model: "S8 TIGER",
        Company: "CNRS - Maison de l'orient - UMR 513 Lab. Archéométrie / Archéologie",
        Country: "FR",
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
        Country: "FR",
        city: "MARSEILLE",
        location: [5.405,
            43.282]
      },
      {
        id: 12487836,
        Serialno: 212036,
        Model: "S8 TIGER",
        Company: "EQIOM",
        Country: "FR",
        city: "LUMBRES",
        location: [2.115072,
            50.706951]
      },
      {
        id: "CA10023852",
        Serialno: 206037,
        Model: "S8 TIGER",
        Company: "Eqiom - LE L.A.B.",
        Country: "FR",
        city: "LESQUIN",
        location: [3.109167,
            50.586969]
      },
      {
        id: "CA10025588",
        Serialno: 206412,
        Model: "S8 TIGER",
        Company: "EQIOM Usine de Héming",
        Country: "FR",
        city: "HEMING",
        location: [6.966496,
            48.693545]
      },
      {
        id: "CA10026965",
        Serialno: "206696",
        Model: "S8 TIGER",
        Company: "ESIREM UNIVERSITE DE DIJON",
        Country: "FR",
        city: "DIJON",
        location: [5.034852,
            47.331938]
      },
      {
        id: "CA10021169",
        Serialno: 205440,
        Model: "S8 TIGER",
        Company: "ESSO RAFFINAGE SAS ERSAF",
        Country: "FR",
        city: "FOS SUR MER",
        location: [4.949367,
            43.452932]
      },
      {
        id: 12060999,
        Serialno: 208101,
        Model: "S8 TIGER",
        Company: "EURECAT FRANCE SAS",
        Country: "FR",
        city: "LA VOULTE SUR RHONE",
        location: [4.785479,
            44.802569]
      },
      {
        id: 12357636,
        Serialno: 209950,
        Model: "S8 TIGER",
        Company: "FERROPEM SAS",
        Country: "FR",
        city: "PIERREFITTE NESTALAS",
        location: [	-0.072728,
            42.962236]
      },
      {
        id: 12531181,
        Serialno: 212618,
        Model: "S8 TIGER",
        Company: "FERROPEM Usine de Montricher",
        Country: "FR",
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
        Country: "FR",
        city: "PLOUZANE",
        location: [-4.590113,
            48.371873]
      },
      {
        id: 11759758,
        Serialno: 207018,
        Model: "S8 TIGER",
        Company: "Imerys Talc Europe",
        Country: "FR",
        city: "TOULOUSE",
        location: [1.434497,
            43.603746]
      },
      {
        id: 12387518,
        Serialno: 210210,
        Model: "S8 TIGER",
        Company: "Ineos Chemicals Lavera Sas Magasin Central",
        Country: "FR",
        city: "LAVERA",
        location: [5.021622,
            43.380449]
      },
      {
        id: 11755193,
        Serialno: 206997,
        Model: "S8 TIGER",
        Company: "INES Savoie Technolac",
        Country: "FR",
        city: "LE BOURGET DU LAC",
        location: [5.8588,
            45.641834]
      },
      {
        id: 12252553,
        Serialno: 209136,
        Model: "S8 TIGER",
        Company: "INRA - Centre de Nancy Biogéochimie des Ecosystèmes",
        Country: "FR",
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
        Country: "FR",
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
        Country: "FR",
        city: "SETE",
        location: [3.686958,
            43.407114]
      },
      {
        id: "CA10017056",
        Serialno: 204484,
        Model: "S8 TIGER",
        Company: "LAFARGE CIMENTS USINE DU TEIL",
        Country: "FR",
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
        Country: "FR",
        city: "LA FERTE BERNARD",
        location: [0.639754,
            48.18624]
      },
      {
        id: 11812329,
        Serialno: 207290,
        Model: "S8 TIGER",
        Company: "Magnesita Refractories S.C.S.",
        Country: "FR",
        city: "VALENCIENNES",
        location: [3.510438,
            50.358552]
      },
      {
        id: 12455489,
        Serialno: 210856,
        Model: "S8 TIGER",
        Company: "MAPE",
        Country: "FR",
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
        Country: "FR",
        city: "PIERRELATTE CEDEX",
        location: [4.689504,
            44.357315]
      },
      {
        id: 12336277,
        Serialno: 209064,
        Model: "S8 TIGER",
        Company: "PAREXGROUP S.A.",
        Country: "FR",
        city: "SAINT QUENTIN FALLAVIER",
        location: [5.107681,
            45.643128]
      },
      {
        id: "CA10021894",
        Serialno: 205582,
        Model: "S8 TIGER",
        Company: "PEUGEOT CITROEN AUTOMOBILES S.A. Service PMXP/TAC/PSM",
        Country: "FR",
        city: "VOUJEAUCOURT",
        location: [6.77872,
            47.474047]
      },
      {
        id: 12406712,
        Serialno: 210206,
        Model: "S8 TIGER",
        Company: "RICOH INDUSTRIE FRANCE SAS",
        Country: "FR",
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
        Country: "FR",
        city: "SAINT OUEN",
        location: [1.075854,
            47.821297]
      },
      {
        id: 12047330,
        Serialno: 208030,
        Model: "S8 TIGER",
        Company: "SAMIN Laboratoire Central",
        Country: "FR",
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
        Country: "FR",
        city: "VITRY SUR SEINE",
        location: [2.39571,
            48.789495]
      },
      {
        id: 12104753,
        Serialno: 208301,
        Model: "S8 TIGER",
        Company: "SOKA",
        Country: "FR",
        city: "QUESSOY",
        location: [-2.658352,
            48.425889]
      },
      {
        id: 12292340,
        Serialno: 209437,
        Model: "S8 TIGER",
        Company: "TOTAL FRANCE Raffinerie des Flandres",
        Country: "FR",
        city: "MARDYCK",
        location: [2.312076,
            51.02638]
      },
      {
        id: "CA10028061",
        Serialno: 206945,
        Model: "S8 TIGER",
        Company: "TOTAL MARKETING SERVICES CRES - Centre de Recherche",
        Country: "FR",
        city: "SOLAIZE CEDEX",
        location: [4.842332,
            45.644442]
      },
      {
        id: 12252018,
        Serialno: 209056,
        Model: "S8 TIGER",
        Company: "TOTAL S.A. Comptabilité Fournisseurs - DGEP",
        Country: "FR",
        city: "PAU CEDEX",
        location: [	-0.343106,
            43.313159]
      },
      {
        id: "CA10022912",
        Serialno: 205838,
        Model: "S8 TIGER",
        Company: "TRB LABORATOIRE SAS",
        Country: "FR",
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
        Country: "FR",
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
        Country: "FR",
        city: "MERS LES BAINS",
        location: [1.397758,
            50.067474]
      },
      {
        id: 12327299,
        Serialno: 209737,
        Model: "S8 TIGER",
        Company: "VERRERIE DE SAINT JUST SA",
        Country: "FR",
        city: "SAINT JUST SAINT RAMBERT",
        location: [4.251132,
            45.494348]
      },
      {
        id: 12468029,
        Serialno: 211041,
        Model: "S8 TIGER",
        Company: "VICAT",
        Country: "FR",
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
        Country: "FR",
        city: "VIVIEZ",
        location: [2.225325,
            44.559288]
      },
      {
        id: 12252557,
        Serialno: 209137,
        Model: "S8 TIGER ECO",
        Company: "Ciments Calcia Usine de Gargenville",
        Country: "FR",
        city: "GARGENVILLE",
        location: [1.813979,
            48.98556]
      }
    
]
const SCD = [
  
  {
    id: "CA10006068",
    Serialno: "2558",
    Model: "X8 APEX",
    Company: "CNRS - ILV UNIVERSITE DE VERSAILLES SAINT QUEN",
    Contact: "",
    city: "VERSAILLES CEDEX",
    location: [
      2.131319,
      48.803019
    ],
    Country: "FR",
    Region: "Yvelines"
  },
  {
    id: "CA10006194",
    Serialno: "2581",
    Model: "X8 APEX",
    Company: "UNIVERSITE DE RENNES 1 LCSIM UMR - CNRS 6511",
    Contact: "",
    city: "RENNES CEDEX",
    location: [
      -1.68365,
      48.110899
    ],
    Country: "FR",
    Region: "Ille-et-Vilaine"
  },
  {
    id: "CA10006323",
    Serialno: "2607",
    Model: "X8 APEX",
    Company: "Universite Paris Sud Institut de Chimie Moleculaire",
    Contact: "",
    city: "ORSAY",
    location: [
      2.190814,
      48.694549
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10007734",
    Serialno: "2702",
    Model: "X8 APEX II SEALD TUBE MO WIN 50",
    Company: "C.N.R.S. Lille LABORATOIRE DE CRISTALLOCHIMIE",
    Contact: "",
    city: "VILLENEUVE D'ASCQ CEDEX",
    location: [
      3.147134,
      50.637916
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10022933",
    Serialno: "4389",
    Model: "X8 PROSPECTOR",
    Company: "Institut Parisien de Chimie Moléculaire",
    Contact: "",
    city: "PARIS CEDEX 05",
    location: [
      2.347,
      48.859
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "CA10006892",
    Serialno: "2651",
    Model: "X8 PROTEUM / PT 135 CU KAPPA WIN /NR",
    Company: "CNRS IECB UMS 3033 Laboratoire CBMN",
    Contact: "",
    city: "PESSAC CEDEX",
    location: [
      -0.67666,
      44.785635
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "CA10007589",
    Serialno: "400042",
    Model: "X8 PROTEUM WITH MICROSTAR",
    Company: "CNRS ROSCOFF CNRS STATION BIOLOGIQUE FR 2424",
    Contact: "",
    city: "ROSCOFF CEDEX",
    location:  [
      -3.988496,
      48.713752
    ],
    Country: "FR",
    Region: "Finistére"
  },
  {
    id: "CA10011887",
    Serialno: "400065",
    Model: "X8 PROTEUM WITH MICROSTAR",
    Company: "Université de Lorraine CNRS",
    Contact: "",
    city: "VANDOEUVRE LES NANCY CEDE",
    location: [
      6.162826,
      48.661967
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "11981792",
    Serialno: "4673",
    Model: "D8 VENTURE",
    Company: "CENTRALESUPELEC Laboratoire SPMS",
    Contact: "",
    city: "GIF SUR YVETTE",
    location: 
    [2.130573,
    48.695026
  ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12208941",
    Serialno: "208854",
    Model: "D8 VENTURE",
    Company: "CNRS - ILV UNIVERSITE DE VERSAILLES SAINT QUEN",
    Contact: "",
    city: "VERSAILLES CEDEX",
    location: [
      2.131319,
      48.803019
    ],
    Country: "FR",
    Region: "Yvelines"
  },
  {
    id: "12162568",
    Serialno: "208529",
    Model: "D8 VENTURE",
    Company: "CNRS Institut de Chimie de Toulouse Bétiment de Chimie",
    Contact: "",
    city: "TOULOUSE CEDEX 4",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "13090582",
    Serialno: "216862",
    Model: "D8 VENTURE",
    Company: "CNRS Institut NEEL UPR2940-DR11",
    Contact: "Olivier LEYNAUD",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182081
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "12005292",
    Serialno: "4687",
    Model: "D8 VENTURE",
    Company: "Institut de Chimie Moléculaire de R UMR CNRS 7312",
    Contact: "",
    city: "REIMS CEDEX 2",
    location: [
      4.053047,
      49.250907
    ],
    Country: "FR",
    Region: "Marne"
  },
  {
    id: "CA10026294",
    Serialno: "4488",
    Model: "D8 VENTURE",
    Company: "INSTITUT JEAN LAMOUR UMR 7198 CNRS",
    Contact: "Emmanuel Wenger",
    city: "NANCY",
    location: [
      6.171514,
      48.68793
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "12660949",
    Serialno: "214093",
    Model: "D8 VENTURE",
    Company: "Institut Laue Langevin Service Finance",
    Contact: "Oscar FABELAO",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182085
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12326582",
    Serialno: "209720",
    Model: "D8 VENTURE",
    Company: "SANOFI AVENTIS Recherche & Développement",
    Contact: "",
    city: "VITRY SUR SEINE",
    location: [
      2.39571,
      48.789495
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "11995016",
    Serialno: "4681",
    Model: "D8 VENTURE",
    Company: "UNIVERSITE DE BOURGOGNE ICB/Mirande",
    Contact: "",
    city: "DIJON",
    location: [
      5.034852,
      47.331938
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12217446",
    Serialno: "208916",
    Model: "D8 VENTURE",
    Company: "UNIVERSITE DE RENNES 1 Centre de Diffractométrie X",
    Contact: "",
    city: "RENNES CEDEX",
    location: [
      -1.68365,
      48.110899
    ],
    Country: "FR",
    Region: "Ille-et-Vilaine"
  },
  {
    id: "12608892",
    Serialno: "213474",
    Model: "D8 VENTURE",
    Company: "UNIVERSITE DE STRASBOURG Service de Radiocristallographie",
    Contact: "Dr. Lydia KARMAZIN",
    city: "STRASBOURG CEDEX",
    location: [
      7.761454,
      48.579831
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "11779940",
    Serialno: "4601",
    Model: "D8 VENTURE",
    Company: "Université de Picardie Jules Verne LRCS",
    Contact: "",
    city: "AMIENS",
    location: [
      2.29248,
      49.903034
    ],
    Country: "FR",
    Region: "Somme"
  },
  {
    id: "12138082",
    Serialno: "208460",
    Model: "D8 VENTURE",
    Company: "Université Paris Sud 11 ICMMO - Service de spectro de masse",
    Contact: "",
    city: "ORSAY",
    location: [
      2.190814,
      48.69455
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "12607479",
    Serialno: "213543",
    Model: "D8 QUEST",
    Company: "CEA MARCOULE Laboratoire LN1 (ATALANTE)",
    Contact: "Christelle TAMAIN",
    city: "BAGNOLS SUR CEZE",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12603964",
    Serialno: "213344",
    Model: "D8 QUEST",
    Company: "CERMN - Unicaen EA 4258",
    Contact: "Jean-Franéois LOHIER",
    city: "CAEN",
    location: [
      -0.372291,
      49.184571
    ],
    Country: "FR",
    Region: "Calvados"
  },
  {
    id: "12701582",
    Serialno: "214348",
    Model: "SC-XRD SYSTEM",
    Company: "CEA SACLAY DSM / IRAMIS / SPEC",
    Contact: "Pierre Thuery",
    city: "GIF SUR YVETTE CEDEX",
    location: [
      2.130573,
      48.69503
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "12489580",
    Serialno: "212052",
    Model: "SC-XRD SYSTEM",
    Company: "Ecole National Superieure ENSCM/ICGM",
    Contact: "",
    city: "MONTPELLIER CEDEX 05",
    location: [
      3.87048,
      43.610476
    ],
    Country: "FR",
    Region: "Hérault"
  },
  {
    id: "12404030",
    Serialno: "210277",
    Model: "SC-XRD SYSTEM",
    Company: "Sanofi Production",
    Contact: "",
    city: "VITRY SUR SEINE",
    location: [
      2.39571,
      48.7895
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "CA10005585",
    Serialno: "2461",
    Model: "KAPPA APEX II",
    Company: "C.N.R.S. - LTMS Laboratoire de Tectonique Moléculai",
    Contact: "",
    city: "STRASBOURG",
    location: [
      7.761454,
      48.5799
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10020551",
    Serialno: "4321",
    Model: "KAPPA APEX II",
    Company: "Institut Parisien de Chimie Moléculaire",
    Contact: "",
    city: "PARIS CEDEX 05",
    location: [
      2.348,
      48.859
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "CA10007401",
    Serialno: "2762",
    Model: "KAPPA APEX II SEALD TUBE MO WIN 50",
    Company: "CERMN - Unicaen EA 4258",
    Contact: "",
    city: "CAEN",
    location: [
      -0.372291,
      49.18458
    ],
    Country: "FR",
    Region: "Calvados"
  },
  {
    id: "CA10017822",
    Serialno: "4180",
    Model: "KAPPA APEXII",
    Company: "Université du Maine Faculté des Sciences",
    Contact: "",
    city: "LE MANS CEDEX",
    location: [
      0.190947,
      47.99337
    ],
    Country: "FR",
    Region: "Sarthe"
  },
  {
    id: "CA10019528",
    Serialno: "4293",
    Model: "KAPPA APEXII",
    Company: "Université Paul Sabatier Service Commun Rayons X ICT-FR2599",
    Contact: "",
    city: "TOULOUSE CEDEX 9",
    location: [
      1.434497,
      43.603742
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10019056",
    Serialno: "5400818",
    Model: "KAPPA CCD",
    Company: "C.N.R.S. Polytechnique UMR7653 Laboratoire DCPH",
    Contact: "",
    city: "PALAISEAU",
    location: [
      2.232499,
      48.716454
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10005776",
    Serialno: "5400715",
    Model: "KAPPA CCD",
    Company: "CEA SACLAY DSM / IRAMIS / SPEC",
    Contact: "",
    city: "GIF SUR YVETTE CEDEX",
    location: [
      2.130573,
      48.695029
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10005771",
    Serialno: "5400712",
    Model: "KAPPA CCD",
    Company: "CNRS - IPCMS Cronenbourg",
    Contact: "",
    city: "STRASBOURG CEDEX 2",
    location:[
      7.761456,
      48.579831
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10022978",
    Serialno: "9967",
    Model: "KAPPA CCD",
    Company: "I.C.M.C.B - C.N.R.S. Chimie de la Matiére Condensée",
    Contact: "",
    city: "PESSAC CEDEX",
    location: [
      -0.67666,
      44.785635
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "CA10005775",
    Serialno: "5400812",
    Model: "KAPPA CCD",
    Company: "INSTITUT JEAN LAMOUR UMR 7198 CNRS",
    Contact: "",
    city: "NANCY",
    location: [
      6.171514,
      48.68793
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "CA10005720",
    Serialno: "5400205",
    Model: "KAPPA CCD",
    Company: "Sanofi Ets de Montpellier",
    Contact: "",
    city: "MONTPELLIER CEDEX 04",
    location: [
      3.87049,
      43.610476
    ],
    Country: "FR",
    Region: "Hérault"
  },
  {
    id: "CA10025574",
    Serialno: "5400504",
    Model: "KAPPA CCD",
    Company: "UNIVERSITE DE TOURS UFR SCIENCES PHARMACEUTIQUES",
    Contact: "",
    city: "TOURS CEDEX",
    location: [
      0.694658,
      47.39565
    ],
    Country: "FR",
    Region: "Indre-et-Loire"
  },
  {
    id: "CA10005773",
    Serialno: "5400106",
    Model: "KAPPA CCD",
    Company: "UNIVERSITE JOSEPH FOURIER D.C.M. ex L.E.D.S.S.",
    Contact: "",
    city: "SAINT MARTIN D'HERES",
    location: [
      5.762949,
      45.179494
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10023423",
    Serialno: "9964",
    Model: "KAPPA CCD",
    Company: "UNIVERSITE PARIS NORD 13 LABORATOIRE DE CHIMIE",
    Contact: "",
    city: "BOBIGNY CEDEX",
    location: [
      2.443342,
      48.907365
    ],
    Country: "FR",
    Region: "Seine-Saint-Denis"
  },
  {
    id: "CA10028108",
    Serialno: "5400703",
    Model: "KAPPA CCD",
    Company: "UNIVERSITE VICTOR SEGALEN BORDEAUX Laboratoire Chimie Physique Minéral",
    Contact: "",
    city: "BORDEAUX",
    location: [
      -0.587877,
      44.851895
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "CA10011886",
    Serialno: "5400711",
    Model: "KAPPA CCD UPG TO APEX II DET 230/50HZ",
    Company: "CNRS Institut NEEL UPR2940 - DR11",
    Contact: "",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182081
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10011885",
    Serialno: "0702-00357",
    Model: "KAPPA CCD UPG TO APEX II DET 230/50HZ",
    Company: "INSTITUT JEAN LAMOUR UMR 7198 CNRS",
    Contact: "",
    city: "NANCY",
    location: [
      6.171514,
      48.68797
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "CA10017022",
    Serialno: "5400912",
    Model: "KAPPA CCD UPG TO APEX II DET 230/50HZ",
    Company: "UNIVERSITE DE BOURGOGNE ICB/Mirande",
    Contact: "",
    city: "DIJON",
    location: [
      5.034855,
      47.331938
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10016159",
    Serialno: "4077",
    Model: "KAPPA K3 APEX II ST MO WIN 50HZ",
    Company: "UNIVERSITE BLAISE PASCAL LABO DES MATERIAUX INORGANIQUES",
    Contact: "",
    city: "AUBIERE CEDEX",
    location: [
      3.125781,
      45.752526
    ],
    Country: "FR",
    Region: "Puy-de-Déme"
  },
  {
    id: "CA10010452",
    Serialno: "2987",
    Model: "KAPPA K3 APEX II ST MO WIN 50HZ /NR",
    Company: "CNRS Labo. de Chimie de Coordination",
    Contact: "",
    city: "TOULOUSE CEDEX 04",
    location: [
      1.4345,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10000065",
    Serialno: "ROE2277",
    Model: "SMART",
    Company: "CEA Grenoble DRFMC-SCIB",
    Contact: "",
    city: "GRENOBLE CEDEX",
    location: [
      5.7243,
      45.182087
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10000265",
    Serialno: "ROE1172",
    Model: "SMART",
    Company: "SC ESRF EUROPEAN SYNCHROTRON RADIAT Polygone Scientifique Louis Neel",
    Contact: "C. Baehtz",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182089
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10000717",
    Serialno: "ROE2102",
    Model: "SMART",
    Company: "SC ESRF EUROPEAN SYNCHROTRON RADIAT Polygone Scientifique Louis Neel",
    Contact: "",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182088
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10001781",
    Serialno: "ROE2392",
    Model: "SMART",
    Company: "Université Sciences et Techniques L LCPS",
    Contact: "",
    city: "VILLENEUVE D'ASCQ",
    location: [
      3.147134,
      50.637919
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10000466",
    Serialno: "ROE2451",
    Model: "SMART 1000",
    Company: "Université Paul Sabatier Laboratoire CIRIMAT / LCMIE",
    Contact: "",
    city: "TOULOUSE CEDEX 4",
    location:  [
      1.434498,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10010538",
    Serialno: "2994",
    Model: "SMART 1000 UPG TO SMART APEX II, 50HZ",
    Company: "INSA Toulouse Department Génie Chimique",
    Contact: "",
    city: "TOULOUSE CEDEX 4",
    location:  [
      1.434499,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10002260",
    Serialno: "CCD-01/01-00-657",
    Model: "SMART APEX",
    Company: "Sanofi Recherche & Developpement",
    Contact: "",
    city: "VITRY SUR SEINE CEDEX",
    location: [
      2.39571,
      48.789495
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "CA10002374",
    Serialno: "CCD-01/04-01-683",
    Model: "SMART APEX",
    Company: "UNIVERSITE DE ROUEN UFR DES SCIENCES",
    Contact: "",
    city: "MONT SAINT AIGNAN CEDEX",
    location: [
      1.081656,
      49.467142
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "CA10002387",
    Serialno: "NANO-01/11-17",
    Model: "NANOSTAR",
    Company: "ADMI ENSCPB CNRS - UMR 5629",
    Contact: "",
    city: "PESSAC CEDEX",
    location: [
      -0.67666,
      44.785637
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "CA10005928",
    Serialno: "202103",
    Model: "NANOSTAR",
    Company: "C.N.R.S. - C.R.P.P.",
    Contact: "",
    city: "PESSAC",
    location: [
      -0.67666,
      44.785639
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "CA10000464",
    Serialno: "ROE2406",
    Model: "NANOSTAR",
    Company: "C.N.R.S. - LTMS Laboratoire de Tectonique Moléculai",
    Contact: "",
    city: "STRASBOURG",
    location: [
      7.761454,
      48.579832
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10024632",
    Serialno: "206229",
    Model: "NANOSTAR SSS",
    Company: "Usine Michelin de Ladoux",
    Contact: "",
    city: "CEBAZAT",
    location: [
      3.103749,
      45.82899
    ],
    Country: "FR",
    Region: "Puy-de-Déme"
  },
  {
    id: "CA10007558",
    Serialno: "202797",
    Model: "NANOSTAR U",
    Company: "Universite Paris Sud Institut de Biochimie et de",
    Contact: "Patrice Vachette",
    city: "ORSAY",
    location: [
      2.190814,
      48.694551
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10023724",
    Serialno: "4411",
    Model: "APEX",
    Company: "C.N.R.S. - C.R.P.P.",
    Contact: "",
    city: "PESSAC",
    location: [
      -0.67666,
      44.785636
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "CA10026016",
    Serialno: "4476",
    Model: "APEX",
    Company: "C.N.R.S. - I.C.M.C.B X-Ray Department",
    Contact: "",
    city: "PESSAC CEDEX",
    location: [
      -0.67666,
      44.785637
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "CA10023312",
    Serialno: "1037-00667",
    Model: "APEX",
    Company: "CNRS CRISMAT Laboratoire Cristallographie & Maté",
    Contact: "",
    city: "CAEN CEDEX 4",
    location: [
      -0.372291,
      49.184570
    ],
    Country: "FR",
    Region: "Calvados"
  },
  {
    id: "CA10024027",
    Serialno: "4421",
    Model: "APEX DUO",
    Company: "Sanofi Ets de Montpellier",
    Contact: "",
    city: "MONTPELLIER CEDEX 04",
    location: [
      3.87048,
      43.610477
    ],
    Country: "FR",
    Region: "Hérault"
  },
  {
    id: "CA10017618",
    Serialno: "4172",
    Model: "APEX DUO",
    Company: "UNIVERSITE DE STRASBOURG Service de Radiocristallographie",
    Contact: "",
    city: "STRASBOURG CEDEX",
    location: [
      7.761453,
      48.579831
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10022483",
    Serialno: "4366",
    Model: "APEX DUO 2XIMS MO/CU KAPPA N/C",
    Company: "Institut Jean Lamour - UMR CNRS 719 Centre de Compétence XGamma",
    Contact: "",
    city: "NANCY",
    location: [
      6.171514,
      48.68793
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "CA10024908",
    Serialno: "4446",
    Model: "APEX DUO 2XIMS MO/CU KAPPA N/C",
    Company: "Université de Bordeaux Institut des Sciences Moléculaires",
    Contact: "",
    city: "TALENCE CEDEX",
    location: [
      -0.592127,
      44.806158
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "CA10020698",
    Serialno: "F4268",
    Model: "APEX DUO KAPPA W/O DETECTOR",
    Company: "C.N.R.S. Lille LABORATOIRE DE CRISTALLOCHIMIE",
    Contact: "",
    city: "VILLENEUVE D'ASCQ CEDEX",
    location: [
      3.147134,
      50.637915
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CN10088830",
    Serialno: "T1515",
    Model: "APEX SYSTEM",
    Company: "Corning SAS Comptabilité Fournisseurs",
    Contact: "",
    city: "AVON CEDEX",
    location: [
      2.728645,
      48.412667
    ],
    Country: "FR",
    Region: "Seine-et-Marne"
  },
  {
    id: "11817090",
    Serialno: "BY051450",
    Model: "APEX-QE",
    Company: "UNIVERSITE PARIS-SUD 11 UMR 8000 CNRS",
    Contact: "",
    city: "ORSAY CEDEX",
    location: [
      2.190813,
      48.694549
    ],
    Country: "FR",
    Region: "Essonne"
  }
 ]
const XRD = [
  
  {
    id: "12610761",
    Serialno: "213569",
    Model: "D8 ENDEAVOR",
    Company: "Catalent France Beinheim Sa",
    Contact: "Benoit HILBOLD",
    city: "BEINHEIM",
    location: [
      8.079937,
      48.859839
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "12415912",
    Serialno: "210409",
    Model: "D8 ENDEAVOR",
    Company: "Centre Nationale de la Recherche Scientifique - Institut Néel",
    Contact: "Dr. Eric Mossang",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182081
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "12503258",
    Serialno: "212232",
    Model: "D8 ENDEAVOR",
    Company: "CFR012 - EUROFINS ANALYSE POUR L'ENVIRONNEMENT FRANCE",
    Contact: "",
    city: "SAVERNE",
    location: [
      7.369851,
      48.739819
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "12282367",
    Serialno: "209369",
    Model: "D8 ENDEAVOR",
    Company: "ENSCP Chimie Appliquée Etat Solide",
    Contact: "",
    city: "PARIS CEDEX 05",
    location: [
      2.347,
      48.859
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "12493444",
    Serialno: "212109",
    Model: "D8 ENDEAVOR",
    Company: "EQIOM",
    Contact: "",
    city: "LUMBRES",
    location: [
      2.115072,
      50.706951
    ],
    Country: "FR",
    Region: "Pas-de-Calais"
  },
  {
    id: "12536611",
    Serialno: "212677",
    Model: "D8 ENDEAVOR",
    Company: "EQIOM Usine de Héming",
    Contact: "Gérard JUNGERS",
    city: "HEMING",
    location: [
      6.966496,
      48.693545
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "12612663",
    Serialno: "213570",
    Model: "D8 ENDEAVOR",
    Company: "LAFARGE CIMENTS",
    Contact: "Estelle RAYNAUD",
    city: "PORT-LA-NOUVELLE",
    location: [
      3.048412,
      43.01161
    ],
    Country: "FR",
    Region: "Aude"
  },
  {
    id: "12612686",
    Serialno: "213592",
    Model: "D8 ENDEAVOR",
    Company: "LAFARGE CIMENTS",
    Contact: "Estelle RAYNAUD",
    city: "PORT-LA-NOUVELLE",
    location: [
      3.048412,
      43.01161
    ],
    Country: "FR",
    Region: "Aude"
  },
  {
    id: "12584128",
    Serialno: "213235",
    Model: "D8 ENDEAVOR",
    Company: "LafargeHolcim France Laboratoire",
    Contact: "Claire CAPRA",
    city: "SAINT QUENTIN FALLAVIER",
    location: [
      5.107681,
      45.643128
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12477597",
    Serialno: "211166",
    Model: "D8 ENDEAVOR",
    Company: "SAINT GOBAIN - CREE Service Structures et Microanalyses",
    Contact: "",
    city: "CAVAILLON CEDEX",
    location: [
      5.034894,
      43.848735
    ],
    Country: "FR",
    Region: "Vaucluse"
  },
  {
    id: "12775171",
    Serialno: "214969",
    Model: "D8 ENDEAVOR",
    Company: "SAINT GOBAIN - CREE Service Structures et Microanalyses",
    Contact: "Céline WISS",
    city: "CAVAILLON CEDEX",
    location: [
      5.034894,
      43.848735
    ],
    Country: "FR",
    Region: "Vaucluse"
  },
  {
    id: "13017169",
    Serialno: "216380",
    Model: "D8 ENDEAVOR",
    Company: "TERA ENVIRONNEMENT 2",
    Contact: "Stella COHANA",
    city: "FUVEAU",
    location: [
      5.554955,
      43.459312
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12990741",
    Serialno: "216248",
    Model: "D8 ENDEAVOR",
    Company: "UNIVERSITE TOULOUSE III PAUL SABATIER",
    Contact: "Antoine BARNABE",
    city: "TOULOUSE CEDEX 9",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "12731611",
    Serialno: "214542",
    Model: "D8 ENDEAVOR",
    Company: "Université de Bourgogne",
    Contact: "Jean-Franéois Deconinck",
    city: "DIJON",
    location: [
      5.034852,
      47.331938
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "12952236",
    Serialno: "215967",
    Model: "D8 ENDEAVOR",
    Company: "Usine Michelin d'Epinal",
    Contact: "Marc AUCLAIR",
    city: "GOLBEY",
    location: [
      6.428957,
      48.196392
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10026093",
    Serialno: "206509",
    Model: "D2 PHASER",
    Company: "ANSM EX AFSSAPS",
    Contact: "",
    city: "VENDARGUES",
    location: [
      3.963982,
      43.658046
    ],
    Country: "FR",
    Region: "Hérault"
  },
  {
    id: "11981108",
    Serialno: "207729",
    Model: "D2 PHASER",
    Company: "ARCELORMITTAL MAIZIERES RESEARCH SA",
    Contact: "",
    city: "MAIZIERES LES METZ CEDEX",
    location: [
      6.154495,
      49.212658
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10021413",
    Serialno: "205470",
    Model: "D2 PHASER",
    Company: "ARCELORMITTAL MAIZIERES RESEARCH SA",
    Contact: "",
    city: "MAIZIERES LES METZ CEDEX",
    location: [
      6.154495,
      49.212658
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "12955145",
    Serialno: "250557",
    Model: "D2 PHASER",
    Company: "Automotive Cells Company SE ACC - Centre R&D",
    Contact: "Vincent Goldschmid",
    city: "BRUGES",
    location: [
      -0.603486,
      44.882495
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10025159",
    Serialno: "205893",
    Model: "D2 PHASER",
    Company: "BAIKOWSKI",
    Contact: "",
    city: "LA BALME DE SILLINGY CEDE",
    location: [
      6.030555,
      45.972225
    ],
    Country: "FR",
    Region: "Savoie (Haute)"
  },
  {
    id: "12375056",
    Serialno: "210096",
    Model: "D2 PHASER",
    Company: "BIOCETIS SARL Zone Industrielle",
    Contact: "",
    city: "NOGENT",
    location: [
      5.369743,
      48.029423
    ],
    Country: "FR",
    Region: "Marne (Haute)"
  },
  {
    id: "12835973",
    Serialno: "250348",
    Model: "D2 PHASER",
    Company: "Bruker France S.A.S.",
    Contact: "",
    city: "WISSEMBOURG CEDEX",
    location: [
      7.95218,
      49.015546
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10025145",
    Serialno: "205896",
    Model: "D2 PHASER",
    Company: "BUREAU VERITAS LABORATOIRES",
    Contact: "",
    city: "BELFORT",
    location: [
      6.857469,
      47.640938
    ],
    Country: "FR",
    Region: "Territ.-de-Belfort"
  },
  {
    id: "12728201",
    Serialno: "250104",
    Model: "D2 PHASER",
    Company: "Carbone Savoie Notre Dame de Brianéon",
    Contact: "Xavier Fleury",
    city: "AIGUEBLANCHE",
    location: [
      6.509359,
      45.501091
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12054816",
    Serialno: "207761",
    Model: "D2 PHASER",
    Company: "CEA CADARACHE DEC/SESC/LCU",
    Contact: "",
    city: "SAINT PAUL LEZ DURANCE CE",
    location: [
      5.76376,
      43.62543
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "11784327",
    Serialno: "207187",
    Model: "D2 PHASER",
    Company: "CEA MARCOULE DEN/DTEC/SGCS/LMAC",
    Contact: "",
    city: "BAGNOLS SUR CEZE CEDEX",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "12511243",
    Serialno: "212335",
    Model: "D2 PHASER",
    Company: "CEA SACLAY DRF / IRAMIS / NIMBE",
    Contact: "",
    city: "GIF SUR YVETTE",
    location: [
      2.130573,
      48.695026
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12777680",
    Serialno: "214991",
    Model: "D2 PHASER",
    Company: "CERAVER",
    Contact: "celine dubois",
    city: "PLAILLY",
    location: [
      2.582166,
      49.102673
    ],
    Country: "FR",
    Region: "Oise"
  },
  {
    id: "12187570",
    Serialno: "208490",
    Model: "D2 PHASER",
    Company: "Chryso",
    Contact: "",
    city: "SERMAISES DU LOIRET",
    location: [
      2.213599,
      48.296377
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "12505798",
    Serialno: "212276",
    Model: "D2 PHASER",
    Company: "CNRS - Maison de l'orient - UMR 513 Lab. Archéométrie / Archéologie",
    Contact: "",
    city: "LYON CEDEX 7",
    location: [
      4.835,
      45.758
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10018934",
    Serialno: "204930",
    Model: "D2 PHASER",
    Company: "CNRS - UMR 5255 - ISM",
    Contact: "",
    city: "TALENCE",
    location: [
      -0.592127,
      44.806158
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "12269478",
    Serialno: "209272",
    Model: "D2 PHASER",
    Company: "CNRS Cachan ENS CACHAN",
    Contact: "",
    city: "CACHAN CEDEX",
    location: [
      2.331515,
      48.791346
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "12165879",
    Serialno: "208547",
    Model: "D2 PHASER",
    Company: "CTMNC Laboratoire R&D",
    Contact: "",
    city: "LIMOGES CEDEX",
    location: [
      1.221254,
      45.856159
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10023719",
    Serialno: "205673",
    Model: "D2 PHASER",
    Company: "DELEGATION GENERALE POUR L'ARMEMENT Etablissement Technique de Bourges",
    Contact: "",
    city: "BOURGES CEDEX",
    location: [
      2.397496,
      47.082492
    ],
    Country: "FR",
    Region: "Cher"
  },
  {
    id: "12057014",
    Serialno: "207912",
    Model: "D2 PHASER",
    Company: "E.S.T.P.",
    Contact: "",
    city: "CACHAN",
    location: [
      2.331515,
      48.791346
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "11760862",
    Serialno: "207030",
    Model: "D2 PHASER",
    Company: "ECAM Strasbourg-Europe",
    Contact: "",
    city: "SCHILTIGHEIM",
    location: [
      7.742,
      48.610887
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10021693",
    Serialno: "205537",
    Model: "D2 PHASER",
    Company: "ECOLE CENTRALE SUPELEC M. Guiblin",
    Contact: "",
    city: "GIF SUR YVETTE",
    location: [
      2.130573,
      48.695026
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "12454405",
    Serialno: "210883",
    Model: "D2 PHASER",
    Company: "EnerCat SAS",
    Contact: "",
    city: "PLOEMEUR",
    location: [
      -3.445613,
      47.728765
    ],
    Country: "FR",
    Region: "Morbihan"
  },
  {
    id: "12573339",
    Serialno: "213072",
    Model: "D2 PHASER",
    Company: "ESIREM UNIVERSITE DE DIJON",
    Contact: "Jean-Marc DACHICOURT",
    city: "DIJON",
    location: [
      5.034852,
      47.331938
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "12728431",
    Serialno: "250102",
    Model: "D2 PHASER",
    Company: "EURECAT FRANCE SAS",
    Contact: "Justine Dutel",
    city: "LA VOULTE SUR RHONE",
    location: [
      4.785479,
      44.802569
    ],
    Country: "FR",
    Region: "Ardéche"
  },
  {
    id: "12050572",
    Serialno: "207992",
    Model: "D2 PHASER",
    Company: "EUROFINS LEM SAS Analyse pour l'Environnement",
    Contact: "",
    city: "SAVERNE",
    location: [
      7.369851,
      48.739819
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "12213120",
    Serialno: "208890",
    Model: "D2 PHASER",
    Company: "FACULTE DES SCIENCES ET TECHNOLOGIE UMR7359 - GEORESSOURCES",
    Contact: "",
    city: "VANDOEUVRE LES NANCY CEDE",
    location: [
      6.162826,
      48.661967
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "13042364",
    Serialno: "250856",
    Model: "D2 PHASER",
    Company: "FAREVA LA VALLEE",
    Contact: "Gérald CAGNIN",
    city: "SAINT-GERMAIN-LAPRADE",
    location: [
      3.980847,
      45.034361
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12315902",
    Serialno: "209624",
    Model: "D2 PHASER",
    Company: "Geoservices Equipements SAS Schlumberger",
    Contact: "",
    city: "ROISSY EN FRANCE",
    location: [
      2.522295,
      48.994365
    ],
    Country: "FR",
    Region: "Val-d'Oise"
  },
  {
    id: "12319302",
    Serialno: "209624",
    Model: "D2 PHASER",
    Company: "Geoservices Equipements SAS Schlumberger",
    Contact: "",
    city: "ROISSY EN FRANCE",
    location: [
      2.522295,
      48.994365
    ],
    Country: "FR",
    Region: "Val-d'Oise"
  },
  {
    id: "12623345",
    Serialno: "213720",
    Model: "D2 PHASER",
    Company: "GINGER CEBTP Laboratoire de Chimie",
    Contact: "Warda BEN MESSAOUD",
    city: "ELANCOURT",
    location: [
      1.959959,
      48.779364
    ],
    Country: "FR",
    Region: "Yvelines"
  },
  {
    id: "CA10017986",
    Serialno: "204690",
    Model: "D2 PHASER",
    Company: "IFREMER Centre Bretagne",
    Contact: "",
    city: "PLOUZANE",
    location: [
      -4.590113,
      48.371873
    ],
    Country: "FR",
    Region: "Finistére"
  },
  {
    id: "12579488",
    Serialno: "213182",
    Model: "D2 PHASER",
    Company: "IMERYS ALUMINATES SA Usine de Le Teil",
    Contact: "Raynald DASSONVILLE",
    city: "LE TEIL",
    location: [
      4.668061,
      44.545776
    ],
    Country: "FR",
    Region: "Ardéche"
  },
  {
    id: "CA10026602",
    Serialno: "206638",
    Model: "D2 PHASER",
    Company: "IMT LILLE DOUAI Direction des Affaires Financiéres",
    Contact: "",
    city: "DOUAI CEDEX",
    location: [
      3.095098,
      50.379346
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12911328",
    Serialno: "250498",
    Model: "D2 PHASER",
    Company: "INSA RENNES Dpt SGM,GMA,STPI",
    Contact: "Isabelle THIBON",
    city: "RENNES CEDEX 7",
    location: [
      -1.68365,
      48.110899
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "13026231",
    Serialno: "250794",
    Model: "D2 PHASER",
    Company: "Inst. de Chimie Organique et Analytique - I.C.O.A. UMR 7311",
    Contact: "Marina LICHERON",
    city: "ORLéANS CéDEX 2",
    location: [
      1.910933,
      47.87372
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "CA10024514",
    Serialno: "206195",
    Model: "D2 PHASER",
    Company: "Institut Technologique FCBA Péle InTechFibres-InTechFibres Divi",
    Contact: "",
    city: "SAINT MARTIN D'HéRES",
    location: [
      5.762949,
      45.179494
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "12419789",
    Serialno: "210310",
    Model: "D2 PHASER",
    Company: "Institut Universitaire de Technolog Département Mesures Physiques",
    Contact: "",
    city: "AUBIERE CEDEX",
    location: [
      3.125781,
      45.752526
    ],
    Country: "FR",
    Region: "Puy-de-Déme"
  },
  {
    id: "CA10020356",
    Serialno: "205245",
    Model: "D2 PHASER",
    Company: "INSTITUT UNIVERSITAIRE DE TECHNOLOG Service Comptabilité",
    Contact: "",
    city: "LANNION CEDEX",
    location: [
      -3.474263,
      48.741631
    ],
    Country: "FR",
    Region: "Cétes-d'Armor"
  },
  {
    id: "12210326",
    Serialno: "208856",
    Model: "D2 PHASER",
    Company: "INSTITUT UNIVERSITAIRE DE TECHNOLOGIE LYON 1",
    Contact: "",
    city: "VILLEURBANNE",
    location: [
      4.890035,
      45.768975
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "12616225",
    Serialno: "213631",
    Model: "D2 PHASER",
    Company: "IRT - M2P Institut de Recherche Tehnologique",
    Contact: "Joffrey TARDELLI",
    city: "METZ",
    location: [
      6.194897,
      49.108385
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10027634",
    Serialno: "206846",
    Model: "D2 PHASER",
    Company: "IUT A Castres - Université Paul Sab Département Chimie Castres",
    Contact: "",
    city: "CASTRES CEDEX",
    location: [
      2.240055,
      43.609339
    ],
    Country: "FR",
    Region: "Tarn"
  },
  {
    id: "11934509",
    Serialno: "207498",
    Model: "D2 PHASER",
    Company: "IUT A Lille 1",
    Contact: "",
    city: "VILLENEUVE D'ASCQ",
    location: [
      3.147134,
      50.637916
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "12304515",
    Serialno: "209547",
    Model: "D2 PHASER",
    Company: "IUT de Némes Sciences et Genie des Materiaux",
    Contact: "",
    city: "NIMES",
    location: [
      4.344809,
      43.817206
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "12064954",
    Serialno: "208054",
    Model: "D2 PHASER",
    Company: "LABORATOIRE SCL Section Métallurgie-Papier-Textile",
    Contact: "",
    city: "MASSY",
    location: [
      2.269655,
      48.728133
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "12576205",
    Serialno: "213146",
    Model: "D2 PHASER",
    Company: "Laboratoires BPE SARL",
    Contact: "Stéphane LOGEL",
    city: "DIMBSTHAL",
    location: [
      7.357647,
      48.673162
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12036104",
    Serialno: "207766",
    Model: "D2 PHASER",
    Company: "LAFARGE CIMENTS Usine de Val d'Azergues",
    Contact: "",
    city: "LOZANNE",
    location: [
      4.684088,
      45.853558
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "12160076",
    Serialno: "207766",
    Model: "D2 PHASER",
    Company: "LAFARGE CIMENTS Usine de Val d'Azergues",
    Contact: "",
    city: "LOZANNE",
    location: [
      4.684088,
      45.853558
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "12885217",
    Serialno: "250464",
    Model: "D2 PHASER",
    Company: "LIVBAG",
    Contact: "Michel LEVEQUE",
    city: "PONT-DE-BUIS",
    location: [
      -4.10869,
      48.271223
    ],
    Country: "FR",
    Region: "Finistére"
  },
  {
    id: "CA10024536",
    Serialno: "205794",
    Model: "D2 PHASER",
    Company: "Muséum National d'Histoire Naturell Département Histoire de la Terre",
    Contact: "",
    city: "PARIS",
    location: [
      2.347,
      48.859
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "12398853",
    Serialno: "210143",
    Model: "D2 PHASER",
    Company: "NUVISAN",
    Contact: "",
    city: "BIOT",
    location: [
      7.084843,
      43.628198
    ],
    Country: "FR",
    Region: "Alpes-Maritimes"
  },
  {
    id: "12218614",
    Serialno: "208901",
    Model: "D2 PHASER",
    Company: "Observatoire Midi Pyrénées Laboratoire d'Aerologie",
    Contact: "",
    city: "TOULOUSE",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "12522583",
    Serialno: "212471",
    Model: "D2 PHASER",
    Company: "Orano Chimie-Enrichissement Etablissement de Pierrelatte",
    Contact: "",
    city: "PIERRELATTE CEDEX",
    location: [
      4.689504,
      44.357315
    ],
    Country: "FR",
    Region: "Dréme"
  },
  {
    id: "12388487",
    Serialno: "210182",
    Model: "D2 PHASER",
    Company: "SAINT GOBAIN RECHERCHE SAS",
    Contact: "",
    city: "AUBERVILLIERS CEDEX",
    location: [
      2.386579,
      48.912832
    ],
    Country: "FR",
    Region: "Seine-Saint-Denis"
  },
  {
    id: "12471373",
    Serialno: "211100",
    Model: "D2 PHASER",
    Company: "Sanofi Aventis Recherche et Développement",
    Contact: "",
    city: "MONTPELLIER",
    location: [
      3.87048,
      43.610476
    ],
    Country: "FR",
    Region: "Hérault"
  },
  {
    id: "12416254",
    Serialno: "210246",
    Model: "D2 PHASER",
    Company: "SANOFI CHIMIE Service Comptabilité",
    Contact: "",
    city: "SISTERON",
    location: [
      5.932133,
      44.202909
    ],
    Country: "FR",
    Region: "Alpes (Hte-Provence)"
  },
  {
    id: "12516436",
    Serialno: "212318",
    Model: "D2 PHASER",
    Company: "Sanofi Chimie Site de Vertolaye",
    Contact: "",
    city: "VERTOLAYE",
    location: [
      3.717435,
      45.653024
    ],
    Country: "FR",
    Region: "Puy-de-Déme"
  },
  {
    id: "12216130",
    Serialno: "208900",
    Model: "D2 PHASER",
    Company: "SIGMA Clermont Plateforme Technologie Chimie",
    Contact: "",
    city: "AUBIERE",
    location: [
      3.125781,
      45.752526
    ],
    Country: "FR",
    Region: "Puy-de-Déme"
  },
  {
    id: "12511770",
    Serialno: "212340",
    Model: "D2 PHASER",
    Company: "SOLCERA",
    Contact: "",
    city: "EVREUX CEDEX",
    location: [
      1.146898,
      49.020599
    ],
    Country: "FR",
    Region: "Eure"
  },
  {
    id: "CA10019109",
    Serialno: "204958",
    Model: "D2 PHASER",
    Company: "SYNCHROTRON SOLEIL SC",
    Contact: "",
    city: "SAINT AUBIN",
    location: [
      5.328791,
      47.033652
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "13056194",
    Serialno: "250927",
    Model: "D2 PHASER",
    Company: "THIN SECTION LAB",
    Contact: "Cédric DEMEURIE",
    city: "TOUL",
    location: [
      5.90155,
      48.681032
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12332768",
    Serialno: "209776",
    Model: "D2 PHASER",
    Company: "UNI DE PAU ET DES PAYS DE L'ADOUR Direction des Finances",
    Contact: "",
    city: "PAU CEDEX",
    location: [
      -0.343106,
      43.313159
    ],
    Country: "FR",
    Region: "Pyrénées-Atlantiques"
  },
  {
    id: "12389337",
    Serialno: "210214",
    Model: "D2 PHASER",
    Company: "UNIVERSITE BORDEAUX UF de chimie - CRTP",
    Contact: "",
    city: "TALENCE CEDEX",
    location: [
      -0.592127,
      44.806158
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "13001654",
    Serialno: "250724",
    Model: "D2 PHASER",
    Company: "UNIVERSITE DE LORRAINE FACULTE DES SCIENCES ET TECHNOLOGIE",
    Contact: "Sébastien FONTANA",
    city: "VANDOEUVRE LES NANCY",
    location: [
      6.162826,
      48.661967
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "CA10021802",
    Serialno: "205567",
    Model: "D2 PHASER",
    Company: "UNIVERSITE DE RENNES 1 Sciences Chimiques de Rennes",
    Contact: "",
    city: "RENNES CEDEX",
    location: [
      -1.68365,
      48.110899
    ],
    Country: "FR",
    Region: "Ille-et-Vilaine"
  },
  {
    id: "CA10020602",
    Serialno: "205304",
    Model: "D2 PHASER",
    Company: "UNIVERSITE PIERRE ET MARIE CURIE Lab Biominéralisations-Paléoenviron",
    Contact: "",
    city: "PARIS CEDEX 05",
    location: [
      2.347,
      48.859
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "12849926",
    Serialno: "250373",
    Model: "D2 PHASER",
    Company: "Université de Lorraine UFR SciFA",
    Contact: "Nicolas STEIN",
    city: "METZ",
    location: [
      6.194897,
      49.108385
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12606200",
    Serialno: "213513",
    Model: "D2 PHASER",
    Company: "Université de MONTPELLIER",
    Contact: "Pascal YOT*",
    city: "MONTPELLIER CEDEX 5",
    location: [
      3.87048,
      43.610476
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12849183",
    Serialno: "215450",
    Model: "D2 PHASER",
    Company: "Université de Reims GEGENAA, EA 3795",
    Contact: "Gilles FRONTEAU",
    city: "REIMS",
    location: [
      4.053047,
      49.250907
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12187142",
    Serialno: "208417",
    Model: "D2 PHASER",
    Company: "Université de Strasbourg ISIS - EQ7 NANOCHIMIE",
    Contact: "",
    city: "STRASBOURG CEDEX",
    location: [
      7.761454,
      48.579831
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10006088",
    Serialno: "202185",
    Model: "D4 ENDEAVOR",
    Company: "ALVANCE ALUMINIUM DUNKERQUE",
    Contact: "",
    city: "LOON PLAGE",
    location: [
      2.239231,
      50.988252
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10006186",
    Serialno: "202238",
    Model: "D4 ENDEAVOR",
    Company: "ALVANCE ALUMINIUM DUNKERQUE",
    Contact: "",
    city: "LOON PLAGE",
    location: [
      2.239231,
      50.988252
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10011985",
    Serialno: "203879",
    Model: "D4 ENDEAVOR",
    Company: "ALVANCE ALUMINIUM DUNKERQUE",
    Contact: "",
    city: "LOON PLAGE",
    location: [
      2.239231,
      50.988252
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10008556",
    Serialno: "203120",
    Model: "D4 ENDEAVOR",
    Company: "EQIOM CIMENTS Usine de Rochefort",
    Contact: "",
    city: "ROCHEFORT SUR NENON",
    location: [
      5.562188,
      47.123443
    ],
    Country: "FR",
    Region: "Jura"
  },
  {
    id: "CA10006690",
    Serialno: "202453",
    Model: "D4 ENDEAVOR",
    Company: "IFP ENERGIES NOUVELLES MAGASIN GENERAL 04 37 70 25 41",
    Contact: "",
    city: "SOLAIZE",
    location: [
      4.842332,
      45.644442
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10009812",
    Serialno: "203311",
    Model: "D4 ENDEAVOR",
    Company: "IMERYS ALUMINATES SA",
    Contact: "",
    city: "MARDYCK",
    location: [
      2.312076,
      51.02638
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10009839",
    Serialno: "203316",
    Model: "D4 ENDEAVOR",
    Company: "IMERYS ALUMINATES SA",
    Contact: "",
    city: "FOS SUR MER CEDEX",
    location: [
      4.949367,
      43.452932
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10008251",
    Serialno: "203003",
    Model: "D4 ENDEAVOR",
    Company: "IMERYS ALUMINATES SA Usine de Le Teil",
    Contact: "",
    city: "LE TEIL",
    location: [
      4.668061,
      44.545776
    ],
    Country: "FR",
    Region: "Ardéche"
  },
  {
    id: "CA10019783",
    Serialno: "205127",
    Model: "D4 ENDEAVOR",
    Company: "Lafarge Ciment",
    Contact: "",
    city: "SAINT PIERRE LA COUR",
    location: [
      -1.025305,
      48.112535
    ],
    Country: "FR",
    Region: "Mayenne"
  },
  {
    id: "CA10026099",
    Serialno: "206510",
    Model: "D4 ENDEAVOR",
    Company: "LAFARGE CIMENTS Usine de Martres",
    Contact: "",
    city: "MARTRES TOLOSANE",
    location: [
      0.999089,
      43.204632
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10028071",
    Serialno: "206952",
    Model: "D4 ENDEAVOR",
    Company: "LAFARGE CIMENTS Usine de Martres",
    Contact: "",
    city: "MARTRES TOLOSANE",
    location: [
      0.999089,
      43.204632
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10015552",
    Serialno: "204122",
    Model: "D4 ENDEAVOR",
    Company: "LAFARGE CIMENTS Usine de Saint Vigor d'Ymonville",
    Contact: "",
    city: "LE HAVRE CEDEX",
    location: [
      0.129995,
      49.507345
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "CA10011256",
    Serialno: "203671",
    Model: "D4 ENDEAVOR",
    Company: "LAFARGE CIMENTS USINE DU TEIL",
    Contact: "",
    city: "LE TEIL",
    location: [
      4.668061,
      44.545776
    ],
    Country: "FR",
    Region: "Ardéche"
  },
  {
    id: "CA10023465",
    Serialno: "205948",
    Model: "D4 ENDEAVOR",
    Company: "LAFARGEHOLCIM CIMENTS Usine de La Malle",
    Contact: "",
    city: "BOUC BEL AIR",
    location: [
      5.410843,
      43.445268
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "12003817",
    Serialno: "207824",
    Model: "D4 ENDEAVOR",
    Company: "Manufacture Franéaise des Pneumatiq Michelin",
    Contact: "",
    city: "CLERMONT-FERRAND",
    location: [
      3.107042,
      45.786671
    ],
    Country: "FR",
    Region: "Puy-de-Déme"
  },
  {
    id: "CA10003249",
    Serialno: "D4-03/02-43",
    Model: "D4 ENDEAVOR",
    Company: "MEDICAL GROUP",
    Contact: "",
    city: "SAINT PRIEST",
    location: [
      4.943428,
      45.701622
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10009442",
    Serialno: "203263",
    Model: "D4 ENDEAVOR",
    Company: "RIO TINTO ALCAN LRF",
    Contact: "",
    city: "SAINT JEAN DE MAURIENNE C",
    location: [
      6.352945,
      45.274127
    ],
    Country: "FR",
    Region: "Savoie"
  },
  {
    id: "CA10024189",
    Serialno: "206117",
    Model: "D4 ENDEAVOR",
    Company: "SANOFI AVENTIS Recherche et Développement",
    Contact: "",
    city: "VITRY SUR SEINE CEDEX",
    location: [
      2.39571,
      48.789495
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "CA10006680",
    Serialno: "D4-02/11-041",
    Model: "D4 ENDEAVOR",
    Company: "TEKNIMED S.A.",
    Contact: "",
    city: "L'UNION",
    location: [
      -61.519909,
      16.256466
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10005683",
    Serialno: "202006",
    Model: "D4 ENDEAVOR",
    Company: "TRIMET FRANCE SAS USINE DE SAINT JEAN",
    Contact: "",
    city: "SAINT JEAN DE MAURIENNE C",
    location: [
      6.352945,
      45.274127
    ],
    Country: "FR",
    Region: "Savoie"
  },
  {
    id: "CA10006582",
    Serialno: "D4-01/02-005",
    Model: "D4 ENDEAVOR",
    Company: "U.S.T.L. UFR Sciences de la Terre Paleonthologie et Paleogeographie",
    Contact: "",
    city: "VILLENEUVE D'ASCQ CEDEX",
    location: [
      3.147134,
      50.637916
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10010799",
    Serialno: "203403",
    Model: "D4 ENDEAVOR",
    Company: "Université de Bourgogne",
    Contact: "",
    city: "DIJON",
    location: [
      5.034852,
      47.331938
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "CA10020883",
    Serialno: "205361",
    Model: "D4 ENDEAVOR",
    Company: "Université de Picardie Jules Verne LRCS",
    Contact: "",
    city: "AMIENS",
    location: [
      2.29248,
      49.903034
    ],
    Country: "FR",
    Region: "Somme"
  },
  {
    id: "CA10002963",
    Serialno: "D4-02/08-32",
    Model: "D4 ENDEAVOR",
    Company: "Université Paul Sabatier Laboratoire CIRIMAT / LCMIE",
    Contact: "",
    city: "TOULOUSE CEDEX 4",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "12243669",
    Serialno: "209088",
    Model: "D4 ENDEAVOR",
    Company: "VICAT",
    Contact: "",
    city: "MONTALIEU VERCIEU",
    location: [
      5.404379,
      45.814972
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10027987",
    Serialno: "206934",
    Model: "D4 ENDEAVOR",
    Company: "Vicat",
    Contact: "",
    city: "L'ISLE D'ABEAU CEDEX",
    location: [
      5.226655,
      45.613568
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10021762",
    Serialno: "205549",
    Model: "D4 ENDEAVOR",
    Company: "Vicat Usine de Créchy",
    Contact: "",
    city: "CRéCHY",
    location: [
      3.428126,
      46.257684
    ],
    Country: "FR",
    Region: "Allier"
  },
  {
    id: "12021497",
    Serialno: "207890",
    Model: "D4 ENDEAVOR",
    Company: "VICAT USINE DE SAINT EGREVE",
    Contact: "",
    city: "SAINT EGREVE CEDEX",
    location: [
      5.677469,
      45.231164
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10011052",
    Serialno: "203632",
    Model: "D4 ENDEAVOR",
    Company: "VICAT Usine de Xeuilley",
    Contact: "",
    city: "XEUILLEY",
    location: [
      6.097356,
      48.565761
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "CA10011334",
    Serialno: "203694",
    Model: "D8 ADVANCE",
    Company: "AIR LIQUIDE",
    Contact: "",
    city: "JOUY EN JOSAS CEDEX",
    location: [
      2.167839,
      48.77099
    ],
    Country: "FR",
    Region: "Yvelines"
  },
  {
    id: "CA10010527",
    Serialno: "203497",
    Model: "D8 ADVANCE",
    Company: "AXENS PROCATALYSE Usine de Salindres / Magasin généra",
    Contact: "",
    city: "SALINDRES",
    location: [
      4.157438,
      44.164543
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10007233",
    Serialno: "202635",
    Model: "D8 ADVANCE",
    Company: "C.E.M.H.T.I Site Haute Température",
    Contact: "",
    city: "ORLEANS CEDEX 2",
    location: [
      1.910933,
      47.87372
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "CA10007443",
    Serialno: "202742",
    Model: "D8 ADVANCE",
    Company: "C.N.R.S. - E.C.P.M. LMSPC - UMR 7515 DU CNRS",
    Contact: "Dominique Beging",
    city: "STRASBOURG CEDEX 2",
    location: [
      7.761454,
      48.579831
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10016000",
    Serialno: "204233",
    Model: "D8 ADVANCE",
    Company: "C.N.R.S. - LTMS Laboratoire de Tectonique Moléculai",
    Contact: "",
    city: "STRASBOURG",
    location: [
      7.761454,
      48.579831
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10020893",
    Serialno: "205359",
    Model: "D8 ADVANCE",
    Company: "CEA GRENOBLE LITEN/DEHT/SAMA/LAP",
    Contact: "",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182081
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10016043",
    Serialno: "204239",
    Model: "D8 ADVANCE",
    Company: "CEA MARCOULE",
    Contact: "",
    city: "BAGNOLS SUR CEZE CEDEX",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10011301",
    Serialno: "203686",
    Model: "D8 ADVANCE",
    Company: "CEA MARCOULE DMRC/SASP/LMAT",
    Contact: "",
    city: "BAGNOLS SUR CEZE CEDEX",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10011817",
    Serialno: "203830",
    Model: "D8 ADVANCE",
    Company: "CEA MARCOULE UG/SFCG/BGFU",
    Contact: "Valérie Magnien",
    city: "BAGNOLS SUR CEZE CEDEX 03",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10006037",
    Serialno: "202159",
    Model: "D8 ADVANCE",
    Company: "CEA SACLAY DRECAM/SPEC",
    Contact: "",
    city: "GIF-SUR-YVETTE CEDEX",
    location: [
      2.130573,
      48.695026
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10018438",
    Serialno: "204810",
    Model: "D8 ADVANCE",
    Company: "CEA. - I.C.S.M. Institut de Chimie Séparative Marco",
    Contact: "",
    city: "BAGNOLS SUR CEZE CEDEX",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10015521",
    Serialno: "204120",
    Model: "D8 ADVANCE",
    Company: "Centre Recherche Phys Appli Archéol IRAMAT - UMR 5060",
    Contact: "",
    city: "PESSAC CEDEX",
    location: [
      -0.67666,
      44.785635
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "11764456",
    Serialno: "207057",
    Model: "D8 ADVANCE",
    Company: "CERIB Péle Matériaux",
    Contact: "",
    city: "EPERNON CEDEX",
    location: [
      1.67613,
      48.599978
    ],
    Country: "FR",
    Region: "Eure-et-Loir"
  },
  {
    id: "CA10005932",
    Serialno: "202112",
    Model: "D8 ADVANCE",
    Company: "CETIM SENLIS",
    Contact: "",
    city: "SENLIS CEDEX",
    location: [
      2.587149,
      49.207106
    ],
    Country: "FR",
    Region: "Oise"
  },
  {
    id: "CA10007596",
    Serialno: "202823",
    Model: "D8 ADVANCE",
    Company: "CNRS - IC2MP UMR 7285",
    Contact: "",
    city: "POITIERS CEDEX 9",
    location: [
      0.354004,
      46.582033
    ],
    Country: "FR",
    Region: "Vienne"
  },
  {
    id: "CA10006007",
    Serialno: "202148",
    Model: "D8 ADVANCE",
    Company: "CNRS - ILV UNIVERSITE DE VERSAILLES SAINT QUEN",
    Contact: "",
    city: "VERSAILLES CEDEX",
    location: [
      2.131319,
      48.803019
    ],
    Country: "FR",
    Region: "Yvelines"
  },
  {
    id: "CA10005579",
    Serialno: "D8-03/04-563",
    Model: "D8 ADVANCE",
    Company: "CNRS - Institut de Physique Nucléai CNRS / UMR 8608 - Services Financi",
    Contact: "",
    city: "ORSAY CEDEX",
    location: [
      2.186536,
      48.68712
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10016141",
    Serialno: "204270-1",
    Model: "D8 ADVANCE",
    Company: "CNRS - IPCMS Cronenbourg",
    Contact: "",
    city: "STRASBOURG CEDEX 2",
    location: [
      7.761454,
      48.579831
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10006008",
    Serialno: "202146",
    Model: "D8 ADVANCE",
    Company: "CNRS - UMR 6634 - GPM Site Universitaire du Madrillet",
    Contact: "",
    city: "SAINT-ETIENNE DU ROUVRAY",
    location: [
      1.087631,
      49.38518
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "CA10012305",
    Serialno: "203960",
    Model: "D8 ADVANCE",
    Company: "CNRS CEMES UPR 8011",
    Contact: "",
    city: "TOULOUSE CEDEX 4",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10010325",
    Serialno: "203439",
    Model: "D8 ADVANCE",
    Company: "CNRS CRISMAT Laboratoire Cristallographie & Maté",
    Contact: "",
    city: "CAEN CEDEX 4",
    location: [
      -0.387754,
      49.173303
    ],
    Country: "FR",
    Region: "Calvados"
  },
  {
    id: "11776402",
    Serialno: "207132",
    Model: "D8 ADVANCE",
    Company: "CNRS Institut NEEL UPR2940 - DR11",
    Contact: "",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182081
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10018081",
    Serialno: "204677",
    Model: "D8 ADVANCE",
    Company: "CNRS LCTS L.C.T.S - UMR 5801",
    Contact: "",
    city: "PESSAC",
    location: [
      -0.671363,
      44.808364
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "CA10006009",
    Serialno: "202147",
    Model: "D8 ADVANCE",
    Company: "ENSCM",
    Contact: "",
    city: "MONTPELLIER CEDEX 5",
    location: [
      3.87048,
      43.610476
    ],
    Country: "FR",
    Region: "Hérault"
  },
  {
    id: "CA10005888",
    Serialno: "D8-00/07-213",
    Model: "D8 ADVANCE",
    Company: "EPA ECOLE NATIONALE SUPERIEURE DE C",
    Contact: "",
    city: "VILLENEUVE D'ASCQ CEDEX",
    location: [
      3.147134,
      50.637916
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10008405",
    Serialno: "202861",
    Model: "D8 ADVANCE",
    Company: "Evotec (France) SAS",
    Contact: "",
    city: "TOULOUSE CEDEX",
    location: [
      1.427043,
      43.595444
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10017584",
    Serialno: "204595",
    Model: "D8 ADVANCE",
    Company: "GRENOBLE INP MINATEC LMGP-CMTC",
    Contact: "",
    city: "GRENOBLE CEDEX 1",
    location: [
      5.7169,
      45.176865
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10007194",
    Serialno: "202510",
    Model: "D8 ADVANCE",
    Company: "IFREMER Centre Bretagne",
    Contact: "",
    city: "PLOUZANE",
    location: [
      -4.590113,
      48.371873
    ],
    Country: "FR",
    Region: "Finistére"
  },
  {
    id: "CA10012380",
    Serialno: "203977",
    Model: "D8 ADVANCE",
    Company: "IMERYS ALUMINATES SA",
    Contact: "",
    city: "VAULX MILIEU",
    location: [
      5.186381,
      45.61402
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10008656",
    Serialno: "203134",
    Model: "D8 ADVANCE",
    Company: "IMRA Europe",
    Contact: "",
    city: "SOPHIA ANTIPOLIS",
    location: [
      -0.3492,
      49.214235
    ],
    Country: "FR",
    Region: "Alpes-Maritimes"
  },
  {
    id: "CA10009836",
    Serialno: "203-134",
    Model: "D8 ADVANCE",
    Company: "IMRA Europe",
    Contact: "",
    city: "SOPHIA ANTIPOLIS",
    location: [
      -0.3492,
      49.214235
    ],
    Country: "FR",
    Region: "Alpes-Maritimes"
  },
  {
    id: "CA10007190",
    Serialno: "202467",
    Model: "D8 ADVANCE",
    Company: "IMT MINES ALES",
    Contact: "",
    city: "ALES CEDEX",
    location: [
      -3.648821,
      48.342869
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10010194",
    Serialno: "203391",
    Model: "D8 ADVANCE",
    Company: "INRA d'Orléans Centre de Recherche",
    Contact: "",
    city: "OLIVET",
    location: [
      3.703749,
      43.935999
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "CA10011302",
    Serialno: "203687",
    Model: "D8 ADVANCE",
    Company: "INSA de Lyon Laboratoire MATEIS",
    Contact: "",
    city: "VILLEURBANNE CEDEX",
    location: [
      4.890035,
      45.768975
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10012307",
    Serialno: "203959",
    Model: "D8 ADVANCE",
    Company: "INSA de Lyon Laboratoire MATEIS",
    Contact: "",
     city: "VILLEURBANNE CEDEX",
    location: [
      4.890035,
      45.768975
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10006659",
    Serialno: "202442",
    Model: "D8 ADVANCE",
    Company: "INSTITUT CARNOT DE BOURGOGNE (ICB) DEPARTEMENT NANOSCIENCES",
    Contact: "",
    city: "DIJON CEDEX",
    location: [
      5.028415,
      47.325177
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "CA10007008",
    Serialno: "F202553",
    Model: "D8 ADVANCE",
    Company: "INSTITUT CHEVREUL Cité Scientifique",
    Contact: "",
    city: "VILLENEUVE D'ASCQ",
    location: [
      3.147134,
      50.637916
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10007364",
    Serialno: "202706",
    Model: "D8 ADVANCE",
    Company: "Institut de Recherche Pierre Fabre",
    Contact: "",
    city: "TOULOUSE CEDEX 3",
    location: [
      1.427043,
      43.595444
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10009825",
    Serialno: "203-101",
    Model: "D8 ADVANCE",
    Company: "INSTITUT DES MATERIAUX J. ROUXEL",
    Contact: "",
    city: "NANTES CEDEX 3",
    location: [
      -0.553568,
      44.876598
    ],
    Country: "FR",
    Region: "Loire-Atlantique"
  },
  {
    id: "CA10009827",
    Serialno: "203-102",
    Model: "D8 ADVANCE",
    Company: "INSTITUT DES MATERIAUX J. ROUXEL",
    Contact: "",
    city: "NANTES CEDEX 3",
    location: [
      -0.553568,
      44.876598
    ],
    Country: "FR",
    Region: "Loire-Atlantique"
  },
  {
    id: "CA10015251",
    Serialno: "204060",
    Model: "D8 ADVANCE",
    Company: "INSTITUT DES MATERIAUX POREUX DE PA CNRS IMAP UMR8004",
    Contact: "Mme Guillou",
    city: "PARIS",
    location: [
      2.347,
      48.859
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10017046",
    Serialno: "204478",
    Model: "D8 ADVANCE",
    Company: "Institut Jean Lamour - UMR CNRS 719 Centre de Compétence XGamma",
    Contact: "",
    city: "NANCY",
    location: [
      6.182268,
      48.658557
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "11803363",
    Serialno: "207280",
    Model: "D8 ADVANCE",
    Company: "INSTITUT NATIONAL DE SCIENCES APPLI INSA",
    Contact: "",
    city: "STRASBOURG CEDEX",
    location: [
      7.761454,
      48.579831
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10010760",
    Serialno: "203548",
    Model: "D8 ADVANCE",
    Company: "Institut National Polytechnique Tou Service Facturier",
    Contact: "",
    city: "TOULOUSE CEDEX 4",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10021692",
    Serialno: "205536",
    Model: "D8 ADVANCE",
    Company: "Institut National Polytechnique Tou Service Facturier",
    Contact: "",
    city: "TOULOUSE CEDEX 4",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10011053",
    Serialno: "203635",
    Model: "D8 ADVANCE",
    Company: "Institut Polytechnique UniLaSalle",
    Contact: "",
    city: "BEAUVAIS",
    location: [
      2.075235,
      49.412381
    ],
    Country: "FR",
    Region: "Oise"
  },
  {
    id: "CA10010571",
    Serialno: "203515",
    Model: "D8 ADVANCE",
    Company: "ISL - INSTITUT FRANCO-ALLEMAND DE RECHERCHES DE SAINT-LOUIS",
    Contact: "",
    city: "SAINT LOUIS CEDEX",
    location: [
      3.070307,
      50.620918
    ],
    Country: "FR",
    Region: "Haut-Rhin"
  },
  {
    id: "CA10021691",
    Serialno: "205535",
    Model: "D8 ADVANCE",
    Company: "ISTERRE OSUG C -",
    Contact: "",
    city: "SAINT MARTIN D'HERES",
    location: [
      5.759817,
      45.184183
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10015364",
    Serialno: "204089",
    Model: "D8 ADVANCE",
    Company: "IUT Moselle Est Science et Génie des Matériaux",
    Contact: "",
    city: "FORBACH",
    location: [
      6.863628,
      49.199905
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10011624",
    Serialno: "203758",
    Model: "D8 ADVANCE",
    Company: "SAINT GOBAIN CRISTAUX ET DETECTEURS",
    Contact: "",
    city: "SAINT PIERRE LES NEMOURS",
    location: [
      2.694081,
      48.267482
    ],
    Country: "FR",
    Region: "Seine-et-Marne"
  },
  {
    id: "CA10012046",
    Serialno: "203892",
    Model: "D8 ADVANCE",
    Company: "SAINT GOBAIN RECHERCHE SAS",
    Contact: "",
    city: "AUBERVILLIERS CEDEX",
    location: [
      2.386579,
      48.912832
    ],
    Country: "FR",
    Region: "Seine-Saint-Denis"
  },
  {
    id: "CA10015365",
    Serialno: "204091",
    Model: "D8 ADVANCE",
    Company: "Sanofi Aventis Chemicals Development",
    Contact: "",
    city: "VITRY SUR SEINE",
    location: [
      2.375162,
      48.804694
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "CA10006073",
    Serialno: "202176",
    Model: "D8 ADVANCE",
    Company: "SNCF Direction du materiel et de la",
    Contact: "",
    city: "VITRY SUR SEINE",
    location: [
      2.375162,
      48.804694
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "CA10006626",
    Serialno: "202419",
    Model: "D8 ADVANCE",
    Company: "THALES Thales Research & Technology France",
    Contact: "",
    city: "PALAISEAU",
    location: [
      2.220733,
      48.704281
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10006528",
    Serialno: "202381",
    Model: "D8 ADVANCE",
    Company: "UNIVERSITE ANGERS UFR SCIENCES",
    Contact: "",
    city: "ANGERS",
    location: [
      -0.559663,
      47.460408
    ],
    Country: "FR",
    Region: "Maine-et-Loire"
  },
  {
    id: "CA10007875",
    Serialno: "202956",
    Model: "D8 ADVANCE",
    Company: "Universite de PICARDIE Jules Verne Service Facturation",
    Contact: "",
    city: "AMIENS CEDEX 1",
    location: [
      2.319615,
      49.886908
    ],
    Country: "FR",
    Region: "Somme"
  },
  {
    id: "CA10007882",
    Serialno: "202960",
    Model: "D8 ADVANCE",
    Company: "Universite de PICARDIE Jules Verne Service Facturation",
    Contact: "",
   city: "AMIENS CEDEX 1",
    location: [
      2.319615,
      49.886908
    ],
    Country: "FR",
    Region: "Somme"
  },
  {
    id: "CA10006356",
    Serialno: "202241",
    Model: "D8 ADVANCE",
    Company: "UNIVERSITE DE RENNES 1 Sciences Chimiques de Rennes",
    Contact: "",
    city: "RENNES CEDEX",
    location: [
      -1.68365,
      48.110899
    ],
    Country: "FR",
    Region: "Ille-et-Vilaine"
  },
  {
    id: "CA10016150",
    Serialno: "204269",
    Model: "D8 ADVANCE",
    Company: "UNIVERSITE DE RENNES 1 Sciences Chimiques de Rennes",
    Contact: "",
    city: "RENNES CEDEX",
    location: [
      -1.68365,
      48.110899
    ],
    Country: "FR",
    Region: "Ille-et-Vilaine"
  },
  {
    id: "CA10018428",
    Serialno: "204806",
    Model: "D8 ADVANCE",
    Company: "UNIVERSITE GUSTAVE EIFFEL LABORATOIRE SRO",
    Contact: "",
    city: "MARNE LA VALLEE CEDEX 2",
    location: [
      -3.028291,
      48.740538
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10016994",
    Serialno: "204468",
    Model: "D8 ADVANCE",
    Company: "UNIVERSITE PIERRE ET MARIE CURIE LCMCP",
    Contact: "",
    city: "PARIS",
    location: [
      2.347,
      48.859
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "CA10016987",
    Serialno: "204469",
    Model: "D8 ADVANCE",
    Company: "UNIVERSITE PIERRE ET MARIE CURIE REACTIVITE DE SURFACE - UMR 7197",
    Contact: "",
    city: "PARIS CEDEX 05",
    location: [
      2.347,
      48.859
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "CA10007858",
    Serialno: "202864",
    Model: "D8 ADVANCE",
    Company: "Université Claude Bernard LYON I CENTRE DE DIFFRACTOMETRIE",
    Contact: "",
     city: "VILLEURBANNE CEDEX",
    location: [
      4.890035,
      45.768975
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10015952",
    Serialno: "204212",
    Model: "D8 ADVANCE",
    Company: "Université de Franche-Comté UTINAM UMR 6213",
    Contact: "",
    city: "BESANCON",
    location: [
      5.988335,
      47.25925
    ],
    Country: "FR",
    Region: "Doubs"
  },
  {
    id: "CA10017198",
    Serialno: "204520",
    Model: "D8 ADVANCE",
    Company: "Université de LIMOGES Service Marchés Publics",
    Contact: "",
    city: "LIMOGES CEDEX",
    location: [
      1.221254,
      45.856159
    ],
    Country: "FR",
    Region: "Vienne (Haute)"
  },
  {
    id: "CA10012164",
    Serialno: "203921",
    Model: "D8 ADVANCE",
    Company: "Université de Lorraine IJL (Institut Jean Lamour)",
    Contact: "",
    city: "METZ",
    location: [
      6.194897,
      49.108385
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10010193",
    Serialno: "203399",
    Model: "D8 ADVANCE",
    Company: "Université de Rouen Direction des Affaires Financiéres",
    Contact: "",
    city: "MONT SAINT AIGNAN",
    location: [
      1.079231,
      49.471645
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "CA10005594",
    Serialno: "D8-03/04-568",
    Model: "D8 ADVANCE",
    Company: "Université du Littoral Laboratoire Catalyse et Environneme",
    Contact: "",
    city: "DUNKERQUE CEDEX 01",
    location: [
      2.329752,
      51.042659
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10006107",
    Serialno: "202198",
    Model: "D8 ADVANCE",
    Company: "Université La Rochelle Laboratoire des Sciences de l'Ingén",
    Contact: "",
    city: "LA ROCHELLE CEDEX 1",
    location: [
      -1.208343,
      46.163662
    ],
    Country: "FR",
    Region: "Charente-Maritime"
  },
  {
    id: "CA10007188",
    Serialno: "202492",
    Model: "D8 ADVANCE",
    Company: "Université Sciences et Techniques L LCPS",
    Contact: "",
    city: "VILLENEUVE D'ASCQ",
    location: [
      3.147134,
      50.637916
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10005794",
    Serialno: "D8-02/04-434",
    Model: "D8 ADVANCE",
    Company: "Vicat",
    Contact: "Raphaél Variot",
    city: "L'ISLE D'ABEAU CEDEX",
    location: [
      5.226655,
      45.613568
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "12584928",
    Serialno: "213222",
    Model: "D8 ADVANCE A25",
    Company: "Arkema France Centre de Recherches Rhéne Alpes",
    Contact: "FUCHS Gilbert",
    city: "PIERRE-BéNITE CEDEX",
    location: [
      4.819773,
      45.701814
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "12524672",
    Serialno: "212484",
    Model: "D8 ADVANCE A25",
    Company: "BRGM DIR/CELL Direction de l'eau, de l'environnem",
    Contact: "Nicolas MAUBEC",
    city: "ORLEANS CEDEX 2",
    location: [
      1.910933,
      47.87372
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "CA10022797",
    Serialno: "205819",
    Model: "D8 ADVANCE A25",
    Company: "BRGM DIR/CELL Direction de l'eau, de l'environnem",
    Contact: "",
    city: "ORLEANS CEDEX 2",
    location: [
      1.910933,
      47.87372
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "CA10018795",
    Serialno: "204895",
    Model: "D8 ADVANCE A25",
    Company: "C.N.R.S. IRCELYON Institut de Recherche sur la Cataly",
    Contact: "",
     city: "VILLEURBANNE CEDEX",
    location: [
      4.890035,
      45.768975
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "12264832",
    Serialno: "209222",
    Model: "D8 ADVANCE A25",
    Company: "CEA / DAM ILE DE FRANCE",
    Contact: "",
    city: "ARPAJON CEDEX",
    location: [
      2.255982,
      48.590737
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "12305513",
    Serialno: "209551",
    Model: "D8 ADVANCE A25",
    Company: "CEA CADARACHE DEC / SFER / LCU",
    Contact: "",
   city: "SAINT PAUL LEZ DURANCE CE",
    location: [
      5.76376,
      43.62543
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10017426",
    Serialno: "ROE2458",
    Model: "D8 ADVANCE A25",
    Company: "CEA CADARACHE DEN/DEC/SPUA/LMPC",
    Contact: "",
   city: "SAINT PAUL LEZ DURANCE CE",
    location: [
      5.76376,
      43.62543
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "12618351",
    Serialno: "213660",
    Model: "D8 ADVANCE A25",
    Company: "CEA CENTRE DE MARCOULE UG/SFCG/BGFU",
    Contact: "Emmanuelle BRACKX",
    city: "BAGNOLS SUR CEZE CEDEX",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "12604758",
    Serialno: "213477",
    Model: "D8 ADVANCE A25",
    Company: "CEA MARCOULE",
    Contact: "Romain Vauchy",
    city: "BAGNOLS SUR CEZE CEDEX",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10026133",
    Serialno: "206525",
    Model: "D8 ADVANCE A25",
    Company: "CEA SACLAY SEARS/LISL",
    Contact: "",
    city: "GIF SUR YVETTE CEDEX",
    location: [
      2.130573,
      48.695026
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "12748698",
    Serialno: "214733",
    Model: "D8 ADVANCE A25",
    Company: "CEA SACLAY Service Financier et Comptable",
    Contact: "Raphaelle GUILLOU",
     city: "GIF SUR YVETTE CEDEX",
    location: [
      2.130573,
      48.695026
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "12067463",
    Serialno: "208128",
    Model: "D8 ADVANCE A25",
    Company: "CEMHTI Site Haute Température",
    Contact: "",
    city: "ORLEANS CEDEX 2",
    location: [
      1.910933,
      47.87372
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "12673519",
    Serialno: "213916",
    Model: "D8 ADVANCE A25",
    Company: "Centre Européen de la Céramique IRCER - CNRS UMR 7315",
    Contact: "Richard MAYET",
    city: "LIMOGES CEDEX",
    location: [
      1.221254,
      45.856159
    ],
    Country: "FR",
    Region: "Vienne (Haute)"
  },
  {
    id: "CA10025775",
    Serialno: "206453",
    Model: "D8 ADVANCE A25",
    Company: "CNRS - ICMPE Chimie Metallurgique des Terres Rar",
    Contact: "",
    city: "THIAIS",
    location: [
      2.386991,
      48.760465
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "11921733",
    Serialno: "207454",
    Model: "D8 ADVANCE A25",
    Company: "CNRS - ILV UNIVERSITE DE VERSAILLES SAINT QUEN",
    Contact: "",
    city: "VERSAILLES CEDEX",
    location: [
      2.131319,
      48.803019
    ],
    Country: "FR",
    Region: "Yvelines"
  },
  {
    id: "12439451",
    Serialno: "210704",
    Model: "D8 ADVANCE A25",
    Company: "ECOLE DES MINES Laboratoire DRX",
    Contact: "",
    city: "SAINT ETIENNE CEDEX 2",
    location: [
      -1.211761,
      48.845454
    ],
    Country: "FR",
    Region: "Loire"
  },
  {
    id: "12531193",
    Serialno: "212597",
    Model: "D8 ADVANCE A25",
    Company: "ECOLE POLYTECHNIQUE Laboratoire LSI et PMC",
    Contact: "",
    city: "PALAISEAU",
    location: [
      2.220733,
      48.704281
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10025776",
    Serialno: "206431",
    Model: "D8 ADVANCE A25",
    Company: "EDF - CNPE de Chinon - Péle Industr CEIDRE / DLAB",
    Contact: "",
    city: "AVOINE",
    location: [
      -0.856063,
      46.673094
    ],
    Country: "FR",
    Region: "Indre-et-Loire"
  },
  {
    id: "CA10022719",
    Serialno: "205800",
    Model: "D8 ADVANCE A25",
    Company: "ENSCBP - IPB DELEG. AQUITAINE POITOU CHARENTES",
    Contact: "",
    city: "TALENCE CEDEX",
    location: [
      -0.592127,
      44.806158
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "12280297",
    Serialno: "209348",
    Model: "D8 ADVANCE A25",
    Company: "ENSCI SPCTS - CEC",
    Contact: "",
    city: "LIMOGES CEDEX",
    location: [
      1.221254,
      45.856159
    ],
    Country: "FR",
    Region: "Vienne (Haute)"
  },
  {
    id: "11784351",
    Serialno: "207188",
    Model: "D8 ADVANCE A25",
    Company: "ENSIACET Laboratoire du CIRIMAT",
    Contact: "",
    city: "TOULOUSE",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "12478950",
    Serialno: "211177",
    Model: "D8 ADVANCE A25",
    Company: "ENSIACET Laboratoire du CIRIMAT",
    Contact: "",
    city: "TOULOUSE",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "12543474",
    Serialno: "212741",
    Model: "D8 ADVANCE A25",
    Company: "GIE III - V Lab",
    Contact: "Jean DECOBERT",
    city: "PALAISEAU",
    location: [
      2.220733,
      48.704281
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "11993973",
    Serialno: "207804",
    Model: "D8 ADVANCE A25",
    Company: "IMERYS TALC",
    Contact: "",
    city: "LUZENAC SUR ARIéGE",
    location: [
      1.765325,
      42.762263
    ],
    Country: "FR",
    Region: "Ariége"
  },
  {
    id: "12300846",
    Serialno: "209503",
    Model: "D8 ADVANCE A25",
    Company: "INSA - GENIE CIVIL - LMDC LABORATOIRE MATERIAUX ET DURABILITE",
    Contact: "",
    city: "TOULOUSE CEDEX 04",
    location: [
      1.427043,
      43.595444
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10019409",
    Serialno: "205025",
    Model: "D8 ADVANCE A25",
    Company: "INSTITUT CHEVREUL CNRS FR2638",
    Contact: "",
    city: "VILLENEUVE D'ASCQ",
    location: [
      3.147134,
      50.637916
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "12638641",
    Serialno: "213917",
    Model: "D8 ADVANCE A25",
    Company: "Institut de Physique et de Chimie des Matériaux de Strasbourg",
    Contact: "VIARD",
    city: "STRASBOURG CEDEX 2",
    location: [
      7.761454,
      48.579831
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "11906123",
    Serialno: "207390",
    Model: "D8 ADVANCE A25",
    Company: "INSTITUT DES MATERIAUX J. ROUXEL",
    Contact: "",
    city: "NANTES CEDEX 3",
    location: [
      -0.553568,
      44.876598
    ],
    Country: "FR",
    Region: "Loire-Atlantique"
  },
  {
    id: "CA10025836",
    Serialno: "206465",
    Model: "D8 ADVANCE A25",
    Company: "Institut Jean Lamour - UMR CNRS 719 Centre de Compétence XGamma",
    Contact: "",
    city: "NANCY",
    location: [
      6.182268,
      48.658557
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "11768806",
    Serialno: "207068",
    Model: "D8 ADVANCE A25",
    Company: "IUT de BLOIS",
    Contact: "",
    city: "BLOIS",
    location: [
      1.316402,
      47.581246
    ],
    Country: "FR",
    Region: "Loir-et-Cher"
  },
  {
    id: "12068276",
    Serialno: "208127",
    Model: "D8 ADVANCE A25",
    Company: "Laboratoire PhLAM Equipe de spectroscopie moléculaire",
    Contact: "",
    city: "VILLENEUVE D'ASCQ CEDEX",
    location: [
      3.147134,
      50.637916
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10023506",
    Serialno: "205967",
    Model: "D8 ADVANCE A25",
    Company: "Minakem Recherche",
    Contact: "",
    city: "BEUVRY LA FORéT",
    location: [
      3.284621,
      50.45702
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "12636128",
    Serialno: "213883",
    Model: "D8 ADVANCE A25",
    Company: "NAVAL GROUP DCNS CESMAN",
    Contact: "Vincent Branger",
    city: "BOUGUENAIS",
    location: [
      -1.616824,
      47.172648
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12217450",
    Serialno: "208918",
    Model: "D8 ADVANCE A25",
    Company: "Observatoire Midi Pyrénées Laboratoire d'Aerologie",
    Contact: "",
    city: "TOULOUSE",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "11938503",
    Serialno: "207524",
    Model: "D8 ADVANCE A25",
    Company: "SAFT SAS",
    Contact: "",
    city: "BORDEAUX CEDEX",
    location: [
      -0.597626,
      44.820248
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "CA10018168",
    Serialno: "204721",
    Model: "D8 ADVANCE A25",
    Company: "Sanofi Pasteur",
    Contact: "",
    city: "NEUVILLE SUR SAéNE CEDEX",
    location: [
      0.196296,
      48.073398
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "12489530",
    Serialno: "212054",
    Model: "D8 ADVANCE A25",
    Company: "SKF FRANCE LABORATOIRE ET TSE",
    Contact: "",
    city: "SAINT CYR SUR LOIRE CEDEX",
    location: [
      5.123277,
      43.588857
    ],
    Country: "FR",
    Region: "Indre-et-Loire"
  },
  {
    id: "CA10028069",
    Serialno: "204567",
    Model: "D8 ADVANCE A25",
    Company: "Société Franéaise de Céramique - SF",
    Contact: "",
    city: "COURTABOEUF CEDEX",
    location: [
      2.223464,
      48.683698
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "11977929",
    Serialno: "207713",
    Model: "D8 ADVANCE A25",
    Company: "SORBONNE UNIVERSITE CNRS UMR 7197",
    Contact: "",
    city: "PARIS CEDEX 05",
    location: [
      2.347,
      48.859
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12124694",
    Serialno: "208405",
    Model: "D8 ADVANCE A25",
    Company: "Technologie Servier",
    Contact: "",
    city: "ORLéANS CEDEX 1",
    location: [
      1.895078,
      47.927044
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "12387524",
    Serialno: "210211",
    Model: "D8 ADVANCE A25",
    Company: "TOTAL S.A. Magasin Réception",
    Contact: "",
    city: "PAU",
    location: [
      -4.669159,
      48.542419
    ],
    Country: "FR",
    Region: "Pyrénées-Atlantiques"
  },
  {
    id: "12301502",
    Serialno: "209506",
    Model: "D8 ADVANCE A25",
    Company: "UCB LYON 1 UFR CHIMIE BIOCHIMIE CENTRE DE DIFFRACTOMETRIE H. LONGCH",
    Contact: "",
     city: "VILLEURBANNE CEDEX",
    location: [
      4.890035,
      45.768975
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10018762",
    Serialno: "204890",
    Model: "D8 ADVANCE A25",
    Company: "UFR SFA - INSTITUT IC2MP HYDRASA",
    Contact: "",
    city: "POITIERS",
    location: [
      0.365333,
      46.577126
    ],
    Country: "FR",
    Region: "Vienne"
  },
  {
    id: "12665780",
    Serialno: "214100",
    Model: "D8 ADVANCE A25",
    Company: "UNIVERSITE DE PICARDIE JULES VERNE",
    Contact: "Jean-Noel CHOTARD",
   city: "AMIENS CEDEX 1",
    location: [
      2.319615,
      49.886908
    ],
    Country: "FR",
    Region: "Somme"
  },
  {
    id: "12328391",
    Serialno: "209746",
    Model: "D8 ADVANCE A25",
    Company: "Universite de Technologie de Compie Service Analyse Physico-Chimique",
    Contact: "",
    city: "COMPIEGNE CEDEX",
    location: [
      3.154625,
      50.709052
    ],
    Country: "FR",
    Region: "Oise"
  },
  {
    id: "12659242",
    Serialno: "214087",
    Model: "D8 ADVANCE A25",
    Company: "Université d'Orléans Laboratoire de Physique de Chimie",
    Contact: "Nathalie MATHIEU",
    city: "ORLéANS CEDEX 2",
    location: [
      1.895078,
      47.927044
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "12341600",
    Serialno: "209839",
    Model: "D8 ADVANCE A25",
    Company: "Université de Haute Alsace IS2M - LRC CNRS 7228",
    Contact: "",
    city: "MULHOUSE",
    location: [
      3.29459,
      49.852504
    ],
    Country: "FR",
    Region: "Haut-Rhin"
  },
  {
    id: "12307779",
    Serialno: "209561",
    Model: "D8 ADVANCE A25",
    Company: "Université de Lorraine Direction des Achats",
    Contact: "Aurélien RICHY",
    city: "VANDOEUVRE CEDEX",
    location: [
      6.182268,
      48.658557
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "12590121",
    Serialno: "213333",
    Model: "D8 ADVANCE A25",
    Company: "Université La Rochelle Laboratoire des Sciences de l'Ingén",
    Contact: "Patrick GIRAULT",
    city: "LA ROCHELLE CEDEX 1",
    location: [
      -1.208343,
      46.163662
    ],
    Country: "FR",
    Region: "Charente-Maritime"
  },
  {
    id: "12257286",
    Serialno: "209180",
    Model: "D8 ADVANCE A25",
    Company: "UTT Antenne de Nogent Péle Technologie de Haute Champagne",
    Contact: "",
    city: "NOGENT",
    location: [
      5.369743,
      48.029423
    ],
    Country: "FR",
    Region: "Marne (Haute)"
  },
  {
    id: "12243614",
    Serialno: "209080",
    Model: "D8 ADVANCE A25 ECO",
    Company: "CRITT Centre Régional d' Innovation et de Transfert de Technologie MDT",
    Contact: "",
    city: "CHARLEVILLE - MéZIéRES",
    location: [
      4.740227,
      49.759441
    ],
    Country: "FR",
    Region: "Ardennes"
  },
  {
    id: "12525655",
    Serialno: "212513",
    Model: "D8 ADVANCE A25 ECO",
    Company: "INSTITUT TERRE ET ENVIRONNEMENT CNRS - UMR7063 - BISE",
    Contact: "",
    city: "STRASBOURG CEDEX",
    location: [
      7.761454,
      48.579831
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12671469",
    Serialno: "214202",
    Model: "D8 ADVANCE A25 ECO",
    Company: "LAFARGE Centre de Recherche",
    Contact: "Claire Capra",
    city: "SAINT QUENTIN FALLAVIER",
    location: [
      5.107681,
      45.643128
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "12610488",
    Serialno: "213565",
    Model: "D8 ADVANCE A25 ECO",
    Company: "Roquette Fréres SA",
    Contact: "Pierre HEIJBOER",
    city: "LESTREM",
    location: [
      2.678481,
      50.612515
    ],
    Country: "FR",
    Region: "Pas-de-Calais"
  },
  {
    id: "12572306",
    Serialno: "213060",
    Model: "D8 ADVANCE A25 ECO",
    Company: "SUBATECH ECOLE DES MINES DE NANTES",
    Contact: "Facturation",
    city: "NANTES",
    location: [
      -0.553568,
      44.876598
    ],
    Country: "FR",
    Region: "Loire-Atlantique"
  },
  {
    id: "CA10016181",
    Serialno: "204281",
    Model: "D8 DISCOVER",
    Company: "APERAM ALLOYS IMPHY",
    Contact: "",
    city: "IMPHY",
    location: [
      3.267039,
      46.924418
    ],
    Country: "FR",
    Region: "Niévre"
  },
  {
    id: "12475458",
    Serialno: "211132",
    Model: "D8 DISCOVER",
    Company: "ArianeGroup SAS",
    Contact: "",
    city: "VERNON CEDEX",
    location: [
      1.48177,
      49.103534
    ],
    Country: "FR",
    Region: "Eure"
  },
  {
    id: "CA10002293",
    Serialno: "D8-01/02-237",
    Model: "D8 DISCOVER",
    Company: "ASCOMETAL France Holding COMPTABILITE FOURNISSEURS",
    Contact: "",
    city: "HAGONDANGE CEDEX",
    location: [
      6.162682,
      49.240272
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10000060",
    Serialno: "ROE2425",
    Model: "D8 DISCOVER",
    Company: "CEA GRENOBLE LITEN/DEHT/SAMA/LAP",
    Contact: "",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182081
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10012165",
    Serialno: "203923",
    Model: "D8 DISCOVER",
    Company: "CEA SACLAY LRC CARMEN",
    Contact: "",
     city: "GIF SUR YVETTE CEDEX",
    location: [
      2.130573,
      48.695026
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10008430",
    Serialno: "202803",
    Model: "D8 DISCOVER",
    Company: "CNRS - GES / UMR 5650 UNI MONTPELLIER Bat 20",
    Contact: "",
    city: "MONTPELLIER CEDEX 05",
    location: [
      3.466113,
      49.361125
    ],
    Country: "FR",
    Region: "Hérault"
  },
  {
    id: "CA10011373",
    Serialno: "203698",
    Model: "D8 DISCOVER",
    Company: "CNRS - UMR 6634 - GPM Site Universitaire du Madrillet",
    Contact: "",
    city: "SAINT-ETIENNE DU ROUVRAY",
    location: [
      1.087631,
      49.38518
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "CA10010157",
    Serialno: "203392",
    Model: "D8 DISCOVER",
    Company: "CNRS Institut NEEL UPR2940 - DR11",
    Contact: "",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182081
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10012168",
    Serialno: "203922",
    Model: "D8 DISCOVER",
    Company: "GANIL CIMAP",
    Contact: "",
    city: "CAEN CEDEX 5",
    location: [
      -0.387754,
      49.173303
    ],
    Country: "FR",
    Region: "Calvados"
  },
  {
    id: "CA10010626",
    Serialno: "203409",
    Model: "D8 DISCOVER",
    Company: "Institut Pprime D.P.M.M. UPR 3346 - SP2MI",
    Contact: "",
    city: "FUTUROSCOPE CHASSENEUIL C",
    location: [
      0.364512,
      46.659231
    ],
    Country: "FR",
    Region: "Vienne"
  },
  {
    id: "CA10003302",
    Serialno: "D8-03/03-553",
    Model: "D8 DISCOVER",
    Company: "Sorbonne Université - FR 2482 Institut des Matériaux",
    Contact: "",
    city: "PARIS CEDEX 05",
    location: [
      2.347,
      48.859
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10010543",
    Serialno: "203509",
    Model: "D8 DISCOVER",
    Company: "ST Microelectronics (Tours) SAS",
    Contact: "",
    city: "TOURS CEDEX 2",
    location: [
      0.702176,
      47.433659
    ],
    Country: "FR",
    Region: "Indre-et-Loire"
  },
  {
    id: "CA10003079",
    Serialno: "D8-02/12-514",
    Model: "D8 DISCOVER",
    Company: "UNIVERSITE DE RENNES 1 Sciences Chimiques de Rennes",
    Contact: "",
    city: "RENNES CEDEX",
    location: [
      -1.68365,
      48.110899
    ],
    Country: "FR",
    Region: "Ille-et-Vilaine"
  },
  {
    id: "CA10010542",
    Serialno: "203508",
    Model: "D8 DISCOVER",
    Company: "UNIVERSITE FRANCOIS RABELAIS UFR SCIENCES ET TECHNIQUES",
    Contact: "",
    city: "TOURS",
    location: [
      0.702176,
      47.433659
    ],
    Country: "FR",
    Region: "Indre-et-Loire"
  },
  {
    id: "CA10007215",
    Serialno: "202614",
    Model: "D8 DISCOVER",
    Company: "Université Gustave Eiffel",
    Contact: "",
    city: "MARNE LA VALLéE CEDEX 2",
    location: [
      -3.028291,
      48.740538
    ],
    Country: "FR",
    Region: "Seine-et-Marne"
  },
  {
    id: "CA10016963",
    Serialno: "204458",
    Model: "D8 DISCOVER-MR",
    Company: "Institut Jean Lamour - UMR CNRS 719 Centre de Compétence XGamma",
    Contact: "",
    city: "NANCY",
    location: [
      6.182268,
      48.658557
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "CA10019214",
    Serialno: "204968",
    Model: "D8 DISCOVER-MR",
    Company: "Institut Optique Graduate School",
    Contact: "",
    city: "PALAISEAU CEDEX",
    location: [
      2.220733,
      48.704281
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "11760084",
    Serialno: "206994",
    Model: "D8 DISCOVER-MR A25",
    Company: "ALMAE TECHNOLOGIES Site DATA4",
    Contact: "",
    city: "MARCOUSSIS",
    location: [
      2.224685,
      48.639392
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10027854",
    Serialno: "206886",
    Model: "D8 DISCOVER-MR A25",
    Company: "ARCELORMITTAL MAIZIERES RESEARCH SA",
    Contact: "",
    city: "MAIZIERES LES METZ CEDEX",
    location: [
      6.154495,
      49.212658
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10026279",
    Serialno: "206485",
    Model: "D8 DISCOVER-MR A25",
    Company: "ArianeGroup SAS",
    Contact: "",
    city: "VERNON CEDEX",
    location: [
      1.48177,
      49.103534
    ],
    Country: "FR",
    Region: "Eure"
  },
  {
    id: "CA10025582",
    Serialno: "206408",
    Model: "D8 DISCOVER-MR A25",
    Company: "C.N.R.S. - I.C.M.C.B. Chimie de la Matiére Condensée",
    Contact: "",
    city: "PESSAC CEDEX",
    location: [
      -0.67666,
      44.785635
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "12589588",
    Serialno: "213317",
    Model: "D8 DISCOVER-MR A25",
    Company: "CEA GRENOBLE INAC/SP2M",
    Contact: "Stéphanie POUGET",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182081
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "12299281",
    Serialno: "209465",
    Model: "D8 DISCOVER-MR A25",
    Company: "CEA GRENOBLE LETI / DOPT / STM",
    Contact: "",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182081
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10022650",
    Serialno: "205761",
    Model: "D8 DISCOVER-MR A25",
    Company: "CEA SACLAY LRC CARMEN",
    Contact: "",
     city: "GIF SUR YVETTE CEDEX",
    location: [
      2.130573,
      48.695026
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "12280256",
    Serialno: "209345",
    Model: "D8 DISCOVER-MR A25",
    Company: "CEA VALDUC DRFN / SEMP",
    Contact: "",
    city: "IS-SUR-TILLE CEDEX",
    location: [
      5.119279,
      47.522108
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "12504643",
    Serialno: "212255",
    Model: "D8 DISCOVER-MR A25",
    Company: "CEROC SANDVIK",
    Contact: "",
    city: "FONDETTES",
    location: [
      0.609062,
      47.41108
    ],
    Country: "FR",
    Region: "Indre-et-Loire"
  },
  {
    id: "12213026",
    Serialno: "208878",
    Model: "D8 DISCOVER-MR A25",
    Company: "CNRS CEMES UPR 8011",
    Contact: "",
    city: "TOULOUSE CEDEX 4",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "12139919",
    Serialno: "208469",
    Model: "D8 DISCOVER-MR A25",
    Company: "CNRS CRISMAT Laboratoire Cristallographie & Maté",
    Contact: "",
    city: "CAEN CEDEX 4",
    location: [
      -0.387754,
      49.173303
    ],
    Country: "FR",
    Region: "Calvados"
  },
  {
    id: "CA10025837",
    Serialno: "206466",
    Model: "D8 DISCOVER-MR A25",
    Company: "CNRS LAAS",
    Contact: "",
    city: "TOULOUSE CEDEX 4",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "11811229",
    Serialno: "207332",
    Model: "D8 DISCOVER-MR A25",
    Company: "Ecole Polytechnique - LPICM Laboratoire de Physique des",
    Contact: "",
    city: "PALAISEAU",
    location: [
      2.220733,
      48.704281
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "12008135",
    Serialno: "207849",
    Model: "D8 DISCOVER-MR A25",
    Company: "EDF R&D Site des Renardiéres",
    Contact: "",
    city: "MORET SUR LOING",
    location: [
      2.588742,
      48.579276
    ],
    Country: "FR",
    Region: "Seine-et-Marne"
  },
  {
    id: "12524143",
    Serialno: "212482",
    Model: "D8 DISCOVER-MR A25",
    Company: "ENSAM Campus Angers LPMI/Equipe ERTGI",
    Contact: "Charles MAREAU",
     city: "ANGERS",
    location: [
      -0.559663,
      47.460408
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12034024",
    Serialno: "207959",
    Model: "D8 DISCOVER-MR A25",
    Company: "ENSCI SPCTS - CEC",
    Contact: "",
    city: "LIMOGES CEDEX",
    location: [
      1.221254,
      45.856159
    ],
    Country: "FR",
    Region: "Vienne (Haute)"
  },
  {
    id: "12030550",
    Serialno: "207944",
    Model: "D8 DISCOVER-MR A25",
    Company: "ENSCL",
    Contact: "",
    city: "VILLENEUVE D'ASCQ",
    location: [
      3.147134,
      50.637916
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "12117510",
    Serialno: "208374",
    Model: "D8 DISCOVER-MR A25",
    Company: "ENSICAEN UMR CNRS 6508",
    Contact: "",
    city: "CAEN CEDEX 4",
    location: [
      -0.387754,
      49.173303
    ],
    Country: "FR",
    Region: "Calvados"
  },
  {
    id: "12529071",
    Serialno: "212558",
    Model: "D8 DISCOVER-MR A25",
    Company: "ICGM UMR 5253",
    Contact: "Bernard FRAISSE",
    city: "MONTPELLIER CEDEX 05",
    location: [
      3.466113,
      49.361125
    ],
    Country: "FR",
    Region: "Hérault"
  },
  {
    id: "12595838",
    Serialno: "213378",
    Model: "D8 DISCOVER-MR A25",
    Company: "IFP ENERGIES NOUVELLES Laboratoire de Géochimie",
    Contact: "Eric KOHLER",
    city: "RUEIL MALMAISON",
    location: [
      2.180528,
      48.874602
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12141149",
    Serialno: "208472",
    Model: "D8 DISCOVER-MR A25",
    Company: "INSTITUT CARNOT DE BOURGOGNE (ICB) DEPARTEMENT NANOSCIENCES",
    Contact: "",
     city: "DIJON CEDEX",
    location: [
      5.028415,
      47.325177
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "11984193",
    Serialno: "207741",
    Model: "D8 DISCOVER-MR A25",
    Company: "Laboratoire de Physique de la Matiére Condensée",
    Contact: "",
    city: "AMIENS",
    location: [
      2.29248,
      49.903034
    ],
    Country: "FR",
    Region: "Somme"
  },
  {
    id: "CA10020903",
    Serialno: "205363",
    Model: "D8 DISCOVER-MR A25",
    Company: "LIEC UMR 7360 CENTRE DE RECHERCHE F. FIESSINGER",
    Contact: "",
    city: "VANDOEUVRE CEDEX",
    location: [
      6.182268,
      48.658557
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "12637366",
    Serialno: "213918",
    Model: "D8 DISCOVER-MR A25",
    Company: "MINES PARISTECH Centre des Matériaux",
    Contact: "Fabrice GASLAIN",
    city: "EVRY CEDEX",
    location: [
      3.622304,
      49.247157
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10027988",
    Serialno: "206933",
    Model: "D8 DISCOVER-MR A25",
    Company: "NORMANDIE UNIVERSITE Laboratoire SMS EA3233",
    Contact: "",
    city: "MONT SAINT AIGNAN",
    location: [
      1.079231,
      49.471645
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "12611519",
    Serialno: "213566",
    Model: "D8 DISCOVER-MR A25",
    Company: "SAINT GOBAIN CRISTAUX ET DETECTEURS",
    Contact: "Muriel VIALA",
    city: "GIERES",
    location: [
      4.623906,
      45.523278
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "12753072",
    Serialno: "214476",
    Model: "D8 DISCOVER-MR A25",
    Company: "Sanofi Ets de Montpellier",
    Contact: "Jean ALIE",
    city: "MONTPELLIER CEDEX 04",
    location: [
      3.466113,
      49.361125
    ],
    Country: "FR",
    Region: "Hérault"
  },
  {
    id: "12301505",
    Serialno: "209505",
    Model: "D8 DISCOVER-MR A25",
    Company: "UCB LYON 1 UFR CHIMIE BIOCHIMIE CENTRE DE DIFFRACTOMETRIE H. LONGCH",
    Contact: "",
     city: "VILLEURBANNE CEDEX",
    location: [
      4.890035,
      45.768975
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10027573",
    Serialno: "206835",
    Model: "D8 DISCOVER-MR A25",
    Company: "UNIVERSITE DE TOURS UFR SCIENCES ET TECHNIQUES",
    Contact: "",
    city: "TOURS SUD",
    location: [
      0.702176,
      47.433659
    ],
    Country: "FR",
    Region: "Indre-et-Loire"
  },
  {
    id: "12535658",
    Serialno: "212631",
    Model: "D8 DISCOVER-MR A25",
    Company: "Université d'Orléans GREMI",
    Contact: "Eric MILLON",
    city: "ORLEANS CEDEX 2",
    location: [
      1.910933,
      47.87372
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "12643696",
    Serialno: "213974",
    Model: "D8 DISCOVER-MR A25",
    Company: "Université de Franche-Comté UFR Sciences et Techniques",
    Contact: "Virginie Moutarlier",
    city: "BESANéON CEDEX",
    location: [
      5.970706,
      44.129571
    ],
    Country: "FR",
    Region: "Doubs"
  },
  {
    id: "12671882",
    Serialno: "214206",
    Model: "D8 DISCOVER-MR A25",
    Company: "Université de Montpellier II - IES Institut d'Electronique du Sud",
    Contact: "Adrien Carretero",
    city: "MONTPELLIER CEDEX 05",
    location: [
      3.466113,
      49.361125
    ],
    Country: "FR",
    Region: "Hérault"
  },
  {
    id: "12365418",
    Serialno: "210008",
    Model: "D8 DISCOVER-MR A25",
    Company: "Université de Technologie de Troyes Service Facturier",
    Contact: "",
    city: "TROYES CEDEX",
    location: [
      4.067302,
      48.275671
    ],
    Country: "FR",
    Region: "Aube"
  },
  {
    id: "CA10003233",
    Serialno: "ROE2274",
    Model: "D8",
    Company: "Arkema France Centre de Recherches Rhéne Alpes",
    Contact: "",
    city: "PIERRE-BéNITE CEDEX",
    location: [
      4.819773,
      45.701814
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10002256",
    Serialno: "D8-00/12-260",
    Model: "D8",
    Company: "C.E.M.H.T.I Site Haute Température",
    Contact: "",
    city: "ORLEANS CEDEX 2",
    location: [
      1.910933,
      47.87372
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "CA10000036",
    Serialno: "ROE2402",
    Model: "D8",
    Company: "CEA CADARACHE DEN / DTN / SMTM / LMTE",
    Contact: "",
   city: "SAINT PAUL LEZ DURANCE CE",
    location: [
      5.76376,
      43.62543
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10000061",
    Serialno: "ROE2426",
    Model: "D8",
    Company: "CEA GRENOBLE",
    Contact: "",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182081
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10003323",
    Serialno: "D8-00/03-186",
    Model: "D8",
    Company: "CEA MARCOULE",
    Contact: "",
    city: "BAGNOLS SUR CEZE CEDEX",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10002314",
    Serialno: "D8-01/03-288",
    Model: "D8",
    Company: "CEA MARCOULE DEN/DTEC/SGCS/LMAC",
    Contact: "",
    city: "BAGNOLS SUR CEZE CEDEX",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10005805",
    Serialno: "D8-00/12-266",
    Model: "D8",
    Company: "CEA SACLAY LRC CARMEN",
    Contact: "",
     city: "GIF SUR YVETTE CEDEX",
    location: [
      2.130573,
      48.695026
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10002485",
    Serialno: "D8-02/01-391",
    Model: "D8",
    Company: "CEA VALDUC CENTRE DE VALDUC",
    Contact: "",
    city: "IS SUR TILLE",
    location: [
      5.119279,
      47.522108
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "CA10002194",
    Serialno: "D8-00/11-259",
    Model: "D8",
    Company: "CEA VALDUC DRFN / SEMP",
    Contact: "",
    city: "IS-SUR-TILLE CEDEX",
    location: [
      5.119279,
      47.522108
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "CA10002472",
    Serialno: "D8-02/01-385",
    Model: "D8",
    Company: "CEA VALDUC DRFN / SEMP",
    Contact: "",
    city: "IS-SUR-TILLE CEDEX",
    location: [
      5.119279,
      47.522108
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "CA10002334",
    Serialno: "D8-01/06-344",
    Model: "D8",
    Company: "CERAVER",
    Contact: "",
    city: "PLAILLY",
    location: [
      2.582166,
      49.102673
    ],
    Country: "FR",
    Region: "Oise"
  },
  {
    id: "CA10000093",
    Serialno: "ROE2348",
    Model: "D8",
    Company: "CNRS - ICMPE Chimie Metallurgique des Terres Rar",
    Contact: "",
    city: "THIAIS",
    location: [
      2.386991,
      48.760465
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "CA10002936",
    Serialno: "D8-02/05-463",
    Model: "D8",
    Company: "CNRS ICMPE UMR 7182",
    Contact: "",
    city: "THIAIS",
    location: [
      2.386991,
      48.760465
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "CA10002164",
    Serialno: "D8-00/10-247",
    Model: "D8",
    Company: "CNRS Institut NEEL UPR2940 - DR11",
    Contact: "",
    city: "GRENOBLE CEDEX 9",
    location: [
      5.7243,
      45.182081
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10005699",
    Serialno: "HX-K0-047",
    Model: "D8",
    Company: "Ecole Nationale Sciences et Techniq Avancées / MINES",
    Contact: "",
    city: "PALAISEAU",
    location: [
      2.220733,
      48.704281
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10005625",
    Serialno: "D8-99/10-137",
    Model: "D8",
    Company: "Ecole Nationale Supérieure des Mine de Saint Etienne",
    Contact: "",
    city: "SAINT ETIENNE",
    location: [
      -1.211761,
      48.845454
    ],
    Country: "FR",
    Region: "Loire"
  },
  {
    id: "CA10003203",
    Serialno: "D8-00/10-246",
    Model: "D8",
    Company: "EDF - CNPE de Chinon - Péle Industr CEIDRE / DLAB",
    Contact: "",
    city: "AVOINE",
    location: [
      -0.856063,
      46.673094
    ],
    Country: "FR",
    Region: "Indre-et-Loire"
  },
  {
    id: "CA10000042",
    Serialno: "ROE2378",
    Model: "D8",
    Company: "IDD XPERT",
    Contact: "",
    city: "EVREUX",
    location: [
      1.149582,
      49.025241
    ],
    Country: "FR",
    Region: "Eure"
  },
  {
    id: "CA10000200",
    Serialno: "ROE2441",
    Model: "D8",
    Company: "IMERYS CERAMICS CENTRE",
    Contact: "",
    city: "LIMOGES CEDEX",
    location: [
      1.221254,
      45.856159
    ],
    Country: "FR",
    Region: "Vienne (Haute)"
  },
  {
    id: "CA10002277",
    Serialno: "D8-01/05-318",
    Model: "D8",
    Company: "IMT NORD EUROPE Ecole Mines-Télécom",
    Contact: "",
    city: "DOUAI CEDEX",
    location: [
      3.095098,
      50.379346
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10000002",
    Serialno: "ROE2353",
    Model: "D8",
    Company: "Institut Molécules et Matériaux du (IMMM)",
    Contact: "M. Marc Leblanc",
    city: "LE MANS CEDEX 9",
    location: [
      0.199843,
      47.997556
    ],
    Country: "FR",
    Region: "Sarthe"
  },
  {
    id: "CA10002484",
    Serialno: "D8-02/01-386",
    Model: "D8",
    Company: "IUT Louis Pasteur Département Mesures Physiques",
    Contact: "",
    city: "SCHILTIGHEIM",
    location: [
      7.742,
      48.610887
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10000027",
    Serialno: "ROE2384",
    Model: "D8",
    Company: "Laboratoire de Recherche des Monuments Historiques.",
    Contact: "",
    city: "CHAMPS SUR MARNE",
    location: [
      0.033047,
      47.016369
    ],
    Country: "FR",
    Region: "Seine-et-Marne"
  },
  {
    id: "CA10005692",
    Serialno: "D8-00/02-181",
    Model: "D8",
    Company: "LABORATOIRE SCL Section Métallurgie-Papier-Textile",
    Contact: "",
    city: "MASSY",
    location: [
      -61.704763,
      16.321063
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "CA10000001",
    Serialno: "ROE2352",
    Model: "D8",
    Company: "LERM - Groupe Setec Laboratoire d' Etudes et de",
    Contact: "",
    city: "ARLES",
    location: [
      4.619419,
      43.682078
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10002483",
    Serialno: "D8-02/01-389",
    Model: "D8",
    Company: "RENAULT SAS FRTCR LAB050",
    Contact: "",
    city: "GUYANCOURT",
    location: [
      2.062862,
      48.773216
    ],
    Country: "FR",
    Region: "Yvelines"
  },
  {
    id: "CA10001850",
    Serialno: "ROE2435",
    Model: "D8",
    Company: "Sanofi Recherche & Developpement",
    Contact: "",
    city: "VITRY SUR SEINE CEDEX",
    location: [
      2.39571,
      48.789495
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "CA10005546",
    Serialno: "ROE-2373",
    Model: "D8",
    Company: "Sanofi Recherche & Developpement",
    Contact: "",
    city: "VITRY SUR SEINE CEDEX",
    location: [
      2.39571,
      48.789495
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "CA10005739",
    Serialno: "HX-L2-079",
    Model: "D8",
    Company: "SARL DRUGABILIS Batiment Madras",
    Contact: "",
    city: "VILLEJUST",
    location: [
      2.22087,
      48.675813
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10000017",
    Serialno: "ROE1193",
    Model: "D8",
    Company: "UGITECH SA Magasin général",
    Contact: "",
    city: "UGINE",
    location: [
      6.410052,
      45.752556
    ],
    Country: "FR",
    Region: "Savoie"
  },
  {
    id: "CA10000092",
    Serialno: "ROE2339",
    Model: "D8",
    Company: "UNIVERSITE DE LORRAINE LETAM/CPER/WAGNER",
    Contact: "",
    city: "METZ CEDEX 01",
    location: [
      5.965641,
      49.227674
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10003078",
    Serialno: "D8-02/12-513",
    Model: "D8",
    Company: "UNIVERSITE DE RENNES 1 LCSIM UMR - CNRS 6511",
    Contact: "",
    city: "RENNES CEDEX",
    location: [
      -1.68365,
      48.110899
    ],
    Country: "FR",
    Region: "Ille-et-Vilaine"
  },
  {
    id: "CA10000089",
    Serialno: "ROE2265",
    Model: "D8",
    Company: "Université d'Evry Val d'Essonne Chimie - LMN 2e étage",
    Contact: "",
    city: "EVRY CEDEX",
    location: [
      3.622304,
      49.247157
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10002296",
    Serialno: "D8-01/06-328",
    Model: "D8",
    Company: "Université de Reims Champagne-Arden UFR Sciences Exactes et Naturelles",
    Contact: "",
    city: "REIMS CEDEX 2",
    location: [
      4.0307,
      49.277546
    ],
    Country: "FR",
    Region: "Marne"
  },
  {
    id: "CA10002999",
    Serialno: "D8-02/08-500",
    Model: "D8",
    Company: "Université Franéois Rabelais Laboratoire GREMAN - UMR 7347",
    Contact: "",
    city: "TOURS",
    location: [
      0.702176,
      47.433659
    ],
    Country: "FR",
    Region: "Indre-et-Loire"
  },
  {
    id: "CA10002911",
    Serialno: "D8-02/08-478",
    Model: "D8",
    Company: "VENATOR CORP.",
    Contact: "",
    city: "COMINES CEDEX",
    location: [
      3.016642,
      50.765924
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10002515",
    Serialno: "CCD-01/01-707",
    Model: "D8 DISC GADDS",
    Company: "INSTITUT CARNOT DE BOURGOGNE (ICB) DEPARTEMENT NANOSCIENCES",
    Contact: "",
     city: "DIJON CEDEX",
    location: [
      5.028415,
      47.325177
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "CA10000246",
    Serialno: "ROE2382",
    Model: "D8 DISC GADDS",
    Company: "LIEC UMR 7360 CENTRE DE RECHERCHE F. FIESSINGER",
    Contact: "",
    city: "VANDOEUVRE CEDEX",
    location: [
      6.182268,
      48.658557
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "CA10007705",
    Serialno: "2820",
    Model: "D8 DISC GADDS C2/UBC/XYZ/10X15",
    Company: "Evotec (France) SAS",
    Contact: "",
    city: "TOULOUSE CEDEX",
    location: [
      1.427043,
      43.595444
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10007746",
    Serialno: "2828",
    Model: "D8 DISC GADDS MICRODIF S/XYZ",
    Company: "INRAE - Unité BIA Site de Nantes",
    Contact: "",
    city: "NANTES CEDEX 3",
    location: [
      -0.553568,
      44.876598
    ],
    Country: "FR",
    Region: "Loire-Atlantique"
  },
  {
    id: "CA10012057",
    Serialno: "203896",
    Model: "D8 FOCUS",
    Company: "GIP CICRP Belle de Mai",
    Contact: "",
    city: "MARSEILLE",
    location: [
      5.384784,
      43.295193
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10012304",
    Serialno: "203961",
    Model: "D8 FOCUS",
    Company: "ICPEES Institut du Chimie et Procédés pour",
    Contact: "",
    city: "STRASBOURG CEDEX",
    location: [
      7.761454,
      48.579831
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10006951",
    Serialno: "202528",
    Model: "D8 FOCUS",
    Company: "PAREXGROUP S.A.",
    Contact: "",
    city: "SAINT QUENTIN FALLAVIER",
    location: [
      5.107681,
      45.643128
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10012266",
    Serialno: "203944",
    Model: "D8 FOCUS",
    Company: "UNIVERSITE PAUL SABATIER Bétiment 2 TP1 salle D2 porte 13",
    Contact: "",
    city: "TOULOUSE CEDEX 04",
    location: [
      1.427043,
      43.595444
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "CA10011485",
    Serialno: "203709",
    Model: "D8 FOCUS",
    Company: "UTBM Service PMDM LERMPS",
    Contact: "",
    city: "SEVENANS",
    location: [
      6.866434,
      47.587185
    ],
    Country: "FR",
    Region: "Territ.-de-Belfort"
  }
 ] 
const XRF = [
  
  {
    id: "CA10002346",
    Serialno: "S4-EX-01/06-137",
    Model: "S4 EXPLORER",
    Company: "ADDIPLAST S.A.",
    Contact: "",
    city: "SAINT-PAL-DE-MONS",
    location: [
      3.203837,
      44.194915
    ],
    Country: "FR",
    Region: "Loire (Haute)"
  },
  {
    id: "CA10011018",
    Serialno: "203461",
    Model: "S4 EXPLORER",
    Company: "Base de Défense Marseille-Aubagne CEPIA",
    Contact: "",
    city: "MARSEILLE CEDEX 2",
    location: [
      5.384784,
      43.295193
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10007151",
    Serialno: "202598",
    Model: "S4 EXPLORER",
    Company: "BENVIC EUROPE SAS",
    Contact: "",
    city: "CHEVIGNY-SAINT-SAUVEUR",
    location: [
      5.132287,
      47.295313
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "CA10007139",
    Serialno: "202484",
    Model: "S4 EXPLORER",
    Company: "CELSA FRANCE SAS",
    Contact: "",
    city: "BOUCAU",
    location: [
      -1.492608,
      43.530083
    ],
    Country: "FR",
    Region: "Pyrénées-Atlantiques"
  },
  {
    id: "CA10002957",
    Serialno: "S4EX-02/08-212",
    Model: "S4 EXPLORER",
    Company: "DOW FRANCE SAS",
    Contact: "",
    city: "VALBONNE",
    location: [
      5.12198,
      45.848704
    ],
    Country: "FR",
    Region: "Alpes-Maritimes"
  },
  {
    id: "CA10000589",
    Serialno: "ROE2460",
    Model: "S4 EXPLORER",
    Company: "EPA ECOLE NATIONALE SUPERIEURE DE C",
    Contact: "",
    city: "VILLENEUVE D'ASCQ CEDEX",
    location: [
      3.147134,
      50.637916
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10003043",
    Serialno: "S4-EX-02/07-207",
    Model: "S4 EXPLORER",
    Company: "EURECAT FRANCE SAS",
    Contact: "",
    city: "LA VOULTE SUR RHONE",
    location: [
      4.785479,
      44.802569
    ],
    Country: "FR",
    Region: "Ardéche"
  },
  {
    id: "CA10009842",
    Serialno: "203219",
    Model: "S4 EXPLORER",
    Company: "IMERYS CERAMICS FRANCE",
    Contact: "",
    city: "AIXE SUR VIENNE",
    location: [
      5.430081,
      43.529801
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10005577",
    Serialno: "S4EX-03/03-247",
    Model: "S4 EXPLORER",
    Company: "Ineos Polymers Sarralbe SAS Usine de Sarralbe",
    Contact: "",
    city: "SARRALBE",
    location: [
      7.023472,
      49.004753
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10003056",
    Serialno: "S4-EX-02/10-220",
    Model: "S4 EXPLORER",
    Company: "LUBRIZOL France",
    Contact: "",
    city: "OUDALLE",
    location: [
      0.286462,
      49.501488
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "CA10003275",
    Serialno: "S4-EX-00/04-053",
    Model: "S4 EXPLORER",
    Company: "OCV CHAMBERY INTERNATIONAL",
    Contact: "",
    city: "CHAMBERY",
    location: [
      5.909299,
      45.583223
    ],
    Country: "FR",
    Region: "Savoie"
  },
  {
    id: "CA10006226",
    Serialno: "202237",
    Model: "S4 EXPLORER",
    Company: "SOCOR",
    Contact: "",
    city: "DECHY",
    location: [
      3.125019,
      50.356315
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10010731",
    Serialno: "203343",
    Model: "S4 EXPLORER",
    Company: "TOSHIBA TEC Europe",
    Contact: "",
    city: "NEUVILLE LES DIEPPE",
    location: [
      1.089552,
      49.926841
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "CA10006112",
    Serialno: "202201",
    Model: "S4 EXPLORER",
    Company: "TOTAL ADDITIFS ET CARBURANTS SPECIA",
    Contact: "",
    city: "SOLAIZE CEDEX",
    location: [
      4.842332,
      45.644442
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10007608",
    Serialno: "202782",
    Model: "S4 EXPLORER",
    Company: "TOTAL FRANCE Raffinerie des Flandres",
    Contact: "",
    city: "MARDYCK",
    location: [
      2.312076,
      51.02638
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10005809",
    Serialno: "202061",
    Model: "S4 EXPLORER",
    Company: "Université de Lorraine IJL (Institut Jean Lamour)",
    Contact: "",
    city: "METZ",
    location: [
      6.194897,
      49.108385
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10002375",
    Serialno: "S4-EX-01/08-160",
    Model: "S4 EXPLORER",
    Company: "Université de Poitiers Inst. de chimie des Milieux et Maté",
    Contact: "",
    city: "POITIERS CEDEX 9",
    location: [
      0.354004,
      46.582033
    ],
    Country: "FR",
    Region: "Vienne"
  },
  {
    id: "CA10005569",
    Serialno: "S4EX-03/01-238",
    Model: "S4 EXPLORER",
    Company: "VYNONA GROUP Service Centre de Recherche",
    Contact: "",
    city: "THANN CEDEX",
    location: [
      7.237524,
      47.632275
    ],
    Country: "FR",
    Region: "Haut-Rhin"
  },
  {
    id: "CA10008249",
    Serialno: "202996",
    Model: "S4 PIONEER",
    Company: "AREVA NC DGC / CG / CGI",
    Contact: "",
    city: "BAGNOLS SUR CEZE CEDEX",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10006784",
    Serialno: "202491",
    Model: "S4 PIONEER",
    Company: "AXENS PROCATALYSE Usine de Salindres / Magasin généra",
    Contact: "",
    city: "SALINDRES",
    location: [
      4.157438,
      44.164543
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10007731",
    Serialno: "202883",
    Model: "S4 PIONEER",
    Company: "CEA CADARACHE DEC/SA3C/LAR",
    Contact: "",
   city: "SAINT PAUL LEZ DURANCE CE",
    location: [
      5.76376,
      43.62543
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10006517",
    Serialno: "202376",
    Model: "S4 PIONEER",
    Company: "CEA LE RIPAULT DEMAT / SR2C",
    Contact: "",
    city: "MONTS",
    location: [
      0.644,
      47.273067
    ],
    Country: "FR",
    Region: "Indre-et-Loire"
  },
  {
    id: "CA10010637",
    Serialno: "203525",
    Model: "S4 PIONEER",
    Company: "CEA VALDUC DRMN/SMCI",
    Contact: "",
    city: "IS SUR TILLE",
    location: [
      5.119279,
      47.522108
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "CA10011506",
    Serialno: "203733",
    Model: "S4 PIONEER",
    Company: "CEA VALRHO DEN/DRCP/SCPS/LPCP",
    Contact: "",
    city: "BAGNOLS SUR CEZE CEDEX",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10003092",
    Serialno: "S4-PI-02/09-43",
    Model: "S4 PIONEER",
    Company: "Cetim Grand Est",
    Contact: "",
    city: "ILLKIRCH GRAFFENSTADEN CE",
    location: [
      7.722443,
      48.524658
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10003219",
    Serialno: "S4PI-02/09-43",
    Model: "S4 PIONEER",
    Company: "Cetim Grand Est",
    Contact: "",
    city: "ILLKIRCH GRAFFENSTADEN CE",
    location: [
      7.722443,
      48.524658
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10008827",
    Serialno: "203161",
    Model: "S4 PIONEER",
    Company: "CIMENTS CALCIA Italcementi Group",
    Contact: "",
    city: "GUERVILLE CEDEX",
    location: [
      1.730795,
      48.960514
    ],
    Country: "FR",
    Region: "Yvelines"
  },
  {
    id: "CA10008426",
    Serialno: "202924",
    Model: "S4 PIONEER",
    Company: "Ecole des Mines de DOUAI Dépt Génie Civil",
    Contact: "",
    city: "DOUAI",
    location: [
      3.091548,
      50.363817
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10007840",
    Serialno: "A202938",
    Model: "S4 PIONEER",
    Company: "IMERYS ALUMINATES SA",
    Contact: "",
    city: "VAULX MILIEU",
    location: [
      5.186381,
      45.61402
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10009826",
    Serialno: "203310",
    Model: "S4 PIONEER",
    Company: "IMERYS ALUMINATES SA",
    Contact: "",
    city: "MARDYCK",
    location: [
      2.312076,
      51.02638
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10009840",
    Serialno: "203324",
    Model: "S4 PIONEER",
    Company: "IMERYS ALUMINATES SA",
    Contact: "",
    city: "FOS SUR MER CEDEX",
    location: [
      4.949367,
      43.452932
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10008448",
    Serialno: "203007",
    Model: "S4 PIONEER",
    Company: "IMERYS ALUMINATES SA Usine de Le Teil",
    Contact: "",
    city: "LE TEIL",
    location: [
      4.668061,
      44.545776
    ],
    Country: "FR",
    Region: "Ardéche"
  },
  {
    id: "CA10007821",
    Serialno: "202924",
    Model: "S4 PIONEER",
    Company: "IMT Lille Douai Ecole Mines-Télécom",
    Contact: "",
    city: "DOUAI CEDEX",
    location: [
      3.095098,
      50.379346
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10007234",
    Serialno: "202629",
    Model: "S4 PIONEER",
    Company: "Ineos Technologies France",
    Contact: "",
    city: "LAVERA",
    location: [
      2.324433,
      51.02938
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10015424",
    Serialno: "204104",
    Model: "S4 PIONEER",
    Company: "LABORATOIRE D'ESSAIS DES MATERIAUX de la Ville de Paris",
    Contact: "",
    city: "PARIS",
    location: [
      2.347,
      48.859
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "CA10009971",
    Serialno: "203344",
    Model: "S4 PIONEER",
    Company: "LABORATOIRE SCL Section Métallurgie-Papier-Textile",
    Contact: "",
    city: "MASSY",
    location: [
      -61.704763,
      16.321063
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "CA10003217",
    Serialno: "S4PI-02/12-53",
    Model: "S4 PIONEER",
    Company: "LAFARGE CIMENTS",
    Contact: "",
    city: "PORT-LA-NOUVELLE",
    location: [
      3.048412,
      43.01161
    ],
    Country: "FR",
    Region: "Aude"
  },
  {
    id: "CA10011252",
    Serialno: "203672",
    Model: "S4 PIONEER",
    Company: "LAFARGE CIMENTS USINE DU TEIL",
    Contact: "",
    city: "LE TEIL",
    location: [
      4.668061,
      44.545776
    ],
    Country: "FR",
    Region: "Ardéche"
  },
  {
    id: "CA10006451",
    Serialno: "202348",
    Model: "S4 PIONEER",
    Company: "ORSIMA Usine d'Ebange",
    Contact: "",
    city: "THIONVILLE",
    location: [
      6.158481,
      49.355923
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10005911",
    Serialno: "202099",
    Model: "S4 PIONEER",
    Company: "RICOH INDUSTRIE FRANCE SAS",
    Contact: "",
    city: "WETTOLSHEIM - COLMAR",
    location: [
      7.332036,
      48.067485
    ],
    Country: "FR",
    Region: "Haut-Rhin"
  },
  {
    id: "CA10008506",
    Serialno: "203086",
    Model: "S4 PIONEER",
    Company: "SAMIN Laboratoire Central",
    Contact: "",
    city: "PONTPOINT",
    location: [
      2.648517,
      49.304144
    ],
    Country: "FR",
    Region: "Oise"
  },
  {
    id: "CA10006079",
    Serialno: "202183",
    Model: "S4 PIONEER",
    Company: "SIGMA Clermont Plateforme Technologie Chimie",
    Contact: "",
    city: "AUBIERE",
    location: [
      3.125781,
      45.752526
    ],
    Country: "FR",
    Region: "Puy-de-Déme"
  },
  {
    id: "CA10007413",
    Serialno: "202732",
    Model: "S4 PIONEER",
    Company: "TOTAL S.A. Comptabilité Fournisseurs - DGEP",
    Contact: "",
     city: "PAU CEDEX",
    location: [
      -0.343106,
      43.313159
    ],
    Country: "FR",
    Region: "Pyrénées-Atlantiques"
  },
  {
    id: "CA10018197",
    Serialno: "204745",
    Model: "S4 PIONEER",
    Company: "TREDI",
    Contact: "",
    city: "ST VULBAS",
    location: [
      5.275121,
      45.813063
    ],
    Country: "FR",
    Region: "Ain"
  },
  {
    id: "CA10006771",
    Serialno: "202483",
    Model: "S4 PIONEER",
    Company: "TREDI Centre d'Incinération de Strasbourg",
    Contact: "",
    city: "STRASBOURG",
    location: [
      7.761454,
      48.579831
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10015693",
    Serialno: "204149",
    Model: "S4 PIONEER",
    Company: "Vicat",
    Contact: "",
    city: "L'ISLE D'ABEAU CEDEX",
    location: [
      5.226655,
      45.613568
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10015730",
    Serialno: "204164",
    Model: "S4 PIONEER",
    Company: "VICAT",
    Contact: "",
    city: "CHAMBERY",
    location: [
      5.909299,
      45.583223
    ],
    Country: "FR",
    Region: "Savoie"
  },
  {
    id: "CA10011872",
    Serialno: "203821",
    Model: "S4 PIONEER",
    Company: "VICAT Usine de Fos sur Mer (ex CAP VRACS)",
    Contact: "Daniel Fargier",
    city: "FOS SUR MER",
    location: [
      4.949367,
      43.452932
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10011255",
    Serialno: "203617",
    Model: "S4 PIONEER",
    Company: "VICAT Usine de Xeuilley",
    Contact: "",
    city: "XEUILLEY",
    location: [
      6.097356,
      48.565761
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "12339179",
    Serialno: "209818",
    Model: "S8 LION",
    Company: "HME Brass France SAS",
    Contact: "",
    city: "RAI",
    location: [
      0.589641,
      48.75589
    ],
    Country: "FR",
    Region: "Orne"
  },
  {
    id: "CA10025947",
    Serialno: "206487",
    Model: "S8 LION",
    Company: "LAFARGE CIMENTS Usine de Martres",
    Contact: "",
    city: "MARTRES TOLOSANE",
    location: [
      0.999089,
      43.204632
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "12326254",
    Serialno: "209717",
    Model: "S8 TIGER",
    Company: "A.R.F.",
    Contact: "",
    city: "CHAUNY",
    location: [
      3.212155,
      49.617404
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12326296",
    Serialno: "209716",
    Model: "S8 TIGER",
    Company: "A.R.F. SA",
    Contact: "",
    city: "VENDEUIL",
    location: [
      1.161049,
      45.453404
    ],
    Country: "FR",
    Region: "Aisne"
  },
  {
    id: "12140835",
    Serialno: "208470",
    Model: "S8 TIGER",
    Company: "ADDIPLAST S.A.",
    Contact: "",
    city: "SAINT-PAL-DE-MONS",
    location: [
      3.203837,
      44.194915
    ],
    Country: "FR",
    Region: "Loire (Haute)"
  },
  {
    id: "12971778",
    Serialno: "216107",
    Model: "S8 TIGER",
    Company: "ALVANCE ALUMINIUM DUNKERQUE",
    Contact: "Guillaume MAHIEU",
    city: "LOON PLAGE",
    location: [
      2.239231,
      50.988252
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "12269893",
    Serialno: "209248",
    Model: "S8 TIGER",
    Company: "ARCELORMITTAL MAIZIERES RESEARCH SA",
    Contact: "",
    city: "MAIZIERES LES METZ CEDEX",
    location: [
      6.154495,
      49.212658
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10027324",
    Serialno: "206771",
    Model: "S8 TIGER",
    Company: "Arkema France Centre de Recherches Rhéne Alpes",
    Contact: "",
    city: "PIERRE-BéNITE CEDEX",
    location: [
      4.819773,
      45.701814
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10023810",
    Serialno: "206029",
    Model: "S8 TIGER",
    Company: "ARKEMA FRANCE SA Groupement de Recherche de Lacq",
    Contact: "",
    city: "LACQ",
    location: [
      2.726043,
      44.28529
    ],
    Country: "FR",
    Region: "Pyrénées-Atlantiques"
  },
  {
    id: "12611915",
    Serialno: "213585",
    Model: "S8 TIGER",
    Company: "ARKEMA Usine d'Honfleur",
    Contact: "Nicolas CLAIR",
    city: "HONFLEUR",
    location: [
      0.237521,
      49.415476
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10024344",
    Serialno: "206159",
    Model: "S8 TIGER",
    Company: "ASCO INDUSTRIES FOS Service Analyse",
    Contact: "",
    city: "FOS SUR MER CEDEX",
    location: [
      4.949367,
      43.452932
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10021946",
    Serialno: "205595",
    Model: "S8 TIGER",
    Company: "ASCOVAL Etablissement Saint Saulve",
    Contact: "",
    city: "SAINT SAULVE",
    location: [
      3.561715,
      50.376565
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12573318",
    Serialno: "213105",
    Model: "S8 TIGER",
    Company: "AXENS PROCATALYSE Usine de Salindres / Magasin généra",
    Contact: "James PELLIER",
    city: "SALINDRES",
    location: [
      4.157438,
      44.164543
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "12334581",
    Serialno: "209795",
    Model: "S8 TIGER",
    Company: "BIGARREN BIZI Usine Cadaujac",
    Contact: "",
    city: "CADAUJAC",
    location: [
      -0.534845,
      44.742434
    ],
    Country: "FR",
    Region: "Gironde"
  },
  {
    id: "12751946",
    Serialno: "214786",
    Model: "S8 TIGER",
    Company: "Bruker France S.A.S.",
    Contact: "",
    city: "WISSEMBOURG CEDEX",
    location: [
      7.95218,
      49.015546
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12999892",
    Serialno: "216293#",
    Model: "S8 TIGER",
    Company: "C-TEC CONSTELLIUM Technology Center",
    Contact: "Laura PIERRARD-OHANESSIAN",
    city: "VOREPPE CEDEX",
    location: [
      5.624617,
      45.28858
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "13001828",
    Serialno: "216293",
    Model: "S8 TIGER",
    Company: "C-TEC CONSTELLIUM Technology Center",
    Contact: "Laura PIERRARD-OHANESSIAN",
    city: "VOREPPE CEDEX",
    location: [
      5.624617,
      45.28858
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "12733106",
    Serialno: "214577",
    Model: "S8 TIGER",
    Company: "CEA Le Ripault DMAT/SCMF/LMMO",
    Contact: "Vincent Frotte",
    city: "MONTS",
    location: [
      0.644,
      47.273067
    ],
    Country: "FR",
    Region: "Indre-et-Loire"
  },
  {
    id: "12632593",
    Serialno: "213782",
    Model: "S8 TIGER",
    Company: "CELSA FRANCE SAS",
    Contact: "Steve Dumora",
    city: "BOUCAU",
    location: [
      -1.492608,
      43.530083
    ],
    Country: "FR",
    Region: "Pyrénées-Atlantiques"
  },
  {
    id: "12432054",
    Serialno: "210640",
    Model: "S8 TIGER",
    Company: "CENTRE TECHNIQUE INDUSTRIES FONDERI",
    Contact: "",
    city: "SEVRES CEDEX",
    location: [
      -0.086432,
      46.74335
    ],
    Country: "FR",
    Region: "Hauts-de-Seine"
  },
  {
    id: "CA10016612",
    Serialno: "204368",
    Model: "S8 TIGER",
    Company: "CIMENTS CALCIA Usine de Cruas",
    Contact: "",
    city: "CRUAS",
    location: [
      4.755664,
      44.635643
    ],
    Country: "FR",
    Region: "Ardéche"
  },
  {
    id: "12047269",
    Serialno: "208029",
    Model: "S8 TIGER",
    Company: "CNRS - Maison de l'orient - UMR 513 Lab. Archéométrie / Archéologie",
    Contact: "",
    city: "LYON CEDEX 7",
    location: [
      4.835,
      45.758
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "12982715",
    Serialno: "216178",
    Model: "S8 TIGER",
    Company: "COMMISSARIAT A L'ENERGIE ATOMIQUE BP 17171",
    Contact: "Pascal ANTONUCCI",
    city: "BAGNOLS SUR CEZE CEDEX",
    location: [
      4.624846,
      44.158589
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "12405709",
    Serialno: "210287",
    Model: "S8 TIGER",
    Company: "Dimotrans",
    Contact: "",
    city: "MARSEILLE",
    location: [
      5.384784,
      43.295193
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "12487836",
    Serialno: "212036",
    Model: "S8 TIGER",
    Company: "EQIOM",
    Contact: "",
    city: "LUMBRES",
    location: [
      2.115072,
      50.706951
    ],
    Country: "FR",
    Region: "Pas-de-Calais"
  },
  {
    id: "CA10023852",
    Serialno: "206037",
    Model: "S8 TIGER",
    Company: "Eqiom - LE L.A.B.",
    Contact: "",
    city: "LESQUIN",
    location: [
      3.109167,
      50.586969
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10025588",
    Serialno: "206412",
    Model: "S8 TIGER",
    Company: "EQIOM Usine de Héming",
    Contact: "",
    city: "HEMING",
    location: [
      6.966496,
      48.693545
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10026965",
    Serialno: "206696",
    Model: "S8 TIGER",
    Company: "ESIREM UNIVERSITE DE DIJON",
    Contact: "",
    city: "DIJON",
    location: [
      5.034852,
      47.331938
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "CA10021169",
    Serialno: "205440",
    Model: "S8 TIGER",
    Company: "ESSO RAFFINAGE SAS ERSAF",
    Contact: "",
    city: "FOS SUR MER",
    location: [
      4.949367,
      43.452932
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "12060999",
    Serialno: "208101",
    Model: "S8 TIGER",
    Company: "EURECAT FRANCE SAS",
    Contact: "",
    city: "LA VOULTE SUR RHONE",
    location: [
      4.785479,
      44.802569
    ],
    Country: "FR",
    Region: "Ardéche"
  },
  {
    id: "12357636",
    Serialno: "209950",
    Model: "S8 TIGER",
    Company: "FERROPEM SAS",
    Contact: "",
    city: "PIERREFITTE NESTALAS",
    location: [
      -0.072728,
      42.962236
    ],
    Country: "FR",
    Region: "Pyrénées (Hautes)"
  },
  {
    id: "12531181",
    Serialno: "212618",
    Model: "S8 TIGER",
    Company: "FERROPEM Usine de Montricher",
    Contact: "",
    city: "MONTRICHER ALBANNE",
    location: [
      6.411719,
      45.236134
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12574062",
    Serialno: "213101",
    Model: "S8 TIGER",
    Company: "FUCHS LUBRIFIANT FRANCE SA",
    Contact: "Karine Boitel",
    city: "NANTERRE CEDEX",
    location: [
      2.204323,
      48.880542
    ],
    Country: "FR",
    Region: "Hauts-de-Seine"
  },
  {
    id: "12505111",
    Serialno: "212239",
    Model: "S8 TIGER",
    Company: "HOLCIM INNOVATION CENTER SAS",
    Contact: "",
    city: "SAINT QUENTIN FALLAVIER",
    location: [
      5.107681,
      45.643128
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10016595",
    Serialno: "204362",
    Model: "S8 TIGER",
    Company: "IFREMER Centre Bretagne",
    Contact: "",
    city: "PLOUZANE",
    location: [
      -4.590113,
      48.371873
    ],
    Country: "FR",
    Region: "Finistére"
  },
  {
    id: "11759758",
    Serialno: "207018",
    Model: "S8 TIGER",
    Company: "Imerys Talc Europe",
    Contact: "",
    city: "TOULOUSE",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "12387518",
    Serialno: "210210",
    Model: "S8 TIGER",
    Company: "Ineos Chemicals Lavera Sas Magasin Central",
    Contact: "",
    city: "LAVERA",
    location: [
      2.324433,
      51.02938
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "13104949",
    Serialno: "217169",
    Model: "S8 TIGER",
    Company: "INEOS POLYMERS SARRALBE",
    Contact: "Marc FUHRMANN",
    city: "SARRALBE",
    location: [
      7.023472,
      49.004753
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "11755193",
    Serialno: "206997",
    Model: "S8 TIGER",
    Company: "INES Savoie Technolac",
    Contact: "",
    city: "LE BOURGET DU LAC",
    location: [
      5.8588,
      45.641834
    ],
    Country: "FR",
    Region: "Savoie"
  },
  {
    id: "12252553",
    Serialno: "209136",
    Model: "S8 TIGER",
    Company: "INRA - Centre de Nancy Biogéochimie des Ecosystémes",
    Contact: "",
    city: "CHAMPENOUX",
    location: [
      6.347031,
      48.742208
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "12535745",
    Serialno: "212656",
    Model: "S8 TIGER",
    Company: "INRS Centre de Lorraine Institut national de recherche",
    Contact: "Céline EYPERT BLAISON",
    city: "VANDOEUVRE LES NANCY CEDE",
    location: [
      6.162826,
      48.661967
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "12611298",
    Serialno: "213560",
    Model: "S8 TIGER",
    Company: "LAFARGE CIMENTS",
    Contact: "Estelle RAYNAUD",
    city: "PORT-LA-NOUVELLE",
    location: [
      3.048412,
      43.01161
    ],
    Country: "FR",
    Region: "Aude"
  },
  {
    id: "12612209",
    Serialno: "213561",
    Model: "S8 TIGER",
    Company: "LAFARGE CIMENTS",
    Contact: "Estelle RAYNAUD",
    city: "PORT-LA-NOUVELLE",
    location: [
      3.048412,
      43.01161
    ],
    Country: "FR",
    Region: "Aude"
  },
  {
    id: "CA10023205",
    Serialno: "205929",
    Model: "S8 TIGER",
    Company: "LAFARGE CIMENTS LC SDB SETE 2",
    Contact: "",
    city: "SETE",
    location: [
      3.669328,
      43.401159
    ],
    Country: "FR",
    Region: "Hérault"
  },
  {
    id: "CA10017056",
    Serialno: "204484",
    Model: "S8 TIGER",
    Company: "LAFARGE CIMENTS USINE DU TEIL",
    Contact: "",
    city: "LE TEIL",
    location: [
      4.668061,
      44.545776
    ],
    Country: "FR",
    Region: "Ardéche"
  },
  {
    id: "12583716",
    Serialno: "213231",
    Model: "S8 TIGER",
    Company: "Lafarge Holcim France",
    Contact: "Claire CAPRA",
    city: "SAINT QUENTIN FALLAVIER",
    location: [
      5.107681,
      45.643128
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10016563",
    Serialno: "204355",
    Model: "S8 TIGER",
    Company: "M LEGO SAS Service Comptabilité",
    Contact: "",
    city: "LA FERTE BERNARD",
    location: [
      0.639754,
      48.18624
    ],
    Country: "FR",
    Region: "Sarthe"
  },
  {
    id: "11812329",
    Serialno: "207290",
    Model: "S8 TIGER",
    Company: "Magnesita Refractories S.C.S.",
    Contact: "",
    city: "VALENCIENNES",
    location: [
      3.526593,
      50.34706
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "12455489",
    Serialno: "210856",
    Model: "S8 TIGER",
    Company: "MAPE",
    Contact: "",
    city: "LIEVIN",
    location: [
      2.765852,
      50.411063
    ],
    Country: "FR",
    Region: "Pas-de-Calais"
  },
  {
    id: "12538307",
    Serialno: "212703",
    Model: "S8 TIGER",
    Company: "NICHE FUSED ALUMINA Usine de la Bathie-Aiguebelle",
    Contact: "Pierre Grentzinger",
    city: "LA BATHIE",
    location: [
      4.317312,
      46.029943
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12038870",
    Serialno: "207976",
    Model: "S8 TIGER",
    Company: "Orano Chimie-Enrichissement Etablissement du Tricastin",
    Contact: "",
    city: "PIERRELATTE CEDEX",
    location: [
      4.689504,
      44.357315
    ],
    Country: "FR",
    Region: "Dréme"
  },
  {
    id: "12336277",
    Serialno: "209064",
    Model: "S8 TIGER",
    Company: "PAREXGROUP S.A.",
    Contact: "",
    city: "SAINT QUENTIN FALLAVIER",
    location: [
      5.107681,
      45.643128
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10021894",
    Serialno: "205582",
    Model: "S8 TIGER",
    Company: "PEUGEOT CITROEN AUTOMOBILES S.A. Service PMXP/TAC/PSM",
    Contact: "",
    city: "VOUJEAUCOURT",
    location: [
      6.759113,
      47.475858
    ],
    Country: "FR",
    Region: "Doubs"
  },
  {
    id: "12406712",
    Serialno: "210206",
    Model: "S8 TIGER",
    Company: "RICOH INDUSTRIE FRANCE SAS",
    Contact: "",
    city: "WETTOLSHEIM - COLMAR",
    location: [
      7.332036,
      48.067485
    ],
    Country: "FR",
    Region: "Haut-Rhin"
  },
  {
    id: "12826422",
    Serialno: "210206",
    Model: "S8 TIGER",
    Company: "RICOH INDUSTRIE FRANCE SAS",
    Contact: "Laurence DAUDIN",
    city: "WETTOLSHEIM - COLMAR",
    location: [
      7.332036,
      48.067485
    ],
    Country: "FR",
    Region: "Haut-Rhin"
  },
  {
    id: "12776722",
    Serialno: "214951",
    Model: "S8 TIGER",
    Company: "RIO TINTO ALCAN LRF",
    Contact: "Marie-Catherine JOLAS",
    city: "SAINT JEAN DE MAURIENNE C",
    location: [
      6.352945,
      45.274127
    ],
    Country: "FR",
    Region: "Savoie"
  },
  {
    id: "12319906",
    Serialno: "209661",
    Model: "S8 TIGER",
    Company: "SA L'OREAL Research & Innovation",
    Contact: "",
    city: "SAINT OUEN",
    location:  [
      2.117569,
      50.039963
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12047330",
    Serialno: "208030",
    Model: "S8 TIGER",
    Company: "SAMIN Laboratoire Central",
    Contact: "",
    city: "PONTPOINT",
    location: [
      2.648517,
      49.304144
    ],
    Country: "FR",
    Region: "Oise"
  },
  {
    id: "13024451",
    Serialno: "216439",
    Model: "S8 TIGER",
    Company: "SAS TREDI Centre de Recherche",
    Contact: "Mathilde LEONE",
    city: "ST VULBAS",
    location: [
      5.275121,
      45.813063
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12578267",
    Serialno: "213179",
    Model: "S8 TIGER",
    Company: "SERVICE COMMUN DES LABORATOIRES Laboratoire du Havre",
    Contact: "Bernadette DEVOS",
    city: "LE HAVRE",
    location: [
      0.097217,
      49.513404
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "12382408",
    Serialno: "210156",
    Model: "S8 TIGER",
    Company: "SNCF Direction du materiel et de la",
    Contact: "",
    city: "VITRY SUR SEINE",
    location: [
      2.375162,
      48.804694
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "12104753",
    Serialno: "208301",
    Model: "S8 TIGER",
    Company: "SOKA",
    Contact: "",
    city: "QUESSOY",
    location: [
      -2.658352,
      48.425889
    ],
    Country: "FR",
    Region: "Cétes-d'Armor"
  },
  {
    id: "12292340",
    Serialno: "209437",
    Model: "S8 TIGER",
    Company: "TOTAL FRANCE Raffinerie des Flandres",
    Contact: "",
    city: "MARDYCK",
    location: [
      2.312076,
      51.02638
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "12252018",
    Serialno: "209056",
    Model: "S8 TIGER",
    Company: "TOTAL S.A. Comptabilité Fournisseurs - DGEP",
    Contact: "",
     city: "PAU CEDEX",
    location: [
      -0.343106,
      43.313159
    ],
    Country: "FR",
    Region: "Pyrénées-Atlantiques"
  },
  {
    id: "CA10028061",
    Serialno: "206945",
    Model: "S8 TIGER",
    Company: "TOTALENERGIES MARKETING SERVICES SA CRES - Centre de Recherche",
    Contact: "",
    city: "SOLAIZE CEDEX",
    location: [
      4.842332,
      45.644442
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10022912",
    Serialno: "205838",
    Model: "S8 TIGER",
    Company: "TRB LABORATOIRE SAS",
    Contact: "",
    city: "NESLES",
    location: [
      1.672995,
      49.914668
    ],
    Country: "FR",
    Region: "Pas-de-Calais"
  },
  {
    id: "13019831",
    Serialno: "216405",
    Model: "S8 TIGER",
    Company: "TREDI",
    Contact: "Agnés GRANGE",
    city: "SALAISE SUR SANNE",
    location: [
      4.818681,
      45.3442
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12507058",
    Serialno: "212287",
    Model: "S8 TIGER",
    Company: "UNIVERSITE PIERRE ET MARIE CURIE Laboratoire Chimie de la Matiére",
    Contact: "",
    city: "PARIS CEDEX 05",
    location: [
      2.347,
      48.859
    ],
    Country: "FR",
    Region: "Paris"
  },
  {
    id: "12965192",
    Serialno: "216054",
    Model: "S8 TIGER",
    Company: "Université de Lorraine IJL (Institut Jean Lamour)",
    Contact: "Sébastien DILIBERTO",
    city: "METZ",
    location: [
      6.194897,
      49.108385
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "12711490",
    Serialno: "214407",
    Model: "S8 TIGER",
    Company: "Université Savoie Mont Blanc Laboratoire EDYTEM",
    Contact: "DEVELLE Anne-Lise",
    city: "LE BOURGET DU LAC",
    location: [
      5.8588,
      45.641834
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10019888",
    Serialno: "205066",
    Model: "S8 TIGER",
    Company: "VERESCENCE FRANCE Service Compta Fournisseurs",
    Contact: "",
    city: "MERS LES BAINS",
    location: [
      1.39039,
      50.070446
    ],
    Country: "FR",
    Region: "Somme"
  },
  {
    id: "12327299",
    Serialno: "209737",
    Model: "S8 TIGER",
    Company: "VERRERIE DE SAINT JUST SA",
    Contact: "",
    city: "SAINT JUST SAINT RAMBERT",
    location: [
      4.251132,
      45.494348
    ],
    Country: "FR",
    Region: "Loire"
  },
  {
    id: "12468029",
    Serialno: "211041",
    Model: "S8 TIGER",
    Company: "VICAT",
    Contact: "",
    city: "CRECHY",
    location: [
      3.428126,
      46.257684
    ],
    Country: "FR",
    Region: "Allier"
  },
  {
    id: "12876172",
    Serialno: "215640",
    Model: "S8 TIGER",
    Company: "Vicat",
    Contact: "Julie Bertola",
    city: "L'ISLE D'ABEAU CEDEX",
    location: [
      5.226655,
      45.613568
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10023840",
    Serialno: "206035",
    Model: "S8 TIGER",
    Company: "VM BUILDING SOLUTIONIS SAS",
    Contact: "",
    city: "VIVIEZ",
    location: [
      2.225325,
      44.559288
    ],
    Country: "FR",
    Region: "Aveyron"
  },
  {
    id: "12252557",
    Serialno: "209137",
    Model: "S8 TIGER ECO",
    Company: "Ciments Calcia Usine de Gargenville",
    Contact: "",
    city: "GARGENVILLE",
    location: [
      1.809612,
      48.979757
    ],
    Country: "FR",
    Region: "Yvelines"
  },
  {
    id: "13019830",
    Serialno: "250759",
    Model: "S2 POLAR",
    Company: "LYONDELLBASELL MAGASIN CHIMIE",
    Contact: "Jean-Patrick PEYS",
    city: "BERRE L'ETANG",
    location: [
      5.162227,
      43.509274
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "12359313",
    Serialno: "123456",
    Model: "S2 POLAR",
    Company: "Total Energies Raffinage France Raffinerie de Grandpuits",
    Contact: "",
    city: "MORMANT",
    location: [
      2.895962,
      48.605524
    ],
    Country: "FR",
    Region: "Seine-et-Marne"
  },
  {
    id: "12614975",
    Serialno: "213623",
    Model: "S2 PUMA",
    Company: "Arkema France Usine de Marseille",
    Contact: "Bernard Pees",
    city: "MARSEILLE CEDEX 11",
    location: [
      5.384784,
      43.295193
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "12464787",
    Serialno: "210994",
    Model: "S2 PUMA",
    Company: "Bruker France S.A.S.",
    Contact: "",
    city: "CHAMPS SUR MARNE",
    location: [
      0.033047,
      47.016369
    ],
    Country: "FR",
    Region: "Seine-et-Marne"
  },
  {
    id: "12563117",
    Serialno: "212963",
    Model: "S2 PUMA",
    Company: "Fives FCB - Centre d'Essai",
    Contact: "Monsieur LOISON",
    city: "NOYELLE LES SECLIN",
    location: [
      3.024582,
      50.573736
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12465928",
    Serialno: "210855",
    Model: "S2 PUMA",
    Company: "FULCHIRON ALSACE",
    Contact: "",
    city: "HATTEN",
    location: [
      7.981789,
      48.897976
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "12694724",
    Serialno: "214305",
    Model: "S2 PUMA",
    Company: "IMERYS FUSED MINERALS SAS",
    Contact: "Stéphanie OUSTEU",
    city: "SARRANCOLIN",
    location: [
      0.386631,
      42.969617
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12417996",
    Serialno: "210440",
    Model: "S2 PUMA",
    Company: "IMRA Europe",
    Contact: "",
    city: "SOPHIA ANTIPOLIS",
    location: [
      -0.3492,
      49.214235
    ],
    Country: "FR",
    Region: "Alpes-Maritimes"
  },
  {
    id: "12417997",
    Serialno: "210441",
    Model: "S2 PUMA",
    Company: "Ineos Chemicals Lavera Sas Magasin Central",
    Contact: "",
    city: "LAVERA",
    location: [
      2.324433,
      51.02938
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "12734516",
    Serialno: "214595",
    Model: "S2 PUMA",
    Company: "IUT Louis Pasteur Département Mesures Physiques",
    Contact: "Claude SPEISSER",
    city: "SCHILTIGHEIM",
    location: [
      7.742,
      48.610887
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "12514958",
    Serialno: "212369",
    Model: "S2 PUMA",
    Company: "Lyondellbasell Services France Sas",
    Contact: "",
    city: "BERRE L'ETANG CEDEX",
    location: [
      5.101638,
      43.62828
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "12483186",
    Serialno: "211270",
    Model: "S2 PUMA",
    Company: "MSSA S.A.S",
    Contact: "",
    city: "SAINT MARCEL",
    location: [
      1.465423,
      49.101005
    ],
    Country: "FR",
    Region: "Savoie"
  },
  {
    id: "12406205",
    Serialno: "210244",
    Model: "S2 PUMA",
    Company: "NESTLE France SAS",
    Contact: "",
    city: "PONTARLIER",
    location: [
      6.374947,
      46.907493
    ],
    Country: "FR",
    Region: "Doubs"
  },
  {
    id: "12771820",
    Serialno: "214758",
    Model: "S2 PUMA",
    Company: "Royal Canin",
    Contact: "Gilles THIEFFRY",
    city: "LES RUES DES VIGNES",
    location: [
      3.219262,
      45.638479
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12365219",
    Serialno: "210006",
    Model: "S2 PUMA",
    Company: "ROYAL CANIN SAS - MARS PETCARE Laboratoire Central",
    Contact: "",
    city: "AIMARGUES",
    location: [
      4.205133,
      43.682271
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "13016191",
    Serialno: "250757",
    Model: "S2 PUMA",
    Company: "SAS NAOS les Laboratoires",
    Contact: "Christopher NUCCIO",
    city: "AIX EN PROVENCE",
    location: [
      5.430081,
      43.529801
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "12323324",
    Serialno: "209695",
    Model: "S2 PUMA",
    Company: "Total Energies Raffinage France Raffinerie de Grandpuits",
    Contact: "",
    city: "MORMANT",
    location: [
      2.895962,
      48.605524
    ],
    Country: "FR",
    Region: "Seine-et-Marne"
  },
  {
    id: "12332854",
    Serialno: "209789",
    Model: "S2 PUMA",
    Company: "TOTAL SAS Raffinerie de Feyzin",
    Contact: "",
    city: "FEYZIN",
    location: [
      4.857604,
      45.673654
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "12400072",
    Serialno: "210248",
    Model: "S2 PUMA",
    Company: "Université du Littoral Céte d'Opale Maison de la Recherche en",
    Contact: "",
    city: "WIMEREUX",
    location: [
      1.606949,
      50.760687
    ],
    Country: "FR",
    Region: "Pas-de-Calais"
  },
  {
    id: "12810462",
    Serialno: "250297",
    Model: "S2 PUMA",
    Company: "Vicat",
    Contact: "Franéois HUE",
    city: "L'ISLE D'ABEAU CEDEX",
    location: [
      5.226655,
      45.613568
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "12995275",
    Serialno: "250685",
    Model: "S2 PUMA",
    Company: "VITALAC",
    Contact: "Isabelle PASQUIER",
    city: "CARNOéT",
    location: [
      -3.580464,
      47.79049
    ],
    Country: "FR",
    Region: "Cétes-d'Armor"
  },
  {
    id: "12377910",
    Serialno: "210123",
    Model: "S2 PUMA",
    Company: "Véolia Environnement Recherche et Innovation",
    Contact: "",
    city: "MAISONS-LAFFITTE",
    location: [
      -0.791726,
      47.982623
    ],
    Country: "FR",
    Region: "Yvelines"
  },
  {
    id: "CA10021893",
    Serialno: "205581",
    Model: "S2 RANGER",
    Company: "ARCELORMITTAL MAIZIERES RESEARCH SA",
    Contact: "",
    city: "MAIZIERES LES METZ CEDEX",
    location: [
      6.154495,
      49.212658
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10022427",
    Serialno: "21012011",
    Model: "S2 RANGER",
    Company: "AXENS PROCATALYSE Usine de Salindres / Magasin généra",
    Contact: "",
    city: "SALINDRES",
    location: [
      4.157438,
      44.164543
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "12219013",
    Serialno: "208946",
    Model: "S2 RANGER",
    Company: "BENVIC EUROPE SAS",
    Contact: "",
    city: "CHEVIGNY-SAINT-SAUVEUR",
    location: [
      5.132287,
      47.295313
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "12106650",
    Serialno: "208311",
    Model: "S2 RANGER",
    Company: "DAUSSAN SAS",
    Contact: "",
    city: "WOIPPY",
    location: [
      6.149873,
      49.157719
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "12062521",
    Serialno: "208110",
    Model: "S2 RANGER",
    Company: "E.S.T.P.",
    Contact: "",
    city: "CACHAN",
    location: [
      2.331515,
      48.791346
    ],
    Country: "FR",
    Region: "Val-de-Marne"
  },
  {
    id: "12276142",
    Serialno: "209325",
    Model: "S2 RANGER",
    Company: "Elkem Silicones France SAS",
    Contact: "Magali Davezac",
    city: "SAINT FONS CEDEX",
    location: [
      -0.562468,
      45.289432
    ],
    Country: "FR",
    Region: "Rhéne"
  },
  {
    id: "CA10020935",
    Serialno: "205382",
    Model: "S2 RANGER",
    Company: "ENSAM",
    Contact: "",
    city: "LE BOURGET DU LAC",
    location: [
      5.8588,
      45.641834
    ],
    Country: "FR",
    Region: "Savoie"
  },
  {
    id: "CA10028112",
    Serialno: "206979",
    Model: "S2 RANGER",
    Company: "EPA ECOLE NATIONALE SUPERIEURE DE C",
    Contact: "",
    city: "VILLENEUVE D'ASCQ CEDEX",
    location: [
      3.147134,
      50.637916
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10019750",
    Serialno: "205124",
    Model: "S2 RANGER",
    Company: "FULCHIRON INDUSTRIELLE SAS",
    Contact: "",
    city: "MAISSE",
    location: [
      2.386745,
      48.396059
    ],
    Country: "FR",
    Region: "Essonne"
  },
  {
    id: "CA10026985",
    Serialno: "206703",
    Model: "S2 RANGER",
    Company: "HAGER ELECTRO SAS",
    Contact: "",
    city: "OBERNAI",
    location: [
      7.470629,
      48.462885
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "12048330",
    Serialno: "208031",
    Model: "S2 RANGER",
    Company: "HARSCO METALS Service Achat/Facturation",
    Contact: "",
    city: "GRANDE SYNTHE CEDEX",
    location: [
      2.302524,
      51.025111
    ],
    Country: "FR",
    Region: "Nord"
  },
  {
    id: "CA10028062",
    Serialno: "206954",
    Model: "S2 RANGER",
    Company: "LAFARGE CIMENTS Usine de Martres",
    Contact: "",
    city: "MARTRES TOLOSANE",
    location: [
      0.999089,
      43.204632
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "11806365",
    Serialno: "207305",
    Model: "S2 RANGER",
    Company: "LUBRIZOL FRANCE SAS",
    Contact: "",
    city: "ROUEN CEDEX 1",
    location: [
      1.122812,
      49.435811
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "12216140",
    Serialno: "208913",
    Model: "S2 RANGER",
    Company: "Observatoire Midi Pyrénées Laboratoire d'Aerologie",
    Contact: "",
    city: "TOULOUSE",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "11806364",
    Serialno: "207304",
    Model: "S2 RANGER",
    Company: "OMNOVA Solutions SAS",
    Contact: "",
    city: "SANDOUVILLE",
    location: [
      0.311691,
      49.49544
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "12191344",
    Serialno: "208691",
    Model: "S2 RANGER",
    Company: "PEUGEOT CITROEN AUTOMOBILES Usine de Sept Fons",
    Contact: "",
    city: "DOMPIERRE SUR BESBRE",
    location: [
      3.673,
      46.519634
    ],
    Country: "FR",
    Region: "Allier"
  },
  {
    id: "CA10024516",
    Serialno: "206189",
    Model: "S2 RANGER",
    Company: "PEUGEOT SA Usine de Trémery",
    Contact: "",
    city: "HAGONDANGE",
    location: [
      6.162682,
      49.240272
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "12030168",
    Serialno: "207949",
    Model: "S2 RANGER",
    Company: "SA Centre National d'Evaluation de Photoprotection",
    Contact: "",
    city: "AUBIERE CEDEX",
    location: [
      3.125781,
      45.752526
    ],
    Country: "FR",
    Region: "Puy-de-Déme"
  },
  {
    id: "CA10021623",
    Serialno: "205333",
    Model: "S2 RANGER",
    Company: "SARGON",
    Contact: "",
    city: "BEAUTOR",
    location: [
      3.333756,
      49.659441
    ],
    Country: "FR",
    Region: ""
  },
  {
    id: "CA10026772",
    Serialno: "206670",
    Model: "S2 RANGER",
    Company: "SERVICE COMMUN DES LABORATOIRES Laboratoire du Havre",
    Contact: "",
    city: "LE HAVRE",
    location: [
      0.097217,
      49.513404
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "12053188",
    Serialno: "208047",
    Model: "S2 RANGER",
    Company: "SOBEGI",
    Contact: "",
    city: "MOURENX",
    location: [
      -0.618652,
      43.372132
    ],
    Country: "FR",
    Region: "Pyrénées-Atlantiques"
  },
  {
    id: "CA10026420",
    Serialno: "206593",
    Model: "S2 RANGER",
    Company: "SOLVAY",
    Contact: "",
    city: "LA ROCHELLE CEDEX",
    location: [
      -1.208343,
      46.163662
    ],
    Country: "FR",
    Region: "Charente-Maritime"
  },
  {
    id: "CA10017548",
    Serialno: "204592",
    Model: "S2 RANGER",
    Company: "SWISS KRONO SAS",
    Contact: "",
    city: "SULLY SUR LOIRE",
    location: [
      4.274518,
      46.621585
    ],
    Country: "FR",
    Region: "Loiret"
  },
  {
    id: "11918338",
    Serialno: "207392",
    Model: "S2 RANGER",
    Company: "Total Energies Raffinage France Plateforme de la Méde",
    Contact: "Franéois Mentz",
    city: "CHATEAUNEUF-LES-MARTIGUES",
    location:  [
      5.147225,
      43.387631
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "11941504",
    Serialno: "207548",
    Model: "S2 RANGER",
    Company: "Université Paul Sabatier CIRIMAT",
    Contact: "",
    city: "TOULOUSE CEDEX 4",
    location: [
      1.434497,
      43.603746
    ],
    Country: "FR",
    Region: "Garonne (Haute)"
  },
  {
    id: "12071669",
    Serialno: "208150",
    Model: "S2 RANGER LE",
    Company: "ENSG",
    Contact: "",
    city: "VANDOEUVRE LES NANCY CEDE",
    location: [
      6.162826,
      48.661967
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "CA10024515",
    Serialno: "206188",
    Model: "S2 RANGER LE",
    Company: "Vicat",
    Contact: "",
    city: "L'ISLE D'ABEAU CEDEX",
    location: [
      5.226655,
      45.613568
    ],
    Country: "FR",
    Region: "Isére"
  },
  {
    id: "CA10012160",
    Serialno: "203929",
    Model: "S2 RANGER MANUAL",
    Company: "Institut Universitaire de Technolog",
    Contact: "",
    city: "CHARTRES",
    location: [
      1.474752,
      48.444178
    ],
    Country: "FR",
    Region: "Eure-et-Loir"
  },
  {
    id: "CA10010998",
    Serialno: "203616",
    Model: "S2 RANGER/AUTO 28 POS SMPL 240",
    Company: "AGC INTERPANE GLASS FRANCE SAS",
    Contact: "",
    city: "SEINGBOUSE",
    location: [
      6.83439,
      49.112536
    ],
    Country: "FR",
    Region: "Moselle"
  },
  {
    id: "CA10007732",
    Serialno: "202879",
    Model: "S2 RANGER/AUTO 28 POS SMPL 240",
    Company: "AXENS PROCATALYSE Usine de Salindres / Magasin généra",
    Contact: "",
    city: "SALINDRES",
    location: [
      4.157438,
      44.164543
    ],
    Country: "FR",
    Region: "Gard"
  },
  {
    id: "CA10009389",
    Serialno: "203253",
    Model: "S2 RANGER/AUTO 28 POS SMPL 240",
    Company: "EUROFINS LEM SAS Analyse pour l'Environnement",
    Contact: "",
    city: "SAVERNE",
    location: [
      7.369851,
      48.739819
    ],
    Country: "FR",
    Region: "Bas-Rhin"
  },
  {
    id: "CA10012538",
    Serialno: "204021",
    Model: "S2 RANGER/AUTO 28 POS SMPL 240",
    Company: "FUCHS LUBRIFIANT FRANCE SA",
    Contact: "",
    city: "NANTERRE CEDEX",
    location: [
      2.204323,
      48.880542
    ],
    Country: "FR",
    Region: "Hauts-de-Seine"
  },
  {
    id: "CA10011881",
    Serialno: "203841",
    Model: "S2 RANGER/AUTO 28 POS SMPL 240",
    Company: "Ineos Chemicals Lavera Sas Magasin Central",
    Contact: "",
    city: "LAVERA",
    location: [
      2.324433,
      51.02938
    ],
    Country: "FR",
    Region: "Bouches-du-Rhéne"
  },
  {
    id: "CA10010463",
    Serialno: "203489",
    Model: "S2 RANGER/AUTO 28 POS SMPL 240",
    Company: "Institut national de recherche et de sécurité",
    Contact: "",
    city: "VANDOEUVRE LES NANCY",
    location: [
      6.162826,
      48.661967
    ],
    Country: "FR",
    Region: "Meurthe-et-Moselle"
  },
  {
    id: "12993238",
    Serialno: "216237",
    Model: "S6 JAGUAR",
    Company: "Bruker France S.A.S.",
    Contact: "",
    city: "CHAMPS SUR MARNE",
    location: [
      0.033047,
      47.016369
    ],
    Country: "FR",
    Region: "Seine-et-Marne"
  },
  {
    id: "13031698",
    Serialno: "216530",
    Model: "S6 JAGUAR",
    Company: "LUBRIZOL France",
    Contact: "Alexandra EUDIER",
    city: "OUDALLE",
    location: [
      0.286462,
      49.501488
    ],
    Country: "FR",
    Region: "Seine-Maritime"
  },
  {
    id: "12889561",
    Serialno: "215730",
    Model: "S6 JAGUAR",
    Company: "Université de Bourgogne",
    Contact: "Pierre PELLENARD",
    city: "DIJON",
    location: [
      5.034852,
      47.331938
    ],
    Country: "FR",
    Region: "Céte-d'Or"
  },
  {
    id: "12993409",
    Serialno: "216255",
    Model: "S6 JAGUAR",
    Company: "Véolia Environnement Recherche et Innovation",
    Contact: "Emilie COCARDON",
    city: "MAISONS-LAFFITTE",
    location: [
      -0.791726,
      47.982623
    ],
    Country: "FR",
    Region: "Yvelines"
  }
 ]


 //Belgique

const S8_Tiger_BE = [
  {
    id: "12377911",
    Serialno: "210124",
    Model: "S8 TIGER",
    Company: "AGC GLASS EUROPE SA Technovation Centre",
    Contact: "",
    city: "GOSSELIES",
    location: [ 4.431379928016773, 50.46884112839178,],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10021394",
    Serialno: "205463",
    Model: "S8 TIGER",
    Company: "Bayer Agriculture BV",
    Contact: "",
    city: "ANTWERPEN 4",
    location: [4.387377031907312, 51.232940647144396],
    Country: "BE",
    Region: ""
  },
  {
    id: "12880624",
    Serialno: "215680",
    Model: "S8 TIGER",
    Company: "CARMEUSE SA Services Centraux",
    Contact: "lLaetitia MASTRANTUONO",
    city: "SEILLES",
    location: [ 5.092257863857428, 50.50048619750512,],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10025396",
    Serialno: "206383",
    Model: "S8 TIGER",
    Company: "CARMEUSE SA Services Centraux",
    Contact: "",
    city: "SEILLES",
    location: [5.092257863857428, 50.50048619750512,],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10021509",
    Serialno: "205481",
    Model: "S8 TIGER",
    Company: "Centre Terre et Pierre asbl",
    Contact: "",
    city: "TOURNAI",
    location: [3.399510236449385, 50.616621316320085],
    Country: "BE",
    Region: ""
  },
  {
    id: "12762997",
    Serialno: "214836",
    Model: "S8 TIGER",
    Company: "Comet Traitements",
    Contact: "Eliane LECUT",
    city: "CHATELET",
    location: [4.522776375105133, 50.4051975447613],
    Country: "BE",
    Region: ""
  },
  {
    id: "13064673",
    Serialno: "216785",
    Model: "S8 TIGER",
    Company: "Desotec N.V.",
    Contact: "Lieselot Vandamme",
    city: "ROESELARE",
    location: [3.127416451745706, 50.9430581299503],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10027734",
    Serialno: "206863",
    Model: "S8 TIGER",
    Company: "DESOTEC NV DESOTEC PRODUCTIE",
    Contact: "",
    city: "ROESLARE",
    location: [3.127416451745706, 50.9430581299503],
    Country: "BE",
    Region: ""
  },
  {
    id: "12317103",
    Serialno: "209640",
    Model: "S8 TIGER",
    Company: "DuPont de Nemours (Belgium) B.V.",
    Contact: "Isabelle De Meirsman",
    city: "MECHELEN",
    location: [4.439991081412938, 51.02848875221397],
    Country: "BE",
    Region: ""
  },
  {
    id: "11761732",
    Serialno: "207036",
    Model: "S8 TIGER",
    Company: "ETEX SERVICES NV",
    Contact: "",
    city: "KAPELLE-OP-DEN-BOS",
    location: [4.343430229786414, 51.00473500569274 ],
    Country: "BE",
    Region: ""
  },
  {
    id: "11791285",
    Serialno: "207231",
    Model: "S8 TIGER",
    Company: "EXXON MOBIL CHEMICAL EUROPE INC. PO885 EMC EUROPE, BRUSSELS - STORES",
    Contact: "",
    city: "MACHELEN",
    location: [4.439991081412938, 51.02848875221397],
    Country: "BE",
    Region: ""
  },
  {
    id: "12539472",
    Serialno: "212718",
    Model: "S8 TIGER",
    Company: "Fuchs Lubricants Benelux NV/SA",
    Contact: "Kevin Martens",
    city: "BEERSEL - HUIZINGEN",
    location: [4.273861632202064, 50.747410912199406],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10019317",
    Serialno: "205010",
    Model: "S8 TIGER",
    Company: "HOLCIM BELGIQUE SA Usine d'Obourg",
    Contact: "",
    city: "OBOURG",
    location: [4.008049587132281, 50.47432235883055 ],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10022557",
    Serialno: "205757",
    Model: "S8 TIGER",
    Company: "HOLCIM BELGIQUE SA Usine d'Obourg",
    Contact: "",
    city: "OBOURG",
    location: [4.008049587132281, 50.47432235883055 ],
    Country: "BE",
    Region: ""
  },
  {
    id: "12459489",
    Serialno: "210947",
    Model: "S8 TIGER",
    Company: "HYDROMETAL SA",
    Contact: "",
    city: "ENGIS",
    location: [5.403177606506415, 50.57980505750585],
    Country: "BE",
    Region: ""
  },
  {
    id: "12317778",
    Serialno: "209641",
    Model: "S8 TIGER",
    Company: "INDUSTEEL BELGIUM ArcelorMittal group",
    Contact: "",
    city: "MARCHIENNE AU PONT",
    location: [4.396066793392251, 50.40593160101479],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10021800",
    Serialno: "205571",
    Model: "S8 TIGER",
    Company: "INEOS Aromatics Laboratorium",
    Contact: "R. Nijs",
    city: "GEEL",
    location: [ 4.95747084476229, 51.1814151630912],
    Country: "BE",
    Region: ""
  },
  {
    id: "12307842",
    Serialno: "209578",
    Model: "S8 TIGER",
    Company: "INEOS SERVICE BELGIUM SA LABO U01120",
    Contact: "",
    city: "BRUXELLES",
    location: [4.350352711384619, 50.8672385719297],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10022504",
    Serialno: "205529",
    Model: "S8 TIGER",
    Company: "INST. NATIONAL DES SILICATES ASBL",
    Contact: "",
    city: "MONS",
    location: [ 3.9482023746764936, 50.46344792276416,],
    Country: "BE",
    Region: ""
  },
  {
    id: "12467162",
    Serialno: "211029",
    Model: "S8 TIGER",
    Company: "Katholieke Universiteit Leuven Center for Surface",
    Contact: "Dries Smeets",
    city: "LEUVEN",
    location: [4.702962213122381, 50.87567226405009],
    Country: "BE",
    Region: ""
  },
  {
    id: "12425724",
    Serialno: "210523",
    Model: "S8 TIGER",
    Company: "Kronos Europe S.A./N.V",
    Contact: "",
    city: "GENT",
    location: [ 3.6869281711648285, 51.06169670261434],
    Country: "BE",
    Region: ""
  },
  {
    id: "13050318",
    Serialno: "210207",
    Model: "S8 TIGER",
    Company: "LABORELEC CVBA Engie",
    Contact: "Glynis DECLERC",
    city: "LINKEBEEK",
    location: [4.3421806751063485, 50.767211328499506,],
    Country: "BE",
    Region: ""
  },
  {
    id: "12417995",
    Serialno: "210442",
    Model: "S8 TIGER",
    Company: "Nivelles B�ton SA",
    Contact: "",
    city: "NIVELLES",
    location: [4.314810134501313, 50.60811765138751 ],
    Country: "BE",
    Region: ""
  },
  {
    id: "12572842",
    Serialno: "213099",
    Model: "S8 TIGER",
    Company: "NV Cemminerals BV",
    Contact: "Dirk De Leus",
    city: "KLUIZENDOK GENT",
    location: [3.777804762556331, 51.163490173570814],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10024780",
    Serialno: "206278",
    Model: "S8 TIGER",
    Company: "NV INTERTEK BELGIUM",
    Contact: "",
    city: "ANTWERPEN 4",
    location: [4.41484293527403, 51.21361514445606],
    Country: "BE",
    Region: ""
  },
  {
    id: "11938403",
    Serialno: "207519",
    Model: "S8 TIGER",
    Company: "NV PROMAT RESEARCH & TECHNOLOGY CENTRE",
    Contact: "",
    city: "WILLEBROEK - TISSELT",
    location: [4.355667834004198, 51.03474694632079],
    Country: "BE",
    Region: ""
  },
  {
    id: "12284511",
    Serialno: "209394",
    Model: "S8 TIGER",
    Company: "OCAS Zelzate",
    Contact: "Myriam Madani",
    city: "ZELZATE",
    location: [3.807715861313165, 51.19898201085204],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10024318",
    Serialno: "206158",
    Model: "S8 TIGER",
    Company: "PRINCE MINERALS SRL",
    Contact: "",
    city: "SAINT-GHISLAIN",
    location: [ 3.799276940248719, 50.482599741245764],
    Country: "BE",
    Region: ""
  },
  {
    id: "12781911",
    Serialno: "215046",
    Model: "S8 TIGER",
    Company: "Shell Catalysts & Technologies Belgium B.V.",
    Contact: "Wieme Joris",
    city: "GENT",
    location: [3.702195111204958, 51.075504087831945],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10011647",
    Serialno: "203773",
    Model: "S8 TIGER",
    Company: "SPRL XRF SCIENTIFIC EUROPE",
    Contact: "Arnd Buehler",
    city: "BRUXELLES",
    location: [4.366488880090061, 50.86268811897263],
    Country: "BE",
    Region: ""
  },
  {
    id: "12975923",
    Serialno: "216126",
    Model: "S8 TIGER",
    Company: "Total Research & Technology Feluy",
    Contact: "",
    city: "SENEFFE-FELUY",
    location: [ 4.248720018413096, 50.562506047955566],
    Country: "BE",
    Region: ""
  },
  {
    id: "12296621",
    Serialno: "209454",
    Model: "S8 TIGER",
    Company: "TotalEnergies Petrochemicals F�luy Comptabilit� Facturation",
    Contact: "",
    city: "SENEFFE-FELUY",
    location: [ 4.248720018413096, 50.562506047955566],
    Country: "BE",
    Region: ""
  },
  {
    id: "12411552",
    Serialno: "210338",
    Model: "S8 TIGER",
    Company: "Universite de Liege GeMMe",
    Contact: "",
    city: "LIEGE",
    location: [5.59275278131174, 50.638953349052656],
    Country: "BE",
    Region: "Liege"
  },
  {
    id: "13016222",
    Serialno: "216364",
    Model: "S8 TIGER",
    Company: "VESUVIUS GROUP SA",
    Contact: "Julien BERTON",
    city: "GHLIN",
    location: [ 3.8794608569131195, 50.468045666404414],
    Country: "BE",
    Region: ""
  }
 ]

const D4_BE = [
  {
    id: "CA10006794",
    Serialno: "202379",
    Model: "D4 ENDEAVOR",
    Company: "HOLCIM (BELGIQUE) SA Service Comptabilit� Fournisseurs",
    Contact: "",
    city: "NIVELLES",
    location: [4.325109816653723, 50.60811765138751],
    Country: "BE",
    Region: ""
  },
  {
    id: "12187332",
    Serialno: "208659",
    Model: "D4 ENDEAVOR",
    Company: "HOLCIM BELGIQUE SA Usine d'Obourg",
    Contact: "",
    city: "OBOURG",
    location: [4.007877925763074, 50.474923226780156, ],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10010536",
    Serialno: "203511",
    Model: "D4 ENDEAVOR",
    Company: "Kronos Europe S.A./N.V",
    Contact: "",
    city: "GENT",
    location: [3.6994485292976482, 51.054791465317564],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002879",
    Serialno: "D4-01/08-10",
    Model: "D4 ENDEAVOR",
    Company: "SA Cimenteries CBR S.A.",
    Contact: "J.P. Paques",
    city: "LIXHE",
    location: [5.678772271388323, 50.75704001112535],
    Country: "BE",
    Region: ""
  }
 ]

 const D2_Phaser_BE = [
  {
    id: "12803375",
    Serialno: "215186",
    Model: "D2 PHASER",
    Company: "Ajinomoto Omnichem S.A/N.V.",
    Contact: "Jurgen Velter",
    city: "WETTEREN",
    location: [ 3.8695623322690467, 50.988803071767265],
    Country: "BE",
    Region: ""
  },
  {
    id: "12554673",
    Serialno: "212895",
    Model: "D2 PHASER",
    Company: "CERTECH ZONE INDUSTRIELLE C",
    Contact: "Olivia Deresteau",
    city: "SENEFFE",
    location: [4.2479302739415825, 50.55393886996207, ],
    Country: "BE",
    Region: ""
  },
  {
    id: "12549738",
    Serialno: "212812",
    Model: "D2 PHASER",
    Company: "DEQUENNE CHIMIE SA",
    Contact: "Christelle HIVRE",
    city: "GHLIN",
    location: [3.892163798234425, 50.46946607599118],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10024329",
    Serialno: "205690",
    Model: "D2 PHASER",
    Company: "Etex Building Performance NV",
    Contact: "",
    city: "WILLEBROEK - TISSELT",
    location: [ 4.353479151546811, 51.03504380533736,],
    Country: "BE",
    Region: "Antwerp"
  },
  {
    id: "CA10027459",
    Serialno: "206694",
    Model: "D2 PHASER",
    Company: "Katholieke Universiteit Leuven Department Materiaalkunde",
    Contact: "Louis Depre",
    city: "LEUVEN",
    location: [4.697469049307762, 50.87372247713225],
    Country: "BE",
    Region: ""
  },
  {
    id: "12468705",
    Serialno: "211053",
    Model: "D2 PHASER",
    Company: "Katholieke Universiteit Leuven Dept Chemie",
    Contact: "",
    city: "LEUVEN",
    location: [4.697469049307762, 50.87372247713225],
    Country: "BE",
    Region: ""
  },
  {
    id: "12739258",
    Serialno: "250122",
    Model: "D2 PHASER",
    Company: "Kronos Europe S.A./N.V",
    Contact: "Glenn Bobelijn",
    city: "GENT",
    location: [3.6850289742842746, 51.058244212695506],
    Country: "BE",
    Region: ""
  },
  {
    id: "12653454",
    Serialno: "250004",
    Model: "D2 PHASER",
    Company: "SIL'INNOV SRL",
    Contact: "Nicolas MANNU",
    city: "COURCELLES",
    location: [ 4.333936262376601, 50.47428391218454,],
    Country: "BE",
    Region: ""
  },
  {
    id: "12663260",
    Serialno: "214109",
    Model: "D2 PHASER",
    Company: "SPRL ORBIX Solutions",
    Contact: "Dr. Ghania Ounoughene",
    city: "FARCIENNES",
    location: [4.544161915229981, 50.43230474006385],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10026824",
    Serialno: "206573",
    Model: "D2 PHASER",
    Company: "VESUVIUS GROUP SA",
    Contact: "",
    city: "GHLIN",
    location: [ 3.894910380141734, 50.470558669714855],
    Country: "BE",
    Region: ""
  }
 ]
///
 const D8_BE = [
 
  {
    id: "CA10006879",
    Serialno: "202519",
    Model: "D8",
    Company: "Centre de Recherches M�tallur- giques",
    Contact: "",
    city: "LIEGE",
    location: [ 5.619531954908005, 50.62719407986047],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002436",
    Serialno: "D8-01/11-374",
    Model: "D8",
    Company: "CSTC-WTCB Lab. Miscroscopy/Geological Techniq",
    Contact: "",
    city: "LIMELETTE",
    location: [ 4.5643695031275895, 50.67073890358881],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10003177",
    Serialno: "D8-02/07-211",
    Model: "D8",
    Company: "INSTITUT NATIONAL DES SILICATES",
    Contact: "",
    city: "MONS",
    location: [ 3.9626219296898677, 50.43808943381786],
    Country: "BE",
    Region: ""
  },
  
  {
    id: "CA10002587",
    Serialno: "D8-01/10-373",
    Model: "D8",
    Company: "Magotteaux International SA",
    Contact: "",
    city: "VAUX-SOUS-CHEVREMONT",
    location: [ 5.627931159264592, 50.60148564509135],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002056",
    Serialno: "D8-00/10-231",
    Model: "D8",
    Company: "UCL-CEAN Facult� des Sciences",
    Contact: "",
    city: "LOUVAIN-LA-NEUVE",
    location: [4.607712497930598, 50.668651324012],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002561",
    Serialno: "D8-02/02-409",
    Model: "D8",
    Company: "ULB Chimie des Pol�m�res",
    Contact: "",
    city: "BRUXELLES",
    location: [ 4.375758594027229, 50.860087660725284],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002414",
    Serialno: "D8-01/06-327",
    Model: "D8",
    Company: "UNIVERSITE CATHOLIQUE DE LOUVAIN UCL/SST/ELI/ELIE/SOLS",
    Contact: "",
    city: "OTTIGNIES-LOUVAIN-LA-NEUV",
    location: [ 4.569647715999586, 50.664035389650294],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002367",
    Serialno: "D8-01/09-354",
    Model: "D8",
    Company: "Universit� de Li�ge Institut de Chimie",
    Contact: "",
    city: "LIEGE",
    location: [ 5.619531954908005, 50.62719407986057],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10011023",
    Serialno: "203619",
    Model: "D8 ADVANCE",
    Company: "AGC Glass Europe S.A. CRD PLANT",
    Contact: "",
    city: "GOSSELIES",
    location: [4.423655166402466, 50.46960595675821],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10011009",
    Serialno: "203618",
    Model: "D8 ADVANCE",
    Company: "CRIC",
    Contact: "",
    city: "BRUXELLES",
    location: [ 4.375758594027229, 50.860087660725294],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10006672",
    Serialno: "202446",
    Model: "D8 ADVANCE",
    Company: "ETEX SERVICES NV",
    Contact: "",
    city: "KAPELLE-OP-DEN-BOS",
    location: [ 4.34583348895531, 51.00559914946433],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10012059",
    Serialno: "203893",
    Model: "D8 ADVANCE",
    Company: "Holcim Belgique (SA) Usine d'Obourg",
    Contact: "",
    city: "OBOURG",
    location: [ 4.001097301679405, 50.47434967117585],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10011071",
    Serialno: "203641",
    Model: "D8 ADVANCE",
    Company: "Institut Royal du Patrimoine Artist",
    Contact: "",
    city: "BRUXELLES",
    location: [ 4.295764395976846, 50.85466957355773],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10007183",
    Serialno: "202611",
    Model: "D8 ADVANCE",
    Company: "Laborelec cvba/scri Magazijn",
    Contact: "",
    city: "LINKEBEEK",
    location: [ 4.3462147172827095, 50.770576912416495],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10017480",
    Serialno: "204569",
    Model: "D8 ADVANCE",
    Company: "Lhoist Recherche et D�veloppement S Centre de Recherches de Nivelles",
    Contact: "",
    city: "NIVELLES",
    location: [4.314810134501313, 50.60811765138751 ],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10007699",
    Serialno: "202867",
    Model: "D8 ADVANCE",
    Company: "NV PROMAT RESEARCH & TECHNOLOGY CENTRE",
    Contact: "",
    city: "WILLEBROEK - TISSELT",
    location: [4.361547235899533, 51.03501681823263, ],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10011567",
    Serialno: "203741",
    Model: "D8 ADVANCE",
    Company: "SCR - SIBELCO",
    Contact: "",
    city: "DESSEL",
    location: [ 5.120788048261072, 51.25094978832979],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10011673",
    Serialno: "203780",
    Model: "D8 ADVANCE",
    Company: "UCB PHARMA SA B�timent S4",
    Contact: "",
    city: "BRAINE-L'ALLEUD",
    location: [4.350368678701321, 50.69449726587371],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10017579",
    Serialno: "202254",
    Model: "D8 ADVANCE",
    Company: "UCB PHARMA SA B�timent S4",
    Contact: "",
    city: "BRAINE-L'ALLEUD",
    location: [4.350368678701321, 50.69449726587364],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10017039",
    Serialno: "204474",
    Model: "D8 ADVANCE",
    Company: "Universite catholique de Louvain Centre de Diffraction-X",
    Contact: "",
    city: "LOUVAIN-LA-NEUVE",
    location: [4.605952968896228, 50.66892332246224],
    Country: "BE",
    Region: ""
  },
  
  
  {
    id: "CA10017267",
    Serialno: "204537",
    Model: "D8 ADVANCE",
    Company: "Universit� de Liege",
    Contact: "",
    city: "GEMBLOUX",
    location: [ 4.685600587181442, 50.55141127637287],
    Country: "BE",
    Region: ""
  },
  
  {
    id: "CA10020453",
    Serialno: "205254",
    Model: "D8 ADVANCE A25",
    Company: "C.T.P. a.s.b.l. Entr�e fournisseur",
    Contact: "",
    city: "TOURNAI",
    location: [3.3850906814360116, 50.633174277101105],
    Country: "BE",
    Region: ""
  },

  {
    id: "12469210",
    Serialno: "211056",
    Model: "D8 ADVANCE A25",
    Company: "Qmineral BVBA",
    Contact: "",
    city: "HEVERLEE",
    location: [ 4.6928851903334525, 50.86132863163936],
    Country: "BE",
    Region: ""
  },
  
 
  {
    id: "12249340",
    Serialno: "209124",
    Model: "D8 ADVANCE A25",
    Company: "Universit� de Li�ge Institut de Chimie, B�t. B6",
    Contact: "",
    city: "LIEGE",
    location: [ 5.623651827768969, 50.641566120510056],
    Country: "BE",
    Region: ""
  },
  {
    id: "12026755",
    Serialno: "207938",
    Model: "D8 ADVANCE A25 ECO",
    Company: "NGK Ceramics Europe S.A.",
    Contact: "",
    city: "BAUDOUR",
    location: [ 3.844005510670618, 50.48540463380835],
    Country: "BE",
    Region: ""
  },
  {
    id: "12358248",
    Serialno: "209963",
    Model: "D8 ADVANCE A25 ECO",
    Company: "ULB",
    Contact: "",
    city: "BRUXELLES",
    location: [ 4.295764395976846, 50.85466957355773],
    Country: "BE",
    Region: ""
  },
  
  {
    id: "12160388",
    Serialno: "208517",
    Model: "D8 ADVANCE A25 ECO",
    Company: "Universit� de Li�ge Administration des Ressources Finan",
    Contact: "",
    city: "LIEGE",
    location: [5.6106055637092505, 50.636122682718266],
    Country: "BE",
    Region: ""
  },
 
  
  {
    id: "CA10007563",
    Serialno: "202800",
    Model: "D8 DISCOVER-MR",
    Company: "Centre de Recherches M�tallur- giques",
    Contact: "Alain Schmitz",
    city: "LIEGE",
    location: [5.6106055637092505, 50.636122682718266],
    Country: "BE",
    Region: ""
  },
 
 

  {
    id: "CA10006827",
    Serialno: "202506",
    Model: "D8 DISCOVER-MR",
    Company: "Universit� de Li�ge Institut de Chimie, B�t. B6",
    Contact: "",
    city: "LI�GE",
    location: [5.6106055637092505, 50.636122682718266],
    Country: "BE",
    Region: ""
  },
  {
    id: "12023212",
    Serialno: "207930",
    Model: "D8 DISCOVER-MR A25",
    Company: "ExxonMobil Chemical Europe Inc",
    Contact: "",
    city: "MACHELEN (DIEGEM)",
    location: [ 4.45336559557566, 50.90262074123188],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10021501",
    Serialno: "205477",
    Model: "D8 DISCOVER-MR A25",
    Company: "TOTAL RESEARCH & TECHNOLOGY FELUY SA",
    Contact: "",
    city: "SENEFFE-FELUY",
    location: [4.2482908649900795, 50.563242099282974 ],
    Country: "BE",
    Region: ""
  },
  
  {
    id: "11970959",
    Serialno: "207689",
    Model: "D8 DISCOVER-MR A25 SSS",
    Company: "Magotteaux International SA",
    Contact: "",
    city: "VAUX-SOUS-CHEVREMONT",
    location: [ 5.627373259814669, 50.60031436133924],
    Country: "BE",
    Region: ""
  },
  
  {
    id: "CA10022475",
    Serialno: "205732",
    Model: "D8 FOCUS",
    Company: "Administration centrale du SPF Empl Travail et Concertation Sociale",
    Contact: "",
    city: "BRUXELLES",
    location: [ 4.295764395976846, 50.85466957355773],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10011021",
    Serialno: "97-416",
    Model: "D8-GADDS",
    Company: "ULB - BRUEGEL GEOCHIMIE Magasins G�n�raux",
    Contact: "",
    city: "BRUXELLES",
    location: [ 4.295764395976846, 50.85466957355773],
    Country: "BE",
    Region: ""
  }
 ]

 const S2_BE = [
 
  
 
 
  {
    id: "12760289",
    Serialno: "214830",
    Model: "S2 PUMA",
    Company: "CALCAIRES DE FLORENNES SA",
    Contact: "Jean-Michel CHALTIN",
    city: "FLORENNES",
    location: [ 4.58172902601977, 50.250804992486515,],
    Country: "BE",
    Region: ""
  },
  
 
  {
    id: "12039490",
    Serialno: "208010",
    Model: "S2 RANGER",
    Company: "Carmeuse S.A. � Moha (B)",
    Contact: "",
    city: "MOHA",
    location: [ 5.184277780324782, 50.54771824179859],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10027894",
    Serialno: "206909",
    Model: "S2 RANGER",
    Company: "CARMEUSE SA - ENGIS",
    Contact: "",
    city: "ENGIS",
    location: [ 5.384638178632078, 50.5589804126242],
    Country: "BE",
    Region: ""
  },
  {
    id: "12239629",
    Serialno: "209066",
    Model: "S2 RANGER",
    Company: "E. VICTOR MEYER SA",
    Contact: "",
    city: "MALMEDY",
    location: [6.023094359980672, 50.4074701912842],
    Country: "BE",
    Region: ""
  },
  
  {
    id: "CA10021919",
    Serialno: "205480",
    Model: "S2 RANGER",
    Company: "Lhoist Industrie S.A. Usine de On-Jemeile",
    Contact: "",
    city: "MARCHE-EN-FAMENNE",
    location: [ 5.313403248543044, 50.21789457102391],
    Country: "BE",
    Region: ""
  },
  
 ]

 const S4_Explorer_BE = [
  {
    id: "CA10002933",
    Serialno: "S4-00/10-091",
    Model: "S4 EXPLORER",
    Company: "AGC Flat Glass Europe N.V.",
    Contact: "",
    city: "MOL",
    location: [5.1037048823854265, 51.24575665029996],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002826",
    Serialno: "S4-EX-02/04-198",
    Model: "S4 EXPLORER",
    Company: "Bayer Agriculture BV",
    Contact: "",
    city: "ANTWERPEN 4",
    location: [4.313133498901012, 51.280587735089725 ],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002553",
    Serialno: "S4EX-02/01-175",
    Model: "S4 EXPLORER",
    Company: "BFB Oil Research S.A.",
    Contact: "Francois van Dievoet",
    city: "ISNES",
    location: [4.726982510437425, 50.506333943210194],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10006231",
    Serialno: "S4-ATOFINA",
    Model: "S4 EXPLORER",
    Company: "Bruker Belgium S.A./N.V.",
    Contact: "",
    city: "KONTICH",
    location: [ 4.437177258333375, 51.13553292852792],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10006432",
    Serialno: "S$-ATOFINA",
    Model: "S4 EXPLORER",
    Company: "Bruker Belgium S.A./N.V.",
    Contact: "",
    city: "KONTICH",
    location: [ 4.437177258333375, 51.13553292852799],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10008991",
    Serialno: "203199",
    Model: "S4 EXPLORER",
    Company: "Deceuninck Compound NV",
    Contact: "",
    city: "DIKSMUIDE",
    location: [ 4.441943829901315, 51.19641404503466],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002404",
    Serialno: "S4-EX-01/10-154",
    Model: "S4 EXPLORER",
    Company: "INEOS SERVICE BELGIUM SA LABO U01120",
    Contact: "",
    city: "BRUXELLES",
    location: [ 4.295764395976846, 50.85466957355773],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002552",
    Serialno: "S4EX-01/12-176",
    Model: "S4 EXPLORER",
    Company: "ITS Caleb Brett Belgium NV",
    Contact: "",
    city: "ANTWERPEN 4",
    location: [ 4.321373244622939, 51.27414475945989],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10003162",
    Serialno: "S4EX-02/11-225",
    Model: "S4 EXPLORER",
    Company: "Kronos Europe S.A./N.V",
    Contact: "",
    city: "GENT",
    location: [3.720734539079295, 51.07766111970065],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002045",
    Serialno: "S4-00/05-60",
    Model: "S4 EXPLORER",
    Company: "Ministerie van Economische Zaken Bestuur Kwaliteit en Veiligheld",
    Contact: "",
    city: "BRUSSEL",
    location: [ 4.363055652705924, 50.85640342994036],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10002657",
    Serialno: "S4EX-01/11-165",
    Model: "S4 EXPLORER",
    Company: "SGS Depauw & Stokoe N.V. Laboratory Services",
    Contact: "",
    city: "ANTWERPEN",
    location: [ 4.321373244622939, 51.27414475945985],
    Country: "BE",
    Region: ""
  },
 

  {
    id: "CA10003061",
    Serialno: "S4EX-02/08-214",
    Model: "S4 EXPLORER",
    Company: "Total Research & Technology Feluy",
    Contact: "",
    city: "FELUY",
    location: [4.242557690261258, 50.56367657194632],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10005893",
    Serialno: "202087",
    Model: "S4 EXPLORER",
    Company: "Total Research & Technology Feluy",
    Contact: "",
    city: "FELUY",
    location: [4.242557690261258, 50.56367657194635],
    Country: "BE",
    Region: ""
  },
  
 ]

const S4_Pioneer_BE = [
 
  {
    id: "CA10016111",
    Serialno: "204265",
    Model: "S4 PIONEER",
    Company: "AGC GLASS EUROPE SA Technovation Centre",
    Contact: "",
    city: "GOSSELIES",
    location: [4.423655166402466, 50.46960595675831],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10006094",
    Serialno: "202098",
    Model: "S4 PIONEER",
    Company: "CIMENTERIES CBR SA",
    Contact: "",
    city: "ANTOING",
    location: [ 3.4698486900824914, 50.55432468094829],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10015729",
    Serialno: "204162",
    Model: "S4 PIONEER",
    Company: "CSTC-WTCB Lab. Miscroscopy/Geological Techniq",
    Contact: "",
    city: "LIMELETTE",
    location: [4.563210788885444, 50.671146882531154],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10006527",
    Serialno: "202378",
    Model: "S4 PIONEER",
    Company: "Holcim Belgique (SA) Usine d'Obourg",
    Contact: "",
    city: "OBOURG",
    location: [ 4.001097301679405, 50.47434967117575],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10006763",
    Serialno: "202422",
    Model: "S4 PIONEER",
    Company: "HYDROMETAL",
    Contact: "Sabine Lamotte",
    city: "ENGIS",
    location: [5.408499108951827, 50.57228308021832],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10006426",
    Serialno: "202271",
    Model: "S4 PIONEER",
    Company: "INEOS Manufacturing Belgium NV",
    Contact: "UYTTERHOEVEN",
    city: "ANTWERPEN",
    location: [ 4.3282396993912124, 51.246214755759674],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10007058",
    Serialno: "202571",
    Model: "S4 PIONEER",
    Company: "Laborelec cvba/scri Magazijn",
    Contact: "",
    city: "LINKEBEEK",
    location: [50.77008837493533, 4.350677912882087],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10007931",
    Serialno: "202975",
    Model: "S4 PIONEER",
    Company: "SAMCOAT SA Surfaces and Advanced",
    Contact: "Bernard COLINET",
    city: "LIEGE",
    location: [5.6106055637092505, 50.636122682718266],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10012590",
    Serialno: "204032",
    Model: "S4 PIONEER",
    Company: "SPF Emploi Travail Concertation So Direction G�n�rale du Controle du",
    Contact: "",
    city: "BRUXELLES",
    location: [4.3815950805802615, 50.85748705744555],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10010659",
    Serialno: "203537",
    Model: "S4 PIONEER",
    Company: "ULB Chimie des Pol�m�res",
    Contact: "",
    city: "BRUXELLES",
    location: [4.3815950805802615, 50.8574870574458],
    Country: "BE",
    Region: ""
  },
  {
    id: "CA10003062",
    Serialno: "S4PI-02/09-41",
    Model: "S4 PIONEER",
    Company: "Vynova Belgium NV 2F QC/Milieu Lab",
    Contact: "",
    city: "TESSENDERLO",
    location: [ 5.0555595271881755, 51.06425026648485,],
    Country: "BE",
    Region: ""
  }
 ]

const S8_Lion_BE = [
 
  {
    id: "12434507",
    Serialno: "210641",
    Model: "S8-LION",
    Company: "SA Cimenteries CBR S.A.",
    Contact: "",
    city: "LIXHE",
    location: [ 5.678428948649909 ,50.75717575434258],
    Country: "BE",
    Region: ""
  }
 ]

var places = D8_BE


//places = localStorage.getItem("markersXRD")







const mapContainerStyle = {
  width: "200vh",
  height: "100vw",
  zIndex: "1",
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

    //places = localStorage.getItem("ePlaces")
    console.log("HELLO" + places)
    console.log("HELLO 2 " + localStorage.getItem("ePlaces"))
    if (places.length !== 0) {
      const coords = []
      

      places.forEach(place => {
        coords.push([-0.587877, 44.851895])
      })
      const feature = multiPoint(coords)
      const box = bbox(feature)
     

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