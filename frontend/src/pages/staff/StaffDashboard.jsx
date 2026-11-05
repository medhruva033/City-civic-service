
import { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Search,
  Bell,
  UserCircle,
  LogOut,
  MapPin,
  CalendarDays,
  Eye,
  Menu,
} from 'lucide-react';

const initialComplaints = [
  {
    id: 'CIV-1001',
    title: 'Damaged road near JP Nagar',
    category: 'Road Problems',
    location: 'JP Nagar, Bengaluru',
    date: '04 Nov 2026',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 'CIV-1002',
    title: 'Garbage collection delay',
    category: 'Waste Management',
    location: 'BTM Layout, Bengaluru',
    date: '02 Nov 2026',
    priority: 'Medium',
    status: 'Pending',
  },
  {
    id: 'CIV-1003',
    title: 'Street light not working',
    category: 'Street Lighting',
    location: 'RR Nagar, Bengaluru',
    date: '01 Nov 2026',
    priority: 'High',
    status: 'Pending',
  },
  {
    id: 'CIV-1004',
    title: 'Water leakage near apartment',
    category: 'Water Supply',
    location: 'Vijayanagar, Bengaluru',
    date: '30 Oct 2026',
    priority: 'Low',
    status: 'Resolved',
  },
];

function StaffDashboard() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      `${complaint.id} ${complaint.title} ${complaint.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === 'All' || complaint.status === filter;

    return matchesSearch && matchesFilter;
  });

  const updateStatus = (id, status) => {
    setComplaints((previous) =>
      previous.map((complaint) =>
        complaint.id === id
          ? { ...complaint, status }
          : complaint
      )
    );

    setSelectedComplaint(null);
    setRemarks('');
  };

  const stats = [
    {
      label: 'Assigned Complaints',
      value: complaints.length,
      icon: ClipboardList,
      color: 'blue',
    },
    {
      label: 'Pending',
      value: complaints.filter((c) => c.status === 'Pending').length,
      icon: Clock3,
      color: 'orange',
    },
    {
      label: 'In Progress',
      value: complaints.filter((c) => c.status === 'In Progress').length,
      icon: AlertCircle,
      color: 'purple',
    },
    {
      label: 'Resolved',
      value: complaints.filter((c) => c.status === 'Resolved').length,
      icon: CheckCircle2,
      color: 'green',
    },
  ];

  return (
    <div className="staff-dashboard">
      <aside className={`staff-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="staff-brand">
          <div className="staff-brand-icon">🏢</div>
          <div>
            <h2>CityCivic</h2>
            <span>STAFF PORTAL</span>
          </div>
        </div>

        <p className="staff-menu-label">WORKSPACE</p>

        <nav className="staff-navigation">
          <button className="active">
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button onClick={() => setFilter('All')}>
            <ClipboardList size={19} />
            All Assignments
          </button>

          <button onClick={() => setFilter('Pending')}>
            <Clock3 size={19} />
            Pending Tasks
          </button>

          <button onClick={() => setFilter('Resolved')}>
            <CheckCircle2 size={19} />
            Resolved
          </button>
        </nav>

        <div className="staff-sidebar-bottom">
          <div className="staff-help">
            <AlertCircle size={20} />
            <strong>Staff Support</strong>
            <p>Contact your administrator for assistance.</p>
          </div>

          <button className="staff-logout">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="staff-main">
        <header className="staff-header">
          <button
            className="staff-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          <div>
            <h3>Staff Dashboard</h3>
            <p>Manage your assigned civic complaints.</p>
          </div>

          <div className="staff-header-actions">
            <button className="staff-notification" aria-label="Notifications">
              <Bell size={19} />
            </button>

            <div className="staff-profile">
              <UserCircle size={32} />
              <div>
                <strong>Staff Member</strong>
                <span>Municipal Staff</span>
              </div>
            </div>
          </div>
        </header>

        <section className="staff-content">
          <div className="staff-welcome">
            <div>
              <span>STAFF WORKSPACE</span>
              <h1>Welcome back!</h1>
              <p>Here is your complaint management overview.</p>
            </div>
          </div>

          <div className="staff-stats">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article className="staff-stat-card" key={stat.label}>
                  <div className={`staff-stat-icon ${stat.color}`}>
                    <Icon size={21} />
                  </div>
                  <p>{stat.label}</p>
                  <h2>{stat.value}</h2>
                </article>
              );
            })}
          </div>

          <section className="staff-complaints">
            <div className="staff-complaints-heading">
              <div>
                <h2>Assigned Complaints</h2>
                <p>Review and update your complaint assignments.</p>
              </div>
            </div>

            <div className="staff-filters">
              <div className="staff-search">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search complaint..."
                />
              </div>

              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="staff-table-wrapper">
              <table className="staff-table">
                <thead>
                  <tr>
                    <th>Complaint</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredComplaints.map((complaint) => (
                    <tr key={complaint.id}>
                      <td>
                        <strong>{complaint.id}</strong>
                        <span>{complaint.title}</span>
                      </td>
                      <td>{complaint.category}</td>
                      <td>
                        <span className={`staff-priority ${complaint.priority.toLowerCase()}`}>
                          {complaint.priority}
                        </span>
                      </td>
                      <td>{complaint.date}</td>
                      <td>
                        <span className={`staff-status ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="staff-view-button"
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setRemarks('');
                          }}
                        >
                          <Eye size={15} /> View
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredComplaints.length === 0 && (
                    <tr>
                      <td colSpan="6">No complaints found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {selectedComplaint && (
            <div className="staff-modal-overlay">
              <section className="staff-modal">
                <div className="staff-modal-heading">
                  <div>
                    <span>COMPLAINT DETAILS</span>
                    <h2>{selectedComplaint.id}</h2>
                  </div>
                  <button onClick={() => setSelectedComplaint(null)}>
                    ✕
                  </button>
                </div>

                <h3>{selectedComplaint.title}</h3>

                <p>
                  <MapPin size={15} /> {selectedComplaint.location}
                </p>

                <p>
                  <CalendarDays size={15} /> {selectedComplaint.date}
                </p>

                <p>Category: {selectedComplaint.category}</p>
                <p>Priority: {selectedComplaint.priority}</p>
                <p>Current status: {selectedComplaint.status}</p>

                <label>Resolution / Progress Remarks</label>
                <textarea
                  rows="4"
                  value={remarks}
                  onChange={(event) => setRemarks(event.target.value)}
                  placeholder="Enter your progress or resolution remarks..."
                />

                <label>Update Status</label>
                <select
                  value={selectedComplaint.status}
                  onChange={(event) =>
                    setSelectedComplaint({
                      ...selectedComplaint,
                      status: event.target.value,
                    })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <button
                  className="staff-save-button"
                  onClick={() =>
                    updateStatus(
                      selectedComplaint.id,
                      selectedComplaint.status
                    )
                  }
                  disabled={!remarks.trim()}
                >
                  Save Update
                </button>

                <small>
                  Demo only: changes are stored in React state and
                  will reset when the page reloads.
                </small>
              </section>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default StaffDashboard;
