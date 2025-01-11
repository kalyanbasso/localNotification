import { Button, Text, View } from "react-native";
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";

import { styles } from "./styles";
import { useEffect } from "react";

export default function App() {
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

  async function displayNotification() {
    await notifee.requestPermission();

    const channelId = await createChannelId();

    await notifee.displayNotification({
      id: "hello-world",
      title: "Hello World 222!",
      body: "This is a local notification!",
      android: {
        channelId,
      },
    });
  }

  async function updateNotification() {
    await notifee.requestPermission();

    const channelId = await createChannelId();

    await notifee.displayNotification({
      id: "hello-world",
      title: "Hello World!",
      body: "This is a local notification!",
      android: {
        channelId,
      },
    });
  }

  async function cancelNotification() {
    await notifee.cancelNotification("hello-world");
  }

  async function scheduleNotification() {
    const date = new Date(Date.now());
    date.setSeconds(date.getSeconds() + 12);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    const channelId = await createChannelId();

    await notifee.createTriggerNotification(
      {
        id: "scheduled-notification",
        title: "Scheduled Notification",
        body: "This notification was scheduled!",
        android: { channelId },
      },
      trigger
    );
  }

  function listScheduledNotifications() {
    notifee.getTriggerNotifications().then((notifications) => {
      console.log("Scheduled notifications", notifications);
    });
  }

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

  return (
    <View style={styles.container}>
      <Text>Local Notifications</Text>
      <Button title="Display Notification" onPress={displayNotification} />
      <Button title="Update Notification" onPress={updateNotification} />
      <Button title="Cancel Notification" onPress={cancelNotification} />
      <Button title="Schedule Notification" onPress={scheduleNotification} />
      <Button
        title="List Scheduled Notifications"
        onPress={listScheduledNotifications}
      />
    </View>
  );
}
