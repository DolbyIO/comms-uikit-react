import MediaDevicesService from '../../services/mediaDevices';
import { waitFor, act, navigatorReturnMock, setupHook } from '../../utils/tests/test-utils';
import useCamera from '../useCamera';

const localCamera = { deviceId: '123', label: 'this is one local camera' };
const faceTimeCamera = { deviceId: '12345', label: 'FaceTime' };
const setLocalCamera = jest.fn();

const setup = () =>
  setupHook(useCamera, {
    commsProps: {
      value: { localCamera, setLocalCamera },
    },
  });

jest.mock('../../services/mediaDevices', () => {
  return {
    enumerateVideoInputDevices: jest.fn(() => [localCamera, { label: 'this one is without deviceId' }, faceTimeCamera]),
    selectCamera: jest.fn(),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useCamera', () => {
  test('getLocalCameras', async () => {
    const hookValues = setup();
    const cameras = await hookValues.getCameras();
    expect(cameras).toStrictEqual([localCamera, { deviceId: '12345', label: 'FaceTime' }]);
  });
  test('Should invoke selectCamera ', () => {
    const selectCamera = jest.fn();
    jest.spyOn(MediaDevicesService, 'selectCamera').mockImplementationOnce(selectCamera);

    const hookValues = setup();
    hookValues.selectCamera(localCamera.deviceId);
    expect(selectCamera).toBeCalledWith(localCamera.deviceId);
  });

  test('Should invoke getDefaultLocalCamera ', async () => {
    const defaultCamera = { deviceId: 'default', label: 'default' };
    const getCameras = jest.fn(() => {
      return Promise.resolve([
        localCamera,
        defaultCamera,
        { label: 'this one is without deviceId' },
      ] as MediaDeviceInfo[]);
    });
    const hookValues = setup();
    jest.spyOn(MediaDevicesService, 'enumerateVideoInputDevices').mockImplementationOnce(getCameras);
    const resultDefault = await hookValues.getDefaultLocalCamera();
    expect(resultDefault).toStrictEqual(defaultCamera);
    const resultWithoutDefault = await hookValues.getDefaultLocalCamera();
    expect(resultWithoutDefault).toStrictEqual(localCamera);
  });

  test('Should get camera permissions', async () => {
    const hookValues = setup();
    await act(async () => {
      const result = await hookValues.getCameraPermission();
      expect(result).toBeFalsy();
    });
    await act(async () => {
      const windowSpy = jest.spyOn(window, 'navigator', 'get');
      const setMediaDevicesSpy = () => windowSpy.mockImplementation(() => navigatorReturnMock({ userAgent: '' }));
      setMediaDevicesSpy();
      const result = await hookValues.getCameraPermission();
      expect(result).toBeTruthy();
    });
  });

  test('Should swap cameras', async () => {
    const hookValues = setup();
    await hookValues.swapCamera();
    await waitFor(() => {
      expect(setLocalCamera).toBeCalledWith(faceTimeCamera);
    });
  });
});
