import {
  expect,
} from 'chai'

import withStyle, {
  theme,
} from './withStyle'

describe('client > withStyle', () => {
  it('withStyle should be a function', () => {
    expect(withStyle).to.be.a('function')
  })

  it('theme should be an object', () => {
    expect(theme).to.be.an('object')
  })
})
