'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, ThumbsUp, CheckCircle, MessageSquare, 
  Send, PlusCircle, ShieldCheck, Tag
} from 'lucide-react';
import { SEED_QA } from '@/lib/seedData';
import { QAQuestion } from '@/lib/types';
import { useApp } from '@/lib/store';

export default function QAPage() {
  const { user, addKarma } = useApp();
  const [questions, setQuestions] = useState<QAQuestion[]>(SEED_QA);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAskModal, setShowAskModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<QAQuestion['category']>('Women Solo Safety');

  // Reply states
  const [activeReplyQuestionId, setActiveReplyQuestionId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const filtered = questions.filter(q => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
    return true;
  });

  const handleUpvoteQuestion = (qId: string) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, upvotes: q.upvotes + 1 } : q));
  };

  const handleUpvoteAnswer = (qId: string, aId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id !== qId) return q;
      return {
        ...q,
        answers: q.answers.map(a => a.id === aId ? { ...a, upvotes: a.upvotes + 1 } : a)
      };
    }));
    addKarma(5, 'Upvoted a helpful roamer solution');
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newQ: QAQuestion = {
      id: `qa_${Date.now()}`,
      authorName: user.name,
      authorAvatar: user.avatar,
      isVerified: user.isVerified,
      title: newTitle,
      content: newContent,
      category: newCategory,
      upvotes: 1,
      answersCount: 0,
      createdAt: 'Just now',
      answers: []
    };

    setQuestions(prev => [newQ, ...prev]);
    setShowAskModal(false);
    setNewTitle('');
    setNewContent('');
    addKarma(10, 'Asked a conscious community question');
  };

  const handlePostAnswer = (qId: string) => {
    if (!replyText.trim()) return;

    setQuestions(prev => prev.map(q => {
      if (q.id !== qId) return q;
      const newAns = {
        id: `ans_${Date.now()}`,
        authorName: user.name,
        authorAvatar: user.avatar,
        isVerified: user.isVerified,
        content: replyText.trim(),
        upvotes: 1,
        isAccepted: false,
        createdAt: 'Just now'
      };
      return {
        ...q,
        answersCount: q.answersCount + 1,
        answers: [...q.answers, newAns]
      };
    }));

    setReplyText('');
    setActiveReplyQuestionId(null);
    addKarma(25, 'Helped a fellow traveller with practical guidance');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-sand-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sukoon-600">
            Roamer Knowledge Exchange
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900 mt-1">
            "Give Solutions" Roamer Q&A
          </h1>
          <p className="text-xs sm:text-sm text-sand-600 mt-1">
            Ask about visa limits, solo female night routes, sleeper train etiquette, and ashram life.
          </p>
        </div>

        <button
          onClick={() => setShowAskModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-sukoon-600 hover:bg-sukoon-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ask a Question</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {['all', 'Women Solo Safety', 'Visa & Regulations', 'Routes & Sleeper Trains', 'Spiritual Guidance', 'Budget Survival'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              selectedCategory === cat
                ? 'bg-sukoon-600 text-white border-sukoon-600'
                : 'bg-white text-sand-700 border-sand-200 hover:bg-sand-100'
            }`}
          >
            {cat === 'all' ? 'All Questions' : cat}
          </button>
        ))}
      </div>

      {/* Questions Feed */}
      <div className="space-y-6">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-3xl p-6 border border-sand-200 shadow-xs space-y-4"
          >
            {/* Author info & Category */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={q.authorAvatar}
                  alt={q.authorName}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-sand-300"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-sand-900">{q.authorName}</h4>
                    {q.isVerified && (
                      <span className="p-0.5 rounded-full bg-emerald-500 text-white" title="Verified Roamer">
                        <ShieldCheck className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-sand-400">{q.createdAt}</p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-sand-100 text-sand-700 text-[10px] font-bold">
                {q.category}
              </span>
            </div>

            {/* Title & Content */}
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-sand-900">{q.title}</h3>
              <p className="text-xs text-sand-700 leading-relaxed whitespace-pre-line">{q.content}</p>
            </div>

            {/* Upvote & Reply Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-sand-100 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleUpvoteQuestion(q.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-50 hover:bg-sand-100 text-sand-700 font-semibold border border-sand-200 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-sukoon-600" />
                  <span>{q.upvotes} Upvotes</span>
                </button>

                <span className="text-sand-500 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {q.answersCount} Solutions
                </span>
              </div>

              <button
                onClick={() => setActiveReplyQuestionId(activeReplyQuestionId === q.id ? null : q.id)}
                className="text-xs font-bold text-sukoon-600 hover:underline"
              >
                {activeReplyQuestionId === q.id ? 'Close Reply' : 'Give Solution'}
              </button>
            </div>

            {/* Answer Stream */}
            {q.answers.length > 0 && (
              <div className="pt-2 pl-4 border-l-2 border-sukoon-200 space-y-3">
                {q.answers.map((ans) => (
                  <div key={ans.id} className="p-3.5 bg-sand-50 rounded-2xl border border-sand-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={ans.authorAvatar}
                          alt={ans.authorName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-sand-900">{ans.authorName}</span>
                        {ans.isAccepted && (
                          <span className="flex items-center gap-1 px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            Best Solution
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleUpvoteAnswer(q.id, ans.id)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-sand-600 hover:text-sukoon-700"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{ans.upvotes}</span>
                      </button>
                    </div>

                    <p className="text-xs text-sand-800 leading-relaxed whitespace-pre-line">
                      {ans.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Active Reply Input Box */}
            {activeReplyQuestionId === q.id && (
              <div className="pt-2 space-y-2 animate-fadeIn">
                <textarea
                  rows={3}
                  placeholder="Write your verified local advice or practical experience..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none focus:ring-1 focus:ring-sukoon-500"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => handlePostAnswer(q.id)}
                    className="px-4 py-1.5 bg-sukoon-600 hover:bg-sukoon-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Post Solution (+25 Karma)
                  </button>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-sand-300 space-y-4">
            <h3 className="font-serif text-xl font-bold text-sand-900">
              Ask the Slow Roamer Community
            </h3>
            
            <form onSubmit={handlePostQuestion} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-sand-700 block mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as QAQuestion['category'])}
                  className="w-full p-2.5 text-xs bg-sand-50 rounded-xl border border-sand-300 focus:outline-none"
                >
                  <option value="Women Solo Safety">Women Solo Safety</option>
                  <option value="Visa & Regulations">Visa & Regulations</option>
                  <option value="Routes & Sleeper Trains">Routes & Sleeper Trains</option>
                  <option value="Spiritual Guidance">Spiritual Guidance</option>
                  <option value="Budget Survival">Budget Survival</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-sand-700 block mb-1">
                  Question Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Is it safe to take the 10 PM bus from Rishikesh to Delhi?"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full p-2.5 text-xs bg-sand-50 rounded-xl border border-sand-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-sand-700 block mb-1">
                  Details & Context
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Mention your dates, transport type, or specific concerns..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  className="w-full p-2.5 text-xs bg-sand-50 rounded-xl border border-sand-300 focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="flex-1 py-2.5 rounded-full bg-sand-100 text-sand-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-sukoon-600 hover:bg-sukoon-700 text-white text-xs font-bold shadow-xs"
                >
                  Ask Question (+10 Karma)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

