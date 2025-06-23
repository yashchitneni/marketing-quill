'use client'

import { useEffect } from 'react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useLinkedInOptimizerStore } from '@/lib/stores/linkedin-optimizer-store'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  TrendingUp, 
  Hash, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  Target,
  Zap,
  Calendar,
  BarChart3,
  Sparkles
} from 'lucide-react'

export function LinkedInOptimizationPanel() {
  const { content } = useEditorStore()
  const { analysis, isAnalyzing, analyzeContent } = useLinkedInOptimizerStore()
  
  // Analyze content whenever it changes
  useEffect(() => {
    analyzeContent(content)
  }, [content, analyzeContent])
  
  if (!analysis && !isAnalyzing) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="text-sm">Start typing to see LinkedIn optimization tips</p>
      </div>
    )
  }
  
  if (isAnalyzing) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm text-gray-500">Analyzing your content...</p>
      </div>
    )
  }
  
  if (!analysis) return null
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }
  
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Work'
  }
  
  const getEngagementIcon = (predicted: string) => {
    switch (predicted) {
      case 'viral': return <Zap className="h-4 w-4 text-purple-500" />
      case 'high': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'medium': return <BarChart3 className="h-4 w-4 text-yellow-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }
  
  return (
    <div className="space-y-6">
      {/* LinkedIn Score */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium flex items-center gap-2">
            <Target className="h-4 w-4" />
            LinkedIn Score
          </h4>
          <span className={cn("text-2xl font-bold", getScoreColor(analysis.score))}>
            {analysis.score}
          </span>
        </div>
        <Progress value={analysis.score} className="h-2 mb-2" />
        <p className="text-sm text-gray-600">
          {getScoreLabel(analysis.score)} - {analysis.score < 80 && 'Follow suggestions below to improve'}
        </p>
      </div>
      
      {/* Character Count */}
      <div className="bg-white p-4 rounded-lg border">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Post Length
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Characters</span>
            <span className={cn(
              "font-medium",
              analysis.isOptimalLength ? "text-green-600" : "text-orange-600"
            )}>
              {analysis.characterCount} / 1300
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={Math.min(100, (analysis.characterCount / 1300) * 100)} 
              className="h-2"
            />
            {/* Optimal range indicator */}
            <div 
              className="absolute top-0 h-2 bg-green-200 opacity-50"
              style={{
                left: `${(1000 / 3000) * 100}%`,
                width: `${((1300 - 1000) / 3000) * 100}%`
              }}
            />
          </div>
          <p className="text-xs text-gray-500">
            {analysis.isOptimalLength 
              ? "✓ Perfect length for maximum engagement"
              : analysis.characterCount < 1000
              ? `Add ${1000 - analysis.characterCount} more characters`
              : `Consider trimming ${analysis.characterCount - 1300} characters`
            }
          </p>
        </div>
      </div>
      
      {/* Engagement Prediction */}
      <div className="bg-white p-4 rounded-lg border">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Engagement Prediction
        </h4>
        <div className="flex items-center gap-2 mb-3">
          {getEngagementIcon(analysis.engagement.predicted)}
          <Badge 
            variant={analysis.engagement.predicted === 'viral' ? 'default' : 'secondary'}
            className={cn(
              analysis.engagement.predicted === 'viral' && 'bg-purple-500',
              analysis.engagement.predicted === 'high' && 'bg-green-500',
              analysis.engagement.predicted === 'medium' && 'bg-yellow-500'
            )}
          >
            {analysis.engagement.predicted.toUpperCase()}
          </Badge>
          <span className="text-sm text-gray-600">
            ~{analysis.readingTime}s read time
          </span>
        </div>
        {analysis.engagement.factors.length > 0 && (
          <ul className="space-y-1">
            {analysis.engagement.factors.map((factor, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                {factor}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Hashtag Suggestions */}
      {analysis.hashtagSuggestions.length > 0 && (
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Suggested Hashtags
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.hashtagSuggestions.map((hashtag, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  // Add hashtag to content
                  const newContent = content.trim() + '\n\n' + hashtag
                  useEditorStore.getState().setContent(newContent)
                }}
              >
                {hashtag}
              </Button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Click to add • Use 3-5 hashtags for best reach
          </p>
        </div>
      )}
      
      {/* Best Time to Post */}
      <div className="bg-white p-4 rounded-lg border">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Best Time to Post
        </h4>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-blue-500" />
          <div>
            <p className="font-medium">
              {analysis.bestPostTime.day} at {analysis.bestPostTime.time}
            </p>
            <p className="text-xs text-gray-500">
              {analysis.bestPostTime.timezone} timezone
            </p>
          </div>
        </div>
      </div>
      
      {/* Improvements */}
      {analysis.improvements.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium mb-3 flex items-center gap-2 text-blue-900">
            <AlertCircle className="h-4 w-4" />
            Suggested Improvements
          </h4>
          <ul className="space-y-2">
            {analysis.improvements.map((improvement, index) => (
              <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                {improvement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}