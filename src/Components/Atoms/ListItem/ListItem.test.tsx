import { render, screen } from '@testing-library/react'

import { ListItem } from './ListItem'

it('sets the title', () => {
  // Act
  render(<ListItem value="list title" subtitle="list subtitle" />)

  // Assert
  expect(screen.findByText('list title')).toBeTruthy()
})

it('sets the subtitle', () => {
  // Act
  render(<ListItem value="list title" subtitle="list subtitle" />)

  // Assert
  expect(screen.findByText('list subtitle')).toBeTruthy()
})

it('no subtitle node rendered when subtitle not set', () => {
  // Act
  render(<ListItem value="list title" />)

  // Assert
  const result = screen.getAllByText(
    (_, element) => element?.nodeName.toLowerCase() == 'p'
  )
  expect(result.length).toBe(1)
})
