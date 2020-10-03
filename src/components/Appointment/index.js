import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

import './styles.scss';
import { useVisualMode } from 'components/hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDITING = 'EDITING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

const Appointment = ({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
  editInterview,
}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const onDelete = () => {
    transition(DELETING);
    cancelInterview(id)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  };

  const onEdit = () => {
    transition(EDITING);
  };

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === ERROR_SAVE && (
        <Error message='Could not save appointment' onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message='Could not delete appointment' onClose={() => back()} />
      )}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM && (
        <Confirm
          message='Are you sure you would like to delete?'
          onCancel={() => back()}
          onConfirm={onDelete}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          onDelete={() => transition(CONFIRM)}
          onEdit={onEdit}
          interviewer={interview.interviewer}
          interviewerId={interview.interviewer.id || ''}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
      {mode === EDITING && (
        <Form
          studentName={interview.student}
          interviewers={interviewers}
          interviewerId={interview.interviewer.id}
          onCancel={() => back()}
          onSave={save}
        />
      )}
    </article>
  );
};

export default Appointment;
