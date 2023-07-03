import type { AllType, OptionsGlobalType } from './src/index.ts'

export {
  AllType,
  OptionsGlobalType,
}
export {getAxios,getGlobalAxios} from './src/index.ts'


declare module '@dreamjser/request-axios' {
  export const getAxios: AllType
  export const getGlobalAxios: OptionsGlobalType
}
