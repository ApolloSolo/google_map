import { useState } from "react";

export default function DatasetCard() {
  const [openStat, setOpenStat] = useState(true);
  const [openService, setOpenService] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="sm:hidden">
        <label for="tabs" className="sr-only">
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
          className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="stats">Statistics</option>
          <option value="actions">Actions</option>
        </select>
      </div>
      <ul
        className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400"
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
            } inline-block w-full p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600`}
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
          <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Developers
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">100M+</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Public repositories
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">1000s</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Open source projects
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">1B+</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Contributors
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">90+</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Top Forbes companies
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">4M+</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Organizations
              </dd>
            </div>
          </dl>
        </div>
        <div
          className={`${
            openService ? "block" : "hidden"
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            We invest in the world’s potential
          </h2>

          <ul
            role="list"
            className="space-y-4 text-gray-500 dark:text-gray-400"
          >
            <li className="flex space-x-2">
              <svg
                className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="font-light leading-tight">
                Dynamic reports and dashboards
              </span>
            </li>
            <li className="flex space-x-2">
              <svg
                className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="font-light leading-tight">
                Templates for everyone
              </span>
            </li>
            <li className="flex space-x-2">
              <svg
                className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="font-light leading-tight">
                Development workflow
              </span>
            </li>
            <li className="flex space-x-2">
              <svg
                className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="font-light leading-tight">
                Limitless business automation
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
