import { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
  //Add a new state for the input field so that the value can be accessed
  const [query, setQuery] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);
    setCurrentNOE(value);
  };

  return (
    <>
      <h4> Events </h4>
      <input
        id='number-of-events'
        type='text'
        value={query}
        onChange={handleInputChanged}
        className='eventsNumber'
        placeholder='Enter number of events'
      />
    </>
  );
};

export default NumberOfEvents;
