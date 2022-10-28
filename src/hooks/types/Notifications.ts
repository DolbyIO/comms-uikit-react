import type { IconComponentName } from '../../components/ui/Icon/IconComponents';
import type { ColorKey } from '../../theme/types';

export type Notifications = {
  /**
   * Show notification in NotificationCenter
   */
  showNotification: (notification: NotificationBase) => void;

  /**
   * Show success notification in NotificationCenter
   */
  showSuccessNotification: (message: string, instanceConfig?: InstanceNotificationConfig) => void;

  /**
   * Show info notification in NotificationCenter
   */
  showInfoNotification: (message: string, instanceConfig?: InstanceNotificationConfig) => void;

  /**
   * Show warning notification in NotificationCenter
   */
  showWarningNotification: (message: string, instanceConfig?: InstanceNotificationConfig) => void;

  /**
   * Show error notification in NotificationCenter
   */
  showErrorNotification: (message: string, instanceConfig?: InstanceNotificationConfig) => void;

  /**
   * Selects a camera.
   * @param notificationId -Identifier of notification to remove from notification center..
   */
  removeNotification: (notificationId: number) => void;

  /**
   * Gets list of all active notifications.
   * @returns .
   */
  notifications: Notification[];

  /**
   * returns flag while there is some content to display
   */
  shouldShowNotificationCenter: boolean;
};

export type UseNotifications = () => Notifications;

export enum NotificationVariants {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

export type NotificationBase = {
  variant: NotificationVariants;
  message: string;
  callback?: () => void;
  instanceConfig?: InstanceNotificationConfig;
};

export type NotificationConfigBase = { bgColor: ColorKey; icon: IconComponentName; color?: ColorKey };
export type InstanceNotificationConfig = Partial<
  NotificationConfigBase & { width: number; duration: number; size: 's' | 'm'; singleLine: boolean }
>;

export interface Notification extends NotificationBase {
  id: number;
}
