import Event from './Event';

const EventList = ({ events }) => {
  return (
    <ul id='event-list'>
      {events
        ? events.map((event, index) => (
            <Event key={`event-${index}`} event={event} />
          ))
        : null}
    </ul>
  );
};

export default EventList;
