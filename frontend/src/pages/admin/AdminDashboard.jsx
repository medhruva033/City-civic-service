
import { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  UserCog,
  ChartNoAxesCombined,
  Search,
  Bell,
  UserCircle,
  LogOut,
  Eye,
  UserPlus,
  Menu,
  CheckCircle2,
  Clock3,
  AlertCircle,
  X,
} from 'lucide-react';

const initialComplaints = [
  {
    id: 'CIV-1001',
    title: 'Damaged road near JP Nagar',
    category: 'Road Problems',
    citizen: 'Ram K',
    priority: 'High',
    status: 'In Progress',
    staff: 'Arun Kumar',
  },
  {
    id: 'CIV-1002',
    title: 'Garbage collection delay',
    category: 'Waste Management',
    citizen: 'Priya S',
    priority: 'Medium',
    status: 'Pending',
    staff: 'Unassigned',
  },
  {
    id: 'CIV-1003',
    title: 'Street light not working',
    category: 'Street Lighting',
    citizen: 'Rahul M',
    priority: 'High',
    status: 'Pending',
    staff: 'Unassigned',
  },
  {
    id: 'CIV-1004',
    title: 'Water leakage near apartment',
    category: 'Water Supply',
    citizen: 'Ananya R',
    priority: 'Low',
    status: 'Resolved',
    staff: 'Suresh B',
  },
];

const initialUsers = [
  { id: 1, name: 'Ram K', email: 'ram@gmail.com', role: 'Citizen' },
  { id: 2, name: 'Priya S', email: 'priya@gmail.com', role: 'Citizen' },
  { id: 3, name: 'Arun Kumar', email: 'arun@gmail.com', role: 'Staff' },
  { id: 4, name: 'Suresh B', email: 'suresh@gmail.com', role: 'Staff' },
];

const staffMembers = ['Arun Kumar', 'Suresh B', 'Manoj R'];

