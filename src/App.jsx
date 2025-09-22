// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import PersonLayout from "./components/PersonLayout";

import HomePage from "./pages/HomePage";
import CohortListPage from "./pages/CohortListPage";
import PersonSearchPage from "./pages/PersonSearchPage";
import PersonDetailPage from "./pages/PersonDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route index element={<HomePage />} />
        <Route path="cohort" element={<CohortListPage />} />

        <Route path="person" element={<PersonLayout />}>
          <Route index element={<PersonSearchPage />} />

          {/* 2. 주석 해제하여 상세 페이지 경로 활성화 */}
          <Route path=":personId" element={<PersonDetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
