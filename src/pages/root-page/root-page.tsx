import { ScrollToTop } from "../../components/scroll";
import { AuthPage } from "../auth-page/auth-page";
import { Route, Routes, useNavigate } from "react-router-dom";
import { TablePage } from "../table-page/table-page";
import { useEffect } from "react";

export function RootPage() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("tokenData");

  useEffect(() => {
    if (token) {
      navigate("table");
    } else {
      navigate("");
    }
  }, [navigate, token]);
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<AuthPage />} />
        <Route path="table" element={<TablePage />} />
      </Routes>
    </>
  );
}
