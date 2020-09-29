import React from 'react'
import InterviewerListItem from './InterviewerListItem';

import 'components/InterviewerList.scss'

const InterviewerList = ({ interviewers, interviewer, setInterviewer }) => {
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>
        {interviewers.map((teacher) => (
            <InterviewerListItem {...teacher} setInterviewer={() => setInterviewer(teacher.id)} selected={teacher.id === interviewer} />
        ))}
      </ul>
    </section>
  );
};

export default InterviewerList