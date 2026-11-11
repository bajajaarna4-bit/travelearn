'use client';

import React, { useState } from 'react';
import { Send, X, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function InAppChatModal() {
  const { activeChatRecipient, closeChat, messages, sendMessage, user } = useApp();
  const [text, setText] = useState('');

  if (!activeChatRecipient) return null;

  const chatMessages = messages.filter(
    m =>
      (m.senderId === user.id && m.recipientId === activeChatRecipient.id) ||
      (m.senderId === activeChatRecipient.id && m.recipientId === user.id)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-sand-300 flex flex-col overflow-hidden animate-slideUp max-h-[520px]">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-sukoon-800 to-terracotta text-white p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={activeChatRecipient.avatar}
            alt={activeChatRecipient.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-white/40"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-xs text-white leading-tight">{activeChatRecipient.name}</h3>
              <span className="p-0.5 rounded-full bg-emerald-500 text-white" title="Verified Host">
                <ShieldCheck className="w-3 h-3" />
              </span>
            </div>
            <p className="text-[10px] text-sand-200">Protected In-App Messaging</p>
          </div>
        </div>

        <button
          onClick={closeChat}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-amber-50 px-3 py-1.5 border-b border-amber-200 text-[10px] text-amber-900 flex items-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
        <span>For women's safety, keep talks on-platform. Do not wire upfront cash or bank transfers.</span>
      </div>

      {/* Messages Scroll Body */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-sand-50/60 min-h-[260px] max-h-[340px]">
        {chatMessages.length > 0 ? (
          chatMessages.map((msg) => {
            const isMe = msg.senderId === user.id;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-sukoon-600 text-white rounded-br-none'
                      : 'bg-white text-sand-900 border border-sand-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[9px] mt-1 block text-right ${
                      isMe ? 'text-sand-200' : 'text-sand-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-xs text-sand-500">
            No previous messages. Introduce yourself and coordinate your visit!
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-sand-200 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Type a safe message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:ring-1 focus:ring-sukoon-500"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="p-2.5 rounded-xl bg-sukoon-600 hover:bg-sukoon-700 disabled:opacity-50 text-white transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}

