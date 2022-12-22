import { render, screen } from '@testing-library/react'

import { ActivitySummary } from './ActivitySummary'

const _findByTag = (tag: string, className: string, text?: string) => {
  expect(
    screen.getByText(
      (_, element) =>
        element?.tagName?.toLowerCase()?.includes(tag.toLocaleLowerCase()) ===
          true &&
        element?.className
          ?.toLowerCase()
          ?.includes(className.toLocaleLowerCase()) === true &&
        (!text ||
          element?.firstChild?.textContent?.trim()?.includes(text) === true)
    )
  ).toBeTruthy()
}

const _render = () => {
  render(
    <ActivitySummary
      title={'title'}
      company={'company'}
      startDate={new Date(2022, 5, 6)}
      endDate={new Date(2022, 6, 6)}
    />
  )
}

it('sets the title correctly', () => {
  // Act
  _render()

  // Assert
  _findByTag('span', 'text-md font-bold', 'title')
})

it('sets the company correctly', () => {
  // Act
  _render()

  // Assert
  _findByTag('span', 'text-base font-semibold', 'company')
})

it('sets the date range correctly when end date is set', async () => {
  // Act
  _render()

  // Assert
  expect(await screen.findAllByText('June 2022 - July 2022')).toBeTruthy()
})

it('sets the date range correctly when end date is not set', async () => {
  // Act
  render(
    <ActivitySummary
      title={'title'}
      company={'company'}
      startDate={new Date(2022, 5, 6)}
    />
  )

  // Assert
  expect(
    await screen.findAllByText('June 2022 - activitySummary.now')
  ).toBeTruthy()
})
