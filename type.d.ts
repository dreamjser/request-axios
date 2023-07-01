type CountdownCircle = import('vue').DefineComponent<{
  timeOut?: number
  circleColor?: string
}>

declare module '@dreamjser/request-axios' {
  export const CountdownCircle: CountdownCircle
}
