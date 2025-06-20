import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Stack,
    Box,
} from "@mui/material";
import { useTask } from "../context/task-context";
import TaskPDFDownload from "./task-pdf-download";
import { useSnackbar } from "../context/snackbar-context";

const TaskList = () => {
    const { tasks, toggleCompleteById, deleteTaskById } = useTask();
    const { showMessage } = useSnackbar();

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Task List</Typography>

            <TaskPDFDownload tasks={tasks} />
            <Stack spacing={2}>
                {tasks.map((task) => (
                    <Card
                        key={task.id}
                        sx={{
                            backgroundColor: task.completed ? "green.50" : "white",
                            border: "1px solid #ccc",
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{
                                    textDecoration: task.completed ? "line-through" : "none",
                                }}
                            >
                                {task.title}
                            </Typography>
                            <Typography>{task.description}</Typography>
                            <Typography variant="body2">
                                Status: {task.completed ? "✅ Completed" : "❌ Pending"}
                            </Typography>
                            <Box mt={2} display="flex" gap={2}>
                                <Button
                                    variant="contained"
                                    onClick={() => toggleCompleteById(task.id)}
                                >
                                    Toggle
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                        deleteTaskById(task.id);
                                        showMessage("Task deleted successfully", "success");
                                    }}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default TaskList;
