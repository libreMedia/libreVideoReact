import React from 'react';
import {Input} from 'reactstrap';

interface SearchItems {
    searchQuery: string,
    inputChange:Function
}

const HomeSearch = ({inputChange}:SearchItems) => {
  return (
      <div className='mt-5'>
        <Input className='shad' type="search" name="homeSearch" id="homeSearch" placeholder="EX: a movie or show" onChange={(e)=>{inputChange(e.target.value)}}/>
      </div>
  );
}

export default HomeSearch;