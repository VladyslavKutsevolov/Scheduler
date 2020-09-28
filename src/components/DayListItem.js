import React from 'react';
import classNames from 'classnames';

import 'components/DayListItem.scss';

const DayListItem = ({ name, spots, selected, setDay }) => {
  const liStyle = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0,
  });

  return (
    <li onClick={() => setDay(name)} className={liStyle}>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{spots} spots remainig</h3>
    </li>
  );
};

export default DayListItem;
