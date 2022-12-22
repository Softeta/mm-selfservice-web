import { render, screen } from '@testing-library/react'

import { List } from './List'

it('sets list items', async () => {
  // Act
  render(
    <List
      items={[
        { key: '123', value: 'title 1', subtitle: 'subtitle 1' },
        { key: '125', value: 'title 2' }
      ]}
    />
  )

  // Assert
  const result = await screen.findAllByText(
    (_, element) => element?.nodeName.toLowerCase() == 'li'
  )
  expect(result.length).toBe(2)
})
