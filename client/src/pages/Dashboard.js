import { useEffect, useState } from "react";
import DatasetCard from "../components/DatasetCard";
import Auth from "../utils/auth";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [datasets, setDatasets] = useState(null);
  const [dataRetrievalError, setDataRetrievalError] = useState(null);

  useEffect(() => {
    const userLoggedIn = Auth.loggedIn();
    if (!userLoggedIn) {
      window.location.assign("/login");
    }
    const userToken = Auth.getProfile();

    setUserData({ username: userToken.data.username, _id: userToken.data._id });
  }, []);

  useEffect(() => {
    const fetch_datasets = async (user) => {
      try {
        const response = await fetch(`/api/datasets/mutli/${user._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setDatasets(data.data);
          setLoading(false)
        } else throw new Error(data.message);
      } catch (error) {
        setLoading(false)
        console.log(error);
        setDataRetrievalError(error.message);
      }
    };
    if (userData) fetch_datasets(userData);
    console.log(datasets);
  }, [userData]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative flex flex-col justify-center h-full overflow-hidden">
          {dataRetrievalError ? (<p className="text-center text-4xl">{dataRetrievalError}</p>) : (
            <>
            {datasets.map((dataset) => (
              <DatasetCard key={dataset._id} dataset={dataset} />
            ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
