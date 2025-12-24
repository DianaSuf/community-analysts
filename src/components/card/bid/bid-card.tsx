import Card from "@/components/card/card"
import { Button } from "@/components/ui/button"
import type { IBid } from "@/types/admin-data"

interface BidCardProps {
  bid: IBid
}

export default function BidCard({ bid }: BidCardProps) {
  return (
    <>
      <Card>
        <h4>{bid.name}</h4>
        <Button>
          Принять
        </Button>
      </Card>
    </>
  )
}
