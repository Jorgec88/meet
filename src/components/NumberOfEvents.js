import { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [numEvents, setNumEvents] = useState('32');

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumEvents(value);

    let infoText;
    if (isNaN(value) || value <= 0) {
      infoText = 'Enter a positive number';
    } else {
      infoText = '';
      setCurrentNOE(value);
    }
    setErrorAlert(infoText);
  };

  return (
    <div id='number-of-events'>
      <label htmlFor='number-of-events-input'>Number of Events: </label>
      <input
        type='text'
        value={numEvents}
        onChange={handleInputChanged}
        className='number-of-events-input'
      />
    </div>
  );
};

export default NumberOfEvents;
