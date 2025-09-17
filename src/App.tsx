// import { Routes, Route } from "react-router-dom";
// // import MainLayout from "./layouts/MainLayout";
// // import AuthLayout from "./layouts/AuthLayout";

// // Pages
// import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/Signup";
// import AuthLayout from "./layouts/AuthLayout";
// // import Signup from "./pages/Auth/Signup";
// // import Dashboard from "./pages/Dashboard/Dashboard";
// // import TransactionsList from "./pages/Transactions/TransactionsList";
// // import AddTransaction from "./pages/Transactions/AddTransaction";
// // import Goals from "./pages/Goals/Goals";
// // import Reports from "./pages/Reports/Reports";

// function App() {
//   return (
//     <Routes>
//       {/* Auth Routes */}
//       <Route element={<AuthLayout />}>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Route>

//        {/* Main Layout Routes */}
//        {/* <Route element={<MainLayout />}>
//          <Route path="/" element={<Dashboard />} />
//          <Route path="/transactions" element={<TransactionsList />} />
//          <Route path="/transactions/add" element={<AddTransaction />} />
//          <Route path="/goals" element={<Goals />} />
//          <Route path="/reports" element={<Reports />} />
//        </Route> */}
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* default & unknown -> /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
