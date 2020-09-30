import React, { useEffect, useState } from 'react';
import DayList from './DayList';

import 'components/Application.scss';
import Appointment from './Appointment';
import axios from 'axios';

export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('/api/days').then((res) => {
      setDays([...res.data]);
    });
  }, [days]);

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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {/* {appointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))} */}
      </section>
    </main>
  );
}
