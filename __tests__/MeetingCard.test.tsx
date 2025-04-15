import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { router } from 'expo-router';
import { MeetingCard } from '../app/components/MeetingCard';

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('MeetingCard', () => {
  const mockMeetingData = {
    date: new Date('2024-01-18'),
    time: '6:00PM',
    location: 'Honda Center',
    city: 'Geneva',
    name: 'Anto'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all props', () => {
    const { getByText } = render(
      <MeetingCard
        date={mockMeetingData.date}
        time={mockMeetingData.time}
        location={mockMeetingData.location}
        city={mockMeetingData.city}
        name={mockMeetingData.name}
      />
    );

    // Check if all the meeting details are rendered
    expect(getByText('Jan')).toBeTruthy();
    expect(getByText('18')).toBeTruthy();
    expect(getByText('Anto')).toBeTruthy();
    expect(getByText('6:00PM')).toBeTruthy();
    expect(getByText('Honda Center, Geneva')).toBeTruthy();
  });

  it('navigates to meeting-summary when edit button is pressed', () => {
    const { getByText } = render(
      <MeetingCard
        date={mockMeetingData.date}
        time={mockMeetingData.time}
        location={mockMeetingData.location}
        city={mockMeetingData.city}
        name={mockMeetingData.name}
      />
    );

    // Press the edit button
    fireEvent.press(getByText('Edit'));

    // Check if router.push was called with correct params
    expect(router.push).toHaveBeenCalledWith('/meeting-summary');
  });

  it('handles undefined props gracefully', () => {
    const { getByText } = render(<MeetingCard />);

    // Should show placeholder or default values
    expect(getByText('--')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <MeetingCard
        date={mockMeetingData.date}
        time={mockMeetingData.time}
        location={mockMeetingData.location}
        city={mockMeetingData.city}
        name={mockMeetingData.name}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
}); 