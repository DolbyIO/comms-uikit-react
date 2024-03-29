import type { CommsContextType } from '../../providers/CommsProvider';

export const value = {
  participant: {
    info: {
      name: 'User',
      avatarUrl: undefined,
      externalId: undefined,
    },
    streams: [],
    audioQuality: -1,
    audioTransmitting: true,
    _audioReceivingStopped: true,
    id: '53undkfjn3o489847839',
    status: 'Connected',
    type: 'user',
    active: false,
  },
  conference: {
    alias: 'dolbyio',
    id: '5678ikmgrnebdhjcvklbmgnremkls',
    isNew: true,
    pinCode: 'FAKEPIN_5678ikmgrnebdhjcvklbmgnremkls',
  },
  participants: [
    {
      _events: {},
      _eventsCount: 0,
      info: {
        name: 'User',
        avatarUrl: undefined,
        externalId: undefined,
      },
      streams: [
        {
          type: 'Camera',
        },
      ],
      audioQuality: -1,
      audioTransmitting: true,
      _audioReceivingStopped: true,
      id: '53undkfjn3o489847839',
      status: 'Connected',
      type: 'user',
      audioReceivingFrom: false,
    },
    {
      _events: {},
      _eventsCount: 0,
      info: {
        name: 'Another',
        avatarUrl: undefined,
        externalId: undefined,
      },
      streams: [
        {
          type: 'Camera',
        },
      ],
      audioQuality: -1,
      audioTransmitting: true,
      _audioReceivingStopped: true,
      id: '4uhhbvkjbekjrb3383939393',
      status: 'Connected',
      type: 'user',
      audioReceivingFrom: false,
    },
  ],
  participantsStatus: {
    '53undkfjn3o489847839': {
      isSpeaking: true,
      isLocal: true,
      isRemoteAudio: true,
      isLocalAudio: true,
      isVideo: true,
    },
    '4uhhbvkjbekjrb3383939393': {
      isSpeaking: true,
      isLocal: false,
      isRemoteAudio: true,
      isLocalAudio: true,
      isVideo: true,
    },
  },
  isAudio: true,
  isVideo: true,
  prevConference: {
    participant: 'User',
    name: 'dolbyio',
  },
  localCamera: {
    deviceId: '57348hfrekjnvbhyhujivhbuhijfr',
    kind: 'videoinput',
    label: 'FaceTime HD Camera',
    groupId: 'tyu7gjnb4hueifkmnbhhtuiroel',
  },
  conferenceStatus: null,
  localMicrophone: null,
  localSpeakers: null,
  // openSession: jest.fn(),
  // closeSession: jest.fn(),
  // createConference: jest.fn(),
  // joinConference: jest.fn(),
  // leaveConference: jest.fn(),
  // toggleAudio: jest.fn(),
  // toggleVideo: jest.fn(),
  // startParticipantAudio: jest.fn(),
  // stopParticipantAudio: jest.fn(),
  // startParticipantVideo: jest.fn(),
  // stopParticipantVideo: jest.fn(),
  // addIsSpeakingListener: jest.fn(),
  // resetVideo: jest.fn(),
  // resetAudio: jest.fn(),
  // setLocalCamera: jest.fn(),
  // setLocalMicrophone: jest.fn(),
  // setLocalSpeakers: jest.fn(),
} as unknown as CommsContextType;
