import React from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
}

export const Page = ({ children, className }: IProps) => {
  return (
    <div className={className}>
      <div className="min-h-screen bg-spring-wood">{children}</div>
    </div>
  )
}
