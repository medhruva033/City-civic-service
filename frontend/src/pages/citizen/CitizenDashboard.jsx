
import { useState } from 'react';
import {
  LayoutDashboard,
  FilePlus2,
  ClipboardList,
  CheckCircle2,
  Clock3,
  AlertCircle,
  MapPin,
  Bell,
  UserCircle,
  LogOut,
  Menu,
  Search,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const complaints = [
  {
    id: 'CIV-1001',
    title: 'Damaged road near main street',
    category: 'Road Problems',
    date: '04 Nov 2026',
    status: 'In Progress',
  },
  {
    id: 'CIV-1002',
    title: 'Street light not working',
    category: 'Street Lighting',
    date: '02 Nov 2026',
    status: 'Pending',
  },
  {
    id: 'CIV-1003',
    title: 'Garbage collection delay',
    category: 'Waste Management',
    date: '29 Oct 2026',
    status: 'Resolved',
  },
];

function CitizenDashboard() {
  const [active, setActive] = useState('Dashboard');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Complaints', icon: ClipboardList },
    { name: 'Submit Complaint', icon: FilePlus2 },
  ];

  const filteredComplaints = complaints.filter((complaint) =>
    `${complaint.id} ${complaint.title} ${complaint.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const stats = [
    { label: 'Total Complaints', value: '12', icon: ClipboardList, color: 'blue' },
    { label: 'Pending', value: '03', icon: Clock3, color: 'orange' },
    { label: 'In Progress', value: '04', icon: AlertCircle, color: 'purple' },
    { label: 'Resolved', value: '05', icon: CheckCircle2, color: 'green' },
  ];

  return (
    <div className="citizen-dashboard">
      <aside className={`citizen-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="citizen-brand">
          <div className="citizen-brand-icon">🏢</div>
          <div>
            <h2>CityCivic</h2>
            <span>CITIZEN PORTAL</span>
          </div>
        </div>

        <p className="sidebar-label">MENU</p>

        <nav className="citizen-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={active === item.name ? 'active' : ''}
                onClick={() => {
                  setActive(item.name);
                  setMenuOpen(false);
                }}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <MapPin size={20} />
            <strong>Need assistance?</strong>
            <p>Contact your municipal support team.</p>
          </div>
          <button className="logout-button">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="citizen-main">
        <header className="citizen-header">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          <div>
            <h3>Citizen Dashboard</h3>
            <p>Manage your civic complaints and requests.</p>
          </div>

          <div className="citizen-header-actions">
            <button className="notification-button" aria-label="Notifications">
              <Bell size={19} />
            </button>
            <div className="citizen-profile">
              <UserCircle size={32} />
              <div>
                <strong>Ram K</strong>
                <span>Citizen</span>
              </div>
            </div>
          </div>
        </header>

        <section className="citizen-content">
          {active === 'Dashboard' ? (
            <>
              <div className="dashboard-welcome">
                <div>
                  <span className="welcome-label">CITIZEN PORTAL</span>
                  <h1>Welcome back, Ram!</h1>
                  <p>Here is an overview of your civic service activity.</p>
                </div>
                <Link to="/complaints/new" className="new-complaint-button">
                  <FilePlus2 size={18} />
                  Submit New Complaint
                </Link>
              </div>

              <div className="citizen-stats">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <article className="citizen-stat-card" key={stat.label}>
                      <div className={`stat-icon ${stat.color}`}>
                        <Icon size={21} />
                      </div>
                      <p>{stat.label}</p>
                      <h2>{stat.value}</h2>
                    </article>
                  );
                })}
              </div>

              <section className="complaints-section">
                <div className="complaints-heading">
                  <div>
                    <h2>Recent Complaints</h2>
                    <p>Track the latest updates on your complaints.</p>
                  </div>
                  <button
                    className="view-all-button"
                    onClick={() => setActive('My Complaints')}
                  >
                    View all <ArrowUpRight size={16} />
                  </button>
                </div>

                <div className="complaint-search">
                  <Search size={18} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search complaints..."
                  />
                </div>

                <div className="complaint-table-wrapper">
                  <table className="complaint-table">
                    <thead>
                      <tr>
                        <th>Complaint ID</th>
                        <th>Complaint</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredComplaints.map((complaint) => (
                        <tr key={complaint.id}>
                          <td>{complaint.id}</td>
                          <td>{complaint.title}</td>
                          <td>{complaint.category}</td>
                          <td>{complaint.date}</td>
                          <td>
                            <span
                              className={`complaint-status ${complaint.status
                                .toLowerCase()
                                .replace(' ', '-')}`}
                            >
                              {complaint.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredComplaints.length === 0 && (
                        <tr>
                          <td colSpan="5">No matching complaints found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : (
            <section className="complaints-section">
              <h2>{active}</h2>
              <p>
                This section will be implemented in the next development step.
              </p>
              {active === 'Submit Complaint' && (
                <Link to="/complaints/new" className="new-complaint-button">
                  <FilePlus2 size={18} /> Open complaint form
                </Link>
              )}
            </section>
          )}
        </section>
      </main>
    </div>
  );
}

export default CitizenDashboard;
