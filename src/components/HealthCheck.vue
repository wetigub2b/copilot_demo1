<template>
  <div class="health-check">
    <div class="health-status" :class="{ 'healthy': isHealthy, 'unhealthy': !isHealthy }">
      <div class="status-header">
        <h1>Health Check Status</h1>
        <div class="status-badge" :class="statusClass">
          <span class="status-icon">{{ statusIcon }}</span>
          <span class="status-text">{{ healthData?.status || 'checking' }}</span>
        </div>
      </div>

      <div v-if="loading" class="loading">
        <span class="loading-spinner"></span>
        <p>Performing health checks...</p>
      </div>

      <div v-else-if="healthData" class="health-details">
        <div class="health-summary">
          <div class="health-info">
            <p><strong>Service:</strong> {{ healthData.service }}</p>
            <p><strong>Version:</strong> {{ healthData.version }}</p>
            <p><strong>Response Time:</strong> {{ healthData.response_time_ms }}ms</p>
            <p><strong>Timestamp:</strong> {{ formatTimestamp(healthData.timestamp) }}</p>
          </div>
        </div>

        <div class="health-checks">
          <h2>System Checks</h2>
          
          <div class="check-item">
            <h3>Frontend Application</h3>
            <div class="check-status" :class="healthData.checks?.frontend?.status">
              <span class="check-icon">{{ getStatusIcon(healthData.checks?.frontend?.status) }}</span>
              <span>{{ healthData.checks?.frontend?.status }}</span>
            </div>
            <div v-if="healthData.checks?.frontend?.checks" class="check-details">
              <div v-for="(status, check) in healthData.checks.frontend.checks" :key="check" class="sub-check">
                <span class="sub-check-name">{{ formatCheckName(check) }}:</span>
                <span class="sub-check-status" :class="{ 'pass': status, 'fail': !status }">
                  {{ status ? '✓' : '✗' }}
                </span>
              </div>
            </div>
            <div v-if="healthData.checks?.frontend?.error" class="error-message">
              {{ healthData.checks.frontend.error }}
            </div>
          </div>

          <div class="check-item">
            <h3>Backend API</h3>
            <div class="check-status" :class="healthData.checks?.backend?.status">
              <span class="check-icon">{{ getStatusIcon(healthData.checks?.backend?.status) }}</span>
              <span>{{ healthData.checks?.backend?.status }}</span>
            </div>
            <div v-if="healthData.checks?.backend?.details" class="check-details">
              <p><strong>Service:</strong> {{ healthData.checks.backend.details.service }}</p>
              <p><strong>Status:</strong> {{ healthData.checks.backend.details.status }}</p>
            </div>
            <div v-if="healthData.checks?.backend?.error" class="error-message">
              {{ healthData.checks.backend.error }}
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="error">
        <h2>Health Check Error</h2>
        <p>{{ error }}</p>
      </div>

      <div class="health-actions">
        <button @click="runHealthCheck" :disabled="loading" class="btn-refresh">
          <span v-if="loading">Checking...</span>
          <span v-else>Refresh Health Check</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import HealthService from '../services/healthService.js'

export default {
  name: 'HealthCheck',
  data() {
    return {
      healthData: null,
      loading: false,
      error: null,
    }
  },
  computed: {
    isHealthy() {
      return this.healthData?.status === 'healthy'
    },
    statusClass() {
      if (!this.healthData) return 'checking'
      return this.healthData.status === 'healthy' ? 'healthy' : 'unhealthy'
    },
    statusIcon() {
      if (!this.healthData) return '⏳'
      return this.healthData.status === 'healthy' ? '✅' : '❌'
    },
  },
  async mounted() {
    await this.runHealthCheck()
  },
  methods: {
    async runHealthCheck() {
      this.loading = true
      this.error = null
      
      try {
        this.healthData = await HealthService.performHealthCheck()
      } catch (err) {
        this.error = err.message
        this.healthData = null
      } finally {
        this.loading = false
      }
    },
    getStatusIcon(status) {
      return status === 'healthy' ? '✅' : '❌'
    },
    formatCheckName(checkName) {
      return checkName.charAt(0).toUpperCase() + checkName.slice(1).replace(/([A-Z])/g, ' $1')
    },
    formatTimestamp(timestamp) {
      if (!timestamp) return 'Unknown'
      return new Date(timestamp).toLocaleString()
    },
  },
}
</script>

<style scoped>
.health-check {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  font-family: var(--font-primary, 'Arial', sans-serif);
}

.health-status {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.status-header h1 {
  margin: 0;
  color: #333;
  font-size: 2rem;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.status-badge.healthy {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-badge.unhealthy {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.status-badge.checking {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.loading {
  text-align: center;
  padding: 2rem 0;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary-color, #004d9f);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.health-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 2rem;
}

.health-info p {
  margin: 0.5rem 0;
  color: #666;
}

.health-checks h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.check-item {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: #fafafa;
}

.check-item h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.2rem;
}

.check-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.check-status.healthy {
  color: #28a745;
}

.check-status.unhealthy {
  color: #dc3545;
}

.check-details {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.sub-check {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.sub-check:last-child {
  border-bottom: none;
}

.sub-check-name {
  color: #666;
}

.sub-check-status.pass {
  color: #28a745;
  font-weight: bold;
}

.sub-check-status.fail {
  color: #dc3545;
  font-weight: bold;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  border-left: 4px solid #dc3545;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #dc3545;
}

.health-actions {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.btn-refresh {
  background: var(--primary-color, #004d9f);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-refresh:hover:not(:disabled) {
  background: var(--primary-color-dark, #003d7a);
}

.btn-refresh:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .health-check {
    padding: 1rem;
  }
  
  .status-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .status-header h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  
  .status-badge {
    justify-content: center;
  }
}
</style>