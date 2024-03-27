import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('When the details of an event are hidden by default.', ({
    given,
    when,
    then
  }) => {
    let AppComponent;
    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    when('the app displays a list of event', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });

    then('the event details are hidden by default', () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
});

test('User clicks to show event details.', ({ given, when, then }) => {
  let EventComponent;
  let allEvents;
  given('there is an event with hidden details', async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.container.querySelector('.details')
    ).not.toBeInTheDocument();
  });

  when('the user clicks on the event to show details', async () => {
    const showDetails = EventComponent.queryByText('show details');
    const user = userEvent.setup();
    await user.click(showDetails);
  });

  then('the app display the details of the event', () => {
    expect(
      EventComponent.container.querySelector('.details')
    ).toBeInTheDocument();
    expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
  });
});

test('User clicks to hide event details.', ({ given, when, then }) => {
  let EventComponent;
  let allEvents;
  given('there is an event with displayed details', async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
    const user = userEvent.setup();
    await user.click(EventComponent.queryByText('show details'));
    expect(
      EventComponent.container.querySelector('.details')
    ).toBeInTheDocument();
  });

  when('the user clicks on the event to hide details', async () => {
    const hideDetails = EventComponent.queryByText('hide details');
    const user = userEvent.setup();
    await user.click(hideDetails);
  });

  then('the app should hide the details of the event', () => {
    expect(
      EventComponent.container.querySelector('.details')
    ).not.toBeInTheDocument();
    expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
  });
});
