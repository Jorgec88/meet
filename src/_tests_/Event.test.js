/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
//import { getEvents } from '../api';

describe('<Event /> component', () => {
  const mockEvent = {
    summary: 'Test Event',
    created: '2020-05-19T19:17:46.000Z',
    location: 'Test Location',
    description: 'This is a test description',
    status: 'scheduled'
  };

  beforeEach(() => {
    render(<Event event={mockEvent} />);
  });

  it('renders event details button with the title "Show Details"', async () => {
    const detailsButton = screen.getByRole('button', { name: /show details/i });
    expect(detailsButton).toBeInTheDocument();
  });

  it('shows details section when the user clicks on "Show Details" button', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /show details/i }));

    expect(screen.getByText(/event details/i)).toBeInTheDocument();
    expect(
      screen.getByText(`Description: ${mockEvent.description}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Event status: ${mockEvent.status}`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /hide details/i })
    ).toBeInTheDocument();
  });

  it('hide details section when the user clicks on "Hide Details" button', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /show details/i })); // Show details first
    await user.click(screen.getByRole('button', { name: /hide details/i })); // Then hide

    expect(screen.queryByText(/event details/i)).not.toBeInTheDocument();
  });
});

//test('shows events titles', () => {
//  expect(
//    EventComponent.queryByText(allEvents[0].summary)
//  ).toBeInTheDocument();
//});

//test('render event location', () => {
//  expect(
//    EventComponent.queryByText(allEvents[0].location)
//  ).toBeInTheDocument();
//});

//test('renders event details button with the title (show details)', () => {
//  expect(EventComponent.queryByText('show details')).toBeInTheDocument();
//});

//test('event details hidden by default', () => {
//  expect(
//    EventComponent.container.querySelector('.details')
//  ).not.toBeInTheDocument();
//});

//test('shows details section when the user clicks on (show details) button', async () => {
//  const user = userEvent.setup();
//  await user.click(EventComponent.queryByText('show details'));

//  expect(
//    EventComponent.container.querySelector('.details')
//  ).toBeInTheDocument();
//  expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
//  expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();
//});

//test('hide details section when the user clicks on (hide details) button', async () => {
//  const user = userEvent.setup();

//  await user.click(EventComponent.queryByText('show details'));
//  expect(
//    EventComponent.container.querySelector('.details')
//  ).toBeInTheDocument();
//  expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
//  expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();

//  await user.click(EventComponent.queryByText('hide details'));
//  expect(
//    EventComponent.container.querySelector('.details')
//  ).not.toBeInTheDocument();
//  expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
//  expect(EventComponent.queryByText('show details')).toBeInTheDocument();
//});
//});
//
