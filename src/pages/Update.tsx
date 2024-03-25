import React, {useState, ChangeEvent} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

interface UpdateProps {
    id: string;
    title: string;
    date: string;
    priority: string;
    mark: string[];
    description: string;

}

const Update: React.FC<UpdateProps> = () => {


    const location = useLocation()
    const {task} = location.state as { task: UpdateProps }
    const [updatedTask, setUpdatedTask] = useState<UpdateProps>(task)
    const navigate = useNavigate()
    const handleTaskNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdatedTask({...updatedTask, title: event.target.value})
    };

    const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setUpdatedTask({...updatedTask, priority: event.target.value})
    };
    const handleMarkChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newMark = event.target.value.split('\n');
        setUpdatedTask({ ...updatedTask, mark: newMark });
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUpdatedTask({...updatedTask, description: event.target.value});
    };

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const date = new Date();
        console.log(updatedTask.mark)
        axios.put(`https://65f926cddf15145246108cd3.mockapi.io/tasks/${updatedTask.id}`, {...updatedTask, date: date})
            .then(response => {
                console.log(response);
                navigate("/");
            })
            .catch(error => console.log(error));

    };
    return (
        <div className='update-block'>
            <div className='btns-back'>
                <Link to="/">
                    <button>Назад</button>
                </Link>
            </div>
            <form onSubmit={handleUpdate}>
                <div className='task'>
                    <div className='task__part'>
                        <span>Название задачи</span>
                        <input value={updatedTask.title} onChange={handleTaskNameChange}/>
                    </div>
                    <div className='task__part'>
                        <span>приоритет</span>
                        <select value={updatedTask.priority} onChange={handlePriorityChange}>
                            <option value="low">low</option>
                            <option value="normal">normal</option>
                            <option value="high">high</option>
                        </select>
                    </div>
                    <div className='task__part'>
                        <textarea value={updatedTask.mark.join("\n")}  onChange={handleMarkChange}></textarea>
                    </div>
                    <div className='task__part'>
                        <span>описание</span>
                        <textarea value={updatedTask.description} onChange={handleDescriptionChange}></textarea>
                    </div>
                    <button type="submit">Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export default Update
