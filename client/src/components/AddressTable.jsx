import React from 'react'
import { Link } from 'react-router-dom'

const AddressTable = ({address, dataset_info}) => {
  return (
    <>
      <tbody className="bg-white dark:bg-slate-500 divide-y divide-gray-300">
        <tr className="whitespace-nowrap">
          <td className="px-6 py-4">
            <div className="text-sm text-gray-900 dark:text-gray-200">
              {address.street_number}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="text-sm text-gray-500 dark:text-gray-200">
              {address.route}
            </div>
          </td>
          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-200">
            {address.city}
          </td>
          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-200">
            {address.state}
          </td>
          <td className="px-6 py-4">
            <Link
              to={`/edit_address/${address._id}/${dataset_info._id}`}
              className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full hover:bg-blue-300 duration-200"
            >
              Edit
            </Link>
          </td>
        </tr>
      </tbody>
    </>
  )
}
//
export default AddressTable