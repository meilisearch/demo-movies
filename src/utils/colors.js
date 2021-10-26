import Color from 'color'
import get from 'utils/get'

export const whiten = (color, value) =>
  Color(get(`colors.${color}`))
    .whiten(value)
    .hex()

export const darken = (color, value) =>
  Color(get(`colors.${color}`))
    .darken(value)
    .hex()

export const fade = (color, value) => Color(get(`colors.${color}`)).fade(value)
