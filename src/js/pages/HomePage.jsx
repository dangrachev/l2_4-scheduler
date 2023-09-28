import "../../assets/styles/Home-page.css";
import {useContext, useEffect, useState} from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TasksList from "../components/TasksList";
import {AppContext} from "../components/AppContextProvider";
import {addTask, setTask, deleteTask, getTasks, getUsers} from "../api/firebase-api";
import CreateTaskForm from "../components/CreateTaskForm";


/*if ("serviceWorker" in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./api/service-worker.js', { insecure: true }).then((registration) => {
            console.log('Service Worker registered');

            const tasks = localStorage.getItem('tasks');
            registration.active.postMessage({ type: 'tasks', data: tasks });
        }).catch((error) => {
            console.error('Failed to register Service Worker', error);
        });
    });
}*/

function HomePage({user}) {
    const {state, dispatch} = useContext(AppContext);
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [modelVisible, setModelVisible] = useState(false);


    useEffect(() => {
        dispatch({type: 'SET_LOADING', payload: true});

        // Получаем задачи
        getTasks(user).then((tasks) => {
            dispatch({type: 'SET_TASKS', payload: tasks});

            setTasks(tasks);
        }).then(() => {
                // Получаем пользователей
                getUsers(user).then(users => dispatch({type: 'SET_USERS', payload: users}));

                dispatch({type: 'SET_LOADING', payload: false});
            });

    }, []);


    const createTask = (data) => {
        console.log(data);

        addTask(data).then(task => {
            dispatch({type: 'ADD_TASK', payload: task});
            setTasks(prev => ([...prev, task]));
        });
    }

    const editTask = (data) => {
        console.log(data);

        setTask(data).then(task => {
            dispatch({type: 'EDIT_TASK', payload: task});
            setTasks(prev => prev.map(item => {
                if (item.id === task.id) {
                    return task;
                }
                return item;
            }));
        });
    }

    const removeTask = (task) => {
        if (task.author === user) {
            deleteTask(task.id).then(id => {
                dispatch({type: 'DELETE_TASK', payload: id});
                setTasks(prev => prev.filter(item => item.id !== id));
            });
        } else {
            alert("A task can only be deleted by it's author");
        }
    }


    const sortTasks = (tasks, key, index) => {
        setActiveTab(index);

        const sortedTasks = [...tasks].sort((a, b) => {
            switch (key) {
                case 'deadline':
                    if (a[`${key}`] > b[`${key}`]) {
                        return -1;
                    } else if (a[`${key}`] < b[`${key}`]) {
                        return 1;
                    }
                    break;
                case 'createdAt':
                    if (a[`${key}`] > b[`${key}`]) {
                        return 1;
                    } else if (a[`${key}`] < b[`${key}`]) {
                        return -1;
                    }
                    break;
                default:
                    return 0;
            }
        });

        setTasks(sortedTasks);
    }


    const sortTabs = [
        {title: 'by creation date', color: '#5a57ff', extraClass: 'tab__creation', sortByKey: 'createdAt'},
        {title: 'by deadline', color: 'crimson',  extraClass: 'tab__deadline', sortByKey: 'deadline'},
    ]

    return (
        <div className="home-page">
            <Header />

            <div className="home-page__section-wrapper">
                <Sidebar tasks={state.tasks}
                         setTasks={setTasks}
                         setModelVisible={setModelVisible}
                         owner={user}/>

                <div className="home-page__content">
                    <div className="sorting">
                        <span>Sort by:</span>

                        {sortTabs.map((tab, i) =>
                            <div key={i}
                                 className={['tab', tab.extraClass].join(' ')}
                                 style={activeTab === i ? {color: `${tab.color}`} : null}
                                 onClick={() => sortTasks(tasks, tab.sortByKey, i)}>
                                {tab.title}
                            </div>)}
                    </div>

                    {state.isLoading
                        ? <div className='loading-indicator'></div>
                        : <TasksList tasks={tasks} editTask={editTask} removeTask={removeTask}/>}
                </div>

                {modelVisible && <CreateTaskForm setModelVisible={setModelVisible} createTask={createTask} owner={user} users={state.users}/>}
            </div>
        </div>
    );
}

export default HomePage;