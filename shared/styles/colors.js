// @flow strict
// the _on_white are precomputed colors so we can do less blending on mobile
import {isIOS} from '../constants/platform'

const colors = {
  black: 'rgba(0, 0, 0, 0.85)',
  black_05: 'rgba(0, 0, 0, 0.05)',
  black_05_on_white: 'rgb(242,242,242)',
  black_10: 'rgba(0, 0, 0, 0.10)',
  black_10_on_white: 'rgb(229,229,229)',
  black_20: 'rgba(0, 0, 0, 0.20)',
  black_20_on_white: 'rgb(204,204,204)',
  black_35: 'rgba(0, 0, 0, 0.35)',
  black_40: 'rgba(0, 0, 0, 0.40)',
  black_50: 'rgba(0, 0, 0, 0.50)',
  black_50_on_white: 'rgb(127,127,127)',
  black_60: 'rgba(0, 0, 0, 0.60)',
  black_63: 'rgba(0, 0, 0, 0.63)',
  black_75: 'rgba(0, 0, 0, 0.75)',
  black_on_white: 'rgb(38,38,38)',
  blue: '#4C8EFF',
  blueLight: '#73A6FF',
  blueLighter: '#A8CCFF',
  blueLighter_20: 'rgba(168, 204, 255, 0.2)',
  blueLighter_20_on_white: 'rgb(238, 245, 255)',
  blueLighter_40: 'rgba(168, 204, 255, 0.4)',
  blueLighter_40_on_white: 'rgb(220, 235, 255)',
  blueLighter_60: 'rgba(168, 204, 255, 0.6)',
  blueLighter_60_on_white: 'rgb(203, 224, 255)',
  blueLighter2: '#EBF2FC',
  blueLighter3: '#F7F9FC',
  blueGrey: '#F2F4F7',
  blueGreyDark: '#E0E8F6',
  blue_30: 'rgba(51, 160, 255, 0.3)',
  blue_30_on_white: 'rgb(192,226,255)',
  blue_60: 'rgba(51, 160, 255, 0.6)',
  blue_60_on_white: 'rgb(133,198,255)',
  brown_75: 'rgba(71, 31, 17, 0.75)',
  brown_75_on_white: 'rgb(117,87,78)',
  darkBlue: '#2645A3',
  blueDark: '#3663EA',
  darkBlue3: '#182D6E',
  darkBlue3_75: 'rgba(24, 45, 110, .75)',
  darkBlue3_75_on_white: 'rgb(82,98,147)',
  blueDarker: '#1036AC',
  // on iOS overdraw is eliminiated if we use white, on Android it's eliminated if it's transparent /shrug
  fastBlank: isIOS ? '#ffffff' : undefined,
  green: '#37BD99',
  green2: '#0E8263',
  greenLighter: '#E8FAF6',
  greenDarker: '#1A7D5B',
  greenDark: '#289A72',
  greenLight: '#B7EED9',
  grey: '#cccccc',
  lightGrey: '#f0f0f0',
  lightGrey2: '#e6e6e6',
  orange: '#ff6f21',
  orange_90: 'rgba(255, 111, 33, 0.9)',
  purpleDark: '#704eba',
  purple: '#845cdb',
  purple_01: 'rgba(132, 92, 219, 0.01)',
  purple_10: 'rgba(132, 92, 219, 0.1)',
  purple_40: 'rgba(132, 92, 219, 0.4)',
  purpleLight: '#9f7bec',
  purpleDarker: '#4D3285',
  purpleLighter: '#E8DEFF',
  red: '#ff4d61',
  red_10: 'rgba(255,0,0,0.1)',
  red_20: 'rgba(255,0,0,0.2)',
  red_75: 'rgba(255,0,0,0.75)',
  red_75_on_white: 'rgb(255,64,64)',
  redLight: '#FFCAC1',
  redDark: '#D72236',
  redDarker: '#A5090E',
  redLighter: '#FAF2ED',
  transparent: 'rgba(0, 0, 0, 0)',
  transparent_on_white: '#ffffff',
  white: '#ffffff',
  white_0: 'rgba(255, 255, 255, 0)',
  white_0_on_white: '#ffffff',
  white_20: 'rgba(255, 255, 255, 0.20)',
  white_20_on_white: '#ffffff',
  white_40: 'rgba(255, 255, 255, 0.40)',
  white_40_on_white: '#ffffff',
  white_75: 'rgba(255, 255, 255, 0.75)',
  white_75_on_white: '#ffffff',
  white_90: 'rgba(255, 255, 255, 0.90)',
  white_90_on_white: '#ffffff',
  yellow: '#fff75a',
  yellowDark: '#FFB800',
  yellowLight: '#fffdcc',
  yellowGreen: '#a8cf36',
  yellowGreen2: '#94b52f',
  yellowGreen2_75: 'rgba(154, 180, 57, 0.75)',
  yellowGreen2_75_on_white: 'rgb(179,199,107)',
  yellowGreen3: '#d2e697',
}

export default colors
