import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { getAuthToken, getTable } from "../../api";
import { useNavigate } from "react-router-dom";

export function AuthPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ login: false, password: false });
  const navigate = useNavigate();

  const handleLogin = () => {
    const isLoginEmpty = login.trim() === "";
    const isPasswordEmpty = password.trim() === "";

    if (isLoginEmpty || isPasswordEmpty) {
      setErrors({
        login: isLoginEmpty,
        password: isPasswordEmpty,
      });
    } else {
      getAuthToken(login, password)
        .then(() => {
          getTable();
          navigate("/table");
        })
        .catch((error) => {
          console.error("Ошибка авторизации:", error);
        });
    }
  };

  return (
    <Container
      component="main"
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            minWidth: "700px",
            maxWidth: "700px",
            pb: 12,
            pl: 12,
            gap: 4,
            backgroundColor: blue[700],
            color: "white",
          }}
        >
          <Typography variant="h3">Добро пожаловать!</Typography>
          <Typography variant="h5">
            Для продолжения работы с приложением необходимо авторизоваться
          </Typography>
        </Box>
        <Box
          sx={{
            px: 20,
            pt: 4,
            pb: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <Box sx={{ mt: 1 }}>
            <FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="login"
                label="Логин"
                name="login"
                autoComplete="login"
                autoFocus
                sx={{ minWidth: "400px" }}
                onChange={(e) => {
                  setLogin(e.target.value);
                  setErrors((prev) => ({ ...prev, login: false }));
                }}
                error={errors.login}
                helperText={errors.login && "Поле логина не может быть пустым"}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: false }));
                }}
                error={errors.password}
                helperText={
                  errors.password && "Поле пароля не может быть пустым"
                }
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 4, maxWidth: "200px" }}
                onClick={handleLogin}
              >
                Войти
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
