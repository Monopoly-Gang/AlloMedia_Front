import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleRTL, toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Dropdown from '../Dropdown';

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const isRtl = themeConfig.rtlClass === 'rtl';
    const { t } = useTranslation();

    const [messages, setMessages] = useState([
        // ... message objects ...
    ]);

    const [notifications, setNotifications] = useState([
        // ... notification objects ...
    ]);

    const [search, setSearch] = useState(false);
    const [flag, setFlag] = useState(themeConfig.locale);

    useEffect(() => {
        // Logic to handle active menu item based on location
    }, [location]);

    const removeMessage = (id) => {
        setMessages(messages.filter((msg) => msg.id !== id));
    };

    const removeNotification = (id) => {
        setNotifications(notifications.filter((notif) => notif.id !== id));
    };

    const setLocale = (flag) => {
        setFlag(flag);
        dispatch(toggleRTL(flag.toLowerCase() === 'ae' ? 'rtl' : 'ltr'));
    };

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center">
                        <Link to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8" src="/assets/images/logo.svg" alt="logo" />
                            <span className="text-2xl font-semibold hidden md:inline dark:text-white-light">VRISTO</span>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex-none"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            {/* SVG for collapse icon */}
                        </button>
                    </div>

                    <div className="hidden sm:block">
                        <ul className="flex items-center space-x-2">
                            <li>
                                <Link to="/apps/calendar" className="block p-2 rounded-full">
                                    {/* SVG for calendar icon */}
                                </Link>
                            </li>
                            <li>
                                <Link to="/apps/todolist" className="block p-2 rounded-full">
                                    {/* SVG for todolist icon */}
                                </Link>
                            </li>
                            <li>
                                <Link to="/apps/chat" className="block p-2 rounded-full">
                                    {/* SVG for chat icon */}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center space-x-1.5 lg:space-x-2">
                        <div>
                            <form className={`${search && '!block'} hidden`} onSubmit={() => setSearch(false)}>
                                <div className="relative">
                                    <input type="text" className="form-input" placeholder="Search..." />
                                    <button type="button" className="absolute w-9 h-9 inset-0">
                                        {/* SVG for search icon */}
                                    </button>
                                    <button type="button" onClick={() => setSearch(false)}>
                                        {/* SVG for close icon */}
                                    </button>
                                </div>
                            </form>
                            <button type="button" onClick={() => setSearch(!search)} className="search_btn">
                                {/* SVG for search button */}
                            </button>
                        </div>

                        <div>
                            {themeConfig.theme === 'light' && (
                                <button onClick={() => dispatch(toggleTheme('dark'))}>
                                    {/* SVG for light theme icon */}
                                </button>
                            )}
                            {themeConfig.theme === 'dark' && (
                                <button onClick={() => dispatch(toggleTheme('system'))}>
                                    {/* SVG for dark theme icon */}
                                </button>
                            )}
                            {themeConfig.theme === 'system' && (
                                <button onClick={() => dispatch(toggleTheme('light'))}>
                                    {/* SVG for system theme icon */}
                                </button>
                            )}
                        </div>

                        <div className="dropdown">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="block p-2 rounded-full"
                                button={<img className="w-5 h-5" src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="flag" />}
                            >
                                <ul className="grid grid-cols-2 gap-2">
                                    {themeConfig.languageList.map((item) => (
                                        <li key={item.code}>
                                            <button
                                                type="button"
                                                className={`flex w-full ${i18next.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                onClick={() => {
                                                    i18next.changeLanguage(item.code);
                                                    setLocale(item.code);
                                                }}
                                            >
                                                <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5" />
                                                <span>{item.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </Dropdown>
                        </div>

                        <div className="dropdown">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="block p-2 rounded-full"
                                button={
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        {/* SVG for notifications icon */}
                                    </svg>
                                }
                            >
                                <ul className="text-dark w-[300px] sm:w-[375px] text-xs">
                                    <li>
                                        <div className="flex items-center px-4 py-2 justify-between font-semibold">
                                            <h4 className="text-lg">Notification</h4>
                                            {notifications.length ? <span className="badge bg-primary/80">{notifications.length} New</span> : ''}
                                        </div>
                                    </li>
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <li key={notification.id}>
                                                <div className="group flex items-center px-4 py-2">
                                                    <div className="grid place-content-center rounded">
                                                        <div className="w-12 h-12 relative">
                                                            <img className="w-12 h-12 rounded-full" alt="profile" src={`/assets/images/${notification.profile}`} />
                                                            <span className="bg-success w-2 h-2 rounded-full block absolute"></span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-auto">
                                                        <div>
                                                            <h6 dangerouslySetInnerHTML={{ __html: notification.message }}></h6>
                                                            <span className="text-xs block font-normal">{notification.time}</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                                            onClick={() => removeNotification(notification.id)}
                                                        >
                                                            {/* SVG for remove icon */}
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li>
                                            <button type="button" className="!grid place-content-center text-lg min-h-[200px]">
                                                <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-white">
                                                    {/* SVG for no data icon */}
                                                </div>
                                                No data available.
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;