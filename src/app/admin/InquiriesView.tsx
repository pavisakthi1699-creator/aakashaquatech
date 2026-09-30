import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Clock, CheckCircle2, User, FileText } from 'lucide-react';

export const InquiriesView: React.FC = () => {
  const [inquiries] = useState([
    {
      id: 1,
      name: 'Dr. Ramesh Reddy',
      phone: '+91 98490 12345',
      email: 'ramesh.reddy@hyderabadpharma.com',
      serviceType: 'Industrial RO Plant (10,000 LPH)',
      waterSource: 'Borewell / High TDS (2400 PPM)',
      message: 'Need urgent turnkey quotation for pharma manufacturing plant setup with SS316 piping and automatic backwash.',
      date: 'Today, 10:45 AM',
      status: 'New'
    },
    {
      id: 2,
      name: 'K. Srinivasan',
      phone: '+91 94401 56789',
      email: 'srinivasan@greenspringresorts.in',
      serviceType: 'Automatic Commercial Water Softener',
      waterSource: 'Borewell (Hard Water scaling in boilers)',
      message: 'Hardness level is 680 PPM. Looking for 35,000 LPD commercial softener system for 60-room resort.',
      date: 'Yesterday, 4:20 PM',
      status: 'Contacted'
    },
    {
      id: 3,
      name: 'Praveen Kumar',
      phone: '+91 99887 76655',
      email: 'praveen@zenithapartments.org',
      serviceType: 'Sewage Treatment Plant (STP - MBR)',
      waterSource: 'Domestic Sewage Wastewater',
      message: 'Required 100 KLD STP plant for 220 flat residential township with PCB compliance for gardening and flushing.',
      date: '28 Sep 2026',
      status: 'Quotation Sent'
    }
  ]);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Customer Quotation Inquiries</h2>
        <p className="text-xs text-slate-400 mt-1">
          Direct leads submitted from the public website consultation form
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Inquiries</div>
          <div className="text-2xl font-black text-white">24</div>
          <div className="text-[11px] text-sky-400">Past 30 days</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Uncontacted</div>
          <div className="text-2xl font-black text-emerald-400">1</div>
          <div className="text-[11px] text-slate-400">Needs immediate follow-up</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Response Time</div>
          <div className="text-2xl font-black text-cyan-400">1.8 Hrs</div>
          <div className="text-[11px] text-slate-400">Standard &lt; 4 Hours</div>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-base font-bold text-white">Recent Customer Requests</h3>
        </div>

        <div className="divide-y divide-slate-800">
          {inquiries.map((inq) => (
            <div key={inq.id} className="p-6 hover:bg-slate-800/40 transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-600/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{inq.name}</div>
                    <div className="text-xs text-sky-400 font-semibold">{inq.serviceType}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {inq.date}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    {inq.status}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
                <div className="text-slate-400 text-[11px] font-semibold">
                  Source: <span className="text-white">{inq.waterSource}</span>
                </div>
                <div className="text-slate-300 leading-relaxed font-sans">
                  "{inq.message}"
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{inq.phone}</span>
                </a>
                <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{inq.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};