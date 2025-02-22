"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

const stockData = [
  {
    ticker: "AAPL",
    sector: "Technology",
    price: 175.84,
    dailyChange: 0.95,
    monthlyChange: 4.32,
    beta: 1.28,
    forwardPE: 28.45,
    volume: 52834600,
  },
  {
    ticker: "MSFT",
    sector: "Technology",
    price: 328.79,
    dailyChange: 1.23,
    monthlyChange: 5.67,
    beta: 0.98,
    forwardPE: 31.2,
    volume: 21456700,
  },
  {
    ticker: "JPM",
    sector: "Financials",
    price: 146.43,
    dailyChange: -0.45,
    monthlyChange: 2.89,
    beta: 1.12,
    forwardPE: 9.8,
    volume: 8765400,
  },
  {
    ticker: "XOM",
    sector: "Energy",
    price: 98.75,
    dailyChange: 0.78,
    monthlyChange: -1.23,
    beta: 1.05,
    forwardPE: 11.2,
    volume: 15678900,
  },
  {
    ticker: "JNJ",
    sector: "Healthcare",
    price: 155.67,
    dailyChange: 0.34,
    monthlyChange: 1.98,
    beta: 0.65,
    forwardPE: 15.1,
    volume: 6789100,
  },
  {
    ticker: "TSLA",
    sector: "Consumer Discretionary",
    price: 238.45,
    dailyChange: 2.45,
    monthlyChange: 8.76,
    beta: 2.31,
    forwardPE: 62.4,
    volume: 108976500,
  },
  {
    ticker: "AMZN",
    sector: "Consumer Discretionary",
    price: 127.12,
    dailyChange: 1.67,
    monthlyChange: 6.54,
    beta: 1.24,
    forwardPE: 42.3,
    volume: 43567800,
  },
  {
    ticker: "WMT",
    sector: "Consumer Staples",
    price: 156.89,
    dailyChange: 0.56,
    monthlyChange: 3.21,
    beta: 0.54,
    forwardPE: 23.1,
    volume: 5678900,
  },
  {
    ticker: "NVDA",
    sector: "Semiconductors",
    price: 457.62,
    dailyChange: 3.58,
    monthlyChange: 16.45,
    beta: 1.89,
    forwardPE: 48.7,
    volume: 89234500,
  },
  {
    ticker: "BAC",
    sector: "Financials",
    price: 28.45,
    dailyChange: -0.87,
    monthlyChange: -2.34,
    beta: 1.35,
    forwardPE: 8.9,
    volume: 34567800,
  },
  {
    ticker: "META",
    sector: "Communication Services",
    price: 297.89,
    dailyChange: 2.12,
    monthlyChange: 9.87,
    beta: 1.42,
    forwardPE: 21.3,
    volume: 67891200,
  },
  {
    ticker: "MCD",
    sector: "Consumer Discretionary",
    price: 283.54,
    dailyChange: 0.34,
    monthlyChange: 2.76,
    beta: 0.64,
    forwardPE: 24.8,
    volume: 4567800,
  },
]

const strategyDefinitions = {
  momentum: {
    title: "Momentum Trading",
    description: `Focuses on stocks showing strong directional movement, using metrics like beta and price trends.
    High beta (>1) stocks amplify market moves, while monthly changes indicate trend strength.
    
    Momentum traders typically prefer:
    • High trading volume for easy entry/exit
    • Strong price trends (consistent monthly gains)
    • Higher beta for amplified moves
    • Less emphasis on fundamental valuations
    
    Example: A stock with beta >1.5, monthly gain >5%, and daily volume >10M shares would be ideal.`,
  },
  value: {
    title: "Value Investing",
    description: `Analyzes fundamental metrics to find undervalued stocks, primarily using Forward P/E and sector comparisons.
    Lower P/E ratios might indicate undervaluation, but must be compared within sectors.
    
    Value investors typically seek:
    • Lower Forward P/E compared to sector peers
    • Stable or moderate beta (<1.5) for less volatility
    • Less concern with short-term price movements
    • Strong fundamental business metrics
    
    Example: A stock trading at P/E of 10 while sector average is 15, with beta <1 would be attractive.`,
  },
  swing: {
    title: "Swing Trading",
    description: `Capitalizes on short to medium-term price movements, combining technical and volume analysis.
    High volume indicates better liquidity and more reliable price moves.
    
    Swing traders focus on:
    • High daily trading volume for easy position sizing
    • Moderate to high beta (>0.8) for sufficient price movement
    • Both daily and monthly trends for timing
    • Price patterns and sector rotations
    
    Example: A stock with 5M+ daily volume and beta >0.8 provides good swing opportunities.`,
  },
  options: {
    title: "Options Trading",
    description: `Uses derivatives to profit from price movements, volatility, and time decay.
    Combines multiple metrics for complex strategies.
    
    Options traders analyze:
    • Beta for directional strategy selection
    • Volume for option liquidity assessment
    • Price levels for strike selection
    • Forward P/E for long-term direction bias
    
    Example: High beta stocks with large volume support various options strategies like straddles or iron condors.`,
  },
}

