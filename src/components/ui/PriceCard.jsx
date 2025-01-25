import { Card, CardContent } from "@/components/ui/card";

const PriceCard = ({ title, amount, bgColor = "bg-blue-50" }) => (
  <Card className={bgColor}>
    <CardContent className="pt-6">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-3xl font-bold">{amount}</p>
      </div>
    </CardContent>
  </Card>
);

export default PriceCard;