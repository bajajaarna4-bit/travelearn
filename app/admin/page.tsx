'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, Users, Bed, Briefcase, 
  Check, X, Eye, ShieldAlert, BarChart3, Filter
} from 'lucide-react';

interface PendingVerification {
  id: string;
  name: string;
  email: string;
  idType: 'Aadhaar Card' | 'Passport' | 'Voter ID';
  documentNumber: string;
  submittedAt: string;
  selfieUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface SafetyReport {
  id: string;
  reportedEntity: string;
  reportedBy: string;
  reason: string;
  reportedAt: string;
  severity: 'Critical' | 'Moderate';
  status: 'Open' | 'Resolved';
}

const INITIAL_VERIFICATIONS: PendingVerification[] = [
  {
    id: 'ver_1',
    name: 'Rohit Khandelwal',
    email: 'rohit.k@gmail.com',
    idType: 'Aadhaar Card',
    documentNumber: 'XXXX-XXXX-4912',
    submittedAt: 'Today 10:14 AM',
    selfieUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    status: 'Pending'
  },
  {
    id: 'ver_2',
    name: 'Camille Dupont',
    email: 'camille.d@outlook.fr',
    idType: 'Passport',
    documentNumber: '21AB94812',
    submittedAt: 'Yesterday 4:30 PM',
    selfieUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    status: 'Pending'
  }
];

const INITIAL_REPORTS: SafetyReport[] = [
  {
    id: 'rep_1',
    reportedEntity: 'Old Town Taxi Carpool (Jaipur)',
    reportedBy: 'Kavita M.',
    reason: 'Driver attempted to add 2 unverified male passengers at a highway stop without prior consent.',
    reportedAt: 'Yesterday 8:00 PM',
    severity: 'Critical',
    status: 'Open'
  }
];

export default function AdminDashboardPage() {
  const [verifications, setVerifications] = useState<PendingVerification[]>(INITIAL_VERIFICATIONS);
  const [reports, setReports] = useState<SafetyReport[]>(INITIAL_REPORTS);
  const [activeTab, setActiveTab] = useState<'verifications' | 'reports' | 'analytics'>('verifications');

  const handleApproveVerification = (id: string) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'Approved' } : v));
  };

  const handleRejectVerification = (id: string) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'Rejected' } : v));
  };

  const handleResolveReport = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sand-500">
            Trust & Security Desk
          </span>
          <h1 className="font-serif text-3xl font-bold text-sand-900 mt-1">
            Admin Moderation Desk
          </h1>
          <p className="text-xs text-sand-600 mt-0.5">
            Manual ID verifications, safety report investigations, and platform metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Safety Desk Online
          </span>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sand-500 block">Active Roamers</span>
          <span className="font-serif text-2xl font-bold text-sand-900 mt-1 block">1,482</span>
          <span className="text-[11px] text-emerald-600 font-semibold">+84 this week</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 block">Verified Sanctuaries</span>
          <span className="font-serif text-2xl font-bold text-forest-800 mt-1 block">94</span>
          <span className="text-[11px] text-forest-600 font-semibold">100% ID checked</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">Pending Reviews</span>
          <span className="font-serif text-2xl font-bold text-amber-700 mt-1 block">
            {verifications.filter(v => v.status === 'Pending').length}
          </span>
          <span className="text-[11px] text-sand-500">Gov IDs waiting</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block">Open Safety Reports</span>
          <span className="font-serif text-2xl font-bold text-red-600 mt-1 block">
            {reports.filter(r => r.status === 'Open').length}
          </span>
          <span className="text-[11px] text-red-600 font-semibold">Urgent escalation</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-sand-100 p-1.5 rounded-2xl border border-sand-200 text-xs font-semibold max-w-md">
        <button
          onClick={() => setActiveTab('verifications')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'verifications' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600'
          }`}
        >
          ID Approvals ({verifications.filter(v => v.status === 'Pending').length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'reports' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600'
          }`}
        >
          Safety Reports ({reports.filter(r => r.status === 'Open').length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'analytics' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600'
          }`}
        >
          Overview & Audit
        </button>
      </div>

      {/* Tab 1: Verifications Queue */}
      {activeTab === 'verifications' && (
        <div className="space-y-4">
          {verifications.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.selfieUrl}
                  alt={item.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-sand-200"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-base text-sand-900">{item.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-sand-100 text-sand-700">
                      {item.idType}
                    </span>
                  </div>
                  <p className="text-xs text-sand-500">{item.email} • Doc No: {item.documentNumber}</p>
                  <p className="text-[11px] text-sand-400">Submitted: {item.submittedAt}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleRejectVerification(item.id)}
                      className="px-4 py-2 rounded-xl bg-sand-100 text-sand-700 hover:bg-sand-200 font-semibold text-xs transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproveVerification(item.id)}
                      className="px-4 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Issue Badge</span>
                    </button>
                  </>
                ) : (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Safety Reports Queue */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="bg-white p-6 rounded-3xl border border-red-200 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="font-serif font-bold text-sm text-sand-900">
                    Flagged: {rep.reportedEntity}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 uppercase">
                  {rep.severity} Severity
                </span>
              </div>

              <p className="text-xs text-sand-700 leading-relaxed bg-red-50/50 p-3 rounded-2xl border border-red-100">
                "{rep.reason}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-sand-100 text-xs">
                <span className="text-sand-500 text-[11px]">Reported by {rep.reportedBy} • {rep.reportedAt}</span>
                {rep.status === 'Open' ? (
                  <button
                    onClick={() => handleResolveReport(rep.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-sand-900 hover:bg-black text-white font-bold text-xs"
                  >
                    Suspend Listing & Mark Resolved
                  </button>
                ) : (
                  <span className="text-emerald-700 font-bold">✓ Action Taken & Resolved</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Analytics */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-sand-900">Platform Health & Safety Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-1">
              <span className="text-sand-500 font-bold">Average Host Verification Time</span>
              <p className="font-serif text-xl font-bold text-sand-900">3.4 hours</p>
            </div>
            <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-1">
              <span className="text-sand-500 font-bold">SOS Test Siren Readiness</span>
              <p className="font-serif text-xl font-bold text-emerald-700">99.8% Uptime</p>
            </div>
            <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-1">
              <span className="text-sand-500 font-bold">Volunteer Visa Compliance Rate</span>
              <p className="font-serif text-xl font-bold text-sukoon-700">100% Non-Monetary</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

