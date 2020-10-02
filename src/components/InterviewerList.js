import React from 'react';
import InterviewerListItem from './InterviewerListItem';

import 'components/InterviewerList.scss';

const InterviewerList = ({ interviewers, value, onChange }) => {
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>
        {interviewers.map((teacher) => (
          <InterviewerListItem
            {...teacher}
            key={teacher.id}
            setInterviewer={() => onChange(teacher.id)}
            selected={teacher.id === value}
          />
        ))}
      </ul>
    </section>
  );
};

export default InterviewerList;
