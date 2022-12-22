import { render, screen } from '@testing-library/react'

import { SkillCard } from './SkillCard'

it('sets the title', async () => {
  // Act
  render(<SkillCard title="skill title" />)

  // Assert
  expect(await screen.findByText('skill title')).toBeTruthy()
})
