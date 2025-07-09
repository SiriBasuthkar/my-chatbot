import React, { useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets.js';
import axios from 'axios';
import { GROQ_API_KEY } from "@/config.js";




const Main = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!question.trim()) return;
  
    setIsLoading(true);
    setError("");
  
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-70b-8192", 
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant."
            },
            {
              role: "user",
              content: question
            }
          ],
          temperature: 0.7 
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
          }
        }
      );
  
      setResponse(response.data.choices[0].message.content);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setError(error.response?.data?.error?.message || "Failed to get response");
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>AI Assistant</p> {}
        <img src={assets.user_icon} alt='user profile' className='user-icon' />
      </div>

      <div className="main-container">
      {!response && (
    <div className="greet">
      <p><span>Hello, User</span></p>
      <p>How can I help you today?</p>
    </div>
  )}
  {/* Conditional rendering - show either cards OR response */}
  {!response ? (
    
    <div className="cards">
      <div className="card" onClick={() => setQuestion("Suggest some beautiful places for my upcoming trip")}>
        <p>Suggest some beautiful places for my upcoming trip</p>
        <img src={assets.compass_icon} alt='travel suggestions' className='card-icon' />
      </div>
      <div className="card" onClick={() => setQuestion("Briefly summarize this concept: Urban Planning")}>
        <p>Briefly summarize this concept: Urban Planning</p>
        <img src={assets.bulb_icon} alt='concept explanation' className='card-icon' />
      </div>
      <div className="card" onClick={() => setQuestion("Brainstorm team bonding activities for our work retreat")}>
        <p>Brainstorm team bonding activities for our work retreat</p>
        <img src={assets.message_icon} alt='team activities' className='card-icon' />
      </div>
      <div className="card" onClick={() => setQuestion("Improve the readability of the following code")}>
        <p>Improve the readability of the following code</p>
        <img src={assets.code_icon} alt='code improvement' className='card-icon' />
      </div>
    </div>
  ) : (
    <div className="response-box">
      <p className='response-text'>{response}</p>
    </div>
  )}

  

{response && (
    <div className="response-box">
      <button onClick={() => setResponse("")} className="back-button">
        Back to suggestions
      </button>
    </div>
  )}

  {/* Fixed position textarea */}
  <div className="main-bottom">
    <div className="search-box">
    <div className="search-box">
      <input
        type="text"
        value={question}
        placeholder="Ask me anything..."
        onChange={(e) => setQuestion(e.target.value)}
        onClick={handleKeyDown}
      />
    </div>
      <div>
        <img src={assets.gallery_icon} alt="attach file" />
        <img src={assets.mic_icon} alt="voice input" />
        <img 
          onClick={handleSend} 
          src={assets.send_icon} 
          alt="send" 
          style={{ cursor: "pointer" }} 
        />
      </div>
    </div>
    <p className='bottom-info'>
      Assistant can help with a wide range of tasks...
    </p>
  </div>
</div>
</div> 
  );
};

export default Main;