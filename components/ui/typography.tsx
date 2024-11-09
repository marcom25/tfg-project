import React, { forwardRef } from 'react'
import { cn } from "@/lib/utils"

export type TypographyProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline'
  component?: React.ElementType
  className?: string
  children: React.ReactNode
}

const variantStyles = {
  h1: 'text-5xl font-light',
  h2: 'text-4xl font-light',
  h3: 'text-3xl font-regular',
  h4: 'text-2xl font-regular',
  h5: 'text-xl font-regular',
  h6: 'text-lg font-medium',
  subtitle1: 'text-base font-regular',
  subtitle2: 'text-sm font-medium',
  body1: 'text-base font-regular',
  body2: 'text-sm font-regular',
  button: 'text-sm font-medium uppercase',
  caption: 'text-xs font-regular',
  overline: 'text-xs font-regular uppercase',
}

const defaultComponents = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  button: 'span',
  caption: 'span',
  overline: 'span',
}

const Typography = forwardRef<HTMLElement, TypographyProps>(({ 
  variant = 'body1', 
  component,
  className,
  children,
  ...props
}, ref) => {
  const Component = component || defaultComponents[variant as keyof typeof defaultComponents]
  
  return (
    <Component 
      ref={ref}
      className={cn(variantStyles[variant as keyof typeof variantStyles], className)}
      {...props}
    >
      {children}
    </Component>
  )
})

Typography.displayName = 'Typography'

export default Typography