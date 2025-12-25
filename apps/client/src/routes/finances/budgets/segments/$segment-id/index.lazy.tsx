import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/finances/budgets/segments/$segment-id/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/finances/budgets/segments/$segment-id/"!</div>
}
