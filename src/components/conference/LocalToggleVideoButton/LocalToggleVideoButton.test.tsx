import { createParticipant, createParticipantStatus } from '../../../utils/tests/dataCreators.util';
import { fireEvent, render, waitFor } from '../../../utils/tests/test-utils';

import LocalToggleVideoButton from './LocalToggleVideoButton';

const defaultText = 'Camera off';
const activeText = 'Camera on';
const testID = 'testID';

const localParticipant = createParticipant({ name: 'Local', id: 'Local' });
const localParticipantStatusWithVideo = createParticipantStatus('Local', { isLocal: true, isVideo: true });
const localParticipantStatusWithoutVideo = createParticipantStatus('Local', { isLocal: true, isVideo: false });

jest.mock('../../../hooks/useCamera', () => {
  return jest.fn(() => ({
    ...jest.requireActual('../../../hooks/useCamera'),
    getCameraPermission: jest.fn(() => true),
  }));
});

describe('LocalToggleVideoButton component', () => {
  test('Passes TestID', async () => {
    const { getByTestId } = render(
      <LocalToggleVideoButton testID={testID} defaultTooltipText={activeText} activeTooltipText={activeText} />,
    );
    await waitFor(() => {
      expect(getByTestId(testID)).not.toBeNull();
    });
  });
  test('Displays camera off text props', async () => {
    const { getByText } = render(
      <LocalToggleVideoButton testID={testID} defaultTooltipText={defaultText} activeTooltipText={activeText} />,
      {
        commsProps: {
          value: {
            participant: localParticipant,
            participantsStatus: {
              ...localParticipantStatusWithVideo,
            },
          },
        },
      },
    );
    await waitFor(() => {
      expect(getByText(defaultText)).not.toBeNull();
    });
  });
  test('Displays camera on text props', async () => {
    const { getByText } = render(
      <LocalToggleVideoButton testID={testID} defaultTooltipText={activeText} activeTooltipText={activeText} />,
      {
        commsProps: {
          value: {
            participant: localParticipant,
            participantsStatus: {
              ...localParticipantStatusWithoutVideo,
            },
            isVideo: false,
          },
        },
      },
    );
    await waitFor(() => {
      expect(getByText(activeText)).not.toBeNull();
    });
  });
  test('Can click LocalToggleVideoButton and runs toggleVideo function', async () => {
    const toggleVideo = jest.fn();

    const { getByTestId } = render(
      <LocalToggleVideoButton testID={testID} defaultTooltipText={activeText} activeTooltipText={activeText} />,
      {
        commsProps: {
          value: {
            toggleVideo,
          },
        },
      },
    );

    await waitFor(() => {
      const element = getByTestId(testID);
      fireEvent.click(element);
      expect(toggleVideo).toHaveBeenCalled();
    });
  });
});
