import type { AllType, OptionsGlobalType } from './src/index.ts'
export {getAxios,getGlobalAxios} from './es'

export {
  AllType,
  OptionsGlobalType,
}

declare module '@dreamjser/request-axios' {
  export const getAxios: AllType
  export const getGlobalAxios: OptionsGlobalType
}
