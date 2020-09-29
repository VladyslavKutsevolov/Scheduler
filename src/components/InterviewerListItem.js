import React from 'react';
import classNames from 'classnames';

import './InterviewerListItem.scss';

const InterviewerListItem = ({
  id,
  name,
  avatar,
  selected,
  setInterviewer,
}) => {
  const liStyle = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
  });

  return (
    <li className={liStyle} onClick={setInterviewer}>
      <img className='interviewers__item-image' src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
