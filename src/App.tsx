import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import CreateTask from "./pages/create-task";
import Home from "./pages/home";
import { TaskProvider } from "./context/task-context";

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/create">
              Create Task
            </Button>
          </Toolbar>
        </AppBar>
        <Box py={4}>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateTask />} />
            </Routes>
          </Container>
        </Box>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
