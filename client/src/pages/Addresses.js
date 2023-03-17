import React, { useEffect, useState } from "react";
import AddressTable from "../components/AddressTable";
import Auth from "../utils/auth";
import { BiAnalyse } from "react-icons/bi";

const Addresses = () => {
  const [addresses, setAddresses] = useState(null);
  const [datasetInfo, setDatasetInfo] = useState(null);
  const [isGeoProcessed, setIsGeoProcessed] = useState(false);

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
          setIsGeoProcessed(data.data.geo_processed);
          console.log(data.data.geo_processed);
        } else throw new Error(data.error);
      } catch (error) {
        console.log(error);
      }
    };

    const dataset_id = window.location.pathname.split("/")[2];

    get_dataset_addresses(dataset_id);
  }, []);

  const geocode_table = async () => {
    const dataset_id = window.location.pathname.split("/")[2];
    try {
      const response = await fetch(`/api/geocode/${dataset_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setIsGeoProcessed(true);
        window.location.reload();
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {!addresses ? (
        <p>Loading</p>
      ) : (
        <>
          <div>
            <h1 className="text-center m-4 text-2xl font-bold dark:text-gray-200">
              Addresses From {datasetInfo.name} Dataset
            </h1>
            {isGeoProcessed ? (
              false
            ) : (
              <div className="flex flex-col items-end mb-2 w-fit float-right dark:text-gray-200 font-bold">
                <span>Geocode Data</span>
                <BiAnalyse
                  onClick={geocode_table}
                  size={24}
                  className="mx-auto cursor-pointer hover:scale-125 duration-300 hover:text-green-400"
                />
              </div>
            )}
          </div>

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
                  <th className="px-6 py-2 text-xs dark:text-gray-200">
                    Latitude
                  </th>
                  <th className="px-6 py-2 text-xs dark:text-gray-200">
                    Longitude
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
