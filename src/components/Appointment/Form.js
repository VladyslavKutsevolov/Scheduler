import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

const Form = ({
  interviewers,
  onSave,
  onCancel,
  studentName,
  interviewerId,
}) => {
  const [name, setName] = useState(studentName || '');
  const [interviewer, setInterviewer] = useState(interviewerId || null);
  const [error, setError] = useState(false);

  const validate = (name, interviewer) => {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    }
    setError(false);
    onSave(name, interviewer);
  };

  const reset = () => {
    setName('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            type='text'
            placeholder='Enter Student Name'
            onChange={({ target }) => setName(target.value)}
            value={name}
            data-testid='student-name-input'
          />
        </form>
        {error && (
          <section className='appointment__validation'>{error}</section>
        )}
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
