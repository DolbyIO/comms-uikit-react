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
    id: '97cce9d4-0503-3862-b62b-6fbf28e3544f',
    status: 'Connected',
    type: 'user',
    active: false,
  },
  conference: {
    alias: 'dolbyio',
    id: '924d59a4-2380-43f6-bc8e-7ade8549cee3',
    isNew: true,
    pinCode: 'FAKEPIN_924d59a4-2380-43f6-bc8e-7ade8549cee3',
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
      id: '97cce9d4-0503-3862-b62b-6fbf28e3544f',
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
      id: '97cce9d4-0503-3862-b62b-123123123',
      status: 'Connected',
      type: 'user',
      audioReceivingFrom: false,
    },
  ],
  participantsStatus: {
    '97cce9d4-0503-3862-b62b-6fbf28e3544f': {
      isSpeaking: true,
      isLocal: true,
      isRemoteAudio: true,
      isLocalAudio: true,
      isVideo: true,
    },
    '97cce9d4-0503-3862-b62b-123123123': {
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
    deviceId: '78627590193aee3432525252525258f989d312673678b0dbd05274565e',
    kind: 'videoinput',
    label: 'FaceTime HD Camera',
    groupId: 'f3f3517c334252525252508ba739594092c157928973d89e2277',
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
