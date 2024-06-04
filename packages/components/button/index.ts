import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'

export type { ButtonSizes, ButtonVariants, ButtonColors, ButtonRadius } from './src/button'
export type ButtonProps = InstanceType<typeof Button>['$props']
export type ButtonGroupProps = InstanceType<typeof ButtonGroup>['$props']

export { ButtonGroup }
export default Button
