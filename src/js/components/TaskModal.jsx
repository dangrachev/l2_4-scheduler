import React, {useState} from "react";
import {formatDate} from "../utils/format-date";

function TaskModal({taskData, setShowTask, editTask, removeTask}) {
    console.log('taskData', taskData);

    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState({
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        author: taskData.author,
        users: taskData.users,
        createdAt: taskData.createdAt,
        deadline: taskData.deadline,
        status: taskData.status
    });

    const handleInputChange = (target) => {
        const { name, value } = target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const setTaskStatus = (e) => {
        setData((prev) => ({
            ...prev,
            status: e.target.value
        }))
    }

    const selectDeadline = (date) => {
        if (date) {
            setData(prev => ({...prev, deadline: formatDate(date)}));
        }
    }

    const setAssignedUsers = (e) => {
        console.log(e.target.value);
    }

    const removingConfirm = () => {
        // eslint-disable-next-line
        if (confirm('Delete task?')) {
            console.log('Deleting:', taskData.id);
            removeTask(taskData);

            setShowTask(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        editTask(data);

        setEditMode(false);
        setShowTask(false);
    };

    return (
        <div className='modal-wrapper'>
            <div className='modal-form task-modal'>
                <span onClick={() => setShowTask(false)} className="close-modal">⨉</span>

                {!editMode
                    ? <div className="task-content">
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
                            <div className='task-assigned-users'>
                                <span className='task-info__title'>Assigned users:</span> {taskData.users.join(', ')}
                            </div>
                        </div>

                        <div className="task-specification">
                            <h3 className='task-title'>{taskData.title}</h3>
                            <div className='task-description'>
                                <span>Description:</span>
                                <div className='task-description-text'>{taskData.description}</div>
                            </div>
                        </div>

                        <div className="task-actions">
                            <button className="task-edit-btn" onClick={() => setEditMode(true)}>Edit task</button>
                            <button className="task-delete-btn" onClick={removingConfirm}>Delete task</button>
                        </div>
                    </div>

                    : <form onSubmit={(e) => handleSubmit(e)} className="task-edit-form">
                        <span className="task-edit-go-back" onClick={() => setEditMode(false)}>Back</span>

                        <div className="task-edit-info">
                            <div className='form-input task-edit-status'>
                                <label htmlFor="select-task-status">Task status: </label>
                                <select onClick={e => setTaskStatus(e)}
                                        defaultValue={data.status}
                                        name="select-task-status"
                                        id="select-task-status"
                                        className="select">
                                    <option className="option" value="active">active</option>
                                    <option value="done">done</option>
                                </select>
                            </div>

                            <div className='form-input task-edit-deadline'>
                                <input onChange={(e) => selectDeadline(e.target.value)}
                                       value={(data.deadline).split('.').reverse().join('-')}

                                       type='date'
                                       name='date'
                                       id='date'
                                       className='input'
                                       placeholder='Task deadline'/>
                                <label htmlFor="date"></label>
                            </div>
                        </div>

                        <div className="task-edit-specification">
                            <div className="form-input">
                                <input onChange={(e) => handleInputChange(e.target)}
                                       value={data.title}
                                       name='title'
                                       id='title'
                                       className='input'
                                       placeholder='Task title'/>
                            </div>

                            <div className="form-input">
                                <textarea onChange={(e) => handleInputChange(e.target)}
                                          value={data.description}
                                          name='description'
                                          id='description'
                                          className='textarea'
                                          placeholder='Task description'/>
                            </div>
                        </div>

                        <button type='submit' className="modal-btn task-edit-done">Accept</button>
                    </form>
                }
            </div>
        </div>
    );
}

export default TaskModal;