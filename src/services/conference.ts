import VoxeetSDK from '@voxeet/voxeet-web-sdk';
import type { AudioCaptureModeOptions } from '@voxeet/voxeet-web-sdk/types/models/Audio';
import type { ConferencePermission } from '@voxeet/voxeet-web-sdk/types/models/Conference';
import type Conference from '@voxeet/voxeet-web-sdk/types/models/Conference';
import type ConferenceOptions from '@voxeet/voxeet-web-sdk/types/models/ConferenceOptions';
import type { MediaStreamWithType } from '@voxeet/voxeet-web-sdk/types/models/MediaStream';
import type { JoinOptions, ListenType, ScreenshareOptions } from '@voxeet/voxeet-web-sdk/types/models/Options';
import type { Participant } from '@voxeet/voxeet-web-sdk/types/models/Participant';
import type { ParticipantQuality } from '@voxeet/voxeet-web-sdk/types/models/Simulcast';
import type { VideoForwardingOptions } from '@voxeet/voxeet-web-sdk/types/models/VideoForwarding';
import type { VideoProcessor } from '@voxeet/voxeet-web-sdk/types/models/VideoProcessor';

export type HandledEventStatus = 'ended' | 'joined' | 'left' | 'error';

export default class ConferenceService {
  public static create(options: ConferenceOptions) {
    return VoxeetSDK.conference.create({
      params: {
        dolbyVoice: true,
        liveRecording: true,
        ...options.params,
      },
      ...options,
    });
  }

  public static setPackageUrlPrefix(prefix?: string) {
    if (prefix) {
      VoxeetSDK.packageUrlPrefix = prefix;
    }
  }

  public static listeners(eventName: string) {
    return VoxeetSDK.conference.listenerCount(eventName);
  }

  public static listen(conference: Conference) {
    return VoxeetSDK.conference.listen(conference, { type: 'mixed' as ListenType });
  }

  public static current() {
    return VoxeetSDK.conference.current;
  }

  public static participants() {
    return VoxeetSDK.conference.participants;
  }

  public static fetch(conferenceId: string) {
    return VoxeetSDK.conference.fetch(conferenceId);
  }

  public static join(conference: Conference, options: JoinOptions) {
    return VoxeetSDK.conference.join(conference, options);
  }

  public static stopRemoteVideo(participant: Participant) {
    return VoxeetSDK.video.remote.stop(participant);
  }

  public static startRemoteVideo(participant: Participant) {
    return VoxeetSDK.video.remote.start(participant);
  }

  public static startRemoteAudio(participant: Participant) {
    return VoxeetSDK.audio.remote.start(participant);
  }

  public static stopRemoteAudio(participant: Participant) {
    return VoxeetSDK.audio.remote.stop(participant);
  }

  public static startLocalAudio() {
    return VoxeetSDK.audio.local.start();
  }

  public static stopLocalAudio() {
    return VoxeetSDK.audio.local.stop();
  }

  public static muteOutput(isMuted: boolean) {
    return VoxeetSDK.conference.muteOutput(isMuted);
  }

  public static getCaptureMode() {
    return VoxeetSDK.audio.local.getCaptureMode();
  }

  public static setCaptureMode(options: AudioCaptureModeOptions) {
    return VoxeetSDK.audio.local.setCaptureMode(options);
  }

  public static startLocalVideo({
    deviceId,
    constraints,
    isBlurred,
  }: {
    deviceId?: string;
    isBlurred?: boolean;
    constraints?: MediaTrackConstraints;
  }) {
    const defaultVideoOptions: MediaStreamConstraints['video'] = {
      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 576, ideal: 720, max: 1080 },
    };
    const constraintsOptions = constraints || defaultVideoOptions;

