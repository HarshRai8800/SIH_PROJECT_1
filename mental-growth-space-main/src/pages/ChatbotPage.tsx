import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { socketconnection } from '@/lib/socketconnection';

const ChatbotPage = () => {
  type Message = {
    id?: string | number;
    sender: "bot" | "user";
    text: string;
    timestamp?: Date;
    isUser?: boolean;
  };

  const { t } = useTranslation();


  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [counsellingButton, setCounsellingButton] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Connection event listeners
    const handleConnect = () => {
      console.log("Connected to server");
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    };

    const handleConnectError = (error: any) => {
      console.error("Connection error:", error);
      setIsConnected(false);
    };

    const handleBotMessage = (msg: string) => {
      if (msg.includes("#book#counselling")) {
        socketconnection.emit("end_chat");
        setCounsellingButton(true);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: msg, timestamp: new Date() }
      ]);
    };

    const handleBookCounselling = (msg: string) => {
      console.log("Counselling summary:", msg);
      // Don't disconnect here as it's a global connection
    };

    // Add event listeners
    socketconnection.on("connect", handleConnect);
    socketconnection.on("disconnect", handleDisconnect);
    socketconnection.on("connect_error", handleConnectError);
    socketconnection.on("bot_message", handleBotMessage);
    socketconnection.on("book_counselling", handleBookCounselling);

    // Check if already connected
    if (socketconnection.connected) {
      setIsConnected(true);
    }

    return () => {
      // Remove event listeners but don't disconnect the global connection
      socketconnection.off("connect", handleConnect);
      socketconnection.off("disconnect", handleDisconnect);
      socketconnection.off("connect_error", handleConnectError);
      socketconnection.off("bot_message", handleBotMessage);
      socketconnection.off("book_counselling", handleBookCounselling);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !isConnected) return;
    socketconnection.emit("user_message", input);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input, timestamp: new Date(), isUser: true }
    ]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
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
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Chat with MindBot</h1>
            <p className="text-muted-foreground">
              Your confidential AI companion for mental health support and guidance
            </p>
            {!isConnected && (
              <p className="text-yellow-600 text-sm mt-2">
                Connecting to server... Please wait
              </p>
            )}
          </div>

          {/* Chat Container */}
          <Card className="card-gradient h-[600px] flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${
                    message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {message.isUser ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[75%] p-4 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {message.timestamp && (
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {!counsellingButton && (
              <div className="border-t border p-4">
                <div className="flex items-center space-x-3">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your mind..."
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!input.trim() || !isConnected}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  This conversation is private and confidential
                </p>
              </div>
            )}
          </Card>

          {/* Counselling Button */}
          {counsellingButton && (
            <div className="mt-4 text-center">
              <Button
                onClick={() => navigate('/counselling')}
                className="px-6 py-3 text-lg"
              >
                Book Counselling
              </Button>
            </div>
          )}

          {/* Quick Actions */}
          {!counsellingButton && (
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {[
                "I'm feeling stressed about exams",
                "I need help with sleep issues",
                "I want to talk about anxiety",
                "I want to book a counselling session"
              ].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="p-4 h-auto text-left justify-start"
                  onClick={() => setInput(suggestion)}
                >
                  <span className="text-sm">{suggestion}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChatbotPage;
