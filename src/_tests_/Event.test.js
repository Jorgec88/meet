import { render } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;

  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test('render events titles', () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test('render event start time', () => {
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });

  test('render event location', () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test('event details are hidden by default', () => {
    expect(
      EventComponent.container.querySelector('.details')
    ).not.toBeInTheDocument();
  });

  test('show event details when user clicks "show details" button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByRole('button');
    await user.click(button, 'Show Details');
    const details = EventComponent.container.querySelector('.details');
    expect(details).toBeInTheDocument();
  });

  test('hides event details when user clicks "hide details" button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByRole('button');
    const details = EventComponent.container.querySelector('.details');
    await user.click(button, 'Hide Details');
    expect(details).not.toBeInTheDocument();
  });
});
