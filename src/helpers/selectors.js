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

  const getAppoinments = days.filter((day) => day.name === weekDay);
  console.log(getAppoinments[0]);
  if (!getAppoinments.length) return [];

  return getAppoinments[0].interviewers.map((id) => interviewers[id]);
};

export const getDayId = (state, weekDay) => {
  return state.days.filter((day) => day.name === weekDay)[0].id;
};

export const getInterview = (state, interview) => {
  if (!interview) return null;

  const { student, interviewer: id } = interview;

  return {
    student,
    interviewer: state.interviewers[id],
  };
};
