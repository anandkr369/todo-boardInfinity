import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { useDrag, useDrop } from "react-dnd";
import { updateTask } from "../store/tasksSlice";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks || []); // Default to empty array if tasks is undefined
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const statuses = [
    {
      title:"TODO",
      status: "notstarted",
      textColor: "text-white",
      headerColor: "bg-[#8a30e5]",
    },
    {
      title:"IN PROGRESS",
      status: "inprogress",
      textColor: "text-black",
      headerColor: "bg-yellow-500",
    },
    {
      title:"COMPLETED",
      status: "completed",
      textColor: "text-white",
      headerColor: "bg-green-500",
    },
  ];

  return (
    <div className="w-screen  flex flex-col items-center justify-between gap-20">
      <div className="flex flex-col sm:flex-row  w-3/4 justify-evenly">
        {statuses.map(({ status, textColor, bgColor, headerColor,title }, index) => (
          <Section
            key={index}
            status={status}
            tasks={tasks}
            onTaskClick={handleTaskClick}
            textColor={textColor}
            title={title}
            headerColor={headerColor}
          />
        ))}
      </div>
      <Modal
        onClose={() => setSelectedTask(null)}
        isOpen={!!selectedTask}
        task={selectedTask}
        setTask={setSelectedTask}
      />
    </div>
  );
};

const Section = ({
  status,
  tasks,
  onTaskClick,
  textColor,
  title,
  headerColor,
}) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => {
      dispatch(updateTask({ id: item.id, status }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div
      ref={drop}
      className={`w-full  rounded-xl p-2 ${isOver ? "bg-opacity-75" : ""}`}
    >
      <div className="bg-white min-h-52 rounded-b-xl">
        <Header
          text={status}
          count={filteredTasks.length}
          textColor={textColor}
          headerColor={headerColor}
          title={title}
        />
        {filteredTasks.length > 0 &&
          filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onTaskClick={onTaskClick}
              
            />
          ))}
      </div>
    </div>
  );
};

const Header = ({ textColor, headerColor,title }) => {
  return (
    <div
      className={`${headerColor} flex-col justify-center md:flex items-center h-12 pl-4 rounded-t-xl uppercase text-sm `}
    >
      <div className={` rounded-xl pl-2 pr-2 text-xl font-semibold ${textColor}`}>
        {title}
      </div>
    </div>
  );
};

const Task = ({ task, onTaskClick, bgColor }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div>
      <div
        ref={drag}
        className={`relative p-3 m-4 shadow-md rounded-xl h-40 hover:bg-gray-200 ${
          isDragging ? "opacity-10" : "opacity-100"
        } cursor-grab `}
        onClick={() => onTaskClick(task)}
      >
        <div className="bg-rose-300 text-rose-600 w-fit px-3 py-1 rounded-md">
          high
        </div>
        <div className="p-2 font-semibold text-xl flex justify-between">
          <div>{task.name}</div>
          <div ><KeyboardArrowDownOutlinedIcon/></div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
