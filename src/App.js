import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Roadmap from "./pages/Roadmap";
import Learn from "./pages/Learn";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import Opportunities from "./pages/Opportunities";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";
import Progress from "./pages/Progress";

import Subscribe from "./pages/Subscribe";
import Certificate from "./pages/Certificate";
import AdminDashboard from "./pages/AdminDashboard";

import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="app-shell">
        <Navbar />

        <main className="app-main">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />

            <Route
              path="/roadmap/:skillId"
              element={<Roadmap />}
            />

            <Route
              path="/learn/:skillId/:stepId"
              element={<Learn />}
            />

            <Route path="/projects" element={<Projects />} />

            <Route
              path="/projects/:projectId"
              element={<ProjectDetails />}
            />

            <Route
              path="/opportunities"
              element={<Opportunities />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/subscribe" element={<Subscribe />} />

            <Route
              path="/portfolio/:userId"
              element={<Portfolio />}
            />

            {/* Protected user routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />

              <Route
                path="/portfolio"
                element={<Portfolio />}
              />

              <Route
                path="/settings"
                element={<Settings />}
              />

              <Route
                path="/change-password"
                element={<ChangePassword />}
              />

              <Route
                path="/progress"
                element={<Progress />}
              />

              <Route
                path="/certificate/:skillId"
                element={<Certificate />}
              />

              <Route
                path="/projects/:projectId/build"
                element={<ProjectWorkspace />}
              />
            </Route>

            {/* Admin-only routes */}
            <Route element={<AdminRoute />}>
              <Route
                path="/admin"
                element={<AdminDashboard />}
              />
            </Route>

            {/* 404 */}
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;