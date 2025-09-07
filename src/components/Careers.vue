<template>
  <main class="careers">
    <div class="container">
      <section class="hero">
        <h1>Careers at CAAT</h1>
        <p class="hero-subtitle">Join our team and help shape the future of retirement security for Canadians.</p>
      </section>

      <section class="career-content">
        <h2>Why Work with CAAT?</h2>
        <div class="benefits-grid">
          <div class="benefit-item">
            <h3>💼 Purpose-Driven Work</h3>
            <p>Make a meaningful impact on the retirement security of thousands of Canadians.</p>
          </div>
          
          <div class="benefit-item">
            <h3>📈 Growth Opportunities</h3>
            <p>Advance your career with professional development and leadership opportunities.</p>
          </div>
          
          <div class="benefit-item">
            <h3>🤝 Collaborative Culture</h3>
            <p>Work alongside talented professionals in a supportive, inclusive environment.</p>
          </div>
          
          <div class="benefit-item">
            <h3>🎯 Competitive Benefits</h3>
            <p>Enjoy comprehensive benefits including our own pension plan.</p>
          </div>
        </div>

        <div class="job-opportunities">
          <h2>Current Opportunities</h2>
          <p>We're always looking for talented individuals to join our team. Check back regularly for new openings.</p>
          
          <div class="contact-info">
            <h3>Interested in joining CAAT?</h3>
            <p>Send your resume and cover letter to: <a href="mailto:careers@caatpension.ca">careers@caatpension.ca</a></p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Careers'
}
</script>

<style scoped>
.careers {
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

.career-content {
  max-width: 800px;
  margin: 0 auto;
}

.career-content h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-blue);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.benefit-item {
  background-color: var(--white);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.benefit-item h3 {
  margin-bottom: 1rem;
  color: var(--primary-blue);
}

.benefit-item p {
  color: var(--gray-dark);
}

.job-opportunities {
  background-color: var(--gray-light);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}

.job-opportunities h2 {
  margin-bottom: 1rem;
}

.contact-info {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-medium);
}

.contact-info a {
  color: var(--primary-blue);
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>