import { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [numEvents, setNumEvents] = useState('32');

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumEvents(value);

    let infoText;
    if (isNaN(value) || value <= 0) {
      infoText = 'Only positive numbers are allowed';
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
        className='number-of-events-input'
        value={numEvents}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
