import type { Participant as ParticipantType } from '@voxeet/voxeet-web-sdk/types/models/Participant';

import useAudio from '../../../hooks/useAudio';
import useParticipants from '../../../hooks/useParticipants';
import MediaButton, { MediaButtonProps } from '../MediaButton/MediaButton';

type ParticipantToggleAudioButtonProps = Partial<Omit<MediaButtonProps, 'onClick' | 'isActive' | 'isDisabled'>> & {
  participant: ParticipantType;
};

export const ParticipantToggleAudioButton = ({
  participant,
  size = 'm',
  tooltipPosition = 'top',
  defaultIcon = 'speaker',
  activeIcon = 'speakerOff',
  disabledIcon = 'speakerOff',
  testID = 'ParticipantToggleAudioButton',
  ...rest
}: ParticipantToggleAudioButtonProps) => {
  const { participantsStatus } = useParticipants();
  const { startParticipantAudio, stopParticipantAudio } = useAudio();

  const { isLocalAudio } = participantsStatus[participant.id] || {};

  const handleToggleAudio = async () => {
    if (isLocalAudio) {
      await stopParticipantAudio(participant);
    } else {
      await startParticipantAudio(participant);
    }
  };

  return (
    <MediaButton
      tooltipPosition={tooltipPosition}
      defaultIcon={defaultIcon}
      activeIcon={activeIcon}
      disabledIcon={disabledIcon}
      isActive={!isLocalAudio}
      onClick={handleToggleAudio}
      size={size}
      testID={testID}
      {...rest}
    />
  );
};

export default ParticipantToggleAudioButton;
