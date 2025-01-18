import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const orders = [
  { id: "Greenish Sofa", date: "2023-06-10", status: "Delivered", total: "$120.50" },
  { id: "Italian Sofa", date: "2023-06-15", status: "Processing", total: "$85.00" },
  { id: "Brownish Sofa", date: "2023-06-18", status: "Shipped", total: "$220.75" },
]

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Order :  {order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm font-medium">{order.total}</p>
                <Badge 
                  variant={order.status === "Delivered" ? "default" : "secondary"}
                  className="mt-1"
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

