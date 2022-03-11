// import React, {useState, useEffect} from "react";
// import axios from "axios";
// const cors = require('cors');


// function DataFetching(){
//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         // axios.get('https://api-adresse.data.gouv.fr/search/?q=BAGNOLS SUR CEZE CEDEX&limit=1', {mode: 'no-cors'})
//         //     .then(res => {
//         //         const locat = res.data.features[0].geometry.coordinates
//         //         console.log(locat)
               
//         //     })
//         //     .catch(err => {
//         //         console.log(err)
//         //     })
//     })
//     return (
//         <div>
//             <ul>
//                 {
//                     posts.map(post => (
//                         <li key={post.type}></li>
//                     ))
//                 }
//             </ul>

//         </div>
//     )
// }


// export default DataFetching