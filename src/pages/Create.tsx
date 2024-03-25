import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";



interface TaskValues {
    title: string;
    priority: string;
    mark: string;
    description: string;
}

const Update: React.FC = () => {
    const [values, setValues] = useState<TaskValues>({
        title: '',
        priority: 'low',
        mark: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const date = new Date();
        const mark = values.mark.split(/\s+/).filter(word => word.trim() !== '');
        axios.post('https://65f926cddf15145246108cd3.mockapi.io/tasks', { ...values, date: date, mark: mark })
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
            <form onSubmit={handleSubmit}>
                <div className='task'>
                    <div className='task__part'>
                        <span>Название задачи</span>
                        <input type="text" onChange={e => setValues({ ...values, title: e.target.value })} />
                    </div>
                    <div className='task__part'>
                        <span>приоритет</span>
                        <select onChange={e => setValues({ ...values, priority: e.target.value })}>
                            <option value="low">low</option>
                            <option value="normal">normal</option>
                            <option value="high">high</option>
                        </select>
                    </div>
                    <div className='task__part'>
                        <span>отметки</span>
                        <textarea onChange={e => setValues({ ...values, mark: e.target.value })}></textarea>
                    </div>
                    <div className='task__part'>
                        <span>описание</span>
                        <textarea onChange={e => setValues({ ...values, description: e.target.value })}></textarea>
                    </div>
                    <button type="submit">Создать</button>
                </div>
            </form>
        </div>
    );
}

export default Update;
