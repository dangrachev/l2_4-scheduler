import "../../assets/styles/Sidebar.css";
import {useState} from "react";

function Sidebar({owner, tasks, setTasks, setModelVisible}) {
    const [activeTab, setActiveTab] = useState(null);

    const filterTabs = [
        {title: 'All', color: '#ffffff', extraClass: 'tab__all', filterByKey: 'all'},
        {title: 'Assigned to me', color: '#ff63b7',  extraClass: 'tab__assigned-to-user', filterByKey: 'assigned'},
        {title: 'Active', color: '#FF9900FF',  extraClass: 'tab__active', filterByKey: 'active'},
        {title: 'Done', color: '#00FFA2FF',  extraClass: 'tab__done', filterByKey: 'done'},
    ]

    const displayTasks = (tasks, key, index) => {
        setActiveTab(index);

        const filteredTasks = tasks.filter(task => {
            switch (key) {
                case 'all':
                    return tasks;
                case 'assigned':
                    // Фильтруем массив по задачам относящимся к пользователю
                    return task.author === owner || task.users?.includes(owner);
                case 'active':
                    return task.status === 'active';
                case 'done':
                    return task.status === 'done';
                default:
                    return task;
            }
        });

        setTasks(filteredTasks);
    }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2 className="sidebar-title">Issues</h2>

                <div>
                    <button onClick={() => setModelVisible(true)} className="btn-create-task">Create task</button>
                </div>
            </div>

            <div className="filters">
                <h3>Show task:</h3>


                {filterTabs.map((tab, i) =>
                    <div key={i}
                         className={['filter-tab', tab.extraClass].join(' ')}
                         style={activeTab === i ? { color: `${tab.color}`, transform: 'translateX(18px)'} : null}
                         onClick={() => displayTasks(tasks, tab.filterByKey, i)}>
                        {'- ' + tab.title}
                    </div>)}
            </div>

            {/*<div className="sidebar-content">
                {tasks.map(task => <div key={task.id} className="sidebar-task">{task.title}</div>)}
            </div>*/}
        </div>
    );
}

export default Sidebar;