"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { StockPriceChart } from "@/components/stock-price-chart"

interface StrategyCard {
  id: number
  title: string
  description: string
}

const strategyCards: StrategyCard[] = [
  {
    id: 1,
    title: "Momentum Trading",
    description:
      "A short-term approach that seeks to profit from stocks moving strongly in one direction, assuming these price trends will continue. Momentum traders often rely on technical indicators (like moving averages or volume spikes) to quickly identify and enter trades. Because momentum can reverse suddenly, strict risk management and stop-loss orders are key.",
  },
  {
    id: 2,
    title: "Value Investing",
    description:
      "A longer-term strategy that focuses on buying stocks believed to be trading below their intrinsic worth. Value investors analyze fundamental metrics (like P/E ratios, dividend yields, or cash flow) to find undervalued companies and wait patiently for the market to correct the mispricing. This approach can require a strong stomach for short-term volatility and thorough research into company fundamentals.",
  },
  {
    id: 3,
    title: "Swing Trading",
    description:
      'A medium-term method aiming to capture price "swings" in a stock over a few days to several weeks. Swing traders combine technical analysis (support/resistance levels, candlestick patterns) and sometimes news events to time entries and exits. While less intense than day trading, swing trading still demands consistent monitoring of positions and disciplined stop-losses to manage risk.',
  },
  {
    id: 4,
    title: "Options Trading",
    description:
      "The practice of buying or selling contracts that give the right (but not obligation) to buy (call) or sell (put) a stock at a specific price before expiration. Options can amplify gains if the underlying stock moves favorably, or hedge against losses if used strategically. However, they add complexity—time decay, implied volatility, and the Greeks (Delta, Gamma, Theta, Vega) all influence potential outcomes, so careful risk management is essential.",
  },
]

export default function DocumentationPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-2xl">
            <BookOpen className="mr-2" />
            Trading Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategyCards.map((card) => (
              <Card key={card.id}>
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {" "}
                  {/* Added padding top */}
                  <p className="mb-4 mt-2">{card.description}</p> {/* Added margin top */}
                </CardContent>
              </Card>
            ))}
            <div className="col-span-1 md:col-span-2">
              <StockPriceChart />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