    if (deviceId) {
      constraintsOptions.deviceId = deviceId;
    }
    return VoxeetSDK.video.local.start(
      constraintsOptions,
      isBlurred ? ({ type: 'bokeh' } as VideoProcessor) : undefined,
    );
  }

  public static stopLocalVideo() {
    return VoxeetSDK.video.local.stop();
  }

  public static onLocalVideoUpdated(handler: (track: MediaStreamTrack) => void) {
    VoxeetSDK.video.local.on('videoUpdated', handler);
    return () => VoxeetSDK.video.local.removeListener('videoUpdated', handler);
  }

  public static isSpeaking(participant: Participant, callback: (value: boolean) => void) {
    return VoxeetSDK.conference.isSpeaking(participant, callback);
  }

  public static startScreenShare(screenshareOptions: ScreenshareOptions) {
    return VoxeetSDK.conference.startScreenShare(screenshareOptions);
  }

  public static stopScreenShare() {
    return VoxeetSDK.conference.stopScreenShare();
  }

  public static onParticipantsChange(handler: (data: Participant) => void) {
    VoxeetSDK.conference.on('participantAdded', handler);
    VoxeetSDK.conference.on('participantUpdated', handler);
    return () => {
      VoxeetSDK.conference.removeListener('participantAdded', handler);
      VoxeetSDK.conference.removeListener('participantUpdated', handler);
    };
  }

  public static onStreamsChange(handler: (data: Participant) => void) {
    VoxeetSDK.conference.on('streamAdded', handler);
    VoxeetSDK.conference.on('streamRemoved', handler);
    VoxeetSDK.conference.on('streamUpdated', handler);
    return () => {
      VoxeetSDK.conference.removeListener('streamAdded', handler);
      VoxeetSDK.conference.removeListener('streamRemoved', handler);
      VoxeetSDK.conference.removeListener('streamUpdated', handler);
    };
  }

  public static onScreenShareChange(
    onStartHandler: (participant: Participant, stream: MediaStreamWithType) => void,
    onStopHandler: (participant: Participant, stream: MediaStreamWithType) => void,
  ) {
    VoxeetSDK.conference.on('streamAdded', onStartHandler);
    VoxeetSDK.conference.on('streamRemoved', onStopHandler);
    return () => {
      VoxeetSDK.conference.on('streamAdded', onStartHandler);
      VoxeetSDK.conference.on('streamRemoved', onStopHandler);
    };
  }

  public static onConferenceStatusChange(handler: (data: HandledEventStatus, info: any) => void) {
    VoxeetSDK.conference.on('ended', (info) => handler('ended', info));
    VoxeetSDK.conference.on('joined', (info) => handler('joined', info));
    VoxeetSDK.conference.on('left', (info) => handler('left', info));
    VoxeetSDK.conference.on('error', (info) => handler('error', info));
    return () => {
      VoxeetSDK.conference.removeListener('ended', handler);
      VoxeetSDK.conference.removeListener('joined', handler);
      VoxeetSDK.conference.removeListener('left', handler);
      VoxeetSDK.conference.removeListener('error', handler);
    };
  }

  public static onPermissionsChange(handler: (data: ConferencePermission[]) => void) {
    VoxeetSDK.conference.on('permissionsUpdated', handler);
    return () => {
      VoxeetSDK.conference.removeListener('permissionsUpdated', handler);
    };
  }

  public static onConferenceError(handler: (error: Error) => void) {
    VoxeetSDK.conference.on('error', handler);
    return () => {
      VoxeetSDK.conference.removeListener('error', handler);
    };
  }

  public static leave() {
    return VoxeetSDK.conference.leave();
  }

  public static playBlockedAudio() {
    return VoxeetSDK.conference.playBlockedAudio();
  }

  public static startBackgroundBlur() {
    // @ts-expect-error problem with enum import from SDK
    return VoxeetSDK.video.local.setProcessor({ type: 'bokeh' });
  }

  public static stopVideoProcessing() {
    return VoxeetSDK.video.local.disableProcessing();
  }

  public static setVideoForwarding(options: VideoForwardingOptions) {
    return VoxeetSDK.conference.videoForwarding(options);
  }

  public static setQuality(quality: Array<ParticipantQuality>) {
    return VoxeetSDK.conference.simulcast(quality);
  }
}
