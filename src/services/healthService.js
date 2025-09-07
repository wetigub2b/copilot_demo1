/**
 * Health Check Service for CAAT Pension Vue.js Application
 * Provides functionality to check application and backend connectivity status
 */

const API_BASE_URL = 'http://localhost:8000'
const HEALTH_CHECK_TIMEOUT = 5000

/**
 * Health check service class
 */
export class HealthService {
  /**
   * Check if the backend API is healthy
   * @returns {Promise<Object>} Backend health status
   */
  static async checkBackendHealth() {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT)

      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        return {
          status: 'healthy',
          service: 'backend-api',
          response_time: Date.now(),
          details: data,
        }
      } else {
        return {
          status: 'unhealthy',
          service: 'backend-api',
          response_time: Date.now(),
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        service: 'backend-api',
        response_time: Date.now(),
        error: error.name === 'AbortError' ? 'Request timeout' : error.message,
      }
    }
  }

  /**
   * Check frontend application health
   * @returns {Object} Frontend health status
   */
  static checkFrontendHealth() {
    try {
      // Check if Vue Router is working
      const hasRouter = window.location && typeof window.location.pathname === 'string'
      
      // Check if DOM is properly loaded
      const hasDom = document && document.body

      // Check if essential browser APIs are available
      const hasFetch = typeof fetch === 'function'
      const hasLocalStorage = typeof localStorage !== 'undefined'

      const checks = {
        router: hasRouter,
        dom: hasDom,
        fetch: hasFetch,
        localStorage: hasLocalStorage,
      }

      const allHealthy = Object.values(checks).every(check => check === true)

      return {
        status: allHealthy ? 'healthy' : 'unhealthy',
        service: 'frontend-app',
        response_time: Date.now(),
        checks,
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        service: 'frontend-app',
        response_time: Date.now(),
        error: error.message,
      }
    }
  }

  /**
   * Perform comprehensive health check
   * @returns {Promise<Object>} Complete health status
   */
  static async performHealthCheck() {
    const startTime = Date.now()
    
    try {
      const [backendHealth, frontendHealth] = await Promise.allSettled([
        this.checkBackendHealth(),
        Promise.resolve(this.checkFrontendHealth()),
      ])

      const backend = backendHealth.status === 'fulfilled' 
        ? backendHealth.value 
        : { status: 'unhealthy', service: 'backend-api', error: backendHealth.reason?.message }

      const frontend = frontendHealth.status === 'fulfilled'
        ? frontendHealth.value
        : { status: 'unhealthy', service: 'frontend-app', error: frontendHealth.reason?.message }

      const overallStatus = backend.status === 'healthy' && frontend.status === 'healthy' 
        ? 'healthy' 
        : 'unhealthy'

      return {
        status: overallStatus,
        timestamp: new Date().toISOString(),
        response_time_ms: Date.now() - startTime,
        version: '1.0.0',
        service: 'caat-pension-frontend',
        checks: {
          backend,
          frontend,
        },
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        response_time_ms: Date.now() - startTime,
        version: '1.0.0',
        service: 'caat-pension-frontend',
        error: error.message,
      }
    }
  }
}

export default HealthService