function AdminDashboard() {
  const [activePage, setActivePage] = useState('Overview');
  const [complaints, setComplaints] = useState(initialComplaints);
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const navigation = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Complaints', icon: ClipboardList },
    { name: 'User Management', icon: Users },
    { name: 'Staff Management', icon: UserCog },
    { name: 'Analytics', icon: ChartNoAxesCombined },
  ];

  const totalCitizens = users.filter((user) => user.role === 'Citizen').length;
  const totalStaff = users.filter((user) => user.role === 'Staff').length;
  const pending = complaints.filter((c) => c.status === 'Pending').length;
  const resolved = complaints.filter((c) => c.status === 'Resolved').length;

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      `${complaint.id} ${complaint.title} ${complaint.citizen}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      filter === 'All' || complaint.status === filter;

    return matchesSearch && matchesStatus;
  });

  const assignStaff = () => {
    if (!selectedStaff || !selectedComplaint) return;

    setComplaints((previous) =>
      previous.map((complaint) =>
        complaint.id === selectedComplaint.id
          ? {
              ...complaint,
              staff: selectedStaff,
              status:
                complaint.status === 'Pending'
                  ? 'In Progress'
                  : complaint.status,
            }
          : complaint
      )
    );

    setNotice(`${selectedComplaint.id} assigned to ${selectedStaff}.`);
    setSelectedComplaint(null);
    setSelectedStaff('');
  };

  const updateUserRole = (id, role) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id ? { ...user, role } : user
      )
    );
  };

  const stats = [
    {
      label: 'Total Complaints',
      value: complaints.length,
      icon: ClipboardList,
      color: 'blue',
    },
    {
      label: 'Registered Citizens',
      value: totalCitizens,
      icon: Users,
      color: 'purple',
    },
    {
      label: 'Municipal Staff',
      value: totalStaff,
      icon: UserCog,
      color: 'orange',
    },
    {
      label: 'Resolved Complaints',
      value: resolved,
      icon: CheckCircle2,
      color: 'green',
    },
  ];

  return (
    <div className="admin-dashboard">
      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <div className="admin-brand-icon">🏢</div>
          <div>
            <h2>CityCivic</h2>
            <span>ADMIN PORTAL</span>
          </div>
        </div>

        <p className="admin-menu-label">MAIN MENU</p>

        <nav className="admin-navigation">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={activePage === item.name ? 'active' : ''}
                onClick={() => {
                  setActivePage(item.name);
                  setMenuOpen(false);
                  setNotice('');
                }}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-help">
            <AlertCircle size={20} />
            <strong>Administrator Support</strong>
            <p>Manage your municipal service platform.</p>
          </div>

          <button className="admin-logout">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <button
            className="admin-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          <div>
            <h3>Admin Dashboard</h3>
            <p>Municipal service management and monitoring.</p>
          </div>

          <div className="admin-header-actions">
            <button aria-label="Notifications">
              <Bell size={19} />
            </button>
            <div className="admin-profile">
              <UserCircle size={32} />
              <div>
                <strong>Administrator</strong>
                <span>System Admin</span>
              </div>
            </div>
          </div>
        </header>

        <section className="admin-content">
          {notice && (
            <div className="admin-notice">
              <CheckCircle2 size={17} />
              {notice}
              <button onClick={() => setNotice('')} aria-label="Dismiss">
                <X size={16} />
              </button>
            </div>
          )}

          {activePage === 'Overview' && (
            <>
              <div className="admin-welcome">
                <div>
                  <span>ADMIN WORKSPACE</span>
                  <h1>Welcome, Administrator!</h1>
                  <p>Here is an overview of your civic service platform.</p>
                </div>
              </div>

              <div className="admin-stats">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <article className="admin-stat-card" key={stat.label}>
                      <div className={`admin-stat-icon ${stat.color}`}>
                        <Icon size={21} />
                      </div>
                      <p>{stat.label}</p>
                      <h2>{stat.value}</h2>
                    </article>
                  );
                })}
              </div>

              <div className="admin-overview-grid">
                <section className="admin-panel">
                  <h2>Complaint Status Overview</h2>
                  <p>Current distribution of complaints.</p>

                  {[
                    { label: 'Pending', value: pending, color: 'pending' },
                    {
                      label: 'In Progress',
                      value: complaints.filter((c) => c.status === 'In Progress').length,
                      color: 'progress',
                    },
                    { label: 'Resolved', value: resolved, color: 'resolved' },
                  ].map((item) => (
                    <div className="admin-progress-item" key={item.label}>
                      <div>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                      <div className="admin-progress-track">
                        <div
                          className={`admin-progress-fill ${item.color}`}
                          style={{
                            width: `${complaints.length ? (item.value / complaints.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </section>

                <section className="admin-panel admin-quick-actions">
                  <h2>Quick Actions</h2>
                  <button onClick={() => setActivePage('Complaints')}>
                    <ClipboardList size={18} />
                    Manage Complaints
                  </button>
                  <button onClick={() => setActivePage('User Management')}>
                    <Users size={18} />
                    Manage Users
                  </button>
                  <button onClick={() => setActivePage('Staff Management')}>
                    <UserPlus size={18} />
                    View Staff
                  </button>
                </section>
              </div>

              <ComplaintTable
                complaints={complaints.slice(0, 4)}
                onView={setSelectedComplaint}
              />
            </>
          )}

          {activePage === 'Complaints' && (
            <section className="admin-panel admin-full-panel">
              <div className="admin-section-heading">
                <div>
                  <h2>Complaint Management</h2>
                  <p>Review complaints and assign them to municipal staff.</p>
                </div>
              </div>

              <div className="admin-filters">
                <div className="admin-search">
                  <Search size={18} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search complaints..."
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

              <ComplaintTable
                complaints={filteredComplaints}
                onView={setSelectedComplaint}
              />
            </section>
          )}

          {activePage === 'User Management' && (
            <section className="admin-panel admin-full-panel">
              <h2>User Management</h2>
              <p>View registered users and manage their roles.</p>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Current Role</th>
                      <th>Change Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <select
                            value={user.role}
                            onChange={(event) =>
                              updateUserRole(user.id, event.target.value)
                            }
                          >
                            <option value="Citizen">Citizen</option>
                            <option value="Staff">Staff</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activePage === 'Staff Management' && (
            <section className="admin-panel admin-full-panel">
              <h2>Staff Management</h2>
              <p>Municipal staff registered in the demonstration system.</p>

              <div className="admin-staff-list">
                {users
                  .filter((user) => user.role === 'Staff')
                  .map((user) => (
                    <article key={user.id}>
                      <UserCircle size={30} />
                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                      <span className="admin-role-badge">Staff</span>
                    </article>
                  ))}

                {users.every((user) => user.role !== 'Staff') && (
                  <p>No staff members currently listed.</p>
                )}
              </div>
            </section>
          )}

          {activePage === 'Analytics' && (
            <section className="admin-panel admin-full-panel">
              <h2>Platform Analytics</h2>
              <p>Summary of complaint activity in the demonstration data.</p>

              <div className="admin-analytics-grid">
                <article>
                  <ClipboardList size={23} />
                  <span>Total Complaints</span>
                  <strong>{complaints.length}</strong>
                </article>
                <article>
                  <Clock3 size={23} />
                  <span>Pending Complaints</span>
                  <strong>{pending}</strong>
                </article>
                <article>
                  <CheckCircle2 size={23} />
                  <span>Resolved Complaints</span>
                  <strong>{resolved}</strong>
                </article>
              </div>

              <div className="admin-analytics-note">
                Analytics charts and date-based reports will be connected
                to real database records in the backend phase.
              </div>
            </section>
          )}
        </section>
      </main>

      {selectedComplaint && (
        <div className="admin-modal-overlay">
          <section className="admin-modal">
            <div className="admin-modal-heading">
              <div>
                <span>COMPLAINT DETAILS</span>
                <h2>{selectedComplaint.id}</h2>
              </div>
              <button
                onClick={() => {
                  setSelectedComplaint(null);
                  setSelectedStaff('');
                }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <h3>{selectedComplaint.title}</h3>
            <p>Citizen: {selectedComplaint.citizen}</p>
            <p>Category: {selectedComplaint.category}</p>
            <p>Priority: {selectedComplaint.priority}</p>
            <p>Current Status: {selectedComplaint.status}</p>
            <p>Assigned Staff: {selectedComplaint.staff}</p>

            <label>Assign Staff Member</label>
            <select
              value={selectedStaff}
              onChange={(event) => setSelectedStaff(event.target.value)}
            >
              <option value="">Select staff member</option>
              {staffMembers.map((staff) => (
                <option key={staff} value={staff}>
                  {staff}
                </option>
              ))}
            </select>

            <button
              className="admin-assign-button"
              onClick={assignStaff}
              disabled={!selectedStaff}
            >
              <UserPlus size={17} /> Assign Complaint
            </button>

            <small>
              Demo only: assignment is stored in React state and
              resets when the page reloads.
            </small>
          </section>
        </div>
      )}
    </div>
  );
}

function ComplaintTable({ complaints, onView }) {
  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Complaint</th>
            <th>Citizen</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned Staff</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>
                <strong>{complaint.id}</strong>
                <span>{complaint.title}</span>
              </td>
              <td>{complaint.citizen}</td>
              <td>{complaint.category}</td>
              <td>
                <span className={`admin-priority ${complaint.priority.toLowerCase()}`}>
                  {complaint.priority}
                </span>
              </td>
              <td>
                <span className={`admin-status ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                  {complaint.status}
                </span>
              </td>
              <td>{complaint.staff}</td>
              <td>
                <button
                  className="admin-view-button"
                  onClick={() => onView(complaint)}
                >
                  <Eye size={15} /> View
                </button>
              </td>
            </tr>
          ))}

          {complaints.length === 0 && (
            <tr>
              <td colSpan="7">No complaints found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
