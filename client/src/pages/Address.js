import React, { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";

const Address = () => {
  const [addressData, setAddressData] = useState(null);

  useState(() => {
    const _id = window.location.pathname.split("/")[2];
    console.log(_id);
    const get_address = async (id) => {
      const response = await fetch(`/api/address/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      const data = await response.json();

      if (response.ok) {
        console.log(data.data);
        setAddressData({
          street_number: data.data.street_number,
          route: data.data.route,
          city: data.data.city,
          state: data.data.state,
        });
      } else throw new Error(data.error);
    };
    get_address(_id);
  }, []);

  const update_address = async () => {
    const _id = window.location.pathname.split("/")[2];
    console.log(addressData);
    const response = await fetch(`/api/address/edit/${_id}`, {
      method: "PUT",
      body: JSON.stringify(addressData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      window.location.reload();
    } else throw new Error(data.error);
  };

  const delete_address = async () => {
    const _id = window.location.pathname.split("/")[2];
    const dataset_id = window.location.pathname.split("/")[3];
    console.log(addressData);
    const response = await fetch(`/api/address/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    if (response.ok) {
      window.location.assign(`/addresses/${dataset_id}`);
    } else throw new Error(data.message);
  };

  const onChange = (event) => {
    setAddressData({
      ...addressData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    update_address();
  };

  return (
    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {!addressData ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-center m-4 text-2xl font-bold dark:text-gray-200">
            Make Some Edits
          </h1>
          <div
            name="volumes"
            className="flex justify-center items-center w-full"
          >
            <form onSubmit={onSubmit}>
              <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm relative">
                <BiTrash
                  onClick={delete_address}
                  size={22}
                  className="absolute right-2 top-2 hover:scale-125 duration-300 hover:text-red-600"
                />
                <div className="space-y-4">
                  <h1 className="text-center text-2xl font-semibold text-gray-600 mb-8">
                    Edit Address Data
                  </h1>
                  <div>
                    <div>
                      <label
                        htmlFor="totalVol"
                        className="block mb-1 text-gray-600 font-semibold"
                      >
                        Street Number
                      </label>
                      <input
                        name="street_number"
                        type="input"
                        defaultValue={addressData.street_number}
                        onChange={onChange}
                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="waterVol"
                        className="block mb-1 text-gray-600 font-semibold"
                      >
                        Route
                      </label>
                      <input
                        name="route"
                        type="input"
                        defaultValue={addressData.route}
                        onChange={onChange}
                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="productVol"
                        className="block mb-1 text-gray-600 font-semibold"
                      >
                        City
                      </label>
                      <input
                        name="city"
                        type="input"
                        defaultValue={addressData.city}
                        onChange={onChange}
                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="productVol"
                        className="block mb-1 text-gray-600 font-semibold"
                      >
                        State
                      </label>
                      <input
                        name="state"
                        type="input"
                        defaultValue={addressData.state}
                        onChange={onChange}
                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                        required
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full bg-[#33996b] text-indigo-100 hover:bg-[#4f90b6] py-2 rounded-md text-lg tracking-wide hover:shadow-lg duration-75"
                >
                  Submit Changes
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Address;
