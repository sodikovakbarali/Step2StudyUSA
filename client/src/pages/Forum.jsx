import React, { useState } from 'react';
import '../styles/Forum.css';
import '../styles/shared/Headings.css';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1500&q=80';

const Forum = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: 'Best Universities for Computer Science',
      author: 'JohnDoe',
      date: '2024-04-30',
      replies: 15,
      views: 120
    },
    {
      id: 2,
      title: 'Scholarship Application Tips',
      author: 'JaneSmith',
      date: '2024-04-29',
      replies: 8,
      views: 95
    }
  ]);

  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');

  const handleCreateThread = (e) => {
    e.preventDefault();
    if (newThreadTitle && newThreadContent) {
      const newThread = {
        id: threads.length + 1,
        title: newThreadTitle,
        author: 'CurrentUser', // This would be replaced with actual user data
        date: new Date().toISOString().split('T')[0],
        replies: 0,
        views: 0
      };
      setThreads([newThread, ...threads]);
      setNewThreadTitle('');
      setNewThreadContent('');
    }
  };

  return (
    <div className="forum-page">
      <div className="forum-hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="forum-hero-overlay" />
        <div className="forum-hero-content">
          <h1 className="forum-title">University Forum</h1>
        </div>
      </div>

      <div className="forum-container">
        <div className="create-thread-section">
          <h2 className="section-heading">Start a New Discussion</h2>
          <form onSubmit={handleCreateThread}>
            <input
              type="text"
              placeholder="Thread Title"
              value={newThreadTitle}
              onChange={(e) => setNewThreadTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Your message..."
              value={newThreadContent}
              onChange={(e) => setNewThreadContent(e.target.value)}
              required
            />
            <button type="submit">Create Thread</button>
          </form>
        </div>

        <div className="threads-section">
          <h2 className="section-heading">Recent Discussions</h2>
          <div className="threads-list">
            {threads.map(thread => (
              <div key={thread.id} className="thread-card">
                <div className="thread-header">
                  <h3>{thread.title}</h3>
                  <span className="author">by {thread.author}</span>
                </div>
                <div className="thread-meta">
                  <span>Posted on: {thread.date}</span>
                  <span>Replies: {thread.replies}</span>
                  <span>Views: {thread.views}</span>
                </div>
                <button className="view-thread-button">View Discussion</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
