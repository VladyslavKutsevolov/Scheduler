import React from 'react';

const DayListItem = ({ name, spots, selected, setDay }) => {
  return (
    <li onClick={() => setDay(name)}>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{spots} spots remainig</h3>
    </li>
  );
};

export default DayListItem;
