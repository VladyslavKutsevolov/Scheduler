import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

import './styles.scss';
import { useVisualMode } from 'components/hooks/useVisualMode';
import Form from './Form';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

const Appointment = ({ id, time, interview, interviewers, bookInterview }) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    bookInterview(id, interview).then((res) => {
      transition(SHOW);
    });
  };
  console.log('appointment int', interview);
  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
    </article>
  );
};

export default Appointment;
