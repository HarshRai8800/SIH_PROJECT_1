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
import { Link } from 'react-router-dom';

const ResourcesPage = () => {
  const { t, i18n } = useTranslation();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: t('All Resources'), count: 24 },
    { id: 'stress', label: t('Stress Management'), count: 8 },
    { id: 'anxiety', label: t('Anxiety Support'), count: 6 },
    { id: 'sleep', label: t('Sleep Health'), count: 5 },
    { id: 'academic', label: t('Academic Wellness'), count: 5 }
  ];

 const resourcelang = {
  "en": [
    {
      "id": "1",
      "type": "video",
      "title": "Suicide Prevention Treatment",
      "description": "Suicide Prevention Treatment for Psychologically Depressed Students",
      "category": "anxiety",
      "duration": "8 min read",
      "rating": 4.8,
      "author": "Dr. Sarah Chen",
      "image": "/api/placeholder/300/200",
      "link": "https://youtu.be/fTIrHMuwHcQ"
    },
    {
      "id": "2",
      "type": "video",
      "title": "Preventing Youth Suicide",
      "description": "There are five types of therapy to be aware of for treating suicidal thoughts and behaviors, each with a slightly different focus, to efforts to reduce or eliminate the patterns. Learn treatment options for youth suicidal thoughts and behaviors.",
      "category": "sleep",
      "duration": "6 min read",
      "rating": 4.9,
      "author": "Dr. Michael Torres",
      "image": "/api/placeholder/300/200",
      "link": "https://youtu.be/nh6iEue0tcU"
    },
    {
      "id": "3",
      "type": "video",
      "title": "Suicide Prevention for Providers",
      "description": "Providers are facing long hours, isolation, and uncertainty that may cause an increased risk of suicide. We can all play a part during the COVID-19 pandemic to support suicide prevention.",
      "category": "stress",
      "duration": "5 min read",
      "rating": 4.7,
      "author": "Dr. Lisa Wang",
      "image": "/api/placeholder/300/200",
      "link": "https://youtu.be/IPMcjFvZG2o"
    },
    {
      "id": "4",
      "type": "video",
      "title": "The First Step to Dealing With Anxiety ",
      "description": "Discover how finding your 'why' can transform your approach to anxiety—learn to embrace purpose over avoidance and reclaim a fulfilling life.",
      "category": "anxiety",
      "duration": "10 min",
      "rating": 4.9,
      "author": "MindCare Audio Team",
      "image": "/api/placeholder/300/200",
      "link": "https://youtu.be/xHweDBgDsEQ"
    },
    {
      "id": "5",
      "type": "video",
      "title": "Rewiring Anxiety- The role of the amygdala in learning to be anxious ",
      "description": "Discover how the amygdala contributes to anxiety and learn techniques to rewire your brain, reducing anxious responses through understanding and neuroplasticity.",
      "category": "stress",
      "duration": "15 min",
      "rating": 4.8,
      "author": "MindCare Audio Team",
      "image": "/api/placeholder/300/200",
      "link": "https://youtu.be/lZeZQvyxyyU"
    },
    {
      "id": "6",
      "type": "video",
      "title": "Automatic Negative Thoughts",
      "description": "CStop anxiety by identifying automatic negative thoughts—use ACT techniques to defuse anxious thinking, build resilience, and break the anxiety cycle.",
      "category": "sleep",
      "duration": "20 min",
      "rating": 4.9,
      "author": "MindCare Audio Team",
      "image": "/api/placeholder/300/200",
      "link": "https://youtu.be/lLZ-3TSoe9E/"
    },
    {
      "id": "7",
      "type": "video",
      "title": "How to Deal With Loneliness",
      "description": "Loneliness is more common—and more complex—than many of us realize. It's not just about being alone. You can feel lonely in a crowded room, in a relationship, or even surrounded by friends. In this honest and heartfelt conversation, licensed mental health clinicians Marjorie Morrison and Madhuri Jha explore what it means to feel truly connected—to ourselves and to others—and how to move through loneliness with courage and self-compassion.",
      "category": "academic",
      "duration": "10 min",
      "rating": 4.7,
      "author": "Wellness Studio",
      "image": "/api/placeholder/300/200",
      "link": "https://youtu.be/t36MR0I98cw"
    },
    {
      "id": "8",
      "type": "video",
      "title": "Therapy Cafe - Culturally-Responsive Mental Health Care for Veterans and Active-Duty Military",
      "description": "We’ll discuss practical tips for establishing trust, adapting therapeutic approaches, and collaborating with military support systems. Whether you're new to working with the military community or looking to deepen your understanding, this episode is packed with strategies and insights to help you serve those who serve.",
      "category": "academic",
      "duration": "12 min",
      "rating": 4.8,
      "author": "Academic Success Center",
      "image": "/api/placeholder/300/200",
      "link": "https://youtu.be/zw5C8VnJayY"
    }
  ],
    "hi": [
      {
        "id": "1",
        "type": "video",
        "title": "Emotional Distress: How to deal with emotional pain (Hindi)",
        "description": "A pragmatic Hindi talk on recognizing and managing emotional distress in students — coping steps and when to seek help.",
        "category": "stress",
        "duration": "12 min",
        "rating": 4.8,
        "author": "Mental Health Channel (Hindi)",
        "image": "/api/placeholder/300/200",
        "link": "https://www.youtube.com/watch?v=VfT8Ae7vAKs"
      },
      {
        "id": "2",
        "type": "video",
        "title": "Depression Recovery Story (Student) - Hindi",
        "description": "A first-person recovery story about depression while studying in India — normalises help-seeking and peer support.",
        "category": "academic",
        "duration": "16 min",
        "rating": 4.7,
        "author": "Recovered Student",
        "image": "/api/placeholder/300/200",
        "link": "https://www.youtube.com/watch?v=I7eAd8WKLpA"
      },
      {
        "id": "3",
        "type": "video",
        "title": "Depression - Symptoms, Cause & Treatment (Hindi/Urdu)",
        "description": "Clinician-led explanation of depression: signs to watch for, brief treatments, and where to get help.",
        "category": "anxiety",
        "duration": "11 min",
        "rating": 4.8,
        "author": "Dr. Imran Khan",
        "image": "/api/placeholder/300/200",
        "link": "https://www.youtube.com/watch?v=UzncPFaf7eI"
      },
      {
        "id": "4",
        "type": "video",
        "title": "MANODARPAN — Mental health support for students (Hindi)",
        "description": "Short informational video from the Manodarpan student mental health initiative — explains helplines and school/college support.",
        "category": "academic",
        "duration": "10 min",
        "rating": 4.6,
        "author": "MANODARPAN / Ministry of Education",
        "image": "/api/placeholder/300/200",
        "link": "https://www.youtube.com/watch?v=X2iexgGi1R4"
      },
      {
        "id": "5",
        "type": "article",
        "title": "MANODARPAN — Psychosocial support for students",
        "description": "Government of India resource hub with counselling, self-help tools and school/college contacts for students and parents.",
        "category": "academic",
        "duration": "read",
        "rating": 4.9,
        "author": "Ministry of Education (India)",
        "image": "/api/placeholder/300/200",
        "link": "https://manodarpan.education.gov.in/"
      },
      {
        "id": "6",
        "type": "article",
        "title": "Depression brochure (NIMHANS) — available in Hindi",
        "description": "Concise brochure describing depression symptoms, risk factors and how to find help — translated into Hindi.",
        "category": "anxiety",
        "duration": "read",
        "rating": 4.9,
        "author": "NIMHANS",
        "image": "/api/placeholder/300/200",
        "link": "https://www.nimhans.ac.in/"
      }
    ],

    "ks": [
      {
        "id": "1",
        "type": "article",
        "title": "Kashmir Lifeline (KLL) — free counselling & helpline",
        "description": "Kashmir Lifeline provides confidential counselling and a toll-free helpline in languages including Kashmiri; local outreach and crisis support.",
        "category": "stress",
        "duration": "read",
        "rating": 4.9,
        "author": "Kashmir Lifeline",
        "image": "/api/placeholder/300/200",
        "link": "https://www.kashmirlifeline.org/contact.php"
      },
      {
        "id": "2",
        "type": "article",
        "title": "Zehen Kashmir — Kashmiri-language mental health media",
        "description": "Culturally sensitive videos, podcasts and blog posts in Kashmiri aimed at awareness and stigma reduction.",
        "category": "academic",
        "duration": "read/listen",
        "rating": 4.7,
        "author": "Zehen Kashmir",
        "image": "/api/placeholder/300/200",
        "link": "https://zehenkashmir.com/"
      },
      {
        "id": "3",
        "type": "article",
        "title": "HEALTHY MINDS — community counselling (Kashmir)",
        "description": "Local project offering free counselling, psychosocial interventions and community programs in the Kashmir valley.",
        "category": "stress",
        "duration": "read",
        "rating": 4.8,
        "author": "KASHMER / HELP Foundation J&K",
        "image": "/api/placeholder/300/200",
        "link": "https://kashmer.org/healthy-minds-counseling-services-2/.html"
      },
      {
        "id": "4",
        "type": "article",
        "title": "Reducing the mental health treatment gap in Kashmir (review)",
        "description": "A peer-reviewed overview of mental health services in Kashmir and tele-mental health initiatives to expand access.",
        "category": "academic",
        "duration": "read",
        "rating": 4.8,
        "author": "Public Health Research",
        "image": "/api/placeholder/300/200",
        "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10154954/"
      },
      {
        "id": "5",
        "type": "article",
        "title": "Local reporting on suicide, stigma and help-seeking in Kashmir",
        "description": "Recent reporting and features exploring suicide stigma and the need for local support services in Kashmir.",
        "category": "stress",
        "duration": "read",
        "rating": 4.6,
        "author": "Regional press",
        "image": "/api/placeholder/300/200",
        "link": "https://risingkashmir.com/suicide-remains-hidden-behind-walls-of-stigma-silence-shame/"
      },
      {
        "id": "6",
        "type": "article",
        "title": "Tele-MANAS — 24/7 government tele-counselling (works in multiple languages)",
        "description": "National tele-mental health service that connects callers to counsellors; useful when local services are unavailable.",
        "category": "stress",
        "duration": "read",
        "rating": 4.7,
        "author": "Ministry of Health & Family Welfare (India)",
        "image": "/api/placeholder/300/200",
        "link": "https://telemanas.mohfw.gov.in/"
      }
    ],

    "ur": [
      {
        "id": "1",
        "type": "video",
        "title": "Depression Treatment in Urdu — Dr. Rana Nasir Ali",
        "description": "A clinician-led Urdu video explaining depression, its causes and core treatment approaches.",
        "category": "anxiety",
        "duration": "14 min",
        "rating": 4.7,
        "author": "Psychiatry Clinic (Pakistan)",
        "image": "/api/placeholder/300/200",
        "link": "https://www.youtube.com/watch?v=dgazZ142Ruk"
      },
      {
        "id": "2",
        "type": "video",
        "title": "What is Depression? (Urdu) — Dr. Saira Saleem",
        "description": "Short Urdu explainer on signs of depression and simple first steps to seek help.",
        "category": "stress",
        "duration": "10 min",
        "rating": 4.6,
        "author": "Clinical Educator",
        "image": "/api/placeholder/300/200",
        "link": "https://www.youtube.com/watch?v=PeCx3QoBVIY"
      },
      {
        "id": "3",
        "type": "video",
        "title": "CBT for Depression (Urdu)",
        "description": "A practical introduction to Cognitive Behavioural Therapy techniques explained in Urdu.",
        "category": "anxiety",
        "duration": "18 min",
        "rating": 4.8,
        "author": "Psychiatry Clinic",
        "image": "/api/placeholder/300/200",
        "link": "https://www.youtube.com/watch?v=d7n9isgg8kA"
      },
      {
        "id": "4",
        "type": "article",
        "title": "Guided self-help (Living Life To The Full) — Urdu version (study)",
        "description": "Peer-reviewed study on the Urdu version of the LLTTF guided self-help course; useful low-intensity support.",
        "category": "stress",
        "duration": "read",
        "rating": 4.7,
        "author": "Academic Journal",
        "image": "/api/placeholder/300/200",
        "link": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9293591/"
      },
      {
        "id": "5",
        "type": "article",
        "title": "About Mental Health (Urdu translation) — CAMH",
        "description": "A short translated PDF offering basics on mental health in Urdu (signs, support, self-care).",
        "category": "academic",
        "duration": "read",
        "rating": 4.6,
        "author": "CAMH",
        "image": "/api/placeholder/300/200",
        "link": "https://www.camh.ca/-/media/files/mi-index-other-languages/urdu-about-mental-health.pdf"
      }
    ],

    "pa": [
      {
        "id": "1",
        "type": "video",
        "title": "ਡਿਪਰੈਸ਼ਨ ਦਾ ਇਲਾਜ (Depression treatment) — Punjabi",
        "description": "Punjabi-language clinical overview of depression and practical coping strategies for individuals and families.",
        "category": "anxiety",
        "duration": "15 min",
        "rating": 4.6,
        "author": "Dr Harshindar Kaur / Regional Health",
        "image": "/api/placeholder/300/200",
        "link": "https://www.youtube.com/watch?v=pAzFRLqy5Xk"
      },
      {
        "id": "2",
        "type": "video",
        "title": "Understanding Depression (Punjabi)",
        "description": "Mental health awareness session in Punjabi covering symptoms, stigma and how to support someone.",
        "category": "academic",
        "duration": "16 min",
        "rating": 4.7,
        "author": "Regional Mental Health Series",
        "image": "/api/placeholder/300/200",
        "link": "https://www.youtube.com/watch?v=MqrhQhdoonY"
      },
      {
        "id": "3",
        "type": "video",
        "title": "Punjabi Mental Health Podcast: Men’s Mental Health",
        "description": "Podcast episode discussing mental health in Punjabi communities — stigma, help-seeking and culturally-relevant strategies.",
        "category": "stress",
        "duration": "30 min",
        "rating": 4.8,
        "author": "Taraki / Community Health",
        "image": "/api/placeholder/300/200",
        "link": "https://www.youtube.com/watch?v=444lLdLozeU"
      },
      {
        "id": "4",
        "type": "article",
        "title": "Fostering Mental Wellbeing in the Punjabi Community",
        "description": "Practical community-facing guidance to reduce stigma and improve access to mental health services for Punjabi speakers.",
        "category": "academic",
        "duration": "read",
        "rating": 4.7,
        "author": "NishkamSWAT / Taraki",
        "image": "/api/placeholder/300/200",
        "link": "https://www.nishkamswat.com/articles/fostering-mental-wellbeing-in-the-punjabi-community-and-eradicating-stigma-for-a-healthier-future"
      },
      {
        "id": "5",
        "type": "video",
        "title": "Looking after your mental health (Punjabi)",
        "description": "Short public-health video in Punjabi with simple self-care steps and local service pointers.",
        "category": "stress",
        "duration": "8 min",
        "rating": 4.6,
        "author": "Public Health Channel",
        "image": "/api/placeholder/300/200",
        "link": "https://www.youtube.com/watch?v=s_CEzZGrsIk"
      }
    ]
  } 


  const resources = resourcelang[i18n.language] || resourcelang['en'];
  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                <Link to={resource.link} target="_blank" key={resource.id} className="no-underline">
                  <Card className="card-gradient card-hover group cursor-pointer">
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
                          {t(resource.type)} {/* keep type translated */}
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
                </Link>
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
