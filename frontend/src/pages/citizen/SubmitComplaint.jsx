
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Upload,
  FileText,
  Send,
  ImagePlus,
} from 'lucide-react';

function SubmitComplaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    priority: 'Medium',
  });

  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.category ||
      !form.description.trim() ||
      !form.location.trim()
    ) {
      setError('Please complete all required fields.');
      return;
    }

    setError('');

    alert(
      'Complaint form validated successfully! Backend integration is pending.'
    );
  };

  return (
    <div className="submit-complaint-page">
      <header className="submit-header">
        <Link to="/citizen/dashboard" className="back-link">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        <h2>CityCivic</h2>
      </header>

      <main className="submit-container">
        <div className="submit-intro">
          <span> CITIZEN SERVICES </span>
          <h1>Submit a Complaint</h1>
          <p>
            Help improve your community by reporting civic issues.
            Our team will review your complaint.
          </p>
        </div>

        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <FileText size={22} />
            <div>
              <h2>Complaint Details</h2>
              <p>Enter the information about the issue.</p>
            </div>
          </div>

          <div className="form-group">
            <label>Complaint Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Example: Damaged road near my area"
              maxLength={120}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Complaint Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="Road Problems">Road Problems</option>
                <option value="Waste Management">Waste Management</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Street Lighting">Street Lighting</option>
                <option value="Drainage">Drainage</option>
                <option value="Public Safety">Public Safety</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority *</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Complaint Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the problem in detail..."
              rows={5}
              maxLength={2000}
            />
            <small>{form.description.length}/2000 characters</small>
          </div>

          <div className="form-group">
            <label>
              <MapPin size={15} /> Location / Address *
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter the area, street or landmark"
              maxLength={250}
            />
          </div>

          <div className="form-group">
            <label>Upload Photograph (Optional)</label>
            <label className="photo-upload">
              <ImagePlus size={28} />
              <strong>
                {photo ? photo.name : 'Click to upload an image'}
              </strong>
              <span>PNG, JPG or JPEG — maximum 5 MB</span>
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file && file.size > 5 * 1024 * 1024) {
                    setError('Image must be 5 MB or smaller.');
                    event.target.value = '';
                    setPhoto(null);
                    return;
                  }

                  setError('');
                  setPhoto(file || null);
                }}
              />
              <Upload size={17} />
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <Link to="/citizen/dashboard" className="cancel-button">
              Cancel
            </Link>
            <button type="submit" className="submit-button">
              <Send size={17} /> Submit Complaint
            </button>
          </div>

          <p className="form-note">
            * Required fields. Your complaint will be submitted
            for review after backend integration.
          </p>
        </form>
      </main>
    </div>
  );
}

export default SubmitComplaint;
