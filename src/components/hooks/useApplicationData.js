import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_SPOTS,
} from '../../reducers/action/types';
import appReducer from '../../reducers/appReducer';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(appReducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.onopen = () => {
      ws.onmessage = (e) => {
        const { type, id, interview } = JSON.parse(e.data);

        if (!interview) {
          dispatch({ type, payload: id });
        }

        dispatch({
          type,
          payload: {
            id,
            interview,
          },
        });
        dispatch({ type: UPDATE_SPOTS, payload: interview ? true : false });
      };
    };

    const getDays = axios.get('/api/days');
    const getAppointments = axios.get('/api/appointments');
    const getInterviewers = axios.get('/api/interviewers');

    Promise.all([getDays, getAppointments, getInterviewers]).then((res) =>
      dispatch({
        type: SET_APPLICATION_DATA,
        payload: {
          days: [...res[0].data],
          appointments: res[1].data,
          interviewers: res[2].data,
        },
      })
    );
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, payload: day });

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      dispatch({
        type: SET_INTERVIEW,
        payload: {
          id,
          interview,
        },
      });
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, payload: { interview: null, id } });
      // only for test
      dispatch({ type: UPDATE_SPOTS, payload: false });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
