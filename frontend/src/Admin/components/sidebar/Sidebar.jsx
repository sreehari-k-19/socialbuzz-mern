import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch} from "react-redux";
// import './Sidebar.scss';
import { AdminLogOut } from '../../slice/Authadmin';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <i className='bx bx-home'></i>,
        to: '/admin',
        section: 'admin'
    },
    {
        display: 'users',
        icon: <i className='bx bx-star'></i>,
        to: '/admin/users',
        section: 'users'
    },
    {
        display: 'blockedusers',
        icon: <i className='bx bx-star'></i>,
        to: '/admin/blockedusers',
        section: 'blockedusers'
    },
    {
        display: 'Post Reports',
        icon: <i className='bx bx-star'></i>,
        to: '/admin/allreports',
        section: 'allreports'
    },

]

const Sidebar = () => {
    const dispatch=useDispatch()
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        // const curPath = window.location.pathname.split('/')[2];
        const curPath = sidebarNavItems.find(section => section.to === window.location.pathname)?.section ?? 'admin';
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            socialbuzz
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
        <div style={{marginLeft:"20px"}}>
            <button className='button logout-button' onClick={()=>dispatch(AdminLogOut())}>Logout</button>
        </div>
    </div>;
};

export default Sidebar;