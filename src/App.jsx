import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import Historys from "./pages/Historys";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EventPage from "./pages/EventPage";
import BackToTopButton from "./components/rightSideBar/BackToTop";
import Navbar from "./components/Navbar";
import QuizHistory from "./pages/QuizHistory";

import MainLayout from "./pages/MainLayout";
import Banner from "./components/Home/Banner";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(67, 150, 233)",
    },
    secondary: {
      main: "rgb(237, 62, 50)",
    },
  },
});

function App() {
  // Thêm code debug để kiểm tra lỗi
  useEffect(() => {
    console.log("App mounted");
    console.log("Current URL:", window.location.href);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <MainLayout>
                  <Home />
                </MainLayout>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/history"
            element={
              <MainLayout>
                <Historys />
              </MainLayout>
            }
          />
          <Route
            path="/events"
            element={
              <MainLayout>
                <EventPage />
              </MainLayout>
            }
          />
          <Route
            path="/quiz-history"
            element={
              <MainLayout>
                <QuizHistory />
              </MainLayout>
            }
          />
        </Routes>
        <Footer />
      </Router>
      <BackToTopButton />
    </ThemeProvider>
  );
}

export default App;
