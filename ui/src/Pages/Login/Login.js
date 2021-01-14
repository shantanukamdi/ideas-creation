import React, { useState } from "react";
import { Formik } from "formik";
import { login } from "../../api/api";
import { useHistory } from "react-router-dom";

import "./Login.css";

function Login() {
  const history = useHistory();

  const [apiError, setApiError] = useState("");

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    const response = await login(email, password);
    const data = await response.json();

    if (response.status === 404) {
      setApiError(data?.message);
    } else if (response.status === 401) {
      setApiError(data?.message);
    } else if (response.status === 200) {
      localStorage.setItem("token", data?.token);
      history.push("/home");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-12 h-12 block m-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h2 className="mt-8 text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
        </div>

        <Formik
          initialValues={{
            email: "shantanukamdi@gmail.com",
            password: "$shantanu@",
          }}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="mt-8" onSubmit={handleSubmit}>
              <div class="rounded-md shadow-sm">
                <div>
                  <label for="email-address">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={values.email}
                    onChange={(e) => {
                      handleChange(e);
                      setApiError("");
                    }}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="mt-4">
                  <label for="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={values.password}
                    onChange={(e) => {
                      handleChange(e);
                      setApiError("");
                    }}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-700"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          )}
        </Formik>

        {apiError.length > 0 ? (
          <>
            {" "}
            <div className="mt-4 group relative text-center bg-red-200 p-1 rounded-sm">
              <p className="text-red-500 ">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                {apiError}
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Login;
