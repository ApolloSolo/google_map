import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";

const Dashboard = () => {
  const { getUserData } = useContext(UserContext);

  useEffect(() => {
    let user_data = getUserData();
    if (!user_data || !user_data.logged_in) {
      window.location.assign("/login");
    }
  });

  return <div>Dashboard</div>;
};

export default Dashboard;
