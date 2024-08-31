// src/components/Acceuil.js
import React from 'react';
import financialFreedom from '../assets/images/financial-freedom.jpg';
import organizeFinances from '../assets/images/organize-your-finances.jpg';
import protectAssets from '../assets/images/protect-your-assets.jpg';
import takeControl from '../assets/images/take-control.jpg';

function Acceuil() {
  return (
    <div className="homepage">
      <Hero />
      <Features />
      <Security />
      <Management />
      <Footer />
    </div>
  );
}
function Hero() {
    return (
      <section className="homepage-hero">
        <h1>Manage Your Finances with Ease</h1>
        <p>Track your expenses and income effortlessly.</p>
        <button className="homepage-button">Get Started</button>
      </section>
    );
  }

function Features() {
  return (
    <section className="homepage-features">
      <img src={organizeFinances} alt="Organize Your Finances" className="features-image" />
      <h2>Features</h2>
      <p>Track expenses, monitor income, and gain insights.</p>
    </section>
  );
}

function Security() {
  return (
    <section className="homepage-security">
      <img src={protectAssets} alt="Protect Your Assets" className="security-image" />
      <h2>Security</h2>
      <p>Your data is safe with us.</p>
    </section>
  );
}

function Management() {
  return (
    <section className="homepage-management">
      <img src={takeControl} alt="Take Control of Your Finances" className="management-image" />
      <h2>Financial Management</h2>
      <p>Optimize your finances with our tools.</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="homepage-footer">
      <p>Contact us | Follow us on social media</p>
    </footer>
  );
}

export default Acceuil;