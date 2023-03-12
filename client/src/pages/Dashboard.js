import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import DatasetCard from "../components/DatasetCard";

const Dashboard = () => {
  const { getUserData } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [datasets, setDatasets] = useState(null);

  useEffect(() => {
    let user_data = getUserData();
    if (!user_data || !user_data.logged_in) {
      window.location.assign("/login");
    }
    setUserData(user_data);

    const fetch_datasets = async (userData) => {
      const response = await fetch(`/api/datasets/mutli/${userData.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (response.ok) {
        setDatasets(data.data);
        console.log(data.data);
      }
    };
    fetch_datasets(user_data);
  }, []);

  return (
    <>
      {!datasets ? (
        <p>Loading...</p>
      ) : (
        <div className="relative flex flex-col justify-center h-full overflow-hidden">
          {
            datasets.map((dataset) => (
              <DatasetCard key={dataset._id} dataset={dataset}/>
            ))
          }
        </div>
      )}
    </>
  );
};

export default Dashboard;
