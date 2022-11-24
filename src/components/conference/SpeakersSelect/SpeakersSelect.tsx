import { useEffect, useState } from 'react';

import useConference from '../../../hooks/useConference';
import useSpeaker from '../../../hooks/useSpeaker';
import type { ColorKey } from '../../../theme/types';
import { deviceInfoToOptions } from '../../../utils/deviceInfoToOptions.util';
import { throwErrorMessage } from '../../../utils/throwError.util';
import Dropdown, { type DropdownOptionType } from '../../ui/Dropdown/Dropdown';
import DropdownControl from '../../ui/Dropdown/DropdownControl';
import DropdownLabel from '../../ui/Dropdown/DropdownLabel';
import DropdownList from '../../ui/Dropdown/DropdownList';

type SpeakersSelectProps = {
  labelColor?: ColorKey;
  textColor?: ColorKey;
  backgroundColor?: ColorKey;
  iconColor?: ColorKey;
  hoverColor?: ColorKey;
  primaryBorderColor?: ColorKey;
  secondaryBorderColor?: ColorKey;
  defaultDeviceLabel?: string;
  label: string;
  placeholder: string;
  testID?: string;
};

const SpeakersSelect = ({
  labelColor = 'grey.500',
  textColor = 'grey.500',
  backgroundColor = 'white',
  iconColor = 'grey.300',
  hoverColor = 'grey.50',
  primaryBorderColor = 'grey.100',
  secondaryBorderColor = 'grey.200',
  defaultDeviceLabel,
  label,
  placeholder,
  testID,
}: SpeakersSelectProps) => {
  const [selectedDevice, setSelectedDevice] = useState<DropdownOptionType | null>(null);
  const [devices, setDevices] = useState<DropdownOptionType[]>([]);
  const { getSpeakers, selectSpeaker, localSpeakers, setLocalSpeakers } = useSpeaker();
  const { conference } = useConference();

  useEffect(() => {
    (async () => {
      const speakerDevices = await getSpeakers();
      const { options, defaultDevice } = deviceInfoToOptions({
        data: speakerDevices,
        local: localSpeakers?.deviceId,
        renderLabel: (label: string) => label,
        icon: 'speaker',
        defaultDeviceLabel,
      });
      setDevices(options);
      setSelectedDevice(defaultDevice);
    })();
  }, []);

  const onChange = async (e: DropdownOptionType) => {
    setSelectedDevice(e);
    if (conference) {
      try {
        await selectSpeaker(e.value);
      } catch (error) {
        throwErrorMessage(error);
      }
    }
    setLocalSpeakers(e.info as MediaDeviceInfo);
  };

  if (devices.length === 0) {
    return null;
  }
  return (
    <Dropdown testID={testID} selected={selectedDevice}>
      <DropdownLabel label={label} color={labelColor} />
      <DropdownControl
        placeholder={placeholder}
        color={textColor}
        backgroundColor={backgroundColor}
        iconColor={iconColor}
        primaryBorderColor={primaryBorderColor}
        secondaryBorderColor={secondaryBorderColor}
      />
      <DropdownList
        onChange={onChange}
        options={devices}
        color={textColor}
        iconColor={iconColor}
        backgroundColor={backgroundColor}
        hoverColor={hoverColor}
      />
    </Dropdown>
  );
};

export default SpeakersSelect;
