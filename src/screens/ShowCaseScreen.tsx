import { Button, Text, View, StyleSheet } from "react-native";

import {
  cancelNotification,
  displayNotification,
  listScheduledNotifications,
  scheduleNotification,
} from "../utils/notification";

export default function ShowCaseScreen() {
  function handleDisplayNotification() {
    displayNotification({
      id: "123",
      title: "Hello",
      body: "World",
    });
  }

  function handleUpdateNotification() {
    displayNotification({
      id: "123",
      title: "Hello Edited",
      body: "World",
    });
  }

  function handleCancelNotification() {
    cancelNotification("123");
  }

  function handleScheduleNotification() {
    scheduleNotification({
      id: "123",
      title: "Hello",
      body: "World",
    });
  }

  function handleListScheduledNotifications() {
    listScheduledNotifications();
  }

  return (
    <View style={styles.container}>
      <Text>Local Notifications</Text>
      <Button
        title="Display Notification"
        onPress={handleDisplayNotification}
      />
      <Button title="Update Notification" onPress={handleUpdateNotification} />
      <Button title="Cancel Notification" onPress={handleCancelNotification} />
      <Button
        title="Schedule Notification"
        onPress={handleScheduleNotification}
      />
      <Button
        title="List Scheduled Notifications"
        onPress={handleListScheduledNotifications}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
