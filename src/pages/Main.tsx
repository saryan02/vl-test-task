import React, {useEffect, useState} from 'react';
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import TaskBlock from "../components/TaskBlock";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

interface Task {
        id: number;
        title: string;
        date: string;
        priority: string;
        mark: string[];
        description: string;
}

const Main: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [fetching, setFetching] = useState<boolean>(true);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [filters, setFilters] = useState<{ [key: string]: string[] }>({priority: [], mark: []});
    const [sort, setSort] = useState<string>('');
    const navigate = useNavigate()


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`https://65f926cddf15145246108cd3.mockapi.io/tasks?page=${currentPage}&limit=15${generateFilterQuery()}${sort}`);
                const newTasks = response.data;

                setTasks(prevTasks => [...prevTasks, ...newTasks]);
                setCurrentPage(prevPage => prevPage + 1);
                setTotalCount(response.headers['x-total-count']);

            }
             finally {
                setFetching(false);
            }
        };

        if (fetching) {
            fetchTasks().catch(error => {
                console.error( error);
            });
        }

    }, [fetching, totalCount]);


    useEffect(() => {
        const scrollHandler = () => {
            if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100 && tasks.length < 35) { //ТУТ ВМЕТО 35 ДОЛЖЕН БЫТЬ totalCount, у меня почему то возвращается undefined
                setFetching(true);
            }
        };

        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [fetching, tasks, totalCount]);

    const toggleFilter = (filter: string, typeFilter: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [typeFilter]: prevFilters[typeFilter].includes(filter) ?
                prevFilters[typeFilter].filter(f => f !== filter) : [...prevFilters[typeFilter], filter]
        }));
        setCurrentPage(1);
        setTasks([]);
        setFetching(true);
    };

    const generateFilterQuery = () => {
        let query = '';
        Object.entries(filters).forEach(([key, value]) => {
            if (value.length > 0) {
                query += `&${key}=${value.join('|')}`;
            }
        });
        return query;
    };

    const sortingDate = (date: string) => {


        if (date === 'newest') {
            setSort('&sortBy=date&order=desc');
        } else if (date === 'oldest') {
            setSort('&sortBy=date&order=asc');
        }
        setCurrentPage(1);
        setTasks([]);
        setFetching(true);
    };

    const handleClick = (task: Task) => {

        navigate(`/read/${task.id}`)
    }
    return (
        <div className='container'>
            <div className='main'>
                <div className='main__search'>
                    <Sort onClick={(date) => sortingDate(date)}/>
                    <Categories
                        value={filters}
                        onClickCategory={(filter, typeFilter) => toggleFilter(filter, typeFilter)}
                    />
                </div>

                <div className="main__right">
                    <Link to='/create'><button className="btn-add-task">Добавить задачу</button></Link>
                    <div className='main__tasks'>
                        {tasks.map((obj) => (
                            <TaskBlock task={obj} key={obj.id} onClick={handleClick}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
