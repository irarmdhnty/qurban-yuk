import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Category from "./Components/Category";
import Detail from "./Components/Detail";
import { UserContext } from "./Usercontext/Usercontext";
import AddCategory from "./pages/Admin/AddCategory";
import CategoryList from "./pages/Admin/CategoryList";
import UpdateCategory from "./pages/Admin/UpdateCategory";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useContext(UserContext);

  const PrivateRoute = () => {
    return state.isLogin ? <Outlet /> : <Navigate to="/" />;
  };

  const AdminRoute = () => {
    return state.user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<AdminRoute />}>
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/category-list" element={<CategoryList />} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category" element={<Category />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Route>
    </Routes>
  );
}

export default App;
