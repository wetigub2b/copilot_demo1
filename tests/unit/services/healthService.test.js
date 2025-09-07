/**
 * Unit tests for HealthService
 * Tests health check functionality for both frontend and backend components
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import HealthService from '../../../src/services/healthService.js'

// Mock fetch for testing
const mockFetch = vi.fn()

describe('HealthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock fetch globally
    global.fetch = mockFetch
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  describe('checkBackendHealth', () => {
    it('should return healthy status when backend responds successfully', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ status: 'healthy', service: 'CAAT Pension API' })
      }
      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await HealthService.checkBackendHealth()

      expect(result.status).toBe('healthy')
      expect(result.service).toBe('backend-api')
      expect(result.details).toEqual({ status: 'healthy', service: 'CAAT Pension API' })
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/health',
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
      )
    })

    it('should return unhealthy status when backend responds with error', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      }
      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await HealthService.checkBackendHealth()

      expect(result.status).toBe('unhealthy')
      expect(result.service).toBe('backend-api')
      expect(result.error).toBe('HTTP 500: Internal Server Error')
    })

    it('should return unhealthy status when network request fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await HealthService.checkBackendHealth()

      expect(result.status).toBe('unhealthy')
      expect(result.service).toBe('backend-api')
      expect(result.error).toBe('Network error')
    })

    it('should handle timeout correctly', async () => {
      // Mock AbortController
      const mockAbortController = {
        abort: vi.fn(),
        signal: {}
      }
      global.AbortController = vi.fn(() => mockAbortController)

      // Mock setTimeout to immediately call the callback
      vi.spyOn(global, 'setTimeout').mockImplementation((callback) => {
        callback()
        return 1
      })

      mockFetch.mockRejectedValueOnce({ name: 'AbortError' })

      const result = await HealthService.checkBackendHealth()

      expect(result.status).toBe('unhealthy')
      expect(result.error).toBe('Request timeout')
    })
  })

  describe('checkFrontendHealth', () => {
    it('should return status based on available browser APIs', () => {
      const result = HealthService.checkFrontendHealth()

      expect(result.service).toBe('frontend-app')
      expect(result.response_time).toBeTypeOf('number')
      expect(['healthy', 'unhealthy']).toContain(result.status)
      
      // In test environment, some browser APIs might not be available
      if (result.status === 'unhealthy') {
        expect(result.error || result.checks).toBeDefined()
      } else {
        expect(result.checks).toBeDefined()
        expect(result.checks).toHaveProperty('router')
        expect(result.checks).toHaveProperty('dom')
        expect(result.checks).toHaveProperty('fetch')
        expect(result.checks).toHaveProperty('localStorage')
      }
    })

    it('should handle errors gracefully', () => {
      // Mock window to cause an error
      const originalWindow = global.window
      global.window = null

      const result = HealthService.checkFrontendHealth()

      expect(result.status).toBe('unhealthy')
      expect(result.service).toBe('frontend-app')
      expect(result.error).toBeDefined()

      // Restore original window
      global.window = originalWindow
    })
  })

  describe('performHealthCheck', () => {
    it('should return comprehensive health status', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ status: 'healthy', service: 'CAAT Pension API' })
      }
      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await HealthService.performHealthCheck()

      expect(result.service).toBe('caat-pension-frontend')
      expect(result.version).toBe('1.0.0')
      expect(result.timestamp).toBeDefined()
      expect(result.response_time_ms).toBeGreaterThanOrEqual(0)
      expect(['healthy', 'unhealthy']).toContain(result.status)
      expect(result.checks).toBeDefined()
      expect(result.checks.backend).toBeDefined()
      expect(result.checks.frontend).toBeDefined()
    })

    it('should return unhealthy when backend fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await HealthService.performHealthCheck()

      expect(result.status).toBe('unhealthy')
      expect(result.checks.backend.status).toBe('unhealthy')
    })

    it('should handle complete failure gracefully', async () => {
      // Force an error in the main try block
      vi.spyOn(Promise, 'allSettled').mockRejectedValueOnce(new Error('Complete failure'))

      const result = await HealthService.performHealthCheck()

      expect(result.status).toBe('unhealthy')
      expect(result.error).toBe('Complete failure')
      expect(result.service).toBe('caat-pension-frontend')
    })

    it('should include proper response time measurement', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ status: 'healthy', service: 'CAAT Pension API' })
      }
      mockFetch.mockResolvedValueOnce(mockResponse)

      const startTime = Date.now()
      const result = await HealthService.performHealthCheck()
      const endTime = Date.now()

      expect(result.response_time_ms).toBeGreaterThanOrEqual(0)
      expect(result.response_time_ms).toBeLessThanOrEqual(endTime - startTime + 100) // Allow some margin
    })
  })
})