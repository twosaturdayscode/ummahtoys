import { Outlet } from '@remix-run/react'

export default function StorePage() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-center py-7 px-10">
      <Outlet />
    </div>
  )
}
