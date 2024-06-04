import Spinner from './src/spinner.vue'

export type { SpinnerSizes, SpinnerColors } from './src/spinner'
export type SpinnerProps = InstanceType<typeof Spinner>['$props']

export default Spinner
