import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Headphones, 
  Play, 
  Video, 
  Search, 
  Filter,
  Clock,
  Star,
  Download
} from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

const ResourcesPage = () => {
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: t('All Resources'), count: 24 },
    { id: 'stress', label: t('Stress Management'), count: 8 },
    { id: 'anxiety', label: t('Anxiety Support'), count: 6 },
    { id: 'sleep', label: t('Sleep Health'), count: 5 },
    { id: 'academic', label: t('Academic Wellness'), count: 5 }
  ];

  const resources = [
    // Articles
    {
      id: '1',
      type: 'article',
      title: t('Understanding Test Anxiety: Strategies for Success'),
      description: t('Learn evidence-based techniques to manage pre-exam stress and improve academic performance.'),
      category: 'anxiety',
      duration: '8 min read',
      rating: 4.8,
      author: 'Dr. Sarah Chen',
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      type: 'article',
      title: t('Building Healthy Sleep Habits in College'),
      description: t('Discover how proper sleep hygiene can transform your mental health and academic success.'),
      category: 'sleep',
      duration: '6 min read',
      rating: 4.9,
      author: 'Dr. Michael Torres',
      image: '/api/placeholder/300/200'
    },
    {
      id: '3',
      type: 'article',
      title: t('Mindfulness Techniques for Daily Stress Relief'),
      description: t('Simple mindfulness practices you can use anywhere to reduce stress and increase focus.'),
      category: 'stress',
      duration: '5 min read',
      rating: 4.7,
      author: 'Dr. Lisa Wang',
      image: '/api/placeholder/300/200'
    },
    
    // Audio Resources
    {
      id: '4',
      type: 'audio',
      title: t('Deep Breathing Exercise for Anxiety'),
      description: t('Guided breathing meditation to help calm anxiety and promote relaxation.'),
      category: 'anxiety',
      duration: '10 min',
      rating: 4.9,
      author: t('MindCare Audio Team'),
      image: '/api/placeholder/300/200'
    },
    {
      id: '5',
      type: 'audio',
      title: t('Progressive Muscle Relaxation'),
      description: t('Complete body scan meditation to release physical tension and mental stress.'),
      category: 'stress',
      duration: '15 min',
      rating: 4.8,
      author: t('MindCare Audio Team'),
      image: '/api/placeholder/300/200'
    },
    {
      id: '6',
      type: 'audio',
      title: t('Sleep Stories: Peaceful Forest'),
      description: t('Calming bedtime story to help you drift off to restful sleep.'),
      category: 'sleep',
      duration: '20 min',
      rating: 4.9,
      author: t('MindCare Audio Team'),
      image: '/api/placeholder/300/200'
    },

    // Videos
    {
      id: '7',
      type: 'video',
      title: t('Study Break Yoga: 10-Minute Desk Stretches'),
      description: t('Simple yoga movements you can do at your desk to relieve study stress.'),
      category: 'academic',
      duration: '10 min',
      rating: 4.7,
      author: t('Wellness Studio'),
      image: '/api/placeholder/300/200'
    },
    {
      id: '8',
      type: 'video',
      title: t('Time Management Strategies for Students'),
      description: t('Practical techniques to organize your schedule and reduce academic overwhelm.'),
      category: 'academic',
      duration: '12 min',
      rating: 4.8,
      author: t('Academic Success Center'),
      image: '/api/placeholder/300/200'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'audio': return Headphones;
      case 'video': return Video;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'primary';
      case 'audio': return 'secondary';
      case 'video': return 'accent';
      default: return 'primary';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              <span>{t('Wellness Resources')}</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('Mental Health Resources')}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('Explore our curated collection of articles, audio guides, and videos designed to support your mental wellness journey.')}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t('Search resources...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className="flex items-center space-x-2"
                  >
                    <Filter className="w-3 h-3" />
                    <span>{category.label}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const Icon = getIcon(resource.type);
              return (
                <Card key={resource.id} className="card-gradient card-hover group cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-primary/60" />
                    </div>
                    
                    {(resource.type === 'audio' || resource.type === 'video') && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary ml-1" />
                        </div>
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <Badge className={`bg-${getTypeColor(resource.type)}/90 text-${getTypeColor(resource.type)}-foreground`}>
                        {t(resource.type)}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {resource.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{resource.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-wellness" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                      
                      {resource.type === 'article' && (
                        <Button size="sm" variant="ghost" className="h-6 px-2">
                          <Download className="w-3 h-3 mr-1" />
                          {t('Save')}
                        </Button>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {t('By')} {resource.author}
                    </div>

                    <Button className="w-full" variant={resource.type === 'article' ? "outline" : "default"}>
                      {resource.type === 'article' && t('Read Article')}
                      {resource.type === 'audio' && t('Listen Now')}
                      {resource.type === 'video' && t('Watch Video')}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t('No resources found')}</h3>
              <p className="text-muted-foreground">{t('Try adjusting your search terms or selecting a different category.')}</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ResourcesPage;
