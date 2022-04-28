// import React from 'react'
// import {useState} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import {getPokemonsByname} from '../../redux/actions/actions.js'
// import {Link} from 'react-router-dom';

// function SearchBar() {

//     const [poke, setPoke] = useState('');
//     //const namePokemon = useSelector(state => state.allpokemon)
//     const dispatch = useDispatch();

//     function handleInputChange(e) {
//         setPoke(e.target.value)


//     }

//     function handleSubmit(e) {
//         e.preventDefault()
//         dispatch(getPokemonsByname(poke))
//         setPoke('')

//     }


    
//     return (
//     <div>
//        <div>
//             <input type="text"
//                    placeholder="Pokemon..."
//                    value={poke}
//                    onChange={(e)=>handleInputChange(e)}
//             />
            
//             <button className="boton"  onClick={(e)=>handleSubmit(e)}>Buscar</button>
//         </div>
            
            
        
        
//     </div>
//   )
// }

// export default SearchBar