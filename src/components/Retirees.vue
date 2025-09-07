<template>
  <main class="retirees">
    <div class="container">
      <section class="hero">
        <h1>Retiree Services</h1>
        <p class="hero-subtitle">Comprehensive support and services for CAAT pension plan retirees.</p>
      </section>

      <section class="retiree-content">
        <h2>Services for Retirees</h2>
        
        <div class="services-grid">
          <div class="service-item">
            <h3>💰 Pension Payments</h3>
            <p>Reliable monthly pension payments with direct deposit options and payment schedules.</p>
          </div>
          
          <div class="service-item">
            <h3>🏥 Health Benefits</h3>
            <p>Comprehensive health and dental coverage for retirees and eligible dependents.</p>
          </div>
          
          <div class="service-item">
            <h3>📋 Annual Statements</h3>
            <p>Detailed annual statements showing pension payments, tax information, and benefit summaries.</p>
          </div>
          
          <div class="service-item">
            <h3>💼 Survivor Benefits</h3>
            <p>Support and guidance for surviving spouses and beneficiaries regarding benefit continuation.</p>
          </div>
          
          <div class="service-item">
            <h3>📞 Dedicated Support</h3>
            <p>Specialized customer service team to help with retiree-specific questions and concerns.</p>
          </div>
          
          <div class="service-item">
            <h3>📄 Document Services</h3>
            <p>Access to pension verification letters, tax forms, and other important documentation.</p>
          </div>
        </div>

        <div class="important-info">
          <h2>Important Information</h2>
          <div class="info-cards">
            <div class="info-card">
              <h3>Tax Information</h3>
              <p>Your pension payments are taxable income. Tax slips (T4A) are issued annually by the end of February.</p>
            </div>
            
            <div class="info-card">
              <h3>Address Changes</h3>
              <p>Keep your contact information up to date to ensure uninterrupted pension payments and communications.</p>
            </div>
            
            <div class="info-card">
              <h3>Banking Updates</h3>
              <p>Notify us promptly of any changes to your banking information for direct deposit.</p>
            </div>
          </div>
        </div>

        <div class="contact-section">
          <h2>Contact Retiree Services</h2>
          <div class="contact-details">
            <p><strong>Phone:</strong> 1-800-CAA-TPEN (Retiree Line)</p>
            <p><strong>Email:</strong> retireeservices@caatpension.ca</p>
            <p><strong>Hours:</strong> Monday to Friday, 8:00 AM - 5:00 PM EST</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Retirees'
}
</script>

<style scoped>
.retirees {
  flex: 1;
  padding: 2rem 0;
}

.hero {
  text-align: center;
  padding: 3rem 0;
  background-color: var(--light-blue);
  border-radius: 10px;
  margin-bottom: 3rem;
}

.hero h1 {
  margin-bottom: 1rem;
  color: var(--primary-blue);
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--gray-dark);
}

.retiree-content h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-blue);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.service-item {
  background-color: var(--white);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.service-item h3 {
  margin-bottom: 1rem;
  color: var(--primary-blue);
}

.service-item p {
  color: var(--gray-dark);
}

.important-info {
  margin: 3rem 0;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background-color: var(--gray-light);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--green);
}

.info-card h3 {
  margin-bottom: 1rem;
  color: var(--primary-blue);
}

.info-card p {
  color: var(--gray-dark);
}

.contact-section {
  background-color: var(--primary-blue);
  color: var(--white);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}

.contact-section h2 {
  margin-bottom: 1.5rem;
  color: var(--white);
}

.contact-details p {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .info-cards {
    grid-template-columns: 1fr;
  }
}
</style>