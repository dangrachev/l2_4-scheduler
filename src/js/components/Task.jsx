import '../../assets/styles/Task.css';
import React, {useState} from "react";
import TaskModal from "./TaskModal";

function Task({taskData, editTask, removeTask}) {
    const [showTask, setShowTask] = useState(false);

    return (
        <>
            <div className='task-wrapper' onClick={() => setShowTask(true)}>
                <div className="task-info">
                    <div className='task-status'>
                        <span className={['task-status__marker', taskData.status].join(' ')}></span>{taskData.status}
                    </div>

                    <div className='task-creation_date'>
                        <span className='task-info__title'>Created at:</span> {taskData.createdAt}
                    </div>
                    <div className='task-deadline'>
                        <span className='task-info__title'>Deadline:</span> {taskData.deadline}
                    </div>
                    <div className='task-author'>
                        <span className='task-info__title'>Author:</span> {taskData.author}
                    </div>
                </div>

                <div className="task-specification">
                    <h3 className='task-title'>{taskData.title}</h3>
                    <div className='task-description'>
                        <span>Description:</span>
                        <div>{taskData.description.length > 100 ? taskData.description.slice(0, 100) + '...' : taskData.description}</div>
                    </div>
                </div>
            </div>

            {showTask && <TaskModal taskData={taskData} setShowTask={setShowTask} editTask={editTask} removeTask={removeTask}/>}
        </>

    );
}

export default Task;