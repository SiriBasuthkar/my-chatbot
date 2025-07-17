import React, { useState } from 'react'
import './Sidebar.css';
import { assets } from '../../assets/assets.js';

function Sidebar() {
    const [extended, setExtended] = useState(false);
    const [recents, setRecents] = useState([]); // 💡 Track recent searches

    // Example handler to simulate adding new search
    const addRecentSearch = (query) => {
        setRecents(prev => [query, ...prev.slice(0, 4)]); // Max 5 items
    };

    // Simulate adding a new search (replace with actual integration)
    const simulateNewSearch = () => {
        const fakeSearch = "Search " + (recents.length + 1);
        addRecentSearch(fakeSearch);
    };

    return (
        <div className='sidebar'> 
            <div className='top'>
                <img 
                    onClick={() => setExtended(prev => !prev)} 
                    src={assets.menu_icon} 
                    alt='menu_icon' 
                    className='menu'
                />
                <div className='new-chat' onClick={simulateNewSearch}>
                    <img src={assets.plus_icon} alt='plus_icon' className='plus'/>
                    {extended ? <p>New Chat</p> : null}
                </div>

                {extended && (
                    <div className="recent">
                        <p className='recent-title'>Recents</p>
                        {recents.map((entry, index) => (
                            <div className="recent-entry" key={index}>
                                <img src={assets.message_icon} alt='message_icon' className='recent-icon'/>
                                <p>{entry}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='bottom'>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt='question_icon' className='bottom-icon'/>
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt='history_icon' className='bottom-icon'/>
                    {extended ? <p>Activities</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt='setting_icon' className='bottom-icon'/>
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
