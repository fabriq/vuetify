// Utilities
import { convertToUnit, destructComputed, getCurrentInstanceName, includes, propsFactory } from '@/util'

// Types
const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large']

export interface SizeProps {
  size?: string | number
  'x-small'?: boolean
  small?: boolean
  large?: boolean
  'x-large'?: boolean
}

// Composables
export const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: 'default',
  },
  /** @compat */
  'x-small': Boolean,
  /** @compat */
  small: Boolean,
  /** @compat */
  large: Boolean,
  /** @compat */
  'x-large': Boolean,
}, 'size')

/**
 * @compat props.size
 */
export function resolveSizeCompat (props: SizeProps) {
  if (props['x-large']) return 'x-large'
  if (props.large) return 'large'
  if (props.small) return 'small'
  if (props['x-small']) return 'x-small'
  return props.size
}

export function useSize (
  props: SizeProps,
  name = getCurrentInstanceName(),
) {
  return destructComputed(() => {
    let sizeClasses
    let sizeStyles
    const size = resolveSizeCompat(props)
    if (includes(predefinedSizes, size)) {
      sizeClasses = `${name}--size-${size}`
    } else if (size) {
      sizeStyles = {
        width: convertToUnit(size),
        height: convertToUnit(size),
      }
    }
    return { sizeClasses, sizeStyles }
  })
}
