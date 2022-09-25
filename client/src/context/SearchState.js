import React, { useState } from 'react'
import SearchContext from './SearchContext';


const SearchState = (props) => {
    const [searchVal, setSearchVal] = useState("");
    const [cardhide, setCardhide] = useState(true);
    return (
        <SearchContext.Provider value={{searchVal, setSearchVal, cardhide, setCardhide}}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchState;