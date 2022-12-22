import { render, screen } from '@testing-library/react'
import { Carousel } from './Carousel'

it('renders title for carousel', () => {
  // Act
  render(
    <Carousel
      title="Awesome carousel"
      elements={[<p key={1}>Item 1</p>, <p key={2}>Item 2</p>]}
    />
  )

  // Assert
  expect(screen.findByText('Awesome carousel')).toBeTruthy()
})

it('renders items for carousel', () => {
  // Act
  render(
    <Carousel
      title="Awesome carousel"
      elements={[<p key={1}>Item 1</p>, <p key={2}>Item 2</p>]}
    />
  )

  // Assert
  expect(screen.findByText('Item 1')).toBeTruthy()
  expect(screen.findByText('Item 2')).toBeTruthy()
})
