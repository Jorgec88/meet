import { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
  //Add a new state for the input field so that the value can be accessed
  const [query, setQuery] = useState(32);
  const [error, setError] = useState('');

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);
    setCurrentNOE(value);
  };

  if (isNaN(value) || value <=0) {
    setError('Enter a positive number');
  } else{
    setError('');
    setCurrentNOE(parseInt(value, 10));
   }
  };

  return (
    <div>
      <label htmlFor='number-of-events-input'>Number of Events: </label>
      <input
        id='number-of-events'
        type='text'
        value={query}
        onChange={handleInputChanged}
        className='eventsNumber'
        placeholder='Enter number of events'
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default NumberOfEvents;
