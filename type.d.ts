import type { AllType, OptionsGlobalType } from './src/index.ts'

declare module '@dreamjser/request-axios' {
  export const getAxios: AllType
  export const getGlobalAxios: OptionsGlobalType
}
