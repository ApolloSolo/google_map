import React, { useEffect, useState } from "react";
import AddressTable from "../components/AddressTable";
import Auth from "../utils/auth";

const Addresses = () => {
  const [addresses, setAddresses] = useState(null);
  const [datasetInfo, setDatasetInfo] = useState(null);

  useEffect(() => {
    const userLoggedIn = Auth.loggedIn();
    if (!userLoggedIn) {
      window.location.assign("/login");
    }

    const get_dataset_addresses = async (id) => {
      try {
        const response = await fetch(`/api/datasets/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setAddresses(data.data.addresses);
          setDatasetInfo({ _id: data.data._id, name: data.data.dataset_name });
          console.log(data.data);
        } else throw new Error(data.error);
      } catch (error) {
        console.log(error);
      }
    };

    const dataset_id = window.location.pathname.split("/")[2];

    get_dataset_addresses(dataset_id);
  }, []);

  return (
    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {!addresses ? (
        <p>Loading</p>
      ) : (
        <>
          <h1 className="text-center m-4 text-2xl font-bold dark:text-gray-200">
            Addresses From {datasetInfo.name} Dataset
          </h1>
          <div className="overflow-x-auto container flex md:justify-center mx-auto">
            <table className="divide-y divide-gray-300 ">
              <thead className="bg-gray-50 dark:bg-slate-600">
                <tr>
                  <th className="px-6 py-2 text-xs dark:text-gray-200">
                    Street Number
                  </th>
                  <th className="px-6 py-2 text-xs dark:text-gray-200">
                    Route
                  </th>
                  <th className="px-6 py-2 text-xs dark:text-gray-200">City</th>
                  <th className="px-6 py-2 text-xs dark:text-gray-200">
                    State
                  </th>
                  <th className="px-6 py-2 text-xs dark:text-gray-200">Edit</th>
                </tr>
              </thead>
              {addresses.map((address) => (
                <AddressTable
                  key={address._id}
                  address={address}
                  dataset_info={datasetInfo}
                />
              ))}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Addresses;
