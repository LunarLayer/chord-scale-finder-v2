// Navigate element might be needed later
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const Loader = lazy(() => import("./components/Loader/Loader"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
import "./animations/keyframes";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<AppLayout />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
