import React,{useState} from 'react'
import './Sidebar.css';
import {assets} from '../../assets/assets.js';
function Sidebar(){
    
    const [extended, setExtended] = useState(false)

    return (
    <div className='sidebar'> 
            <div className='top'>
                <img onClick={() => setExtended(prev => !prev)} src={assets.menu_icon} alt='menu_icon' className='menu'/>
                <div className='new-chat'>
                    <img src={assets.plus_icon} alt='plus_icon' className='plus'/>
                    {extended?<p>New Chat</p>:null}
                </div>
                {extended?<div className="recent">
                    <p className='recent-title'>Recents</p>
                    <div className="recent-entry">
                        <img src={assets.message_icon} alt='message_icon' className='recent-icon'/>
                        <p>What is react?....</p>
                    </div>
                </div>:null}
            </div>
            <div className='bottom'>
                <div className="bottom-item recent-entry ">
                    <img src={assets.question_icon} alt='question_icon' className='bottom-icon'/>
                    {extended?<p>Help</p>:null}
                </div>
                <div className="bottom-item recent-entry ">
                    <img src={assets.history_icon} alt='histoy_icon' className='bottom-icon'/>
                    {extended?<p>Activities</p>:null}
                </div>
                <div className="bottom-item recent-entry ">
                    <img src={assets.setting_icon} alt='setting_icon' className='bottom-icon'/>
                    {extended?<p>Settings</p>:null}
                </div>
            </div>
    </div>
)
}

export default Sidebar;
