import { useState } from "react";
import UseCSV from "@usecsv/react";

const UploadCSV = () => {
  const [csvFile, setCsvFile] = useState("");

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", "File_Name");
    formData.append("file", csvFile);

    await fetch("/api/file_upload/csv", {
      method: "POST",
      headers: {
        ContentType: "multipart/form-data"
      },
      body: formData
    });
  };

  /*

  const url = 'http://localhost:5000/EXPRESSENDPOINT';
    axios({
        method: 'POST',
        url: url,
        headers: {
            ContentType: 'multipart/form-data'
        },
        body: formData
    })

  */

  return (
    <>
      <div className="relative flex flex-col justify-center h-[calc(100vh-66px)] overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl dark:bg-gray-800">
          <h1 className="text-3xl font-semibold text-center underline dark:text-[#fdf8ad]">
            Upload CSV File
          </h1>
          <form className="mt-6">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload file
            </label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                setCsvFile(event.target.files[0]);
              }}
            />
            <button
              onClick={uploadFile}
              className="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Upload
            </button>
          </form>
        </div>
      </div>

      <div className="relative flex flex-col justify-center h-[calc(100vh-66px)] overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl dark:bg-gray-800">
          <h1 className="text-3xl font-semibold text-center underline dark:text-[#fdf8ad]">
            Upload CSV File
          </h1>
          <UseCSV
            importerKey="INSERT YOUR IMPORTER KEY HERE"
            user={{ userId: "yourUserId" }}
          >
            Import Data
          </UseCSV>
        </div>
      </div>
    </>
  );
};

export default UploadCSV;