const stockAnalyses = {
  AAPL: {
    summary:
      "Apple combines stable growth with strategic innovation, offering opportunities across multiple trading strategies while maintaining strong market presence.",
    strategies: {
      momentum:
        "With a beta of 1.28 and consistent monthly gains of 4.32%, AAPL offers moderate momentum potential. The high daily volume of 52.8M shares provides excellent liquidity for larger positions, while product launch cycles create additional momentum opportunities.",

      value:
        "Though the Forward P/E of 28.45 appears high by traditional standards, it reflects Apple's strong cash position and growing services revenue. Value investors might find better entry points during broader tech sector pullbacks.",

      swing:
        "The combination of high volume and moderate beta creates reliable swing trading conditions. Price movements around product launches and earnings reports offer predictable trading patterns with sufficient liquidity for position adjustments.",

      options:
        "AAPL's moderate volatility and excellent liquidity make it ideal for conservative options strategies. Covered calls and iron condors can be particularly effective, especially during periods between major product announcements.",
    },
    keyConsiderations:
      "Product cycle timing, services revenue growth, China market exposure, and capital return program impact trading decisions across all strategies.",
  },
  NVDA: {
    summary:
      "NVIDIA represents high-growth tech with AI leadership, showing strong momentum characteristics while maintaining fundamental strength.",
    strategies: {
      momentum:
        "NVDA's high beta of 1.89 and strong monthly gain of 16.45% make it a prime momentum candidate. The stock's AI leadership position and high volume provide strong trend continuation potential with sufficient liquidity for large positions.",

      value:
        "Traditional value metrics like the 48.7 Forward P/E take a back seat to NVDA's dominant AI market position and growth potential. Value investors should focus on pullbacks in the semiconductor sector for potential entries.",

      swing:
        "The stock's high beta and excellent volume of 89.2M shares create ideal swing trading conditions. AI-related news and semiconductor sector movements provide frequent trading opportunities with minimal slippage risk.",

      options:
        "High volatility and strong liquidity make NVDA perfect for both directional options plays and premium collection strategies. Earnings periods typically offer enhanced premium opportunities due to increased volatility expectations.",
    },
    keyConsiderations:
      "AI chip demand cycles, data center growth rates, gaming market health, and semiconductor industry dynamics affect all trading approaches.",
  },
  META: {
    summary: "Meta platforms combines social media dominance with AI and metaverse investments.",
    strategies: {
      momentum: `Beta of 1.42 and strong monthly gains good for momentum strategies.`,
      value: `Moderate Forward P/E (21.3) relatively attractive for tech sector.`,
      swing: `High volume (67.9M) excellent for swing trading.`,
      options: `Good for both directional and premium collection strategies.`,
    },
    keyConsiderations: "Ad market health, regulatory risks, and metaverse investments.",
  },
  AMZN: {
    summary: "Amazon combines retail and tech growth with cloud leadership.",
    strategies: {
      momentum: `Beta of 1.24 offers good momentum potential with tech sector correlation.`,
      value: `High Forward P/E (42.3) reflects growth expectations in cloud and retail.`,
      swing: `High volume (43.6M) provides good liquidity for swing trades.`,
      options: `Good for complex options strategies due to liquidity and volatility.`,
    },
    keyConsiderations: "AWS growth, retail margins, and logistics infrastructure.",
  },
  TSLA: {
    summary: "Tesla exhibits high volatility and growth characteristics, suitable for aggressive strategies.",
    strategies: {
      momentum: `High beta (2.31) offers amplified market moves, perfect for momentum trading.`,
      value: `Very high Forward P/E (62.4) suggests growth premium, challenging for value investors.`,
      swing: `Extremely high volume (109M) perfect for swing trading.`,
      options: `High premiums attractive for options sellers, but with higher risk.`,
    },
    keyConsiderations: "EV market share, manufacturing scalability, and technological innovations.",
  },
  WMT: {
    summary: "Walmart provides defensive retail exposure with steady metrics.",
    strategies: {
      momentum: `Low beta (0.54) suggests defensive nature, less momentum opportunity.`,
      value: `Moderate Forward P/E (23.1) reflects stable business model.`,
      swing: `Lower volume requires careful trade sizing.`,
      options: `Good for income-focused options strategies.`,
    },
    keyConsiderations: "Retail competition, e-commerce growth, and margin pressure.",
  },
  JPM: {
    summary: "JPMorgan Chase represents traditional banking with cyclical market sensitivity.",
    strategies: {
      momentum: `Beta of 1.12 offers slightly amplified market moves, good for sector rotation strategies.`,
      value: `Low Forward P/E (9.8) attractive for value investors, typical of banking sector.`,
      swing: `Lower volume requires careful position sizing for swing trades.`,
      options: `Good premium collection opportunities during high interest rate environments.`,
    },
    keyConsiderations: "Interest rate environment, regulatory changes, and credit cycle position.",
  },
  XOM: {
    summary: "Exxon Mobil provides energy sector exposure with commodity price sensitivity.",
    strategies: {
      momentum: `Beta of 1.05 shows market correlation, but heavily influenced by oil prices.`,
      value: `Low Forward P/E (11.2) typical of energy sector, attractive for value investors.`,
      swing: `Moderate volume and commodity influence create swing opportunities.`,
      options: `Good for covered calls during high oil price volatility.`,
    },
    keyConsiderations: "Oil price movements, renewable energy transition, and dividend sustainability.",
  },
  JNJ: {
    summary: "Johnson & Johnson offers defensive characteristics with healthcare stability.",
    strategies: {
      momentum: `Low beta (0.65) indicates defensive nature, less suitable for momentum trading.`,
      value: `Moderate Forward P/E (15.1) attractive for value investors seeking stability.`,
      swing: `Lower volume suggests careful position sizing needed.`,
      options: `Good for conservative options strategies like covered calls.`,
    },
    keyConsiderations: "Healthcare policy, litigation risks, and dividend growth history.",
  },
  BAC: {
    summary: "Bank of America shows traditional banking metrics with higher market sensitivity.",
    strategies: {
      momentum: `Higher beta (1.35) offers good moves for financial sector momentum plays.`,
      value: `Very low Forward P/E (8.9) attractive for value investors.`,
      swing: `Good volume (34.6M) for swing trading financial sector moves.`,
      options: `Good for income strategies during high interest rate periods.`,
    },
    keyConsiderations: "Interest rate sensitivity, loan book quality, and regulatory environment.",
  },
  MCD: {
    summary: "McDonald's offers defensive characteristics with global brand strength.",
    strategies: {
      momentum: `Low beta (0.64) indicates defensive nature, less momentum opportunity.`,
      value: `Forward P/E of 24.8 reflects brand premium and stable earnings.`,
      swing: `Lower volume (4.6M) requires careful position sizing.`,
      options: `Good for conservative income strategies.`,
    },
    keyConsiderations: "Global consumer spending, commodity costs, and franchise model strength.",
  },
  MSFT: {
    summary:
      "Microsoft demonstrates steady growth through cloud leadership and enterprise software dominance, offering a balance of stability and innovation.",
    strategies: {
      momentum:
        "With a beta of 0.98 and monthly gains of 5.67%, MSFT provides steady momentum opportunities aligned with broader market movements. The substantial daily volume of 21.4M shares ensures reliable position execution.",

      value:
        "Forward P/E of 31.2 reflects strong cloud growth prospects and stable enterprise revenue streams. Value investors might find opportunities during tech sector corrections, given the company's strong fundamentals.",

      swing:
        "Moderate beta and consistent volume create predictable swing trading patterns. Enterprise software release cycles and cloud growth metrics often provide actionable price movements.",

      options:
        "The stock's stability and regular movement patterns make it ideal for premium-selling strategies like covered calls and iron condors. Earnings periods offer enhanced premium opportunities.",
    },
    keyConsiderations:
      "Cloud market share growth, enterprise software adoption rates, AI integration progress, and competitive dynamics in the tech sector.",
  },
}

