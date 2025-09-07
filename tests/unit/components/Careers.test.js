import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Careers from '../../../src/components/Careers.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/careers', component: Careers },
  ]
})

describe('Careers.vue', () => {
  let wrapper

  beforeEach(async () => {
    router.push('/careers')
    await router.isReady()
    
    wrapper = mount(Careers, {
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
    expect(wrapper.find('.careers').exists()).toBe(true)
  })

  it('displays the hero section', () => {
    const hero = wrapper.find('.hero')
    expect(hero.exists()).toBe(true)
    expect(hero.find('h1').text()).toBe('Careers at CAAT')
    expect(hero.find('.hero-subtitle').text()).toContain('Join our team')
  })

  it('renders benefits grid', () => {
    const benefitsGrid = wrapper.find('.benefits-grid')
    expect(benefitsGrid.exists()).toBe(true)
    
    const benefitItems = wrapper.findAll('.benefit-item')
    expect(benefitItems.length).toBe(4)
    
    // Check specific benefits
    expect(wrapper.text()).toContain('Purpose-Driven Work')
    expect(wrapper.text()).toContain('Growth Opportunities')
    expect(wrapper.text()).toContain('Collaborative Culture')
    expect(wrapper.text()).toContain('Competitive Benefits')
  })

  it('displays job opportunities section', () => {
    const jobOpportunities = wrapper.find('.job-opportunities')
    expect(jobOpportunities.exists()).toBe(true)
    expect(jobOpportunities.find('h2').text()).toBe('Current Opportunities')
  })

  it('shows contact information', () => {
    const contactInfo = wrapper.find('.contact-info')
    expect(contactInfo.exists()).toBe(true)
    expect(contactInfo.text()).toContain('careers@caatpension.ca')
  })

  it('has proper component name', () => {
    expect(wrapper.vm.$options.name).toBe('Careers')
  })
})