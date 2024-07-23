import { ScrollToTop } from "../../components/scroll";
import { AuthPage } from "../auth-page/auth-page";
import { Route, Routes } from "react-router-dom";

export function RootPage() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </>
  );
}