export function StockPriceChart() {
  const [selectedStock, setSelectedStock] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview: Stock Prices by Sector</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ChartContainer
            config={{
              price: {
                label: "Price (USD)",
                color: "hsl(var(--primary))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockData}>
                <XAxis dataKey="ticker" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium">{data.ticker}</span>
                              <span className="font-medium">${data.price}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <div>Sector: {data.sector}</div>
                              <div className={data.dailyChange >= 0 ? "text-green-600" : "text-red-600"}>
                                Daily: {data.dailyChange}%
                              </div>
                              <div className={data.monthlyChange >= 0 ? "text-green-600" : "text-red-600"}>
                                Monthly: {data.monthlyChange}%
                              </div>
                              <div>Beta: {data.beta}</div>
                              <div>Forward P/E: {data.forwardPE}</div>
                              <div>Volume: {data.volume.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar
                  dataKey="price"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary cursor-pointer"
                  onClick={(data) => setSelectedStock(data.ticker)}
                  shape={(props) => {
                    const isSelected = props.payload.ticker === selectedStock
                    // Extract only the props we need for the rect element
                    const { x, y, width, height, fill } = props
                    return (
                      <rect
                        className={`${isSelected ? "bar-glow" : ""}`}
                        fill={fill}
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx={4}
                      />
                    )
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Note: Click on any bar to see detailed analysis. Hover for quick metrics.
        </p>

        {selectedStock && stockAnalyses[selectedStock] && (
          <div className="mt-6 space-y-4 text-sm leading-relaxed border-t pt-4">
            <h4 className="font-semibold text-base">Trading Strategy Analysis: {selectedStock}</h4>

            <p className="font-medium">{stockAnalyses[selectedStock].summary}</p>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h5 className="font-medium mb-2">Key Metrics:</h5>
                <ul className="list-disc pl-5 space-y-1">
                  {(() => {
                    const stock = stockData.find((s) => s.ticker === selectedStock)!
                    return (
                      <>
                        <li>Current Price: ${stock.price}</li>
                        <li className={stock.dailyChange >= 0 ? "text-green-600" : "text-red-600"}>
                          Daily Change: {stock.dailyChange}%
                        </li>
                        <li className={stock.monthlyChange >= 0 ? "text-green-600" : "text-red-600"}>
                          Monthly Change: {stock.monthlyChange}%
                        </li>
                        <li>Beta: {stock.beta}</li>
                        <li>Forward P/E: {stock.forwardPE}</li>
                        <li>Volume: {stock.volume.toLocaleString()}</li>
                        <li>Sector: {stock.sector}</li>
                      </>
                    )
                  })()}
                </ul>
              </div>

              <div className="space-y-4">
                <h5 className="font-medium">Strategy Interpretations:</h5>
                {Object.entries(stockAnalyses[selectedStock].strategies).map(([strategy, analysis]) => (
                  <div key={strategy} className="p-3 border rounded-lg">
                    <h6 className="font-medium mb-1 capitalize">{strategy} Strategy:</h6>
                    <p className="whitespace-pre-line text-sm">{analysis}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h5 className="font-medium mb-2">Key Considerations:</h5>
              <p>{stockAnalyses[selectedStock].keyConsiderations}</p>
            </div>

            <p className="text-muted-foreground">
              Remember: These metrics are historical and for educational purposes only. Each strategy requires thorough
              research, risk management, and consideration of current market conditions.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

