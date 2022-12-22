import { render, screen } from '@testing-library/react'
import { RangeSlider } from './RangeSlider'

const _renderComponent = () => {
  render(
    <RangeSlider
      values={[
        {
          title: 'Entry',
          value: 0
        },
        {
          title: 'Junior',
          value: 1
        },
        {
          title: 'Senior',
          value: 2
        },
        {
          title: 'Expert',
          value: 3
        }
      ]}
      label="Professional level slider"
      selectedValues={[
        {
          title: 'Entry',
          value: 0
        },
        {
          title: 'Junior',
          value: 1
        }
      ]}
      onSelectionChanged={() => undefined}
    />
  )
}

it('all selections are rendered', () => {
  // Act
  _renderComponent()

  // Assert
  expect(screen.getByText('Entry')).toBeTruthy()
  expect(screen.getByText('Junior')).toBeTruthy()
  expect(screen.getByText('Senior')).toBeTruthy()
  expect(screen.getByText('Expert')).toBeTruthy()
})

it('label gets rendered', () => {
  // Act
  _renderComponent()

  // Assert
  expect(screen.getByText('Professional level slider')).toBeTruthy()
})
