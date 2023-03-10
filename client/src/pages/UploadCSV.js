import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

const UploadCSV = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { login, getUserData } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let user_data = getUserData();
    setUserData(user_data);
  }, []);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    console.log(userData.id);

    fetch(`http://localhost:5000/api/file_upload/csv/${userData.id}`, {
      method: "POST",
      body: formData,
      headers: {
        ContentType: "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  /*

  const url = 'http://localhost:5000/api/file_upload/csv';
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
    <div className="relative flex flex-col justify-center h-[calc(100vh-66px)] overflow-hidden">
      <div className="w-full p-6 m-auto bg-[#eae2b7] rounded-md shadow-lg lg:max-w-xl dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center underline dark:text-white">
          Upload CSV File
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file"
          >
            Upload file
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-[#e4e2d8] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file"
            name="file"
            type="file"
            onChange={handleFileInputChange}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-[#2a9d8f] rounded-md hover:bg-[#2d5564] focus:outline-none focus:bg-[#264653]"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadCSV;
