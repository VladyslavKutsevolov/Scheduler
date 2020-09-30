export const getAppointmentsForDay = (state, weekDay) => {
  if (!state.days.length) return [];
  const { days, appointments } = state;

  const getAppoinments = days.filter((day) => day.name === weekDay);

  if (!getAppoinments.length) return [];

  return getAppoinments[0].appointments.map((id) => appointments[id]);
};
