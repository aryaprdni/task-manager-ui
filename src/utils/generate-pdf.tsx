import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Task } from "../context/task-context";

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { fontSize: 16, marginBottom: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 14, fontWeight: "bold" },
  desc: { fontSize: 12 },
});

const TaskReport = ({ tasks }: { tasks: Task[] }) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>Task Manager App Report</Text>
          <Text>Tidak ada task yang tersedia.</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Task Manager App Report</Text>
        <Text style={styles.header}>
          Generated at: {new Date().toLocaleString()}
        </Text>

        {tasks.map((task, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.title}>{task.title || "Untitled"}</Text>
            <Text style={styles.desc}>{task.description || "No Description"}</Text>
            <Text>Status: {task.completed ? "Completed" : "Pending"}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default TaskReport;
