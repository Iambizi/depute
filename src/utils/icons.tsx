import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
    </Icon>
  );
}

export function IconX(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 4 L12 12" />
      <path d="M12 4 L4 12" />
    </Icon>
  );
}

export function IconLock(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="7" width="9" height="6" rx="1" />
      <path d="M5.5 7 V5.5 a2.5 2.5 0 0 1 5 0 V7" />
    </Icon>
  );
}

export function IconPause(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 4 V12" />
      <path d="M10 4 V12" />
    </Icon>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 3.5 V12.5 L12.5 8 Z" />
    </Icon>
  );
}

export function IconStop(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4.5" y="4.5" width="7" height="7" rx="1" />
    </Icon>
  );
}

export function IconUndo(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7 H10 a3 3 0 1 1 0 6 H8" />
      <path d="M6.5 4.5 L4 7 L6.5 9.5" />
    </Icon>
  );
}

export function IconChevron(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3.5 L10.5 8 L6 12.5" />
    </Icon>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13 8 H3" />
      <path d="M7 4 L3 8 L7 12" />
    </Icon>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 8 H13" />
      <path d="M9 4 L13 8 L9 12" />
    </Icon>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 13 V3" />
      <path d="M4 7 L8 3 L12 7" />
    </Icon>
  );
}

export function IconAlert(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 2.5 L14 13.5 H2 Z" />
      <path d="M8 6.5 V9.5" />
      <path d="M8 11.5 h0.01" />
    </Icon>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5.5" y="5.5" width="7" height="7" rx="1" />
      <path d="M3.5 10.5 V3.5 H10.5" />
    </Icon>
  );
}

export function IconDot(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="8" r="2.25" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconCircle(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="8" r="4.25" />
    </Icon>
  );
}
