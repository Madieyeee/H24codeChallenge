import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p className="footer-text">
          Développé par{' '}
          <a 
            href="https://github.com/Madieyeee" 
            target="_blank" 
            rel="noopener noreferrer"
            className="developer-link"
          >
            Madieyeee
          </a>
        </p>
        <div className="footer-tech">
          <span>React • Laravel • Passion</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
