import React from 'react';
import { Link } from 'react-router-dom';

const AWSDetails: React.FC = () => {
  return (
    <div className="cloud-details aws">
      <Link to="/" className="nav-back">Back to Services</Link>
      <h2>Amazon Web Services</h2>
      <div className="service-category">
        <h3>Compute</h3>
        <ul>
          <li>Amazon EC2</li>
          <li>Amazon ECS</li>
          <li>Amazon EKS</li>
          <li>AWS Lambda</li>
          <li>Amazon Lightsail</li>
        </ul>
      </div>
      
      <div className="service-category">
        <h3>Storage</h3>
        <ul>
          <li>Amazon S3</li>
          <li>Amazon EBS</li>
          <li>Amazon EFS</li>
          <li>Amazon FSx</li>
          <li>AWS Storage Gateway</li>
        </ul>
      </div>

      <div className="service-category">
        <h3>Databases</h3>
        <ul>
          <li>Amazon RDS</li>
          <li>Amazon DynamoDB</li>
          <li>Amazon ElastiCache</li>
          <li>Amazon Redshift</li>
          <li>Amazon Neptune</li>
        </ul>
      </div>

      <div className="service-category">
        <h3>Networking</h3>
        <ul>
          <li>Amazon VPC</li>
          <li>Amazon Route 53</li>
          <li>AWS Direct Connect</li>
          <li>Amazon CloudFront</li>
          <li>Elastic Load Balancing</li>
        </ul>
      </div>
    </div>
  );
};

export default AWSDetails;
