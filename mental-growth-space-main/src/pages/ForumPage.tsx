import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Heart, 
  Clock, 
  User, 
  Search,
  Plus,
  TrendingUp,
  Users
} from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

const ForumPage = () => {
  const posts = [
    {
      id: '1',
      title: 'Struggling with midterm anxiety - any tips?',
      author: 'Anonymous Student',
      category: 'Anxiety',
      timeAgo: '2 hours ago',
      replies: 12,
      likes: 8,
      lastActivity: '30 minutes ago',
      preview: 'I have three midterms next week and I\'m feeling completely overwhelmed. My heart races every time I think about them...',
      isAnonymous: true,
      tags: ['anxiety', 'exams', 'stress']
    },
    {
      id: '2',
      title: 'Sleep schedule completely messed up - how to fix?',
      author: 'night_owl_22',
      category: 'Sleep',
      timeAgo: '4 hours ago',
      replies: 18,
      likes: 15,
      lastActivity: '1 hour ago',
      preview: 'Been staying up until 3-4 AM studying and can\'t seem to get back to a normal sleep schedule. Coffee isn\'t helping anymore...',
      isAnonymous: false,
      tags: ['sleep', 'schedule', 'health']
    },
    {
      id: '3',
      title: 'Dealing with homesickness as a freshman',
      author: 'freshman_blues',
      category: 'Support',
      timeAgo: '6 hours ago',
      replies: 24,
      likes: 32,
      lastActivity: '45 minutes ago',
      preview: 'This is my first semester away from home and I\'m really struggling. I love my classes but I miss my family so much...',
      isAnonymous: false,
      tags: ['homesickness', 'freshman', 'family']
    },
    {
      id: '4',
      title: 'Success Story: How I overcame social anxiety',
      author: 'confident_now',
      category: 'Success',
      timeAgo: '8 hours ago',
      replies: 45,
      likes: 89,
      lastActivity: '2 hours ago',
      preview: 'I wanted to share my journey because I know others are struggling with the same thing. A year ago, I could barely...',
      isAnonymous: false,
      tags: ['success', 'social-anxiety', 'growth']
    },
    {
      id: '5',
      title: 'Managing academic pressure and perfectionism',
      author: 'Anonymous Student',
      category: 'Academic',
      timeAgo: '12 hours ago',
      replies: 15,
      likes: 22,
      lastActivity: '3 hours ago',
      preview: 'I set really high standards for myself and get devastated when I don\'t meet them. How do you balance ambition with...',
      isAnonymous: true,
      tags: ['perfectionism', 'academics', 'pressure']
    },
    {
      id: '6',
      title: 'Finding balance between work, study, and self-care',
      author: 'busy_bee_23',
      category: 'Wellness',
      timeAgo: '1 day ago',
      replies: 31,
      likes: 28,
      lastActivity: '4 hours ago',
      preview: 'Working part-time while maintaining good grades is exhausting. I feel guilty whenever I take time for myself...',
      isAnonymous: false,
      tags: ['balance', 'work', 'selfcare']
    }
  ];

  const trendingTopics = [
    { name: 'Exam Stress', posts: 45, trend: '+12%' },
    { name: 'Sleep Issues', posts: 32, trend: '+8%' },
    { name: 'Social Anxiety', posts: 28, trend: '+15%' },
    { name: 'Time Management', posts: 24, trend: '+5%' },
    { name: 'Homesickness', posts: 18, trend: '+20%' }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Anxiety': 'accent',
      'Sleep': 'secondary',
      'Support': 'wellness',
      'Success': 'primary',
      'Academic': 'primary',
      'Wellness': 'wellness'
    };
    return colors[category] || 'primary';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-wellness/10 text-wellness px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              <span>Peer Support Community</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Support Forum</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A safe, anonymous space to share experiences, seek support, and connect with fellow students on their wellness journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Actions */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
                    className="pl-10"
                  />
                </div>
                
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Start Discussion</span>
                </Button>
              </div>

              {/* Discussion Posts */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="card-gradient card-hover p-6 cursor-pointer">
                    <div className="space-y-4">
                      {/* Post Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-3">
                            <Badge className={`bg-${getCategoryColor(post.category)}/10 text-${getCategoryColor(post.category)}`}>
                              {post.category}
                            </Badge>
                            {post.isAnonymous && (
                              <Badge variant="outline" className="text-xs">
                                Anonymous
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                        </div>
                        
                        <div className="text-xs text-muted-foreground text-right">
                          <div>{post.timeAgo}</div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>Active {post.lastActivity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Post Preview */}
                      <p className="text-muted-foreground leading-relaxed line-clamp-2">
                        {post.preview}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Post Meta */}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <Button variant="outline">
                  Load More Discussions
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Community Guidelines */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-wellness" />
                  Community Guidelines
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-wellness rounded-full mt-2 flex-shrink-0"></div>
                    <span>Be respectful and supportive of others</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-wellness rounded-full mt-2 flex-shrink-0"></div>
                    <span>Share experiences, not medical advice</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-wellness rounded-full mt-2 flex-shrink-0"></div>
                    <span>Use anonymous posting for sensitive topics</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-wellness rounded-full mt-2 flex-shrink-0"></div>
                    <span>Report content that violates guidelines</span>
                  </div>
                </div>
              </Card>

              {/* Trending Topics */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <div key={topic.name} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium text-sm text-foreground">{topic.name}</div>
                        <div className="text-xs text-muted-foreground">{topic.posts} discussions</div>
                      </div>
                      <div className="text-xs text-wellness font-medium">
                        {topic.trend}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Support */}
              <Card className="bg-primary/10 border-primary/20 p-6">
                <h3 className="font-semibold text-primary mb-2">Need Immediate Support?</h3>
                <p className="text-sm text-primary/80 mb-4">
                  If you're in crisis or need urgent help, please reach out immediately.
                </p>
                <div className="space-y-2">
                  <Button size="sm" className="w-full">
                    Chat with AI Counselor
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    Crisis Hotline: 988
                  </Button>
                </div>
              </Card>

              {/* Forum Stats */}
              <Card className="card-gradient p-6">
                <h3 className="font-semibold text-foreground mb-4">Community Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Members</span>
                    <span className="font-medium text-foreground">2,547</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Discussions</span>
                    <span className="font-medium text-foreground">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <span className="font-medium text-wellness">+47 posts</span>
                  </div>
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

export default ForumPage;