import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import type { ReactElement } from 'react'
import * as icons from './index'

const ICONS = Object.entries(icons).filter(
  ([name]) => typeof (icons as Record<string, unknown>)[name] === 'function' && name.endsWith('Icon'),
) as Array<[string, (props: { size?: number }) => ReactElement]>

afterEach(() => {
  cleanup()
})

describe('icon library', () => {
  it.each(ICONS)('%s renders a consistent 24x24 currentColor stroke icon', (_name, Icon) => {
    const { container } = render(<Icon size={32} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24')
    expect(svg?.getAttribute('width')).toBe('32')
    expect(svg?.getAttribute('height')).toBe('32')
    expect(svg?.getAttribute('fill')).toBe('none')
    expect(svg?.getAttribute('stroke')).toBe('currentColor')
    expect(svg?.getAttribute('stroke-width')).toBe('2')
    expect(svg?.getAttribute('stroke-linecap')).toBe('round')
    expect(svg?.getAttribute('stroke-linejoin')).toBe('round')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
  })
})
