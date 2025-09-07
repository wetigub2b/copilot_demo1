import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Retirees from '../../../src/components/Retirees.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/retirees', component: Retirees },
  ]
})

describe('Retirees.vue', () => {
  let wrapper

  beforeEach(async () => {
    router.push('/retirees')
    await router.isReady()
    
    wrapper = mount(Retirees, {
      global: {
        plugins: [router]
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.retirees').exists()).toBe(true)
  })

  it('displays the hero section', () => {
    const hero = wrapper.find('.hero')
    expect(hero.exists()).toBe(true)
    expect(hero.find('h1').text()).toBe('Retiree Services')
    expect(hero.find('.hero-subtitle').text()).toContain('Comprehensive support and services')
  })

  it('renders services grid', () => {
    const servicesGrid = wrapper.find('.services-grid')
    expect(servicesGrid.exists()).toBe(true)
    
    const serviceItems = wrapper.findAll('.service-item')
    expect(serviceItems.length).toBe(6)
    
    // Check specific services
    expect(wrapper.text()).toContain('Pension Payments')
    expect(wrapper.text()).toContain('Health Benefits')
    expect(wrapper.text()).toContain('Annual Statements')
    expect(wrapper.text()).toContain('Survivor Benefits')
    expect(wrapper.text()).toContain('Dedicated Support')
    expect(wrapper.text()).toContain('Document Services')
  })

  it('displays important information section', () => {
    const importantInfo = wrapper.find('.important-info')
    expect(importantInfo.exists()).toBe(true)
    expect(importantInfo.find('h2').text()).toBe('Important Information')
    
    const infoCards = wrapper.findAll('.info-card')
    expect(infoCards.length).toBe(3)
    
    expect(wrapper.text()).toContain('Tax Information')
    expect(wrapper.text()).toContain('Address Changes')
    expect(wrapper.text()).toContain('Banking Updates')
  })

  it('shows contact section', () => {
    const contactSection = wrapper.find('.contact-section')
    expect(contactSection.exists()).toBe(true)
    expect(contactSection.find('h2').text()).toBe('Contact Retiree Services')
    expect(contactSection.text()).toContain('retireeservices@caatpension.ca')
    expect(contactSection.text()).toContain('1-800-CAA-TPEN')
  })

  it('has proper component name', () => {
    expect(wrapper.vm.$options.name).toBe('Retirees')
  })
})