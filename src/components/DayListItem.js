import React from 'react';
import classNames from 'classnames';

import 'components/DayListItem.scss';

const DayListItem = ({ name, spots, selected, setDay }) => {
  const liStyle = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0,
  });

  const formatSpots = (spots) => {
    if (spots === 1) {
      return `1 spot remaining`;
    } else if (spots === 0) {
      return 'no spots remaining';
    } else {
      return `${spots} spots remaining`;
    }
  };

  return (
    <li onClick={() => setDay(name)} className={liStyle} data-testid='day'>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{formatSpots(spots)}</h3>
    </li>
  );
};

export default DayListItem;
