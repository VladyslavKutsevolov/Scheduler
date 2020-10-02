import React, { useEffect, useState } from 'react';
import DayList from './DayList';

import 'components/Application.scss';
import Appointment from './Appointment';
import axios from 'axios';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from 'helpers/selectors';

export default function Application(props) {
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

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          {' '}
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          console.log('inteview', interview);
          return (
            <Appointment
              key={appointment.id}
              {...appointment}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
              editInterview={editInterview}
            />
          );
        })}
      </section>
    </main>
  );
}
