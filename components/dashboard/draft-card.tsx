'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  FileText, 
  Share2, 
  Globe, 
  Megaphone,
  MoreVertical,
  Trash2,
  Archive,
  Copy
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Draft {
  id: string
  title: string
  content?: string
  channel?: string
  optimization_score: number
  status: string
  updated_at: string
  created_at: string
}

const channelIcons = {
  email: Mail,
  blog: FileText,
  social: Share2,
  website: Globe,
  ad: Megaphone
}

const channelColors = {
  email: 'bg-blue-100 text-blue-700',
  blog: 'bg-purple-100 text-purple-700',
  social: 'bg-green-100 text-green-700',
  website: 'bg-orange-100 text-orange-700',
  ad: 'bg-red-100 text-red-700'
}

interface DraftCardProps {
  draft: Draft
  onDelete?: (id: string) => void
  onArchive?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export function DraftCard({ draft, onDelete, onArchive, onDuplicate }: DraftCardProps) {
  const Icon = draft.channel ? channelIcons[draft.channel as keyof typeof channelIcons] : FileText
  const channelColor = draft.channel ? channelColors[draft.channel as keyof typeof channelColors] : 'bg-gray-100 text-gray-700'
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50'
    if (score >= 60) return 'bg-yellow-50'
    return 'bg-red-50'
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
      <Link href={`/editor/${draft.id}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg line-clamp-1">
                {draft.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {formatDistanceToNow(new Date(draft.updated_at), { addSuffix: true })}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onDuplicate?.(draft.id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onArchive?.(draft.id)}>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDelete?.(draft.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {draft.channel && (
                <Badge variant="secondary" className={channelColor}>
                  <Icon className="h-3 w-3 mr-1" />
                  {draft.channel}
                </Badge>
              )}
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${getScoreBg(draft.optimization_score)}`}>
              <span className={getScoreColor(draft.optimization_score)}>
                {draft.optimization_score}%
              </span>
            </div>
          </div>
          {draft.content && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
              {draft.content}
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}