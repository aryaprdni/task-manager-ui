import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useTask } from "../context/task-context";
import { useSnackbar } from "../context/snackbar-context";

const TaskForm = () => {
  const { addTask } = useTask();
  const { showMessage } = useSnackbar();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await addTask({ title, description, completed: false });
      showMessage("Task created successfully!", "success");
      navigate("/");
    } catch {
      showMessage("Failed to create task", "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create Task
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Create Task
        </Button>
      </Box>
    </Container>
  );
};

export default TaskForm;
