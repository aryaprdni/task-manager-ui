import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button, Box, Stack } from "@mui/material";
import TaskReport from "../utils/generate-pdf";
import { useState, useEffect } from "react";
import type { Task } from "../context/task-context";

const isEqual = (a: Task[], b: Task[]) =>
  a.length === b.length && a.every((task, i) =>
    task.id === b[i].id &&
    task.title === b[i].title &&
    task.description === b[i].description &&
    task.completed === b[i].completed
  );

const TaskPDFDownload = ({ tasks }: { tasks: Task[] }) => {
  const [snapshot, setSnapshot] = useState<Task[] | null>(null);
  const [ready, setReady] = useState(false);

  const handleGenerate = () => {
    setSnapshot([...tasks]);
    setReady(true);
  };

  useEffect(() => {
    if (snapshot && !isEqual(tasks, snapshot)) {
      setReady(false);
    }
  }, [tasks, snapshot]);

  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={handleGenerate}>
          Generate PDF
        </Button>

        {ready && snapshot && (
          <PDFDownloadLink
            document={<TaskReport tasks={snapshot} />}
            fileName="task-report.pdf"
          >
            {({ loading }) => (
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Preparing PDF..." : "Download"}
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </Stack>
    </Box>
  );
};

export default TaskPDFDownload;
