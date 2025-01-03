import React, { useState } from 'react';
import { MessageCircle, Search, Phone, Flag, Clock, Send, Paperclip, User, HelpCircle, AlertCircle, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CommunicationSystem = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showVenuePortal, setShowVenuePortal] = useState(false);

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      type: 'buyer',
      name: 'Sarah & Michael',
      avatar: null,
      lastMessage: "Hi, I'm interested in your Sep 24 date",
      timestamp: '2 min ago',
      unread: 2,
      status: 'online'
    },
    {
      id: 2,
      type: 'venue',
      name: 'Grand Estate Venue',
      avatar: null,
      lastMessage: "Your transfer request has been received",
      timestamp: '1 hour ago',
      unread: 0,
      status: 'offline'
    },
    {
      id: 3,
      type: 'support',
      name: 'WeddingTransfer Support',
      avatar: null,
      lastMessage: "How can I help you today?",
      timestamp: '1 day ago',
      unread: 0,
      status: 'online'
    }
  ];

  const renderChat = () => {
    if (!selectedChat) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="font-medium mb-2">Select a conversation</h3>
          <p className="text-sm text-gray-600">
            Choose a conversation from the list to start messaging
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <h3 className="font-medium">{selectedChat.name}</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className={`w-2 h-2 rounded-full ${
                  selectedChat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
                <span className="text-gray-600">
                  {selectedChat.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedChat.type === 'buyer' && (
              <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                <Phone className="w-5 h-5" />
              </button>
            )}
            <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <Flag className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedChat.type === 'venue' && (
            <Alert className="mb-4">
              <Shield className="w-4 h-4" />
              <AlertDescription>
                This is an official communication channel with your venue. All messages are recorded for verification purposes.
              </AlertDescription>
            </Alert>
          )}

          {selectedChat.type === 'support' && (
            <Alert className="mb-4">
              <HelpCircle className="w-4 h-4" />
              <AlertDescription>
                You're chatting with WeddingTransfer Support. We're here to help with any questions or concerns.
              </AlertDescription>
            </Alert>
          )}

          {/* Sample Messages */}
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p>Hi, I'm interested in your September 24th wedding date. Is it still available?</p>
              <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-gray-900 text-white rounded-lg p-3 max-w-[80%]">
              <p>Yes, it's still available! The venue is The Grand Estate and includes full catering package.</p>
              <p className="text-xs text-gray-300 mt-1">10:35 AM</p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400"
            />
            <button 
              className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              onClick={() => {
                if (message.trim()) {
                  // Send message logic
                  setMessage('');
                }
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="grid grid-cols-12 divide-x h-[600px]">
        {/* Sidebar */}
        <div className="col-span-4 flex flex-col">
          {/* Search and Filters */}
          <div className="p-4 border-b">
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex-1 py-1.5 rounded-lg text-sm ${
                  activeTab === 'messages'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Messages
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`flex-1 py-1.5 rounded-lg text-sm ${
                  activeTab === 'support'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Support
              </button>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations
              .filter(conv => 
                activeTab === 'messages' ? conv.type !== 'support' : conv.type === 'support'
              )
              .map(conversation => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 ${
                    selectedChat?.id === conversation.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {conversation.type === 'venue' ? (
                      <MessageCircle className="w-6 h-6 text-gray-400" />
                    ) : conversation.type === 'support' ? (
                      <HelpCircle className="w-6 h-6 text-gray-400" />
                    ) : (
                      <User className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </button>
              ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-8 flex flex-col">
          {renderChat()}
        </div>
      </div>
    </div>
  );
};

export default CommunicationSystem;
