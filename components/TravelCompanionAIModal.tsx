'use client';

import React, { useState } from 'react';
import { Sparkles, Send, X, ShieldAlert, Bot, User, CheckCircle } from 'lucide-react';

interface TravelCompanionAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sourceDisclaimer?: string;
}

const PRESET_QUERIES = [
  'Is Pushkar safe for a solo woman in the evening?',
  'Can I do voluntary work-exchange on an Indian e-Tourist Visa?',
  'What is a realistic daily slow travel budget in Rishikesh?',
  'What are the cultural rules when staying in a Hindu ashram?'
];

const KNOWLEDGE_BASE: Record<string, { answer: string; source: string }> = {
  'pushkar': {
    answer: `Pushkar is generally very welcoming and considered one of Rajasthan's safest pilgrimage towns for women travellers. Key safety tips:
1. Stay along Brahma Temple road or Savitri hill base; avoid unlit sand trails past 10 PM.
2. Politely refuse self-appointed priests ("pandas") who offer flowers at the ghats and then demand money — a firm "Nahin, dhanyavaad" (No thank you) is universally understood.
3. Pushkar is strictly vegetarian and alcohol-free within holy municipal limits.
4. Keep the Women Safety Shield active in SukoonRoute with local police (112) one-tap ready.`,
    source: 'SukoonRoute Community Host Devika Rathore & Rajasthan Tourism Police guidelines.'
  },
  'visa': {
    answer: `Foreign nationals holding an Indian e-Tourist or regular Tourist Visa are legally prohibited from engaging in gainful or remunerated employment. However:
1. Voluntary non-commercial cultural exchange, educational learning, and cost-sharing barter (where no monetary salary or invoice is paid) are recognized cultural immersion practices.
2. Your host must provide boarding and food as hospitality, never disguised cash wages.
3. If receiving financial compensation or stipends, an Employment (E) Visa or Volunteer Visa is mandatory under Bureau of Immigration (FRRO) norms.`,
    source: 'Ministry of Home Affairs (Foreigners Division) & FRRO General Visa Regulations.'
  },
  'budget': {
    answer: `A slow roamer budget in Rishikesh (Tapovan / Swargashram) averages ₹350 - ₹600 per day:
• Ashram Dorm: ₹250 - ₹400 / night (often includes 2 Sattvic meals + morning yoga).
• Work-Exchange: ₹0 / night in exchange for 3-4 hours gardening or social media help.
• Food: ₹150 / day for fresh thalis, ginger lemon tea & seasonal fruits.
• Transport: ₹50 / day for shared Vikram autos across Ram Jhula / Tapovan.`,
    source: 'Aggregated community reports from verified SukoonRoute roamers (2024-2025).'
  },
  'ashram': {
    answer: `Ashrams are places of spiritual sadhana (practice), not budget holiday hotels:
1. Modest dress code: Cover shoulders and knees (loose cotton kurta or salwar).
2. Daily schedule: Most ashrams wake at 5:00 AM for morning chanting or meditation; gates often close by 9:30 PM.
3. Diet: Strictly vegetarian (Sattvic, often no garlic/onion). Alcohol, smoking, and recreational substances are strictly forbidden.
4. Seva (selfless service): Washing your own metal dining thali and keeping quiet spaces tidy is expected and welcomed.`,
    source: 'Parmarth Niketan & Shivananda Ashram visitor protocols.'
  }
};

export default function TravelCompanionAIModal({ isOpen, onClose }: TravelCompanionAIModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm_init',
      sender: 'ai',
      text: 'Namaste roamer! I am your Sukoon AI Companion. Ask me anything about slow travel routes, ashram etiquette, solo female safety, daily budgets, or work-exchange visa laws.',
      sourceDisclaimer: 'AI guidance is for informational and cultural context only. Always follow local law and official advisories.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedData = KNOWLEDGE_BASE['pushkar'];

      if (lower.includes('visa') || lower.includes('work') || lower.includes('tourist')) {
        matchedData = KNOWLEDGE_BASE['visa'];
      } else if (lower.includes('budget') || lower.includes('cost') || lower.includes('money') || lower.includes('rishikesh')) {
        matchedData = KNOWLEDGE_BASE['budget'];
      } else if (lower.includes('ashram') || lower.includes('rule') || lower.includes('custom') || lower.includes('spiritual')) {
        matchedData = KNOWLEDGE_BASE['ashram'];
      }

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: matchedData.answer,
        sourceDisclaimer: matchedData.source
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl border border-sand-300 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-forest-800 via-forest-700 to-sukoon-800 text-white p-4 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-emerald-300">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold">Travel Companion AI</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200">
                  Verified Knowledge
                </span>
              </div>
              <p className="text-[11px] text-emerald-100">
                Safety, visa norms, ashram customs & slow budget advisor
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-sand-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-forest-700 text-white flex items-center justify-center flex-shrink-0 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-sukoon-600 text-white rounded-br-none'
                    : 'bg-white text-sand-900 border border-sand-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                {m.sourceDisclaimer && (
                  <div className="mt-2.5 pt-2 border-t border-sand-200 text-[10px] text-sand-500 italic flex items-start gap-1">
                    <CheckCircle className="w-3 h-3 text-forest-600 flex-shrink-0 mt-0.5" />
                    <span>Source: {m.sourceDisclaimer}</span>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-sand-300 flex items-center justify-center flex-shrink-0 text-xs text-sand-700 font-bold">
                  You
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-sand-500 italic pl-10">
              <span className="w-2 h-2 rounded-full bg-sand-400 animate-ping" />
              <span>Consulting cultural records & safety rules...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="p-2.5 bg-sand-100 border-t border-sand-200 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
          {PRESET_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white text-sand-700 hover:bg-sand-200 border border-sand-300 transition-colors flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-sand-200 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Ask about solo safety, visa rules, budgets, ashram etiquette..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-3.5 py-2 text-xs bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:ring-1 focus:ring-forest-600"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 disabled:opacity-50 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

