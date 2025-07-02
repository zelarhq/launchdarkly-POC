import React from 'react';
import { Link } from 'react-router-dom';

const AzureDetails: React.FC = () => {
  return (
    <div className="cloud-details azure">
      <Link to="/" className="nav-back">Back to Services</Link>
      <h2>Microsoft Azure Services</h2>
      <div className="service-category">
        <h3>Compute</h3>
        <ul>
          <li>Virtual Machines</li>
          <li>Azure Kubernetes Service (AKS)</li>
          <li>Azure App Service</li>
          <li>Azure Functions</li>
          <li>Azure Container Instances</li>
        </ul>
      </div>
      
      <div className="service-category">
        <h3>Storage</h3>
        <ul>
          <li>Blob Storage</li>
          <li>Azure Files</li>
          <li>Disk Storage</li>
          <li>Archive Storage</li>
          <li>Azure NetApp Files</li>
        </ul>
      </div>

      <div className="service-category">
        <h3>Databases</h3>
        <ul>
          <li>Azure SQL Database</li>
          <li>Azure Cosmos DB</li>
          <li>Azure Database for MySQL</li>
          <li>Azure Database for PostgreSQL</li>
          <li>Azure Cache for Redis</li>
        </ul>
      </div>

      <div className="service-category">
        <h3>Networking</h3>
        <ul>
          <li>Virtual Network</li>
          <li>Load Balancer</li>
          <li>Azure DNS</li>
          <li>Azure Front Door</li>
          <li>Azure CDN</li>
        </ul>
      </div>
    </div>
  );
};

export default AzureDetails;
