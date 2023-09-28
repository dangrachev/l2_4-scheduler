import '../../assets/styles/form.css';
import React, {useEffect, useState} from "react";
import {formatDate, getFormattedDateNow} from "../utils/format-date";

function CreateTaskForm({setModelVisible, createTask, owner, users}) {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        id: String(Date.now()),
        author: owner,
        users: [],
        createdAt: getFormattedDateNow(),
        deadline: '',
        status: 'active'
    });
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        console.log(selectedOptions);

        setTaskData(prev => ({...prev, users: selectedOptions}));
    }, [selectedOptions]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const selectDeadline = (date) => {
        if (date) {
           setTaskData(prev => ({...prev, deadline: formatDate(date)}));
        }
    }

    const handleSelectChange = (e) => {
        const value = e.target.value;

        if (value === 'all') {
            setSelectedOptions(users.map(user => user.email));
        } else if (selectedOptions.includes(value)) {
            setSelectedOptions(prev => {
                return prev.filter((option) => option !== value);
            });
        } else {
            setSelectedOptions(prev => {
                return [...prev, value];
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(taskData);

        createTask(taskData);
        setModelVisible(false);
    };

    return (
        <div className='modal-wrapper'>
            <form onSubmit={(e) => handleSubmit(e)} id='create-task-form' className='modal-form'>
                <div className='form-header'>
                    <h2>Create task</h2>

                    <span onClick={() => setModelVisible(false)} className="btn-close-modal">⨉</span>
                </div>


                <div className="form-input">
                    <input onChange={(e) => handleInputChange(e)}
                           name='title'
                           id='title'
                           className='input'
                           placeholder='Task title'/>
                    <label htmlFor="title"></label>
                </div>

                <div className="form-input">
                    <textarea onChange={(e) => handleInputChange(e)}
                        name='description'
                        id='description'
                        className='textarea'
                        placeholder='Task description'/>
                    <label htmlFor="description"></label>
                </div>

                <div className="form-input">
                    <input onChange={(e) => selectDeadline(e.target.value)}
                        type='date'
                        name='date'
                        id='date'
                        className='input'
                        placeholder='Task deadline'/>
                    <label htmlFor="date"></label>
                </div>

                <div className="form-input form-select">
                    <div>
                        <label htmlFor="users">Assigned users: </label>
                        <span className='form-select-values'>{selectedOptions.join(', ')}</span>
                    </div>
                    <select className='select' name="users" id="users" multiple>
                        <option value='all' onClick={e => handleSelectChange(e)}>All</option>
                        {users?.map(user => <option key={user.uid}
                                                    value={user.email}
                                                    onClick={e => handleSelectChange(e)}
                        >{user.email}</option>)}
                    </select>
                </div>

                <button type='submit' className='form-btn modal-btn'>Create</button>
            </form>
        </div>
    );
}

export default CreateTaskForm;