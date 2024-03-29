/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventDetails.feature');

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

  test('User clicks to show event details.', ({ given, when, then }) => {
    let EventComponent;
    let EventComponetDOM;
    let allEvents;
    given('there is an event with hidden details', async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      EventComponetDOM = EventComponent.container.firstChild;
      expect(
        EventComponetDOM.querySelector('.details')
      ).not.toBeInTheDocument();
    });

    when('the user clicks on the event to show details', async () => {
      const user = userEvent.setup();
      const showDetails = EventComponetDOM.querySelector('.details-btn');
      await user.click(showDetails);
    });

    then('the app display the details of the event', () => {
      expect(EventComponetDOM.querySelector('.details')).toBeInTheDocument();
      expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
    });
  });

  test('User clicks to hide event details.', ({ given, when, then }) => {
    let EventComponent;
    let EventComponentDOM;
    let allEvents;
    given('there is an event with displayed details', async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      EventComponentDOM = EventComponent.container.firstChild;
      const user = userEvent.setup();
      await user.click(EventComponent.queryByText('Show Details'));
      expect(EventComponentDOM.querySelector('.details')).toBeInTheDocument();
    });

    when('the user clicks on the event to hide details', async () => {
      const hideDetails = EventComponent.queryByText('Hide Details');
      const user = userEvent.setup();
      await user.click(hideDetails);
    });

    then('the app hide the details of the event', () => {
      expect(
        EventComponent.container.querySelector('.details')
      ).not.toBeInTheDocument();
      expect(
        EventComponent.queryByText('Hide Details')
      ).not.toBeInTheDocument();
    });
  });
});
