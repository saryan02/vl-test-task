import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";



const Read: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { task } = location.state ? location.state : { task: null };
    if(!task){
        navigate("/")
        return null
    }

    const handleClick = () => {
        navigate(`/update/${task.id}`, { state: { task } });
    };

    const deleteTask = () => {
        axios
            .delete(`https://65f926cddf15145246108cd3.mockapi.io/tasks/${task.id}`)
            .then((response) => {
                console.log(response);
                navigate("/");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="read-block">
            <div className="btns">
                <div className="btns__route">
                    <Link to="/">
                        <button className="btn-back">Назад</button>
                    </Link>
                    <button className="btn-edit" onClick={handleClick}>
                        Редактировать
                    </button>
                </div>

                <div className="btn-delete">
                    <button onClick={deleteTask}>Удалить</button>
                </div>
            </div>
            <div className="task">
                <div className="task__part">
                    <span>название задачи</span>
                    <span>{task.title}</span>
                </div>
                <div className="task__part">
                    <span>дата создания</span>
                    <span>{task.date}</span>
                </div>
                <div className="task__part">
                    <span>приоритет</span>
                    <span>{task.priority}</span>
                </div>
                <div className="task__part">
                    <span>отметки</span>
                    <span>{task.mark.join(", ")}</span>
                </div>
                <div className="task__part">
                    <span>описание</span>
                    <span>{task.description}</span>
                </div>
            </div>
        </div>
    );
};

export default Read;
