/**
 * Unit tests for HealthCheck Vue component
 * Tests component rendering, user interactions, and health status display
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HealthCheck from '../../../src/components/HealthCheck.vue'
import HealthService from '../../../src/services/healthService.js'

// Mock the HealthService
vi.mock('../../../src/services/healthService.js', () => ({
  default: {
    performHealthCheck: vi.fn()
  }
}))

describe('HealthCheck.vue', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Component Rendering', () => {
    it('renders the component correctly', () => {
      wrapper = mount(HealthCheck, {
        global: {
          mocks: {
            $router: {},
            $route: { path: '/healthz' }
          }
        }
      })

      expect(wrapper.find('.health-check').exists()).toBe(true)
      expect(wrapper.find('.health-status').exists()).toBe(true)
      expect(wrapper.find('.status-header').exists()).toBe(true)
      expect(wrapper.find('h1').text()).toBe('Health Check Status')
    })

    it('shows loading state initially', async () => {
      HealthService.performHealthCheck.mockImplementation(() => 
        new Promise(resolve => setTimeout(resolve, 100))
      )

      wrapper = mount(HealthCheck)
      
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.loading').exists()).toBe(true)
      expect(wrapper.find('.loading-spinner').exists()).toBe(true)
      expect(wrapper.text()).toContain('Performing health checks...')
    })

    it('displays health data when check completes successfully', async () => {
      const mockHealthData = {
        status: 'healthy',
        service: 'caat-pension-frontend',
        version: '1.0.0',
        response_time_ms: 150,
        timestamp: '2024-12-07T10:00:00Z',
        checks: {
          frontend: {
            status: 'healthy',
            checks: {
              router: true,
              dom: true,
              fetch: true,
              localStorage: true
            }
          },
          backend: {
            status: 'healthy',
            details: {
              status: 'healthy',
              service: 'CAAT Pension API'
            }
          }
        }
      }

      HealthService.performHealthCheck.mockResolvedValue(mockHealthData)
      
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(wrapper.find('.health-details').exists()).toBe(true)
      expect(wrapper.text()).toContain('caat-pension-frontend')
      expect(wrapper.text()).toContain('1.0.0')
      expect(wrapper.text()).toContain('150ms')
    })

    it('displays error state when health check fails', async () => {
      HealthService.performHealthCheck.mockRejectedValue(new Error('Network error'))
      
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(wrapper.find('.error').exists()).toBe(true)
      expect(wrapper.text()).toContain('Health Check Error')
      expect(wrapper.text()).toContain('Network error')
    })
  })

  describe('Status Badge', () => {
    it('shows healthy status badge when system is healthy', async () => {
      const mockHealthData = {
        status: 'healthy',
        service: 'caat-pension-frontend',
        version: '1.0.0',
        response_time_ms: 150,
        timestamp: '2024-12-07T10:00:00Z',
        checks: { frontend: { status: 'healthy' }, backend: { status: 'healthy' } }
      }

      HealthService.performHealthCheck.mockResolvedValue(mockHealthData)
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      const statusBadge = wrapper.find('.status-badge.healthy')
      expect(statusBadge.exists()).toBe(true)
      expect(statusBadge.text()).toContain('healthy')
      expect(statusBadge.find('.status-icon').text()).toBe('✅')
    })

    it('shows unhealthy status badge when system is unhealthy', async () => {
      const mockHealthData = {
        status: 'unhealthy',
        service: 'caat-pension-frontend',
        version: '1.0.0',
        response_time_ms: 150,
        timestamp: '2024-12-07T10:00:00Z',
        checks: { frontend: { status: 'unhealthy' }, backend: { status: 'healthy' } }
      }

      HealthService.performHealthCheck.mockResolvedValue(mockHealthData)
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      const statusBadge = wrapper.find('.status-badge.unhealthy')
      expect(statusBadge.exists()).toBe(true)
      expect(statusBadge.text()).toContain('unhealthy')
      expect(statusBadge.find('.status-icon').text()).toBe('❌')
    })

    it('shows checking status badge initially', () => {
      HealthService.performHealthCheck.mockImplementation(() => 
        new Promise(resolve => setTimeout(resolve, 100))
      )
      
      wrapper = mount(HealthCheck)
      
      const statusBadge = wrapper.find('.status-badge.checking')
      expect(statusBadge.exists()).toBe(true)
      expect(statusBadge.find('.status-icon').text()).toBe('⏳')
    })
  })

  describe('Health Checks Display', () => {
    const mockHealthData = {
      status: 'healthy',
      service: 'caat-pension-frontend',
      version: '1.0.0',
      response_time_ms: 150,
      timestamp: '2024-12-07T10:00:00Z',
      checks: {
        frontend: {
          status: 'healthy',
          checks: {
            router: true,
            dom: true,
            fetch: true,
            localStorage: true
          }
        },
        backend: {
          status: 'healthy',
          details: {
            status: 'healthy',
            service: 'CAAT Pension API'
          }
        }
      }
    }

    beforeEach(async () => {
      HealthService.performHealthCheck.mockResolvedValue(mockHealthData)
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    it('displays frontend health checks correctly', () => {
      const checkItems = wrapper.findAll('.check-item')
      expect(checkItems.length).toBe(2)
      
      const frontendCheck = checkItems[0]
      expect(frontendCheck.find('h3').text()).toBe('Frontend Application')
      expect(frontendCheck.find('.check-status.healthy').exists()).toBe(true)
    })

    it('displays backend health checks correctly', () => {
      const checkItems = wrapper.findAll('.check-item')
      const backendCheck = checkItems[1]
      
      expect(backendCheck.find('h3').text()).toBe('Backend API')
      expect(backendCheck.find('.check-status.healthy').exists()).toBe(true)
      expect(backendCheck.text()).toContain('CAAT Pension API')
    })

    it('displays frontend sub-checks correctly', () => {
      const subChecks = wrapper.findAll('.sub-check')
      expect(subChecks.length).toBe(4) // router, dom, fetch, localStorage
      
      subChecks.forEach(check => {
        expect(check.find('.sub-check-status.pass').exists()).toBe(true)
        expect(check.find('.sub-check-status.pass').text()).toBe('✓')
      })
    })
  })

  describe('Error Handling', () => {
    it('displays frontend error messages when available', async () => {
      const mockHealthData = {
        status: 'unhealthy',
        service: 'caat-pension-frontend',
        version: '1.0.0',
        response_time_ms: 150,
        timestamp: '2024-12-07T10:00:00Z',
        checks: {
          frontend: {
            status: 'unhealthy',
            error: 'DOM not available'
          },
          backend: {
            status: 'healthy'
          }
        }
      }

      HealthService.performHealthCheck.mockResolvedValue(mockHealthData)
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(wrapper.find('.error-message').exists()).toBe(true)
      expect(wrapper.text()).toContain('DOM not available')
    })

    it('displays backend error messages when available', async () => {
      const mockHealthData = {
        status: 'unhealthy',
        service: 'caat-pension-frontend',
        version: '1.0.0',
        response_time_ms: 150,
        timestamp: '2024-12-07T10:00:00Z',
        checks: {
          frontend: {
            status: 'healthy'
          },
          backend: {
            status: 'unhealthy',
            error: 'Connection refused'
          }
        }
      }

      HealthService.performHealthCheck.mockResolvedValue(mockHealthData)
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      const errorMessages = wrapper.findAll('.error-message')
      expect(errorMessages.length).toBe(1)
      expect(wrapper.text()).toContain('Connection refused')
    })
  })

  describe('User Interactions', () => {
    it('triggers health check refresh when button is clicked', async () => {
      const mockHealthData = {
        status: 'healthy',
        service: 'caat-pension-frontend',
        version: '1.0.0',
        response_time_ms: 150,
        timestamp: '2024-12-07T10:00:00Z',
        checks: { frontend: { status: 'healthy' }, backend: { status: 'healthy' } }
      }

      HealthService.performHealthCheck.mockResolvedValue(mockHealthData)
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      // Clear the initial call
      HealthService.performHealthCheck.mockClear()

      const refreshButton = wrapper.find('.btn-refresh')
      expect(refreshButton.exists()).toBe(true)
      
      await refreshButton.trigger('click')
      
      expect(HealthService.performHealthCheck).toHaveBeenCalledTimes(1)
    })

    it('disables refresh button during loading', async () => {
      HealthService.performHealthCheck.mockImplementation(() => 
        new Promise(resolve => setTimeout(resolve, 100))
      )
      
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()

      const refreshButton = wrapper.find('.btn-refresh')
      expect(refreshButton.attributes('disabled')).toBeDefined()
      expect(refreshButton.text()).toBe('Checking...')
    })
  })

  describe('Computed Properties', () => {
    it('computes isHealthy correctly', async () => {
      const mockHealthData = { status: 'healthy' }
      HealthService.performHealthCheck.mockResolvedValue(mockHealthData)
      
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(wrapper.vm.isHealthy).toBe(true)
    })

    it('computes statusClass correctly', async () => {
      const mockHealthData = { status: 'unhealthy' }
      HealthService.performHealthCheck.mockResolvedValue(mockHealthData)
      
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(wrapper.vm.statusClass).toBe('unhealthy')
    })

    it('computes statusIcon correctly', async () => {
      const mockHealthData = { status: 'healthy' }
      HealthService.performHealthCheck.mockResolvedValue(mockHealthData)
      
      wrapper = mount(HealthCheck)
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(wrapper.vm.statusIcon).toBe('✅')
    })
  })

  describe('Utility Methods', () => {
    beforeEach(() => {
      wrapper = mount(HealthCheck)
    })

    it('formats check names correctly', () => {
      expect(wrapper.vm.formatCheckName('localStorage')).toBe('Local Storage')
      expect(wrapper.vm.formatCheckName('dom')).toBe('Dom')
      expect(wrapper.vm.formatCheckName('camelCaseExample')).toBe('Camel Case Example')
    })

    it('formats timestamps correctly', () => {
      const timestamp = '2024-12-07T10:00:00Z'
      const formatted = wrapper.vm.formatTimestamp(timestamp)
      expect(formatted).toContain('2024')
    })

    it('handles null timestamp gracefully', () => {
      expect(wrapper.vm.formatTimestamp(null)).toBe('Unknown')
    })

    it('gets status icons correctly', () => {
      expect(wrapper.vm.getStatusIcon('healthy')).toBe('✅')
      expect(wrapper.vm.getStatusIcon('unhealthy')).toBe('❌')
    })
  })

  describe('Component Lifecycle', () => {
    it('runs health check on mount', () => {
      HealthService.performHealthCheck.mockResolvedValue({})
      
      wrapper = mount(HealthCheck)
      
      expect(HealthService.performHealthCheck).toHaveBeenCalledTimes(1)
    })
  })
})