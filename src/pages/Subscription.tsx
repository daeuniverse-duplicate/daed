import { useSubscriptionsQuery } from '~/apis'
import { Table } from '~/components/Table'

export const SubscriptionPage = () => {
  const { data: subscriptionsQueryData } = useSubscriptionsQuery()

  return (
    <Table
      columns={[
        {
          header: 'id',
          accessorKey: 'id',
        },
        {
          header: 'link',
          accessorKey: 'link',
        },
        {
          header: 'status',
          accessorKey: 'status',
        },
      ]}
      dataSource={subscriptionsQueryData?.subscriptions || []}
    />
  )
}