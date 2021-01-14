import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteIdea, getIdeas, me } from "../../api/api";

function Home() {
  const history = useHistory();

  const [user, setUser] = useState(null);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    async function getMe() {
      const response = await me();
      const data = await response.json();

      if (response.status === 200 && data) {
        setUser(data);
      }
    }

    getMe();
  }, []);

  useEffect(() => {
    async function getAllIdeas() {
      const response = await getIdeas();
      const data = await response.json();

      if (response.status === 200 && data) {
        setIdeas([...data]);
      }
    }

    getAllIdeas();
  }, []);

  const onNavigateToAddIdea = (ideaId) => {
    let url = "/add-idea";

    if (ideaId) {
      console.log("ideaIdea present");
      url += `?ideaId=${ideaId}`;
    }
    history.push(url);
  };

  const onItemDelete = async (ideaId) => {
    if (ideaId) {
      const response = await deleteIdea(ideaId);
      const data = await response.json();
      const deleteIndex = ideas.findIndex((el) => el.id === ideaId);
      if (deleteIndex !== -1) {
        const oldIdeas = [...ideas];
        oldIdeas.splice(deleteIndex, 1);
        setIdeas(oldIdeas);
      }
      console.log(data);
      // update the ideas
    }
  };

  return (
    <div className="p-2 bg-gray-900 text-white h-screen overflow-auto">
      <div className="px-2">Welcome, {user && user.name}</div>

      <div className="mt-4 h-5/6 overflow-auto">
        {ideas.length > 0 ? (
          <div className="px-2">
            {ideas.map((idea, index) => {
              return (
                <div
                  className="p-3 shadow-md bg-gray-800 border-b-2 border-gray-900"
                  key={idea.id}
                  onClick={() => {
                    onNavigateToAddIdea(idea.id);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <p>{idea.title}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onItemDelete(idea.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-red-600"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <small>{idea.description}</small>
                  <br></br>
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onItemDelete(idea.id);
                    }}
                  >
                    Remove Item
                  </button> */}
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="absolute bottom-1 right-3 text-gray-200">
        <button
          className="bg-gray-200 text-gray-900 rounded-full"
          tabIndex="0"
          onClick={() => {
            onNavigateToAddIdea();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Home;
