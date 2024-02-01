// Navigate element might be needed later
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const Loader = lazy(() => import("./Components/Loader/Loader"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Login = lazy(() => import("./Pages/Login"));
import "./animations/keyframes";

function App() {
  return (
    <BrowserRouter basename="/chord-scale-finder-v2">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<AppLayout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
