export const getAppointmentsForDay = (state, weekDay) => {
  if (!state.days.length) return [];
  const { days, appointments } = state;

  const getAppoinments = days.filter((day) => day.name === weekDay);

  if (!getAppoinments.length) return [];

  return getAppoinments[0].appointments.map((id) => appointments[id]);
};

export const getInterviewersForDay = (state, weekDay) => {
  if (!state.days.length) return [];
  const { days, interviewers } = state;
  console.log('state', state);

  const getAppoinments = days.filter((day) => day.name === weekDay);

  if (!getAppoinments.length) return [];

  return getAppoinments[0].appointments.map((id) => interviewers[id]);
};

export const getInterview = (state, interview) => {
  if (!interview) return null;

  const { student, interviewer: id } = interview;

  return {
    student,
    interviewer: state.interviewers
      ? state.interviewers[id]
      : (state.interviewers = {}),
  };
};
