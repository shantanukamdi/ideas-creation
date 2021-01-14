import React, { useState } from "react";
import { Formik } from "formik";
import { register } from "../../api/api";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const [apiError, setApiError] = useState("");

  const handleFormSubmit = async (values, { isSubmitting }) => {
    const cloneValues = { ...values };
    delete cloneValues["cpassword"];

    const response = await register(cloneValues);
    const payload = await response.json();

    isSubmitting = true;

    if (response.status === 200) {
      console.log("user registered successfully!");
      history.goBack();
    } else if (response.status === 409) {
      console.log(payload);
      setApiError(payload.message);
    } else {
      setApiError(payload.message);
    }
  };
  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Register</h2>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
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
            <form className="m-0" onSubmit={handleSubmit}>
              <div class="rounded-md shadow-sm">
                <div>
                  <label for="email-address">Email address*</label>
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
                  <label for="name">First Name*</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={values.name}
                    onChange={(e) => {
                      handleChange(e);
                      setApiError("");
                    }}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="mt-4">
                  <label for="password">Password*</label>
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
                  disabled={isSubmitting}
                >
                  Register
                  {isSubmitting ? (
                    <>
                      <span className="pl-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 w-5 animate-spin"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </button>
              </div>
            </form>
          )}
        </Formik>

        {apiError.length > 0 ? (
          <>
            {" "}
            <div className="mt-1 group relative text-center bg-red-200 p-1 rounded-sm">
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

export default Register;
