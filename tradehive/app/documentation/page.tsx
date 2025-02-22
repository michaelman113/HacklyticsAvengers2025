"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PenLine, BookOpen, Plus } from "lucide-react"

interface StrategyCard {
  id: number
  title: string
  description: string
}

export default function DocumentationPage() {
  const [newNoteTitle, setNewNoteTitle] = useState("")
  const [newNoteContent, setNewNoteContent] = useState("")
  const [strategyCards] = useState<StrategyCard[]>([
    {
      id: 1,
      title: "Momentum Trading",
      description: "A strategy that aims to capitalize on the continuance of existing trends in the market.",
    },
    {
      id: 2,
      title: "Value Investing",
      description: "Buying securities that appear underpriced by some form of fundamental analysis.",
    },
    {
      id: 3,
      title: "Swing Trading",
      description:
        "Attempts to capture short- to medium-term gains in a stock over a period of a few days to several weeks.",
    },
    {
      id: 4,
      title: "Options Trading",
      description:
        "Trading contracts that give the right to buy or sell an asset at a specific price within a set time frame.",
    },
  ])

  const addNewNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      setNewNoteTitle("")
      setNewNoteContent("")
    }
  }


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-2xl">
            <PenLine className="mr-2" />
            TradeHive Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Note Title" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} />
            <Textarea
              placeholder="Note Content"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={addNewNote} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add New Note
            </Button>
          </div>
        </CardContent>
      </Card>


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
                <CardContent>
                  <p className="mb-4">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

