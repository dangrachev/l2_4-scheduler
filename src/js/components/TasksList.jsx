import '../../assets/styles/Task-list.css';
import Task from "./Task";
import {useEffect} from "react";

function TasksList({tasks, editTask, removeTask}) {

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    return (
        <div className='task-list'>
            {tasks?.map(task => <Task key={task.id}
                                      taskData={task}
                                      editTask={editTask}
                                      removeTask={removeTask}/>)}
        </div>
    );
}

export default TasksList;