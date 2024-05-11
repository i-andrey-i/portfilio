import React, {useEffect, useState} from "react";
import ProjectCard from "../components/ProjectCard";
import Header from "../components/Header";
import {Link} from 'react-router-dom';
import {getNewestProjects, getProjects, getUserProjects} from "../api/ProjectApi";

const MainWorksPage = () => {
    const [projects, setProjects] = useState(null);


    const handleFilter = (event) => {
        switch (event.target.id) {
            case "newest-projects":
                getNewestProjects()
                    .then(response => setProjects(response));
                break;
            default:
                getProjects()
                    .then(response => setProjects(response));
        }
    }

    useEffect(() => {
        getProjects()
            .then(response => setProjects(response))
            .catch(error => console.error(error))
    }, []);

    if (!projects){
        return <div>Loading...</div>;
    }


return (
    <div>
        <Header/>
        <main>
            <ul className="filters-list">
                <li className="filters-item">
                    <button className="filters-button" id="all-projects" onClick={handleFilter}>Все проекты</button>
                </li>
                <li className="filters-item">
                    <button className="filters-button" id="subscribed-projects" onClick={handleFilter}>Подписки
                    </button>
                </li>
                <li className="filters-item">
                    <button className="filters-button" id="newest-projects" onClick={handleFilter}>Новые проекты
                    </button>
                </li>
            </ul>

            <section className="works-section" id="my-works-page">
                <ul className="works-list">
                    {projects.map((project) => (
                        <li className="works-item" key={project.data.id}>
                            <ProjectCard showUserInfo={true} project={project}/>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    </div>
);
}

export default MainWorksPage