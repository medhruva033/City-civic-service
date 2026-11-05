
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  ClipboardList,
  CheckCircle2,
  Clock3,
  UserCheck,
  Wrench,
  MapPin,
  CalendarDays,
  AlertCircle,
} from 'lucide-react';

const sampleComplaints = {
  'CIV-1001': {
    id: 'CIV-1001',
    title: 'Damaged road near JP Nagar',
    category: 'Road Problems',
    priority: 'High',
    location: 'JP Nagar 5th Phase, Bengaluru',
    date: '04 November 2026',
    status: 'In Progress',
    description:
      'Multiple potholes have been reported on the main road.',
    remarks: 'Municipal repair team has started inspection.',
    currentStep: 3,
  },
  'CIV-1002': {
    id: 'CIV-1002',
    title: 'Garbage collection delay',
    category: 'Waste Management',
    priority: 'Medium',
    location: 'BTM Layout, Bengaluru',
    date: '02 November 2026',
    status: 'Under Review',
    description: 'Garbage has accumulated near the residential area.',
    remarks: 'Your complaint is being reviewed.',
    currentStep: 1,
  },
  'CIV-1003': {
    id: 'CIV-1003',
    title: 'Street light not working',
    category: 'Street Lighting',
    priority: 'High',
    location: 'Rajarajeshwari Nagar, Bengaluru',
    date: '29 October 2026',
    status: 'Resolved',
    description: 'Street light near the residential road was not working.',
    remarks: 'Street light repaired successfully.',
    currentStep: 4,
  },
};

const timeline = [
  { label: 'Submitted', icon: ClipboardList },
  { label: 'Under Review', icon: Clock3 },
  { label: 'Assigned', icon: UserCheck },
  { label: 'In Progress', icon: Wrench },
  { label: 'Resolved', icon: CheckCircle2 },
];

function ComplaintTracking() {
  const [complaintId, setComplaintId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();

    const id = complaintId.trim().toUpperCase();
    const result = sampleComplaints[id];

    if (!result) {
      setComplaint(null);
      setError('No complaint found. Please check your Complaint ID.');
      return;
    }

    setComplaint(result);
    setError('');
  };

  return (
    <div className="tracking-page">
      <header className="tracking-header">
        <Link to="/citizen/dashboard" className="tracking-back">
          <ArrowLeft size={18} />
          Dashboard
        </Link>
        <h2>CityCivic</h2>
        <span>COMPLAINT TRACKING</span>
      </header>

      <main className="tracking-container">
        <section className="tracking-intro">
          <span className="tracking-eyebrow">CITIZEN SERVICES</span>
          <h1>Track Your Complaint</h1>
          <p>
            Enter your complaint ID to check the latest status
            and progress of your civic complaint.
          </p>
        </section>

        <form className="tracking-search" onSubmit={handleSearch}>
          <label htmlFor="complaint-id">Complaint ID</label>
          <div className="tracking-search-row">
            <input
              id="complaint-id"
              value={complaintId}
              onChange={(event) => setComplaintId(event.target.value)}
              placeholder="Example: CIV-1001"
              required
            />
            <button type="submit">
              <Search size={18} />
              Track Complaint
            </button>
          </div>
          <small>Demo IDs: CIV-1001, CIV-1002, CIV-1003</small>
          {error && <p className="tracking-error">{error}</p>}
        </form>

        {complaint && (
          <section className="tracking-result">
            <div className="tracking-result-heading">
              <div>
                <span className="tracking-eyebrow">COMPLAINT DETAILS</span>
                <h2>{complaint.title}</h2>
                <p>Complaint ID: {complaint.id}</p>
              </div>
              <span
                className={`tracking-status ${complaint.status
                  .toLowerCase()
                  .replace(' ', '-')}`}
              >
                {complaint.status}
              </span>
            </div>

            <div className="tracking-details-grid">
              <div>
                <span>Category</span>
                <strong>{complaint.category}</strong>
              </div>
              <div>
                <span>Priority</span>
                <strong>{complaint.priority}</strong>
              </div>
              <div>
                <span>Submission Date</span>
                <strong>
                  <CalendarDays size={15} /> {complaint.date}
                </strong>
              </div>
              <div>
                <span>Location</span>
                <strong>
                  <MapPin size={15} /> {complaint.location}
                </strong>
              </div>
            </div>

            <div className="tracking-description">
              <h3>Complaint Description</h3>
              <p>{complaint.description}</p>
            </div>

            <div className="tracking-timeline">
              <h3>Complaint Progress</h3>

              <div className="timeline-list">
                {timeline.map((step, index) => {
                  const Icon = step.icon;
                  const completed = index <= complaint.currentStep;

                  return (
                    <div
                      className={`timeline-step ${
                        completed ? 'completed' : ''
                      } ${index === complaint.currentStep ? 'current' : ''}`}
                      key={step.label}
                    >
                      <div className="timeline-icon">
                        <Icon size={19} />
                      </div>
                      <div className="timeline-text">
                        <strong>{step.label}</strong>
                        <span>
                          {index < complaint.currentStep
                            ? 'Completed'
                            : index === complaint.currentStep
                              ? 'Current status'
                              : 'Pending'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="tracking-remarks">
              <AlertCircle size={20} />
              <div>
                <strong>Latest Update</strong>
                <p>{complaint.remarks}</p>
              </div>
            </div>
          </section>
        )}

        {!complaint && !error && (
          <div className="tracking-empty">
            <ClipboardList size={38} />
            <h3>Track your civic complaint</h3>
            <p>
              Your complaint progress and resolution updates
              will appear here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ComplaintTracking;
