import { MyTransactionsDashboard } from '@fts/finances/my-transactions/components/dashboard/my-transactions-dashboard'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/transactions/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MyTransactionsDashboard/>
}
