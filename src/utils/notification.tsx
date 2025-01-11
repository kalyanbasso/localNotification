import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import { useEffect } from "react";

type NotificationProps = {
  id?: string;
  title: string;
  body: string;
};

async function createChannelId() {
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    vibration: true,
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
  });

  return channelId;
}

export async function displayNotification(notification: NotificationProps) {
  await notifee.requestPermission();

  const channelId = await createChannelId();

  await notifee.displayNotification({
    ...notification,
    android: {
      channelId,
    },
  });
}

export async function cancelNotification(notificationId: string) {
  await notifee.cancelNotification(notificationId);
}

export async function scheduleNotification(notification: NotificationProps) {
  const date = new Date(Date.now());
  date.setSeconds(date.getSeconds() + 12);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  const channelId = await createChannelId();

  await notifee.createTriggerNotification(
    {
      ...notification,
      android: { channelId },
    },
    trigger
  );
}

export function listScheduledNotifications() {
  notifee.getTriggerNotifications().then((notifications) => {
    console.log("Scheduled notifications", notifications);
  });
}

export function NotificationComponent() {
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      console.log("Foreground event", type);
      switch (type) {
        case EventType.ACTION_PRESS:
          console.log("User pressed notification", detail.notification);
          break;
        case EventType.DISMISSED:
          console.log("User dismissed notification", detail.notification);
          break;
        default:
          break;
      }
    });
  }, []);

  useEffect(() => {
    return notifee.onBackgroundEvent(async ({ type, detail }) => {
      console.log("Background event", type);
      if (type === EventType.PRESS) {
        console.log("User pressed notification", detail.notification);
      }
    });
  }, []);

  return null;
}
