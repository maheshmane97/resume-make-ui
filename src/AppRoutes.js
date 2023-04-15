import { useRoutes } from "react-router-dom";
import Dashboard from "./component/dashboard/Dashboard";
import Feedback from "./component/feedback/Feedback";
import Login from "./component/Login";
import Resume from "./component/Resume/Resume";
import SignUp from "./component/SignUp";
import ResumePreview from "./component/Resume/ResumePreview";
import ResumeDetails from "./component/Resume/ResumeDetails";
import { isTokenValid } from "./utils/validToken";
import { useSelector } from "react-redux";
import Redirect from "./component/Redirect";
import UserDashboard from "./component/UsersForm/UserDashboard";
import AddUser from "./component/UsersForm/AddUser";
import FeedbackDashboard from "./component/feedback/FeedbackDashboard";

const AppRoutes = () => {
  const { isLogin } = useSelector((state) => state.account);

  const isUserAuthentic = () => isLogin && isTokenValid();

  const testRoutes = [
    { path: "*", element: <Redirect /> },
    { path: "/resumemakerui/login", element: <Login /> },
    {
      path: "/resumemakerui/dashboard",
      element: isUserAuthentic() ? <Dashboard /> : <Redirect />,
    },
    {
      path: "/resumemakerui/addfeedback",
      element: isUserAuthentic() ? <Feedback /> : <Redirect />,
    },
    { path: "/resumemakerui/signup", element: <SignUp /> },
    {
      path: "/resumemakerui/resume",
      element: isUserAuthentic() ? <Resume /> : <Redirect />,
    },
    {
      path: "/resumemakerui/resume/:id",
      element: isUserAuthentic() ? <ResumeDetails /> : <Redirect />,
    },
    {
      path: "/resumemakerui/preview",
      element: isUserAuthentic() ? <ResumePreview /> : <Redirect />,
    },
    {
      path: "/resumemakerui/users",
      element: isUserAuthentic() ? <UserDashboard /> : <Redirect />,
    },
    {
      path: "/resumemakerui/adduser",
      element: isUserAuthentic() ? <AddUser /> : <Redirect />,
    },
    {
      path: "/resumemakerui/feedback",
      element: isUserAuthentic() ? <FeedbackDashboard /> : <Redirect />,
    },
  ];
  const routes = useRoutes(testRoutes);
  return routes;
};

export default AppRoutes;
