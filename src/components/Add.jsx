import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTask } from "../store/tasksSlice";
import { AiOutlineClose } from "react-icons/ai";


const TaskInput = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [display, setDisplay] = useState(false);

  const [task, setTask] = useState({
    name: "",
    status: "notstarted",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3) {
      toast.error("Task name should be at least 3 characters long", {
        autoClose: 2000,
      });
      return;
    }
    const newTask = { ...task, id: uuidv4() };
    dispatch(addTask(newTask));
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));

    setTask({ name: "", status: "notstarted", description: "" });
    setDisplay(false);
    toast.success("Task added successfully", { autoClose: 2000 });
  };

  const handlePlusButton = () => {
    setDisplay(true);
  };

  const handlePopClose = (e) => {
    if (e.target === e.currentTarget) {
      setDisplay(false);
    }
  };

  return (
    <>
      {display ? (
        <div
          className="fixed top-0 left-0 z-40 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-80"
          onClick={handlePopClose}
        >
          <div className="bg-purple-200 rounded-md p-4 w-2/3 h-2/3 flex items-center justify-center relative">
            <div className="absolute top-10 right-10">
              <AiOutlineClose
                onClick={() => setDisplay(false)}
                className="text-5xl bg-purple rounded-md p-2 text-red hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 cursor-pointer"
              />
            </div>
            <div className="w-1/2">
              <form
                className="flex flex-col"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col my-2">
                  <label
                    className="text-sm max-sm:text-xs text-black"
                    htmlFor="taskName"
                  >
                    Task Name:
                  </label>
                  <input
                    className="h-10 w-full bg-gray-100 p-3 rounded-md mb-1 my-1 focus:outline-0 hover:bg-gray-200"
                    type="text"
                    placeholder="Task Title"
                    name="name"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col my-2">
                  <div className="flex flex-row justify-between">
                    <label
                      className="text-sm max-sm:text-xs text-black"
                      htmlFor="taskStatus"
                    >
                      Task Status:
                    </label>
                    <label className="text-sm max-sm:text-xs text-purple-200">
                      NotStarted / InProgress / Completed
                    </label>
                  </div>
                  <input
                    className="bg-gray-100 p-2 rounded-md mb-2 my-1 focus:outline-0 hover:bg-gray-200"
                    type="text"
                    placeholder="Task Status"
                    name="status"
                    value={task.status}
                    onChange={(e) =>
                      setTask({ ...task, status: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col my-2">
                  <label
                    className="text-sm max-sm:text-xs text-black"
                    htmlFor="taskDescription"
                  >
                    Task Description:
                  </label>
                  <textarea
                    className="bg-gray-100 p-2 rounded-md mb-2 my-1 h-32 w-full resize-none focus:outline-0 hover:bg-gray-200"
                    placeholder="Task Description"
                    name="description"
                    value={task.description}
                    onChange={(e) =>
                      setTask({ ...task, description: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-white text-purple-800 hover:border border-green-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-1/6 flex  items-center justify-around ">
          <div className="w-3/4 h-2/3 flex items-center justify-between bg-white p-4 rounded-xl ">
            <div className="font-semibold text-2xl">
              Desktop & Mobile Application
            </div>
            <div
              onClick={handlePlusButton}
              className="bg-[#8a31e5] hover:bg-purple-800 text-lg py-2 px-5 rounded-md text-white cursor-pointer"
            >
              Create Task
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskInput;
