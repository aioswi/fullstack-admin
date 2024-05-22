import Button from './src/button.vue'

export type { ButtonSizes, ButtonVariants, ButtonColors, ButtonRadius } from './src/button'
export type ButtonProps = InstanceType<typeof Button>['$props']

export default Button
