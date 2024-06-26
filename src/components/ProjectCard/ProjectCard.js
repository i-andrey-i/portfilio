import React, {useEffect, useState} from "react";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {Link, useNavigate} from "react-router-dom";
import styles from "./ProjectCard.module.css"
import {ChatBubbleOutlineOutlined, Favorite} from "@mui/icons-material";
import {getProjectPicture, likeProject, unlikeProject} from "../../api/ProjectApi";
import {getProfilePicture} from "../../api/ProfileApi";

const ProjectCard = props => {
    const navigate = useNavigate();
    const {project, showUserInfo} = props;
    const [projectData, setProjectData] = useState(project);
    const [projectPreviewSrc, setProjectPreviewSrc] = useState(null);
    const [profileImageSrc, setProfileImageSrc] = useState(null);
    const date = new Date(project.data.created_at);
    const formattedDate = date.toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit', year: 'numeric'});

    const userId = localStorage.getItem("userId");
    const isAuthorised = userId && userId !== "undefined";

    const toggleLike = () => {
        if (!isAuthorised)
            return;
        if (projectData.is_liked) {
            unlikeProject(project.data.id)
                .then(data => setProjectData(data))
                .catch(error => console.log(error));
        } else {
            likeProject(project.data.id)
                .then(data => setProjectData(data))
                .catch(error => console.log(error));
        }
        console.log(projectData);
    }

    useEffect(() => {
        if (!props.showUserInfo)
            return;
        getProfilePicture(projectData.data.user_id)
            .then(blob => {
                const objectUrl = URL.createObjectURL(blob);
                setProfileImageSrc(objectUrl);
            })
            .catch(error => console.log(error));

        return () => {
            if (profileImageSrc) {
                URL.revokeObjectURL(profileImageSrc);
            }
        };
    }, []);

    useEffect(() => {
        getProjectPicture(projectData.data.preview)
            .then(blob => {
                const objectUrl = URL.createObjectURL(blob);
                setProjectPreviewSrc(objectUrl);
            })
            .catch(error => console.log(error));

        return () => {
            if (projectPreviewSrc) {
                URL.revokeObjectURL(projectPreviewSrc);
            }
        }
    }, [])

    return (
        <div className={styles.projectCard}>
            {showUserInfo && (
                <Link to={`/profile/${projectData.data.user_id}`}>
                    <div className={styles.userInfo}>
                        <div className={styles.ImageContainer}>
                            {profileImageSrc && <img src={profileImageSrc} alt="" width="38" height="38"/>}
                        </div>
                        <p className={styles.username}>{projectData.data.username}</p>
                    </div>
                </Link>
            )}
            <div className={styles.projectInfo}>
                <p className={styles.projectTitle} onClick={() => {
                    navigate(`/project/${projectData.data.id}`)
                }}>{projectData.data.title}</p>
                <div className={styles.ImageContainer} onClick={() => {
                    navigate(`/project/${projectData.data.id}`)
                }}>
                    <img className={styles.projectPreview} src={projectPreviewSrc} alt="Изображение работы"/>
                </div>
                <p className={styles.projectDescription}>{projectData.data.description}</p>
                <div className={styles.projectMeta}>
                    <time className={styles.projectCreatedAt}
                          dateTime={projectData.data.created_at}>{formattedDate}</time>
                    <div className={`${styles.iconWithText} ${styles.projectLikes}`}>
                        <span>{projectData.data.likes_count}</span>
                        {projectData.is_liked ?
                            <Favorite onClick={() => toggleLike()} className={`${styles.Icon} ${styles.Like}`}
                                      style={{fill: "red"}}/> :
                            <FavoriteBorderOutlinedIcon onClick={() => toggleLike()}
                                                        className={`${styles.Icon} ${styles.Like}`}/>}
                    </div>
                    <div className={`${styles.iconWithText} ${styles.projectComments}`}>
                        <span>{projectData.data.comments_count}</span>
                        <ChatBubbleOutlineOutlined className="icon"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard