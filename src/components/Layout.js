import LinkTo from "../components/LinkTo.js";
import { useAuth } from "../authProvider";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { user, signout } = useAuth();
  const router = useRouter();
  const pathname = router.pathname;
  console.log("user in LAYOUT:", user);
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* <!-- Static sidebar for desktop --> */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                {/* <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg"
                  alt="Workflow"
                /> */}
                <p className="text-2xl font-bold">Progressly</p>
              </div>
              <nav className="mt-5 flex-1" aria-label="Sidebar">
                <div className="px-2 space-y-1">
                  {/* <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" --> */}
                  <LinkTo
                    to="/"
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      pathname === "/"
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {/* <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" --> */}
                    {/* <!-- Heroicon name: outline/home --> */}
                    <svg
                      className={`mr-3 h-6 w-6 ${
                        pathname === "/"
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Explore
                  </LinkTo>

                  <LinkTo
                    to="/my-profile"
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      pathname === "/my-profile"
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <>
                      <svg
                        className={`mr-3 h-6 w-6 ${
                          pathname === "/my-profile"
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      My Profile
                    </>
                  </LinkTo>
                </div>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              {user ? (
                <LinkTo
                  to="/my-profile"
                  className="flex-shrink-0 w-full group block"
                >
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        {user?.displayName}
                      </p>
                      <button
                        onClick={() => signout()}
                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </LinkTo>
              ) : (
                <LinkTo
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  to="/sign-in"
                >
                  Sign In
                </LinkTo>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        {/* <div className="lg:hidden">
          <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
            <div>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
            </div>
            <div>
              <button
                type="button"
                className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div> */}
        {children}
      </div>
    </div>
  );
}
