import { useState } from "react";
import { Link } from "react-router-dom";
import { BiPencil, BiCheck } from "react-icons/bi";

export default function DatasetCard({ dataset }) {
  const [openStat, setOpenStat] = useState(true);
  const [openService, setOpenService] = useState(false);
  const [editName, setEditName] = useState(false);
  const [datasetName, setDatasetName] = useState({
    name: dataset.dataset_name
  });

  const update_dataset = async (name) => {
    try {
      const response = await fetch(`/api/datasets/rename/${dataset._id}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();

      if (response.ok) {
        setDatasetName({ name });
        console.log(data);
        window.location.reload(false);
      } else throw new Error(data.error);
    } catch (error) {
      console.log(error);
    }
  };

  const delete_dataset = async () => {
    try {
      const response = await fetch(`/api/datasets/${dataset._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data);
      } else throw new Error(data.error);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    setDatasetName({ ...datasetName, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    update_dataset(datasetName.name);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center items-center dark:text-white text-gray-900 p-2 relative">
        {editName ? (
          <input
            name="name"
            onChange={onChange}
            required
            defaultValue={datasetName.name}
            className="text-gray-900 text-center rounded-md"
          />
        ) : (
          <strong className="text-center">{dataset.dataset_name}</strong>
        )}
        {editName ? (
          <div className="flex items-center absolute right-2">
            <BiCheck
              onClick={() => {
                onSubmit();
                setEditName(!editName);
              }}
              size={24}
              className="hover:text-green-500 cursor-pointer hover:scale-125 duration-300"
            />
            <span
              onClick={() => {
                setEditName(!editName);
              }}
              className="text-[1rem] ml-4 font-semibold hover:text-red-500 cursor-pointer hover:scale-125 duration-300"
            >
              X
            </span>
          </div>
        ) : (
          <BiPencil
            onClick={() => {
              setEditName(!editName);
            }}
            size={20}
            className="hover:text-blue-500 cursor-pointer absolute right-2 hover:scale-125 duration-300"
          />
        )}
      </div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select tab
        </label>
        <select
          onChange={(event) => {
            console.log(event.target.value);
            if (!openStat && event.target.value === "stats") {
              setOpenStat(!openStat);
              setOpenService(!openService);
            } else if (!openService && event.target.value === "actions") {
              setOpenService(!openService);
              setOpenStat(!openStat);
            }
          }}
          id="tabs"
          className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="stats">Statistics</option>
          <option value="actions">Actions</option>
        </select>
      </div>
      <ul
        className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 sm:flex dark:divide-gray-600 dark:text-gray-400"
        id="fullWidthTab"
        data-tabs-toggle="#fullWidthTabContent"
        role="tablist"
      >
        <li className="w-full">
          <button
            onClick={() => {
              if (!openStat) {
                setOpenStat(!openStat);
                setOpenService(!openService);
              }
            }}
            id="stats"
            data-tabs-target="#stats"
            type="button"
            role="tab"
            aria-controls="stats"
            aria-selected="true"
            className={`${
              openStat ? "dark:bg-gray-600 bg-gray-200" : "dark:bg-gray-700"
            } inline-block w-full p-4 rounded-tl-lg bg-gray-100 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 border-r-2 dark:border-gray-800 border-gray-300`}
          >
            Statistics
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => {
              if (!openService) {
                setOpenService(!openService);
                setOpenStat(!openStat);
              }
            }}
            id="about-tab"
            data-tabs-target="#about"
            type="button"
            role="tab"
            aria-controls="about"
            aria-selected="false"
            className={`${
              openService ? "dark:bg-gray-600 bg-gray-200" : "dark:bg-gray-700"
            } inline-block w-full p-4 rounded-tr-lg bg-gray-100 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600`}
          >
            Actions
          </button>
        </li>
      </ul>
      <div
        id="fullWidthTabContent"
        className="border-t border-gray-200 dark:border-gray-600"
      >
        <div
          className={`${
            openStat ? "block" : "hidden"
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          id="stats"
          role="tabpanel"
          aria-labelledby="stats-tab"
        >
          <dl className="grid max-w-screen-xl grid-cols-2 gap-6 p-2 mx-auto text-gray-900 sm:grid-cols-2 xl:grid-cols-2 dark:text-white sm:p-2">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 sm:text-3xl text-xl sm:font-extrabold font-bold">
                {dataset.addresses.length}
              </dt>
              <dd className="font-light text-center text-gray-500 dark:text-gray-400">
                Entries
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 sm:text-3xl text-xl sm:font-extrabold font-bold">{dataset.kb} kb</dt>
              <dd className="font-light text-center text-gray-500 dark:text-gray-400">
                Upload File Size
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 sm:text-3xl text-xl sm:font-extrabold font-bold">
                {new Date(dataset.createdAt).toLocaleDateString()}
              </dt>
              <dd className="font-light text-center text-gray-500 dark:text-gray-400">
                Dataset Created
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 sm:text-3xl text-xl sm:font-extrabold font-bold">
                {new Date(dataset.updatedAt).toLocaleDateString()}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400 text-center">
              Dataset Last Modified
              </dd>
            </div>
          </dl>
        </div>
        <div
          // ********** ACTIONS **********
          className={`${
            openService ? "block" : "hidden"
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          id="actions"
          role="tabpanel"
          aria-labelledby="actions-tab"
        >
          <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-2 xl:grid-cols-2 dark:text-white sm:p-8">
            <div className="flex flex-col items-center justify-center">
              <Link to={`/addresses/${dataset._id}`} className="w-full px-4 py-2 mt-4 text-center tracking-wide text-white transition-colors duration-200 transform bg-[#2a9d8f] rounded-md hover:bg-[#2d5564] focus:outline-none focus:bg-[#264653]">
                View Dataset
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={delete_dataset}
                className="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-[#9d2a30] rounded-md hover:bg-[#bd4046] focus:outline-none focus:bg-[#8f1b21]"
              >
                Delete Dataset
              </button>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
