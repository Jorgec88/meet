/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
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

  test('shows events titles', () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test('render event location', () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test('renders event details button with the title (show details)', () => {
    expect(EventComponent.queryByText('show details')).toBeInTheDocument();
  });

  test('event details hidden by default', () => {
    expect(
      EventComponent.container.querySelector('.details')
    ).not.toBeInTheDocument();
  });

  test('shows details section when the user clicks on (show details) button', async () => {
    const user = userEvent.setup();
    await user.click(EventComponent.queryByText('show details'));

    expect(
      EventComponent.container.querySelector('.details')
    ).toBeInTheDocument();
    expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
    expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();
  });

  test('hide details section when the user clicks on (hide details) button', async () => {
    const user = userEvent.setup();

    await user.click(EventComponent.queryByText('show details'));
    expect(
      EventComponent.container.querySelector('.details')
    ).toBeInTheDocument();
    expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
    expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();

    await user.click(EventComponent.queryByText('hide details'));
    expect(
      EventComponentDOM.container.querySelector('.details')
    ).not.toBeInTheDocument();
    expect(
      EventComponentDOM.queryByText('hide details')
    ).not.toBeInTheDocument();
    expect(EventComponentDOM.queryByText('show details')).toBeInTheDocument();
  });
});
