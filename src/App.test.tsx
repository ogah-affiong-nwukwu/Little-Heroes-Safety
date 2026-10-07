import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { TOPICS } from './data/topics'

beforeEach(() => {
  window.localStorage.clear()
  window.history.replaceState(null, '')
})

afterEach(() => {
  cleanup()
})

describe('navigation', () => {
  it('shows the dashboard on first load', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Pick a Super-Power to Learn/ })).toBeTruthy()
  })

  it.each(TOPICS.map((topic) => [topic.id, topic.title] as const))(
    'opens the "%s" lesson when its topic card is clicked',
    (_id, title) => {
      render(<App />)
      fireEvent.click(screen.getByRole('button', { name: `Open ${title}` }))
      expect(screen.getByRole('heading', { name: title })).toBeTruthy()
    },
  )

  it('returns to the dashboard when the Academy Home button is clicked from a lesson', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Open The Five Magic Words' }))
    expect(screen.getByRole('heading', { name: 'The Five Magic Words' })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Back to the Academy menu' }))
    expect(screen.getByRole('heading', { name: /Pick a Super-Power to Learn/ })).toBeTruthy()
    expect(screen.queryByRole('heading', { name: 'The Five Magic Words' })).toBeNull()
  })

  it('returns to the dashboard when the header logo is clicked from a lesson', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Open Sparkling Clean' }))
    expect(screen.getByRole('heading', { name: 'Sparkling Clean' })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Go to Academy home' }))
    expect(screen.getByRole('heading', { name: /Pick a Super-Power to Learn/ })).toBeTruthy()
  })

  it('returns to the dashboard when the browser back button is used', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Open How to Be a Great Friend' }))
    expect(screen.getByRole('heading', { name: 'How to Be a Great Friend' })).toBeTruthy()

    fireEvent(window, new PopStateEvent('popstate', { state: { view: 'home' } }))
    expect(screen.getByRole('heading', { name: /Pick a Super-Power to Learn/ })).toBeTruthy()
  })

  it('keeps lesson progress when returning home and re-entering a lesson', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Open Sparkling Clean' }))

    const firstChore = screen.getByRole('button', { name: /Wash your hands/ })
    fireEvent.click(firstChore)
    expect(screen.getByRole('button', { name: /Wash your hands/ }).getAttribute('aria-pressed')).toBe('true')

    fireEvent.click(screen.getByRole('button', { name: 'Back to the Academy menu' }))
    fireEvent.click(screen.getByRole('button', { name: 'Open Sparkling Clean' }))

    expect(screen.getByRole('button', { name: /Wash your hands/ }).getAttribute('aria-pressed')).toBe('true')
  })

  it('opens the 911 call simulation dialog when the Simulate button is clicked', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Open Super Emergency 911' }))

    expect(screen.queryByRole('dialog', { name: '911 call simulation' })).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /Simulate a 911 Call/ }))
    expect(screen.getByRole('dialog', { name: '911 call simulation' })).toBeTruthy()
  })

  it('steps through the 911 simulation and closes the dialog', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Open Super Emergency 911' }))
    fireEvent.click(screen.getByRole('button', { name: /Simulate a 911 Call/ }))

    fireEvent.click(screen.getByRole('button', { name: /I’m ready!/ }))
    expect(screen.getByText('[your name]')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Next line ➡️' }))
    expect(screen.getByText('[your address]')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Next line ➡️' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next line ➡️' }))
    fireEvent.click(screen.getByRole('button', { name: /Finish the call/ }))

    fireEvent.click(screen.getByRole('button', { name: 'Close simulation' }))
    expect(screen.queryByRole('dialog', { name: '911 call simulation' })).toBeNull()
  })
})
