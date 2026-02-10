import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('chatbot_conversations')
    return saved ? JSON.parse(saved) : [{
      id: 'conv-' + Date.now(),
      title: 'New conversation',
      messages: [{ role: 'assistant', content: 'Hello darling! How can I assist you today? 💖' }],
      active: true
    }]
  })
  
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState('deepseek/deepseek-chat')
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const chatBoxRef = useRef(null)
  
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
  const API_URL = 'https://openrouter.ai/api/v1/chat/completions'
  
  const models = [
    { id: 'deepseek/deepseek-chat', name: 'DeepSeek Chat' },
    { id: 'openchat/openchat-3.5-0106', name: 'OpenChat 3.5' },
  ]

  useEffect(() => {
    localStorage.setItem('chatbot_conversations', JSON.stringify(conversations))
  }, [conversations])

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [conversations])

  const activeConversation = conversations.find(conv => conv.active)
  const messages = activeConversation?.messages || []

  const handleSend = async () => {
    if (!input.trim()) return
    
    const newMessage = { role: 'user', content: input }
    const updatedConversations = conversations.map(conv => {
      if (conv.active) {
        const updatedMessages = [...conv.messages, newMessage]
        return {
          ...conv,
          messages: updatedMessages,
          title: updatedMessages.length === 2 ? input.slice(0, 30) + '...' : conv.title
        }
      }
      return conv
    })
    
    setConversations(updatedConversations)
    setInput('')
    setLoading(true)
    
    try {
      const response = await axios.post(
        API_URL,
        {
          model: model,
          messages: activeConversation.messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })).concat([newMessage])
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )
      
      const reply = response.data?.choices?.[0]?.message?.content || 'No response'
      
      setConversations(prevConversations => 
        prevConversations.map(conv => {
          if (conv.active) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage, { role: 'assistant', content: reply }]
            }
          }
          return conv
        })
      )
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message)
      setConversations(prevConversations => 
        prevConversations.map(conv => {
          if (conv.active) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage, {
                role: 'assistant',
                content: `Error: ${error.response?.data?.error?.message || error.message}`
              }]
            }
          }
          return conv
        })
      )
    }
    
    setLoading(false)
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  const newConversation = () => {
    setConversations(conversations.map(conv => ({
      ...conv,
      active: false
    })).concat({
      id: 'conv-' + Date.now(),
      title: 'New conversation',
      messages: [{ role: 'assistant', content: 'How can I help you today, darling? 💖' }],
      active: true
    }))
  }
  
  const switchConversation = (id) => {
    setConversations(conversations.map(conv => ({
      ...conv,
      active: conv.id === id
    })))
  }
  
  const clearChat = () => {
    setConversations(conversations.map(conv => {
      if (conv.active) {
        return {
          ...conv,
          messages: [{ role: 'assistant', content: 'Chat history cleared. How can I help you? 💖' }]
        }
      }
      return conv
    }))
  }
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  const formatMessage = (content) => {
    return content
      .split('\n')
      .map((line, i) => <span key={i}>{line}<br /></span>)
  }

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <button className="new-chat-button" onClick={newConversation}>
            <span>+</span> New chat
          </button>
        </div>
        
        <div className="conversations-list">
          {conversations.map(conv => (
            <div 
              key={conv.id} 
              className={`conversation-item ${conv.active ? 'active' : ''}`}
              onClick={() => switchConversation(conv.id)}
            >
              <span className="conversation-icon">✨</span>
              <span className="conversation-title">{conv.title}</span>
            </div>
          ))}
        </div>
        
        <div className="sidebar-footer">
          <div className="model-selector">
            <span>Model:</span>
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              {models.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          
          <div className="sidebar-actions">
            <button onClick={clearChat} className="sidebar-button">
              <span className="sidebar-button-icon">🌸</span>
              Clear chat
            </button>
            <button onClick={toggleDarkMode} className="sidebar-button">
              <span className="sidebar-button-icon">{darkMode ? '☀️' : '🌙'}</span>
              {darkMode ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="main-content">
        {/* Top navbar */}
        <div className="top-navbar">
          <button className="toggle-sidebar-button" onClick={toggleSidebar}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
          <h1>Mohammed's AI Chat 💖</h1>
          <div className="spacer"></div>
        </div>
        
        {/* Chat area */}
        <div className="chat-container">
          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-avatar">
                  {msg.role === 'assistant' ? '🤖' : '🎀'}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    {formatMessage(msg.content)}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message assistant">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="message-bubble typing">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="input-area">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              rows={1}
            />
            <button 
              className={`send-button ${!input.trim() ? 'disabled' : ''}`} 
              onClick={handleSend} 
              disabled={loading || !input.trim()}
            >
              {loading ? '...' : '↑'}
            </button>
          </div>
          
          <div className="footer-info">
            <p>Powered by OpenRouter API • {models.find(m => m.id === model)?.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App