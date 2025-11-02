import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/finances/debts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/finances/debts/"!</div>
}
