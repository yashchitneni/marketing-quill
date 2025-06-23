export interface LinkedInTemplate {
  id: string
  category: string
  title: string
  description: string
  template: string
  placeholders: string[]
  example?: string
  metrics?: {
    avgEngagement?: string
    bestFor?: string
    difficulty?: 'easy' | 'medium' | 'hard'
  }
  isViral?: boolean
}

export const templateCategories = [
  { id: 'story', label: 'Personal Stories', icon: '📖' },
  { id: 'howto', label: 'How-To Guides', icon: '📝' },
  { id: 'casestudy', label: 'Case Studies', icon: '📊' },
  { id: 'thought', label: 'Thought Leadership', icon: '💡' },
  { id: 'poll', label: 'Polls & Questions', icon: '🗳️' },
  { id: 'list', label: 'List Posts', icon: '📋' },
  { id: 'behind', label: 'Behind the Scenes', icon: '🎬' },
  { id: 'success', label: 'Success Stories', icon: '🏆' },
  { id: 'industry', label: 'Industry Commentary', icon: '🏢' },
  { id: 'career', label: 'Career Advice', icon: '💼' }
]

export const linkedInTemplates: LinkedInTemplate[] = [
  // Personal Story Templates
  {
    id: 'story-vulnerable',
    category: 'story',
    title: 'Vulnerable Leadership Story',
    description: 'Share a personal failure or challenge that taught you a valuable lesson',
    template: `[Hook: Start with a vulnerable admission]

In [year/time], I [failed at/struggled with] [specific situation].

[Story: 2-3 paragraphs about the experience]
- What happened
- How it felt
- What went wrong

[Turning point: What changed your perspective]

[Lesson: What you learned]

Today, I [how you apply this lesson].

[Question: Ask audience about their experience]

What failure taught you the most?

#Leadership #PersonalGrowth #LinkedInStories`,
    placeholders: ['year/time', 'failed at/struggled with', 'specific situation'],
    example: 'In 2019, I failed at launching my first startup...',
    metrics: {
      avgEngagement: 'High',
      bestFor: 'Building authentic connections',
      difficulty: 'medium'
    },
    isViral: true
  },
  {
    id: 'story-transformation',
    category: 'story',
    title: 'Before/After Transformation',
    description: 'Show your professional growth journey',
    template: `[Number] years ago: [Where you were]

Today: [Where you are now]

The journey wasn't linear. Here's what changed everything:

1. [First major change/realization]
2. [Second major change/realization]
3. [Third major change/realization]

The biggest surprise? [Unexpected insight]

If you're where I was [Number] years ago, remember: [Encouragement]

What's one thing you wish you knew [Number] years ago?`,
    placeholders: ['Number', 'Where you were', 'Where you are now'],
    metrics: {
      avgEngagement: 'Very High',
      bestFor: 'Inspiring others',
      difficulty: 'easy'
    },
    isViral: true
  },

  // How-To Templates
  {
    id: 'howto-quick',
    category: 'howto',
    title: 'Quick How-To Guide',
    description: 'Teach something valuable in under 5 steps',
    template: `How to [achieve specific outcome] in [timeframe]:

Step 1: [Action 1] → [Result 1]
Step 2: [Action 2] → [Result 2]
Step 3: [Action 3] → [Result 3]
Step 4: [Action 4] → [Result 4]
Step 5: [Action 5] → [Result 5]

💡 Pro tip: [Advanced tip]

I've used this to [personal result].

What's your go-to method for [topic]?

#LinkedInTips #[Industry] #HowTo`,
    placeholders: ['achieve specific outcome', 'timeframe'],
    metrics: {
      avgEngagement: 'High',
      bestFor: 'Demonstrating expertise',
      difficulty: 'easy'
    }
  },
  {
    id: 'howto-detailed',
    category: 'howto',
    title: 'Detailed Tutorial',
    description: 'In-depth guide for complex topics',
    template: `[Problem statement - what people struggle with]

After [experience/research], I've found a reliable way to [solve problem]:

𝗣𝗵𝗮𝘀𝗲 𝟭: [Foundation]
• [Phase 1 Action 1]
• [Phase 1 Action 2]
• Expected outcome: [Phase 1 Result]

𝗣𝗵𝗮𝘀𝗲 𝟮: [Building]
• [Phase 2 Action 1]
• [Phase 2 Action 2]
• Expected outcome: [Phase 2 Result]

𝗣𝗵𝗮𝘀𝗲 𝟯: [Optimization]
• [Phase 3 Action 1]
• [Phase 3 Action 2]
• Expected outcome: [Phase 3 Result]

⚠️ Common mistakes to avoid:
- [Mistake 1]
- [Mistake 2]

Results you can expect: [Specific outcomes]

What part of [process] do you find most challenging?`,
    placeholders: ['Problem statement', 'experience/research', 'solve problem'],
    metrics: {
      avgEngagement: 'High',
      bestFor: 'Educational content',
      difficulty: 'medium'
    }
  },

  // Case Study Templates
  {
    id: 'case-client',
    category: 'casestudy',
    title: 'Client Success Story',
    description: 'Showcase results you achieved for a client',
    template: `Client Challenge: [Problem they faced]

Timeline: [Duration of project]

Our Approach:
✅ [Strategy/tactic 1]
✅ [Strategy/tactic 2]
✅ [Strategy/tactic 3]

Results:
📈 [Metric 1]: [Improvement 1]
📈 [Metric 2]: [Improvement 2]
📈 [Metric 3]: [Improvement 3]

Key Takeaway: [Main lesson]

The client said: "[Testimonial quote]"

Have you faced similar [challenge type]? How did you solve it?

#CaseStudy #[Industry] #Results`,
    placeholders: ['Problem they faced', 'Duration of project'],
    metrics: {
      avgEngagement: 'Very High',
      bestFor: 'Demonstrating ROI',
      difficulty: 'medium'
    },
    isViral: true
  },

  // Thought Leadership Templates
  {
    id: 'thought-prediction',
    category: 'thought',
    title: 'Industry Prediction',
    description: 'Share your vision for the future of your industry',
    template: `The [industry] landscape will look completely different in [timeframe].

Here's what I'm seeing:

𝗧𝗿𝗲𝗻𝗱 #𝟭: [Trend 1]
Why it matters: [Impact 1]

𝗧𝗿𝗲𝗻𝗱 #𝟮: [Trend 2]
Why it matters: [Impact 2]

𝗧𝗿𝗲𝗻𝗱 #𝟯: [Trend 3]
Why it matters: [Impact 3]

Companies that [action] will win.
Those that [inaction] will struggle.

My advice? Start [specific action] now.

What trends are you watching in [industry]?

#FutureOf[Industry] #Trends #Innovation`,
    placeholders: ['industry', 'timeframe'],
    metrics: {
      avgEngagement: 'High',
      bestFor: 'Positioning as thought leader',
      difficulty: 'hard'
    }
  },
  {
    id: 'thought-contrarian',
    category: 'thought',
    title: 'Contrarian View',
    description: 'Challenge conventional wisdom respectfully',
    template: `Unpopular opinion: [Contrarian statement]

Everyone says [common belief].

But here's what I've learned after [experience]:

[Your different perspective with evidence]

I'm not saying [what everyone believes] is wrong. 

I'm saying [nuanced view].

The data shows: [Supporting evidence]

Real example: [Specific case]

This matters because [implications].

Am I missing something? What's your take on [topic]?

#ThoughtLeadership #[Industry]`,
    placeholders: ['Contrarian statement', 'common belief', 'experience'],
    metrics: {
      avgEngagement: 'Very High',
      bestFor: 'Sparking discussion',
      difficulty: 'hard'
    },
    isViral: true
  },

  // Poll Templates
  {
    id: 'poll-simple',
    category: 'poll',
    title: 'Simple Poll',
    description: 'Quick poll to boost engagement',
    template: `Quick poll for my [industry] network:

[Context or scenario setup]

What's your approach?

👍 [Option A]
❤️ [Option B]
🎯 [Option C]
💡 [Option D - Other, comment below]

I'll share the results tomorrow along with [what you'll share].

#LinkedInPolls #[industry]`,
    placeholders: ['industry', 'Context or scenario setup'],
    metrics: {
      avgEngagement: 'Very High',
      bestFor: 'Quick engagement',
      difficulty: 'easy'
    }
  },
  {
    id: 'poll-debate',
    category: 'poll',
    title: 'Debate Starter',
    description: 'Create meaningful discussion with a poll',
    template: `The [industry] community is divided on this:

[Present both sides of debate]

Team A believes: [Position A]
Because: [Reasoning A]

Team B believes: [Position B]
Because: [Reasoning B]

Where do you stand?

🔵 Team A
🔴 Team B
🟡 It depends (explain in comments)

I'm genuinely curious about your reasoning. Let's discuss! 👇

#[industry]Debate #LinkedInPolls`,
    placeholders: ['industry', 'Present both sides of debate'],
    metrics: {
      avgEngagement: 'Very High',
      bestFor: 'Thought leadership',
      difficulty: 'medium'
    }
  },

  // List Posts
  {
    id: 'list-mistakes',
    category: 'list',
    title: '5 Mistakes to Avoid',
    description: 'Help others avoid common pitfalls',
    template: `5 [role/industry] mistakes I see every week:

1. [Mistake 1]: [Why it's wrong 1] → [What to do instead 1]

2. [Mistake 2]: [Why it's wrong 2] → [What to do instead 2]

3. [Mistake 3]: [Why it's wrong 3] → [What to do instead 3]

4. [Mistake 4]: [Why it's wrong 4] → [What to do instead 4]

5. [Mistake 5]: [Why it's wrong 5] → [What to do instead 5]

The good news? These are all fixable.

Start with #[number] - it's the easiest win.

What other mistakes would you add?

#[Industry]Tips #MistakesToAvoid`,
    placeholders: ['role/industry'],
    metrics: {
      avgEngagement: 'High',
      bestFor: 'Helpful content',
      difficulty: 'easy'
    }
  },
  {
    id: 'list-tips',
    category: 'list',
    title: '10 Quick Tips',
    description: 'Rapid-fire valuable tips',
    template: `10 [skill/topic] tips that took me [time] to learn:

1. [Tip 1]
2. [Tip 2]
3. [Tip 3]
4. [Tip 4]
5. [Tip 5]
6. [Tip 6]
7. [Tip 7]
8. [Tip 8]
9. [Tip 9]
10. [Tip 10]

Save this post for later reference.

Which one resonates most with you?

#[Topic]Tips #LinkedInLearning`,
    placeholders: ['skill/topic', 'time'],
    metrics: {
      avgEngagement: 'Very High',
      bestFor: 'Save-worthy content',
      difficulty: 'easy'
    },
    isViral: true
  },

  // Behind the Scenes
  {
    id: 'behind-process',
    category: 'behind',
    title: 'Behind the Process',
    description: 'Show how you work',
    template: `Behind the scenes of [what you're showing]:

[Photo or description of workspace/process]

What you see: [Final result]

What you don't see:
• [Hidden work 1]
• [Hidden work 2]
• [Hidden work 3]
• [Hidden work 4]

Time invested: [Hours/days]
Iterations: [Number]
Coffee consumed: [Number] ☕

The reality of [profession] isn't always glamorous, but [positive note].

What does your behind-the-scenes look like?

#BehindTheScenes #[Industry]Life`,
    placeholders: ['what you\'re showing', 'Final result'],
    metrics: {
      avgEngagement: 'High',
      bestFor: 'Building authenticity',
      difficulty: 'easy'
    }
  },

  // Success Stories
  {
    id: 'success-team',
    category: 'success',
    title: 'Team Achievement',
    description: 'Celebrate team wins',
    template: `Proud moment alert! 🎉

Our team just [achievement].

The numbers:
• [Metric 1]
• [Metric 2]
• [Metric 3]

But here's what matters more:

[Human story behind the success]

Special shoutout to:
• [Team member 1] for [contribution 1]
• [Team member 2] for [contribution 2]
• [Team member 3] for [contribution 3]

This proves that [lesson learned].

What team win are you celebrating this week?

#TeamSuccess #[Industry] #Gratitude`,
    placeholders: ['achievement'],
    metrics: {
      avgEngagement: 'High',
      bestFor: 'Team building',
      difficulty: 'easy'
    }
  },

  // Industry Commentary
  {
    id: 'industry-news',
    category: 'industry',
    title: 'Industry News Analysis',
    description: 'Comment on breaking industry news',
    template: `[Industry] news that matters:

[News headline or development]

My take:

1. [Immediate impact]
2. [Long-term implications]
3. [Who wins and loses]

What this means for you:
• If you're [role A]: [Action 1]
• If you're [role B]: [Action 2]
• If you're [role C]: [Action 3]

The opportunity here? [Insight]

How do you see this affecting [industry]?

#[Industry]News #Analysis`,
    placeholders: ['Industry', 'News headline or development'],
    metrics: {
      avgEngagement: 'High',
      bestFor: 'Thought leadership',
      difficulty: 'medium'
    }
  },

  // Career Advice
  {
    id: 'career-lessons',
    category: 'career',
    title: 'Career Lessons',
    description: 'Share career wisdom',
    template: `[Number] career lessons I wish I knew at [age/stage]:

1. Your network is [insight about networking]

2. Skills matter, but [what matters more]

3. The best time to [action] is [when]

4. Don't wait for [what not to wait for]

5. Invest in [what to invest in]

[Number]. [Most important lesson]

If I could go back, I'd tell my younger self: "[Advice]"

What's the best career advice you've received?

#CareerAdvice #ProfessionalDevelopment`,
    placeholders: ['Number', 'age/stage'],
    metrics: {
      avgEngagement: 'Very High',
      bestFor: 'Helping others grow',
      difficulty: 'easy'
    },
    isViral: true
  }
]

export const getTemplatesByCategory = (category: string) => {
  return linkedInTemplates.filter(t => t.category === category)
}

export const getViralTemplates = () => {
  return linkedInTemplates.filter(t => t.isViral)
}

export const searchTemplates = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return linkedInTemplates.filter(t => 
    t.title.toLowerCase().includes(lowercaseQuery) ||
    t.description.toLowerCase().includes(lowercaseQuery) ||
    t.template.toLowerCase().includes(lowercaseQuery)
  )
}