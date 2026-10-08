import { IconBase } from './IconBase'
import type { IconProps } from './IconBase'

export function StarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3.8 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.8z" />
    </IconBase>
  )
}

export function BadgeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="9" r="5.7" />
      <path d="m12 6.1 1 2.1 2.2.3-1.6 1.6.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.6 2.2-.3 1-2.1z" />
      <path d="M8.9 13.5 7.4 21l4.6-2.6 4.6 2.6-1.5-7.5" />
    </IconBase>
  )
}

export function TrophyIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7.6 3.6h8.8v5.6a4.4 4.4 0 0 1-8.8 0V3.6z" />
      <path d="M7.6 8.4H5.7a2.7 2.7 0 0 1 0-5.4h1.9" />
      <path d="M16.4 8.4h1.9a2.7 2.7 0 0 0 0-5.4h-1.9" />
      <path d="M12 5.2l.7 1.4 1.4.7-1.4.7-.7 1.4-.7-1.4-1.4-.7 1.4-.7.7-1.4z" />
      <path d="M12 9.2v8.2" />
      <path d="M9.4 13.6h5.2" />
      <path d="M8.4 17.4h7.2" />
    </IconBase>
  )
}

export function BoltIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M13.4 2.8 5.2 13.1h6.1l-1.3 8.1 8.2-10.3h-6.1l1.3-8.1z" />
    </IconBase>
  )
}

export function SparklesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M11.3 3.3l1.8 4.3 4.3 1.8-4.3 1.8-1.8 4.3-1.8-4.3-4.3-1.8 4.3-1.8 1.8-4.3z" />
      <path d="M18.4 14.7l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9.9-2.2z" />
      <path d="M5.6 17.9l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6.6-1.5z" />
    </IconBase>
  )
}

export function HeartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 20.4c-6-4.3-8.5-7.6-8.5-10.9a4.6 4.6 0 0 1 8.5-2.9 4.6 4.6 0 0 1 8.5 2.9c0 3.3-2.5 6.6-8.5 10.9z" />
    </IconBase>
  )
}

export function MeterIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.6 14.6a7.4 7.4 0 1 1 14.8 0" />
      <path d="m12 14.6 3.7-4.3" />
      <path d="M8.6 17.8h6.8" />
    </IconBase>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m4.5 12.6 4.9 4.9L19.5 7.2" />
    </IconBase>
  )
}

export function XIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </IconBase>
  )
}
