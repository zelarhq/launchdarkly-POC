import React from 'react';
import { Link } from 'react-router-dom';

const GCPDetails: React.FC = () => {
  return (
    <div className="cloud-details gcp">
      <Link to="/" className="nav-back">Back to Services</Link>
      <h2>Google Cloud Platform Services</h2>
      <div className="service-category">
        <h3>Compute</h3>
        <ul>
          <li>Compute Engine</li>
          <li>Google Kubernetes Engine (GKE)</li>
          <li>Cloud Run</li>
          <li>App Engine</li>
          <li>Cloud Functions</li>
        </ul>
      </div>
      
      <div className="service-category">
        <h3>Storage</h3>
        <ul>
          <li>Cloud Storage</li>
          <li>Persistent Disk</li>
          <li>Filestore</li>
          <li>Cloud Storage for Firebase</li>
        </ul>
      </div>

      <div className="service-category">
        <h3>Databases</h3>
        <ul>
          <li>Cloud SQL</li>
          <li>Firestore</li>
          <li>Bigtable</li>
          <li>Spanner</li>
          <li>Memorystore</li>
        </ul>
      </div>

      <div className="service-category">
        <h3>Networking</h3>
        <ul>
          <li>Virtual Private Cloud (VPC)</li>
          <li>Cloud Load Balancing</li>
          <li>Cloud CDN</li>
          <li>Cloud DNS</li>
        </ul>
      </div>
    </div>
  );
};

export default GCPDetails;
