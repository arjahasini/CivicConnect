import React, { useEffect, useMemo, useState } from 'react';

const initialIssues = [
  { id: 1001, title: 'Streetlight not working', category: 'Infrastructure', area: 'Ward 12', description: 'Streetlight near the community park is not working.', status: 'In Progress', date: '2026-10-20' },
  { id: 1002, title: 'Garbage collection delay', category: 'Sanitation', area: 'Ward 7', description: 'Waste collection has been delayed for two days.', status: 'Submitted', date: '2026-10-22' },
];
const announcements = [
  { title: 'Community clean-up drive', date: 'Oct 30, 2026', body: 'Residents are invited to join the local clean-up drive this Friday.' },
  { title: 'Public grievance meeting', date: 'Nov 2, 2026', body: 'Submit your concerns before the monthly ward meeting.' },
];
export default function App() {
  const [issues, setIssues] = useState(() => {
    try { return JSON.parse(localStorage.getItem('civic-issues')) || initialIssues; } catch { return initialIssues; }
  });
  const [form, setForm] = useState({ title: '', category: 'Infrastructure', area: '', description: '' });
  const [filter, setFilter] = useState('All');
  const [notice, setNotice] = useState('');
  useEffect(() => localStorage.setItem('civic-issues', JSON.stringify(issues)), [issues]);
  const visibleIssues = useMemo(() => filter === 'All' ? issues : issues.filter(i => i.status === filter), [issues, filter]);
  function submit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.area.trim() || !form.description.trim()) { setNotice('Please complete all fields.'); return; }
    setIssues([{ ...form, id: Date.now(), status: 'Submitted', date: new Date().toISOString().slice(0,10) }, ...issues]);
    setForm({ title: '', category: 'Infrastructure', area: '', description: '' });
    setNotice('Issue submitted successfully.');
  }
  return <main className="shell">
    <header className="topbar"><div className="brand"><span className="logo">C</span><div><b>CivicConnect</b><small>Community issue & announcement portal</small></div></div><span className="tag">DEMO PORTAL</span></header>
    <section className="hero"><div><p className="eyebrow">YOUR VOICE, YOUR COMMUNITY</p><h1>Make your community<br/><em>better together.</em></h1><p className="intro">Report local issues, follow progress, and stay informed about community announcements.</p><a href="#report" className="primary-link">Report an issue ↓</a></div><div className="hero-card"><span className="hero-icon">✦</span><p>Community overview</p><div className="stat-grid"><div><strong>{issues.length}</strong><small>Total requests</small></div><div><strong>{issues.filter(i=>i.status==='Resolved').length}</strong><small>Resolved</small></div><div><strong>{issues.filter(i=>i.status==='In Progress').length}</strong><small>In progress</small></div></div><div className="progress"><span style={{width: `${issues.length ? issues.filter(i=>i.status==='Resolved').length/issues.length*100 : 0}%`}}/></div><small>Resolution progress · demo data</small></div></section>
    <section className="content-grid">
      <div className="panel" id="report"><div className="section-heading"><div><p className="eyebrow">CITIZEN SERVICES</p><h2>Submit an issue</h2></div><span className="round-icon">＋</span></div>
        <form onSubmit={submit}><label>Issue title<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Broken road near school"/></label><div className="two"><label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Infrastructure</option><option>Sanitation</option><option>Water supply</option><option>Public safety</option><option>Other</option></select></label><label>Area / ward<input value={form.area} onChange={e=>setForm({...form,area:e.target.value})} placeholder="e.g. Ward 5"/></label></div><label>Description<textarea rows="3" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Describe the issue and its location..."/></label><button className="submit" type="submit">Submit request <span>→</span></button>{notice && <p className="notice" role="status">{notice}</p>}</form>
      </div>
      <div className="panel"><div className="section-heading"><div><p className="eyebrow">STAY INFORMED</p><h2>Announcements</h2></div><span className="round-icon">↗</span></div>{announcements.map((a,i)=><article className="announcement" key={a.title}><div className="announcement-mark">{i===0?'✦':'◷'}</div><div><small>{a.date}</small><h3>{a.title}</h3><p>{a.body}</p></div></article>)}</div>
    </section>
    <section className="panel requests"><div className="section-heading"><div><p className="eyebrow">TRANSPARENCY & TRACKING</p><h2>Your community requests</h2></div><select className="filter" value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Submitted</option><option>In Progress</option><option>Resolved</option></select></div>
      <div className="table-wrap"><table><thead><tr><th>Request</th><th>Area</th><th>Date</th><th>Status</th><th>Demo action</th></tr></thead><tbody>{visibleIssues.map(i=><tr key={i.id}><td><b>{i.title}</b><small>{i.category} · #{i.id}</small></td><td>{i.area}</td><td>{i.date}</td><td><span className={'status '+i.status.toLowerCase().replace(' ','-')}>{i.status}</span></td><td><button className="text-button" onClick={()=>setIssues(issues.map(x=>x.id===i.id?{...x,status:x.status==='Submitted'?'In Progress':x.status==='In Progress'?'Resolved':'Submitted'}:x))}>Cycle status ↻</button></td></tr>)}</tbody></table>{visibleIssues.length===0&&<p className="empty">No requests match this filter.</p>}</div><p className="footnote">Demo note: requests are saved in this browser using localStorage. Status cycling simulates an administrator workflow.</p>
    </section><footer>Built for community transparency · CivicConnect demo</footer>
  </main>;
}