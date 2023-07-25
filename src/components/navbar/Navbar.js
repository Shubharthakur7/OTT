import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineArrowLeft } from "react-icons/ai";
import './Navbar.css'

const Navbar = ({handleChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [q, setQ] = useState('');

/**handle search input tag */
  const handleModal = () => {
    setIsOpen(!isOpen);
  }

/** get seach term and update the props to update list data*/
const handleSearchTextChange = (e) => {
  handleChange(e.target.value);
    setQ(e.target.value);
}

  return (
    <nav class="navbar container">
        <div className="left-icon iconGroup">
          <AiOutlineArrowLeft /> <div className='homeHeaderTitle'>Romantic Comedy</div>
        </div>
        {isOpen && <div className="iconGroup">
        <input type="text" enterKeyHint="search" id="search-box-mobile" value={q} onChange={handleSearchTextChange} aria-label="Search" placeholder='Search' />
        </div>}
        <div className="right-icon iconGroup" onClick={handleModal}>
          <AiOutlineSearch />
        </div>
    </nav>
  );
};

export default Navbar;
