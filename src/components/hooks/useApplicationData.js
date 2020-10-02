import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    const getDays = axios.get('/api/days');
    const getAppointments = axios.get('/api/appointments');
    const getInterviewers = axios.get('/api/interviewers');

    Promise.all([getDays, getAppointments, getInterviewers]).then((res) => {
      setState({
        ...state,
        days: [...res[0].data],
        appointments: res[1].data,
        interviewers: res[2].data,
      });
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({ ...state, appointments });
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`);
  };

  const editInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({ ...state, appointments });
    });
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview,
  };
};

export default useApplicationData;
