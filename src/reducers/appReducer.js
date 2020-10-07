import { getDayId } from 'helpers/selectors';
import {
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
  UPDATE_SPOTS,
} from './action/types';

const appReducer = (state, { type, payload }) => {
  if (type === SET_DAY) {
    return { ...state, day: payload };
  }

  if (type === SET_APPLICATION_DATA) {
    const { days, appointments, interviewers } = payload;

    return { ...state, days, appointments, interviewers };
  }

  if (type === UPDATE_SPOTS) {
    return { ...state, days: payload };
  }

  if (type === SET_INTERVIEW) {
    const { id, interview } = payload;

    const appointment = {
      ...state.appointments[id],
      interview: interview ? { ...interview } : null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return { ...state, appointments };
  }
};

export default appReducer;
