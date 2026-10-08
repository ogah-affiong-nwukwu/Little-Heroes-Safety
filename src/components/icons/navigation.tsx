import { IconBase } from './IconBase'
import type { IconProps } from './IconBase'

export function HomeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3.5 10.6 12 3.4l8.5 7.2" />
      <path d="M5.8 9v11h12.4V9" />
      <path d="M9.8 20v-5.6h4.4V20" />
    </IconBase>
  )
}

export function CompassIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5.1-5.1 2 2-5.1 5.1-2z" />
    </IconBase>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 21.3s-6.4-5.2-6.4-10.2a6.4 6.4 0 0 1 12.8 0c0 5-6.4 10.2-6.4 10.2z" />
      <circle cx="12" cy="11.1" r="2.4" />
    </IconBase>
  )
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M19.5 12H4.5" />
      <path d="m11 6-6 6 6 6" />
    </IconBase>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 12h15" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </IconBase>
  )
}

export function SoundOnIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 9.6v4.8h3.1L12 18.3V5.7L7.6 9.6H4.5z" />
      <path d="M15.2 9.2a4.2 4.2 0 0 1 0 5.6" />
      <path d="M17.8 6.9a7.8 7.8 0 0 1 0 10.2" />
    </IconBase>
  )
}

export function SoundOffIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 9.6v4.8h3.1L12 18.3V5.7L7.6 9.6H4.5z" />
      <path d="m16 9.7 4.5 4.6" />
      <path d="m20.5 9.7-4.5 4.6" />
    </IconBase>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.3" />
      <path d="M12 19.1v2.3" />
      <path d="M2.6 12h2.3" />
      <path d="M19.1 12h2.3" />
      <path d="m5.4 5.4 1.6 1.6" />
      <path d="m17 17 1.6 1.6" />
      <path d="m18.6 5.4-1.6 1.6" />
      <path d="m7 17-1.6 1.6" />
    </IconBase>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20.6 14.6A8.7 8.7 0 1 1 9.4 3.4a7.1 7.1 0 0 0 11.2 11.2z" />
    </IconBase>
  )
}
