import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/tasksSlice";

import Task from "./task";
import Header from "./header";

const Section = ({
  status,
  tasks,
  onTaskClick,
  textColor,
  title,
  headerColor,
  borderColor,
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
      <div className="bg-white min-h-60 rounded-b-xl pb-4">
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
              headerColor={headerColor}
              borderColor={borderColor}
              
            />
          ))}
      </div>
    </div>
  );
};
export default Section;