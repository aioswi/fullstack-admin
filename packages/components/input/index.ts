import Input from './src/input.vue'

export type {
  InputVariants,
  InputRadius,
  InputSizes,
  InputColors,
  InputLabelPlacements,
} from './src/input'
export type InputProps = InstanceType<typeof Input>['$props']

export default Input
