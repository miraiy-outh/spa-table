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
      navigate("/spa-table/table");
    } else {
      navigate("/spa-table");
    }
  }, [navigate, token]);
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/spa-table" element={<AuthPage />} />
        <Route path="/spa-table/table" element={<TablePage />} />
      </Routes>
    </>
  );
}
