import React, { useState, useEffect } from 'react';
import { Wine, Users, MessageCircle, History, UserCircle2, LogIn, LogOut, Send, X, Sparkles } from 'lucide-react';

const HonsulFriendMainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [recentChats, setRecentChats] = useState([
    { id: 1, title: '오늘의 스트레스', lastMessage: '힘내세요!' },
    { id: 2, title: '취미 이야기', lastMessage: '재미있네요.' },
  ]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    setShowIntro(false);
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: `사용자의 "${inputMessage}" 메시지에 대한 AI 응답입니다.`,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const IntroSection = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-purple-800 flex items-center justify-center gap-3">
            <Wine className="w-10 h-10" />
            혼술친구에 오신 것을 환영합니다
          </h1>
          <p className="text-xl text-gray-600">오늘 당신의 이야기를 들려주세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: MessageCircle,
              title: "24/7 대화 가능",
              description: "언제든지 대화할 준비가 되어있어요"
            },
            {
              icon: Sparkles,
              title: "맞춤형 대화",
              description: "당신의 감정과 상황을 이해하고 공감해요"
            },
            {
              icon: Users,
              title: "진정한 친구처럼",
              description: "편안하게 대화를 나눌 수 있어요"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 to-white text-gray-800 font-pretendard">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
            <Wine className="w-6 h-6" />
            혼술친구
          </h1>
        </div>
        
        <nav className="mt-6 flex-1">
          {[
            { icon: MessageCircle, label: '채팅', value: 'chat' },
            { icon: History, label: '히스토리', value: 'history' },
            { icon: Users, label: '친구', value: 'friends' },
          ].map(item => (
            <button
              key={item.value}
              onClick={() => setActiveSection(item.value)}
              className={`w-full px-6 py-4 flex items-center gap-3 transition-colors ${
                activeSection === item.value
                  ? 'bg-purple-100 text-purple-800'
                  : 'hover:bg-purple-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer - Mypage */}
        <div className="border-t border-gray-200">
          <button
            onClick={() => setActiveSection('mypage')}
            className={`w-full px-6 py-4 flex items-center gap-3 transition-colors ${
              activeSection === 'mypage'
                ? 'bg-purple-100 text-purple-800'
                : 'hover:bg-purple-50'
            }`}
          >
            <UserCircle2 className="w-5 h-5" />
            <span>마이페이지</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {activeSection === 'chat' && (
          <div className="flex-1 flex flex-col p-6">
            {showIntro ? (
              <IntroSection />
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'ai' ? 'justify-start' : 'justify-end'
                    } items-end gap-2`}
                  >
                    {message.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
                        <Wine className="w-4 h-4 text-purple-800" />
                      </div>
                    )}
                    <div className="flex items-end gap-2">
                      {message.sender === 'user' && (
                        <span className="text-xs text-gray-500">
                          {message.timestamp}
                        </span>
                      )}
                      <div
                        className={`max-w-[70%] p-4 rounded-2xl ${
                          message.sender === 'ai'
                            ? 'bg-white shadow-md'
                            : 'bg-purple-600 text-white'
                        }`}
                      >
                        <p>{message.text}</p>
                      </div>
                      {message.sender === 'ai' && (
                        <span className="text-xs text-gray-500">
                          {message.timestamp}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
                      <Wine className="w-4 h-4 text-purple-800" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Input Area */}
            <div className="relative">
              <div
                className={`flex items-center gap-2 p-2 rounded-2xl transition-all duration-300 ${
                  inputFocused
                    ? 'bg-white shadow-lg ring-2 ring-purple-400'
                    : 'bg-white shadow-md'
                }`}
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-4 py-3 bg-transparent outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    inputMessage
                      ? 'bg-purple-600 text-white shadow-md hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  disabled={!inputMessage}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HonsulFriendMainPage;