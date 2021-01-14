import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { createIdea, getIdea, updateIdea } from "../../api/api";

function AddIdea() {
  const query = new URLSearchParams(useLocation().search);
  const ideaId = query.get("ideaId");

  const history = useHistory();

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    async function getIdeaById(id) {
      const response = await getIdea(id);
      const data = await response.json();
      setInitialValues({
        title: data.title,
        description: data.description,
      });
    }

    getIdeaById(ideaId);
  }, [ideaId]);

  const handleFormSubmitCreate = async (values, { isSubmitting }) => {
    if (values) {
      const response = await createIdea(values);
      const payload = await response.json();

      if (response.status === 200) {
        console.log("idea created successfully!", payload);
        history.goBack();
      } else {
        // show some error;
      }
    }
  };

  const handleFormSubmitUpdate = async (values, { isSubmitting }) => {
    if (values) {
      // Adding id in the request body
      values.id = ideaId;
      const response = await updateIdea(values);
      const payload = await response.json();

      if (response.status === 200) {
        console.log("idea updated successfully!", payload);
        history.goBack();
      } else {
        // show some error;
      }
    }
  };

  return (
    <div className="p-2 bg-gray-900 text-white h-screen">
      <header className="flex items-center">
        <button className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 "
            onClick={() => history.goBack()}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        {ideaId ? (
          <p className="pl-2 text-xl">Update Idea</p>
        ) : (
          <p className="pl-2 text-xl">Add New Idea</p>
        )}
      </header>

      {/* {JSON.stringify(initialValues)} */}

      <div className="mt-8">
        <Formik
          initialValues={initialValues}
          onSubmit={ideaId ? handleFormSubmitUpdate : handleFormSubmitCreate}
          enableReinitialize={true}
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
                  <label for="title">Title*</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={values.title}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="mt-4">
                  <label for="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={values.description}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm capitalize font-medium rounded-md bg-gray-200 text-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-700"
                  disabled={isSubmitting}
                >
                  {ideaId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddIdea;
