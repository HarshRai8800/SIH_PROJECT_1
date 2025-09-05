import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm MindBot, your wellness companion. I'm here to listen and provide support. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const mockResponses = [
    "I understand that can be really challenging. Can you tell me more about what's been on your mind?",
    "It sounds like you're dealing with a lot right now. Remember, it's okay to feel overwhelmed sometimes.",
    "That's a great step in taking care of yourself. Have you tried any relaxation techniques that work for you?",
    "I'm here to support you. Would you like me to suggest some coping strategies that other students have found helpful?",
    "Thank you for sharing that with me. Your feelings are valid, and seeking support shows real strength.",
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Bot className="w-4 h-4" />
              <span>AI Wellness Assistant</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Chat with MindBot</h1>
            <p className="text-muted-foreground">
              Your confidential AI companion for mental health support and guidance
            </p>
          </div>

          {/* Chat Container */}
          <Card className="card-gradient h-[600px] flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {message.isUser ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[75%] p-4 rounded-lg ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted text-foreground'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="flex items-center space-x-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center">
                <Heart className="w-3 h-3 mr-1" />
                This conversation is private and confidential
              </p>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              'I\'m feeling stressed about exams',
              'I need help with sleep issues',
              'I want to talk about anxiety'
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="p-4 h-auto text-left justify-start"
                onClick={() => setInputMessage(suggestion)}
              >
                <span className="text-sm">{suggestion}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChatbotPage;