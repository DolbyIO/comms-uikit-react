import type { Participant } from '@voxeet/voxeet-web-sdk/types/models/Participant';
import cx from 'classnames';
import React, { useEffect } from 'react';

import useAudioProcessing from '../../../hooks/useAudioProcessing';
import useParticipants from '../../../hooks/useParticipants';
import useTheme from '../../../hooks/useTheme';
import IconIndicator from '../../ui/indicators/IconIndicator/IconIndicator';
import Space from '../../ui/Space/Space';
import LocalName from '../LocalName/LocalName';
import LocalSpeakingIndicator from '../LocalSpeakingIndicator/LocalSpeakingIndicator';
import LocalVideo from '../LocalVideo/LocalVideo';
import ParticipantName from '../ParticipantName/ParticipantName';
import ParticipantSpeakingIndicator from '../ParticipantSpeakingIndicator/ParticipantSpeakingIndicator';
import ParticipantVideo from '../ParticipantVideo/ParticipantVideo';

import styles from './ParticipantsGridItem.module.scss';

type ParticipantsGridItemProps = {
  participant: Participant;
  localText: string;
  showParticipantNamePill?: boolean;
  forceShowAvatar?: boolean;
};

const ParticipantsGridItem = React.memo(
  ({ participant, localText, showParticipantNamePill = true, forceShowAvatar = false }: ParticipantsGridItemProps) => {
    const { getColor, isMobileSmall, isMobile } = useTheme();
    const { addIsSpeakingListener, participantsStatus } = useParticipants();
    const { isMusicMode, isMusicModeSupported } = useAudioProcessing();

    const { isSpeaking, isRemoteAudio, isLocal, isLocalAudio, isRemoteMusicMode } =
      participantsStatus[participant.id] || {};

    const isSmartphone = isMobileSmall || isMobile;

    useEffect(() => {
      return addIsSpeakingListener(participant);
    }, []);

    const isMusicModeActive = isLocal ? isMusicModeSupported && isMusicMode : isRemoteMusicMode;

    return (
      <Space
        testID="ParticipantsGridItem"
        className={cx(styles.item, { [styles.mobile]: isSmartphone })}
        fw
        fh
        css={{
          '&:after': {
            display: isSpeaking ? 'block' : 'none',
            borderColor: isSpeaking && isRemoteAudio ? getColor('purple.400') : getColor('transparent'),
          },
        }}
      >
        {isLocal ? (
          <LocalVideo testID="LocalVideo" />
        ) : (
          <ParticipantVideo testID="ParticipantVideo" participant={participant} forceShowAvatar={forceShowAvatar} />
        )}
        {showParticipantNamePill && (
          <Space className={styles.pill}>
            {isLocal ? (
              <LocalName text={localText} testID="LocalName" />
            ) : (
              <ParticipantName testID="ParticipantName" participant={participant} />
            )}
          </Space>
        )}
        {!isLocal && !isLocalAudio && (
          <Space
            className={cx(styles.indicatorsContainer, isMobile && styles.mobile, isMobileSmall && styles.mobileSmall)}
          >
            <IconIndicator
              testID="SpeakerOffIndicator"
              icon="speakerOff"
              backgroundColor="white"
              iconColor="primary.400"
            />
          </Space>
        )}

        <Space className={styles.rightIndicatorsSection}>
          {isMusicModeActive && (
            <Space mr="xxs">
              <IconIndicator testID="MusicModeIndicator" icon="tune" backgroundColor="white" iconColor="primary.400" />
            </Space>
          )}
          {isLocal ? (
            <LocalSpeakingIndicator testID="LocalSpeakingIndicator" />
          ) : (
            <ParticipantSpeakingIndicator testID="ParticipantSpeakingIndicator" participant={participant} />
          )}
        </Space>
      </Space>
    );
  },
);

export default ParticipantsGridItem;
