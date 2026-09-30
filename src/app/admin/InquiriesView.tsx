import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Clock, User } from 'lucide-react';

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
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Quotation Inquiries</h2>
        <p className="text-xs text-slate-500 mt-1">
          Direct leads submitted from the public website consultation form
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inquiries</div>
          <div className="text-2xl font-black text-slate-900">24</div>
          <div className="text-[11px] text-sky-700 font-semibold">Past 30 days</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Uncontacted</div>
          <div className="text-2xl font-black text-emerald-600">1</div>
          <div className="text-[11px] text-slate-500">Needs immediate follow-up</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Response Time</div>
          <div className="text-2xl font-black text-cyan-600">1.8 Hrs</div>
          <div className="text-[11px] text-slate-500">Standard &lt; 4 Hours</div>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">Recent Customer Requests</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {inquiries.map((inq) => (
            <div key={inq.id} className="p-6 hover:bg-sky-50/40 transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs border border-sky-100">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">{inq.name}</div>
                    <div className="text-xs text-sky-700 font-bold">{inq.serviceType}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {inq.date}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    {inq.status}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="text-slate-500 text-[11px] font-bold">
                  Source: <span className="text-slate-900">{inq.waterSource}</span>
                </div>
                <div className="text-slate-700 leading-relaxed font-sans">
                  "{inq.message}"
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1 font-semibold">
                <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-sky-600 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{inq.phone}</span>
                </a>
                <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-sky-600 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
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