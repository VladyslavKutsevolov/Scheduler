import { getDayId } from 'helpers/selectors';
import {
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
  UPDATE_SPOTS,
} from './action/types';

const appReducer = (state, { type, payload }) => {
  if (type === SET_DAY) {
    console.log(type, payload);
    return { ...state, day: payload };
  }

  if (type === SET_APPLICATION_DATA) {
    const { days, appointments, interviewers } = payload;
    return { ...state, days, appointments, interviewers };
  }

  if (type === UPDATE_SPOTS) {
    const dayId = getDayId(state, state.day);

    const days = state.days.map((day) => {
      if (day.id === dayId) {
        return payload
          ? { ...day, spots: --day.spots }
          : { ...day, spots: ++day.spots };
      }
      return { ...day };
    });

    return { ...state, days };
  }

  if (type === SET_INTERVIEW) {
    const { id, interview } = payload;
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return { ...state, appointments };
  }
};

export default appReducer;
