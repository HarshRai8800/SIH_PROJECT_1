import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Heart, 
  Star, 
  Quote,
  TrendingUp,
  Calendar,
  Users,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

const SuccessStoriesPage = () => {
  const stories = [
    {
      id: '1',
      title: 'From Panic Attacks to Peace of Mind',
      author: 'Sarah M.',
      category: 'Anxiety Recovery',
      timeAgo: '2 months ago',
      readTime: '4 min read',
      excerpt: 'How I overcame severe anxiety through mindfulness and the support I found in this community...',
      fullStory: `When I first started college, panic attacks were controlling my life. I couldn't attend lectures, make friends, or even leave my dorm room some days. Everything felt overwhelming, and I thought I was alone in this struggle.

Finding MindCare was a turning point. The AI chatbot helped me understand that what I was experiencing was valid and treatable. Through daily check-ins and mindfulness exercises, I slowly started to regain control.

The peer support forum was incredible - knowing others were going through similar experiences made me feel less isolated. I started sharing my own struggles and found that helping others actually helped me heal too.

Now, six months later, I'm leading a study group, have made amazing friends, and while I still have challenging days, I have the tools to handle them. The panic attacks are rare, and when they do happen, I know they'll pass.

To anyone reading this who's struggling - please don't give up. Healing isn't linear, but it's possible. You're stronger than you know.`,
      tags: ['anxiety', 'panic-attacks', 'mindfulness', 'community'],
      likes: 89,
      helpful: 67,
      image: '/api/placeholder/400/200'
    },
    {
      id: '2',
      title: 'Breaking the Perfectionism Cycle',
      author: 'Michael R.',
      category: 'Academic Wellness',
      timeAgo: '3 weeks ago',
      readTime: '5 min read',
      excerpt: 'My journey from being a perfectionist who never felt good enough to finding balance and self-compassion...',
      fullStory: `I used to be that student who would rewrite papers five times, study until 3 AM every night, and still feel like I wasn't doing enough. My GPA was high, but my mental health was at an all-time low.

The stress management resources here opened my eyes to how destructive perfectionism can be. Learning about 'good enough' thinking was revolutionary for me. The counseling sessions helped me understand where these patterns came from.

The breakthrough came when I started tracking my mood alongside my academic performance. I realized that my happiest, most productive days weren't when I was working 16 hours straight - they were when I had balance.

Now I set boundaries with my study time, celebrate small wins, and actually enjoy learning again. My grades haven't suffered - if anything, I'm more creative and focused. Most importantly, I like who I am now.

The wellness tracking feature helped me see progress in ways beyond grades - better sleep, more social connections, and genuine confidence rather than just achievement-based self-worth.`,
      tags: ['perfectionism', 'academics', 'balance', 'self-compassion'],
      likes: 72,
      helpful: 54,
      image: '/api/placeholder/400/200'
    },
    {
      id: '3',
      title: 'Finding My Voice After Social Anxiety',
      author: 'Jamie L.',
      category: 'Social Connection',
      timeAgo: '1 month ago',
      readTime: '3 min read',
      excerpt: 'How I went from eating lunch alone every day to building meaningful friendships and even joining student government...',
      fullStory: `Social anxiety made my freshman year incredibly lonely. I would skip club meetings, eat meals alone, and convince myself that everyone was judging me. Making friends felt impossible.

The peer support forum was my first step toward connection. Being able to share anonymously gave me confidence to open up. Reading others' stories made me realize that many students felt the same way I did.

The counseling sessions helped me develop practical strategies for social situations. We worked on reframing negative thoughts and gradual exposure techniques. The breathing exercises from the resource library became my secret weapon before social events.

Starting small was key - I began by just saying hi to my roommate's friends, then joined one study group, then attended a club meeting. Each small success built my confidence for the next challenge.

The biggest surprise was discovering that my sensitivity and thoughtfulness - things I saw as weaknesses - were actually strengths that people appreciated. Now I'm on student government and have a close group of friends who support each other.

Social anxiety still pops up sometimes, but it doesn't control my life anymore. I have tools to manage it and friends who understand when I need support.`,
      tags: ['social-anxiety', 'friendship', 'confidence', 'growth'],
      likes: 95,
      helpful: 78,
      image: '/api/placeholder/400/200'
    },
    {
      id: '4',
      title: 'Healing from Depression and Finding Purpose',
      author: 'Alex T.',
      category: 'Depression Recovery',
      timeAgo: '6 weeks ago',
      readTime: '6 min read',
      excerpt: 'My path from the darkest period of my life to rediscovering joy and meaning in college...',
      fullStory: `Last year, I was in the darkest place I'd ever been. Depression made everything feel pointless - classes, relationships, even getting out of bed. I was barely functioning and felt completely hopeless.

Finding professional help through the counseling booking system was the first step, but it felt overwhelming to take that step alone. The crisis support resources and 24/7 chat feature literally saved my life during some very dark moments.

Recovery wasn't quick or easy. There were setbacks, days when I wanted to give up, and times when progress felt invisible. But having a support system that understood made all the difference.

The wellness tracking helped me see tiny improvements I would have missed otherwise - sleeping a little better, having one good conversation, completing an assignment. These small victories became stepping stones to larger ones.

What surprised me was how helping others in the forum became part of my healing. Sharing my story and supporting fellow students gave me a sense of purpose I'd been missing.

Now I'm not just surviving college - I'm thriving. I changed my major to something I'm passionate about, have meaningful relationships, and am considering a career in mental health advocacy.

Depression still requires daily management, but I now have tools, support, and most importantly, hope for the future.`,
      tags: ['depression', 'recovery', 'purpose', 'hope'],
      likes: 124,
      helpful: 98,
      image: '/api/placeholder/400/200'
    }
  ];

  const testimonials = [
    {
      text: "This platform gave me my life back. The combination of professional support and peer community is incredible.",
      author: "Emma K.",
      recovery: "Anxiety & Depression"
    },
    {
      text: "I never thought I'd be able to manage my stress levels. The tools here are life-changing.",
      author: "David S.",
      recovery: "Stress Management"
    },
    {
      text: "Finding others who understood what I was going through made all the difference in my healing journey.",
      author: "Riley P.",
      recovery: "Social Anxiety"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-wellness/10 text-wellness px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Trophy className="w-4 h-4" />
              <span>Recovery & Growth Stories</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Success Stories</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real students sharing their journeys of healing, growth, and triumph. 
              These stories remind us that recovery is possible and you're not alone.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Recovery Stories', value: '247+', icon: Heart },
              { label: 'Students Helped', value: '2,500+', icon: Users },
              { label: 'Success Rate', value: '94%', icon: TrendingUp },
              { label: 'Community Rating', value: '4.9/5', icon: Star }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="card-gradient p-6 text-center">
                  <Icon className="w-8 h-8 text-wellness mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Stories */}
            <div className="lg:col-span-2 space-y-8">
              {stories.map((story, index) => (
                <Card key={story.id} className="card-gradient overflow-hidden">
                  {/* Story Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-wellness/10 text-wellness">
                            {story.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{story.timeAgo}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{story.readTime}</span>
                        </div>
                        <h2 className="text-xl font-bold text-foreground">{story.title}</h2>
                        <p className="text-sm text-muted-foreground">By {story.author}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {story.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Story Content Preview */}
                  <div className="px-6 pb-4">
                    <div className="relative">
                      <div className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                        {story.fullStory}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent"></div>
                    </div>
                  </div>

                  {/* Story Footer */}
                  <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{story.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{story.helpful} found helpful</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}

              <div className="text-center">
                <Button size="lg" variant="outline">
                  Load More Stories
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Share Your Story */}
              <Card className="card-gradient p-6 text-center">
                <Trophy className="w-12 h-12 text-wellness mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Share Your Journey</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Your story could inspire and help other students. Share your recovery journey anonymously.
                </p>
                <Button className="w-full">
                  Submit Your Story
                </Button>
              </Card>

              {/* Quick Testimonials */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Quote className="w-5 h-5 mr-2 text-primary" />
                  What Students Say
                </h3>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-foreground italic mb-2 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">{testimonial.author}</span>
                        <br />
                        {testimonial.recovery}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Categories */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-4">Story Categories</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Anxiety Recovery', count: 42 },
                    { name: 'Depression Support', count: 38 },
                    { name: 'Academic Wellness', count: 51 },
                    { name: 'Social Connection', count: 34 },
                    { name: 'Stress Management', count: 47 },
                    { name: 'Sleep & Health', count: 25 }
                  ].map((category) => (
                    <div key={category.name} className="flex justify-between items-center">
                      <span className="text-sm text-foreground">{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Emergency Resources */}
              <Card className="bg-primary/10 border-primary/20 p-6">
                <h3 className="font-semibold text-primary mb-2">Need Support Now?</h3>
                <p className="text-sm text-primary/80 mb-4">
                  If you're struggling, please reach out. Help is available 24/7.
                </p>
                <div className="space-y-2">
                  <Button size="sm" className="w-full">
                    Start Wellness Chat
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    Crisis Line: 988
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;