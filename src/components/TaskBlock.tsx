import React from "react";
import {useNavigate} from "react-router-dom";

interface Task {
    id: number;
    title: string;
    date: string;
    priority: string;
    mark: string[];
    description: string;
}
interface Props{
    task:Task
    onClick: (task: Task) => void
}

const TaskBlock:React.FC<Props> = ({task, onClick}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        onClick(task);
        navigate(`/read/${task.id}`, { state: { task } });
    };

    return (

        <div className='task-block' onClick={handleClick}>

             <span className='task-block__title'>{task.title}</span>

            <div className='task-block__content'>
                <span>создано: {new Date(task.date).toLocaleDateString()}</span>
                <span>Приоритет: {task.priority}</span>
                <span>Отметки: {task.mark.join(', ')}</span>
            </div>


        </div>
    )
}

export default TaskBlock