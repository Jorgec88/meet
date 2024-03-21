import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });
  test('renders EventList', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });
  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });
  test('renders NumberOfEvents', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});
