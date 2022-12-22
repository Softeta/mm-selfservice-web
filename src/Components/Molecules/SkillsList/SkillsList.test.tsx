import { render, screen, fireEvent } from '@testing-library/react'
import { SkillsList } from './SkillsList'

const _renderTwoSkills = () => {
  render(<SkillsList skills={['Skill 1', 'Skill 2']} />)
}

const _renderFiveSkills = () => {
  render(
    <SkillsList
      skills={['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5']}
    />
  )
}

it('renders two skills: all skills are visible', () => {
  // Act
  _renderTwoSkills()

  // Assert
  expect(screen.getByText('Skill 1')).toBeTruthy()
  expect(screen.getByText('Skill 2')).toBeTruthy()
})

it('renders two skills: hide/more actions are not available', () => {
  // Act
  _renderTwoSkills()

  // Assert
  const tag = () =>
    screen.getByText((_, element) => element?.tagName.toLowerCase() === 'span')
  expect(tag).toThrow()
})

it('renders five skills: first four skills are visible initially', () => {
  // Act
  _renderFiveSkills()

  // Assert
  expect(screen.getByText('Skill 1')).toBeTruthy()
  expect(screen.getByText('Skill 2')).toBeTruthy()
  expect(screen.getByText('Skill 3')).toBeTruthy()
  expect(screen.getByText('Skill 4')).toBeTruthy()
  expect(() => screen.getByText('Skill 5')).toThrow()
})

it('renders five skills: tagSelect.showMore text is visible', () => {
  // Act
  _renderFiveSkills()

  // Assert
  expect(screen.getByText('tagSelect.showMore')).toBeTruthy()
})

it('renders five skills: tagSelect.showMore triggered ensures all skills are visible', () => {
  // Act
  _renderFiveSkills()
  fireEvent.click(screen.getByText('tagSelect.showMore'))

  // Assert
  expect(screen.getByText('Skill 1')).toBeTruthy()
  expect(screen.getByText('Skill 2')).toBeTruthy()
  expect(screen.getByText('Skill 3')).toBeTruthy()
  expect(screen.getByText('Skill 4')).toBeTruthy()
  expect(screen.getByText('Skill 5')).toBeTruthy()
})

it('renders five skills: tagSelect.showMore triggered ensures hide action gets visible', () => {
  // Act
  _renderFiveSkills()
  fireEvent.click(screen.getByText('tagSelect.showMore'))

  // Assert
  expect(screen.getByText('Skill 1')).toBeTruthy()
  expect(screen.getByText('Skill 2')).toBeTruthy()
  expect(screen.getByText('Skill 3')).toBeTruthy()
  expect(screen.getByText('Skill 4')).toBeTruthy()
  expect(screen.getByText('Skill 5')).toBeTruthy()
  expect(screen.getByText('tagSelect.showLess')).toBeTruthy()
})

it('renders five skills: tagSelect.showLess triggered ensures first for skills are visible', () => {
  // Act
  _renderFiveSkills()
  fireEvent.click(screen.getByText('tagSelect.showMore'))
  fireEvent.click(screen.getByText('tagSelect.showLess'))

  // Assert
  expect(screen.getByText('Skill 1')).toBeTruthy()
  expect(screen.getByText('Skill 2')).toBeTruthy()
  expect(screen.getByText('Skill 3')).toBeTruthy()
  expect(screen.getByText('Skill 4')).toBeTruthy()
  expect(() => screen.getByText('Skill 5')).toThrow()
})
