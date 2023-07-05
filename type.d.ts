import type { AllType, OptionsGlobalType } from './src/index.ts'
export {getAxios,getGlobalAxios} from './src/index.ts'

export {
  AllType,
  OptionsGlobalType,
}

declare module '@dreamjser/request-axios' {
  export const getAxios: AllType
  export const getGlobalAxios: OptionsGlobalType
}
