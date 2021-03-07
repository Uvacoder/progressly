import React from "react";
import { format } from "date-fns";

export default function Timeline({ resources }) {
  console.log("rendering timeline", resources);
  return (
    <div>
      {resources && (
        <div>
          <h3 className="font-bold text-2xl mb-4">Timeline</h3>
          <div className="max-w-md">
            <div className="flow-root">
              <ul className="-mb-8">
                {/* The array is sorted by date, but we want the newest  on top. Resources are spread to avoid mutating the original array */}
                {Object.entries(resources)
                  .reverse()
                  .map(([id, resource]) => (
                    <li key={id}>
                      <div className="relative pb-8">
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                              <svg
                                className="h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Finished{" "}
                                <a
                                  rel="noreferrer noopener"
                                  target="_blank"
                                  href={resource.url}
                                  className="font-medium text-gray-900"
                                >
                                  {resource.name}
                                </a>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {/* <time dateTime="2020-09-20">{resource.date}</time> */}
                              <div>{format(resource.date, "MM/dd/yyyy")}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
