import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface WelcomeBannerProps {
  username: string
}

export function WelcomeBanner({ username }: WelcomeBannerProps) {
  return (
    <Card className="bg-gradient-to-r from-[#7e33e0] to-[#6119c0] text-white">
      <CardContent className="flex items-center justify-between py-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Welcome , {username}! 👋</h2>
          <p className="text-blue-100">
            Check out your latest orders and account activity.
          </p>
        </div>
        <div className="hidden sm:block">
          <Button variant="secondary" className="bg-white text-[#7e33e0] hover:bg-blue-50">
            View Orders
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

