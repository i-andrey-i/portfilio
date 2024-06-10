import React, {useEffect, useState} from "react";
import styles from "../css/AccountInformation.module.css";
import {ReactComponent as PhoneIcon} from "../img/phoneIcon.svg";
import {ReactComponent as EmailIcon} from "../img/emailIcon.svg";
import {Modal} from "./Modal";
import {EditModal} from "./EditModal";

const AccountInformation = props => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(
        () => {
            if (isOpen) {
                document.body.style.overflowY = "hidden";
            }
            else {
                document.body.style.overflowY = "scroll";
            }
        },
        [isOpen]
    );

    return (
        <div className={styles.MainBlock}>
            <div className={styles.InfoHeader}>
                <div className={styles.PictureName}>
                    <img src="../img/user-icon-2.png"/>
                    <p>{props.profileInfo.data.name}</p>
                    {!props.profileInfo.can_edit && (<button className={styles.SubscribeButton}>Подписаться</button>)}
                </div>
                <ul className={styles.Counters}>
                    <li className={styles.Counter}>
                        <p>Подписчики</p>
                        <p>{props.profileInfo.data.projects_count}</p>
                    </li>
                    <li className={styles.Counter}>
                        <p>Публикации</p>
                        <p>{props.profileInfo.data.projects_count}</p>
                    </li>
                </ul>
            </div>
            <div className={styles.ProfileInfo}>
                <ul className={styles.Fields}>
                    {props.profileInfo.data.city && (
                        <li>
                            <p>Город:</p>
                            <p>{props.profileInfo.data.city}</p>
                        </li>
                    )}
                    {props.profileInfo.data.education && (
                        <li>
                            <p>Учебное заведение:</p>
                            <p>{props.profileInfo.data.education}</p>
                        </li>
                    )}
                    {props.profileInfo.data.description && (
                        <li>
                            <p>Описание:</p>
                            <p>{props.profileInfo.data.description}</p>
                        </li>
                    )}
                </ul>
                <div className={styles.ContactsBlock}>
                    <p>Контакты:</p>
                    <ul className={styles.Contacts}>
                        {props.profileInfo.data.phone_number && (
                            <li>
                                <PhoneIcon/>
                                <p>{props.profileInfo.data.phone_number}</p>
                            </li>
                        )}
                        {props.profileInfo.data.email && (
                            <li>
                                <EmailIcon/>
                                <p>{props.profileInfo.data.email}</p>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className={styles.ButtonBottom}>
                {props.profileInfo.can_edit && (
                    <button className={styles.Change} onClick={() => setIsOpen(true)}>Изменить</button>
                )}
            </div>
            <EditModal isOpen={isOpen} onClose={() => setIsOpen(false)} profileInfo={props.profileInfo.data} />
        </div>
    )
};

export default AccountInformation