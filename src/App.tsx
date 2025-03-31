import React, { useState } from 'react';
import { Brain, Send, RefreshCw, ChevronDown, Building, ArrowLeft } from 'lucide-react';
import { ChatMessage, getAIResponse, getInvestmentProfile } from './utils';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'ai',
      content: '안녕하세요! 저는 당신의 투자 성향을 분석하는 AI 어시스턴트입니다. 먼저, 투자 경험이 있으신가요?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { type: 'user', content: input }
    ];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response
    const aiResponse = getAIResponse(input);
    setTimeout(() => {
      setMessages([...newMessages, { type: 'ai', content: aiResponse }]);
    }, 1000);

    // After 3 messages, show analysis
    if (newMessages.filter(m => m.type === 'user').length >= 3 && !analysis) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setAnalysis(getInvestmentProfile());
        setIsAnalyzing(false);
        setShowResults(true);
      }, 3000);
    }
  };

  const handleRecommendations = () => {
    alert('매물 추천 기능은 현재 개발 중입니다.');
  };

  const resetTest = () => {
    setMessages([{
      type: 'ai',
      content: '안녕하세요! 저는 당신의 투자 성향을 분석하는 AI 어시스턴트입니다. 먼저, 투자 경험이 있으신가요?'
    }]);
    setAnalysis(null);
    setShowResults(false);
    setShowChat(true);
  };

  if (showResults && analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-75"></div>
                <div className="relative bg-white rounded-full p-3">
                  <Brain className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                분석 결과
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg border border-white/20">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/10"></div>
              <div className="relative">
                <h2 className="text-4xl font-bold mb-3 text-white">당신의 투자 프로필</h2>
                <p className="text-blue-100 text-lg">AI가 분석한 맞춤형 투자 성향 보고서</p>
              </div>
            </div>
            
            <div className="p-12">
              <div className="prose prose-lg max-w-none">
                {analysis.split('\n\n').map((section, i) => (
                  <div key={i} className="mb-12 last:mb-0">
                    {section.split('\n').map((line, j) => {
                      if (line.includes(':')) {
                        const [title, content] = line.split(':');
                        return (
                          <div key={j} className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                              {title}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                              {content}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <p key={j} className="text-gray-600 text-lg leading-relaxed mb-4">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-col gap-4">
                <button
                  onClick={handleRecommendations}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <Building className="w-7 h-7 text-white" />
                    <span className="text-xl font-semibold text-white">투자 성향에 맞는 매물 추천받기</span>
                  </div>
                  <div className="absolute inset-0 bg-white/20 transition-transform duration-300 group-hover:scale-[2] group-hover:opacity-0"></div>
                </button>
                
                <button
                  onClick={resetTest}
                  className="group relative w-full overflow-hidden rounded-2xl border-2 border-gray-200 px-8 py-6 transition-all duration-300 hover:border-blue-100 hover:bg-blue-50/50"
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <ArrowLeft className="w-7 h-7 text-gray-600" />
                    <span className="text-xl font-semibold text-gray-600">테스트 다시하기</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {!showChat && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-75"></div>
                <div className="relative bg-white rounded-full p-3">
                  <Brain className="w-16 h-16 text-blue-600" />
                </div>
              </div>
              <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Risky
              </h1>
            </div>
            <p className="text-3xl text-gray-600 mb-8">
              AI가 분석하는 당신만의 투자 성향 프로파일
            </p>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed">
              5분 만에 완성하는 과학적 투자 성향 분석으로<br />
              당신에게 가장 적합한 투자 전략을 발견하세요
            </p>
            <button
              onClick={() => setShowChat(true)}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-12 py-6 text-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              성향 테스트 시작하기
              <div className="absolute inset-0 bg-white/20 transition-transform duration-300 group-hover:scale-[2] group-hover:opacity-0"></div>
            </button>
            <div className="mt-16 animate-bounce">
              <ChevronDown className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      )}

      <div className={`max-w-4xl mx-auto px-4 py-12 ${!showChat && 'hidden'}`}>
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg border border-white/20">
          <div className="space-y-6 mb-8 h-[400px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-6 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {isAnalyzing ? (
            <div className="flex items-center justify-center gap-4 p-8 bg-blue-50 rounded-2xl">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="text-xl text-blue-800">AI가 당신의 투자 성향을 분석하고 있습니다...</span>
            </div>
          ) : !analysis ? (
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="메시지를 입력하세요..."
                className="flex-1 border-2 border-gray-200 rounded-2xl px-8 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl px-8 py-4 hover:opacity-90 transition-opacity"
              >
                <Send className="w-8 h-8" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;