
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, BookOpen, Video, ArrowRight, Clock, TrendingUp, Eye, Star } from "lucide-react";

const RecommendationsSection = () => {
  const trendingTopics = [
    { title: "Best SIPs for 2025", views: "2.5k", badge: "Hot", trend: "+25%", url: "https://www.bankoncube.com/post/12-best-sips-for-the-long-term-10-20-year-investment-time-frame-starting-2021?0cc03a8e_page=3" },
    { title: "Credit Cards for Students", views: "1.8k", badge: "Popular", trend: "+18%", url: "https://www.paisabazaar.com/credit-card/student-credit-card-in-india/" },
    { title: "Emergency Fund Planning", views: "1.2k", badge: "Essential", trend: "+12%", url: "https://www.nerdwallet.com/article/finance/emergency-fund" }
  ];

  const featuredArticles = [
    { title: "5 Money Mistakes Every Student Makes", readTime: "5 min", rating: 4.8, url: "https://www.udemy.com/course/learn-how-to-read-financial-statements/?utm_source=bing&utm_medium=udemyads&utm_campaign=BG-Search_DSA_Beta_Prof_la.EN_cc.India&campaigntype=Search&portfolio=Bing-India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Beta&utm_content=deal4584&utm_term=_._ag_1312819272858224_._ad__._kw_Finance+en_._de_c_._dm__._pl__._ti_dat-2333850869606932%3Aloc-90_._li_116070_._pd__._&matchtype=b&msclkid=b8752bbc7d651fa80dfb43c54de54840&couponCode=PMNVD2025" },
    { title: "How to Start Investing with 1000", readTime: "7 min", rating: 4.9, url: "https://www.investopedia.com/articles/basics/06/invest1000.asp" },
    { title: "Understanding Health Insurance", readTime: "4 min", rating: 4.7, url: "https://www.india.gov.in/spotlight/health-insurance" }
  ];

  const explainerVideos = [
    { title: "SIP vs FD: What's Better?", duration: "2:30", views: "15k", url: "https://www.youtube.com/shorts/NpSUJkKHhWE" },
    { title: "Stock Market for Beginners", duration: "3:15", views: "22k", url: "https://www.youtube.com/watch?v=3UF0ymVdYLA" },
    { title: "Budget Like a Pro", duration: "1:45", views: "8k", url: "https://www.youtube.com/watch?v=-bqeNE1DOzA" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Recommendations & Resources
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Stay updated with trending topics and expert insights
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trending This Week */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          whileHover={{ y: -5 }}
          className="group cursor-pointer"
        >
          <Card className="border border-orange-500/30 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm h-full relative overflow-hidden rounded-2xl">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl text-white group-hover:text-orange-300 transition-colors">
                <motion.div 
                  className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Flame className="h-5 w-5 text-white" />
                </motion.div>
                Trending This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group/item shadow-sm hover:shadow-md border border-gray-700/50"
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <a
                        href={topic.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-white group-hover/item:text-orange-300 transition-colors underline hover:text-orange-400"
                      >
                        {topic.title}
                      </a>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Eye className="h-3 w-3" />
                          {topic.views} views
                        </div>
                        <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                          <TrendingUp className="h-3 w-3" />
                          {topic.trend}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="ml-3 bg-orange-500/20 text-orange-300 border-orange-500/30"
                    >
                      {topic.badge}
                    </Badge>
                  </div>
                </motion.div>
              ))}
              <a
                href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doListMutualFund=yes"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-4 text-center text-gray-200 hover:text-white hover:bg-orange-500/20 border border-gray-600 hover:border-orange-500/30 rounded-xl transition-all duration-300 py-2 font-medium bg-transparent"
                style={{ textDecoration: 'none' }}
              >
                View All Trending
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </a>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Articles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ y: -5 }}
          className="group cursor-pointer"
        >
          <Card className="border border-blue-500/30 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm h-full relative overflow-hidden rounded-2xl">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl text-white group-hover:text-blue-300 transition-colors">
                <motion.div 
                  className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <BookOpen className="h-5 w-5 text-white" />
                </motion.div>
                Featured Articles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group/item shadow-sm hover:shadow-md border border-gray-700/50"
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white group-hover/item:text-blue-300 transition-colors mb-3 underline hover:text-blue-400"
                  >
                    {article.title}
                  </a>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-3 w-3" />
                      {article.readTime} read
                    </div>
                    <div className="flex items-center gap-1 text-sm text-yellow-400">
                      <Star className="h-3 w-3 fill-current" />
                      {article.rating}
                    </div>
                  </div>
                </motion.div>
              ))}
              <a
                href="https://www.edutopia.org/article/teaching-financial-literacy"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-4 text-center text-gray-200 hover:text-white hover:bg-blue-500/20 border border-gray-600 hover:border-blue-500/30 rounded-xl transition-all duration-300 py-2 font-medium bg-transparent"
                style={{ textDecoration: 'none' }}
              >
                Read More Articles
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </a>
            </CardContent>
          </Card>
        </motion.div>

        {/* Short Videos */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          whileHover={{ y: -5 }}
          className="group cursor-pointer"
        >
          <Card className="border border-pink-500/30 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm h-full relative overflow-hidden rounded-2xl">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-500/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-red-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl text-white group-hover:text-pink-300 transition-colors">
                <motion.div 
                  className="p-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Video className="h-5 w-5 text-white" />
                </motion.div>
                Short Term & Long Term Investment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {explainerVideos.map((video, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group/item shadow-sm hover:shadow-md border border-gray-700/50"
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white group-hover/item:text-pink-300 transition-colors mb-3 underline hover:text-pink-400"
                  >
                    {video.title}
                  </a>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Video className="h-3 w-3" />
                      {video.duration}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Eye className="h-3 w-3" />
                      {video.views} views
                    </div>
                  </div>
                </motion.div>
              ))}
              <a
                href="https://www.youtube.com/@khanacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-4 text-center text-gray-200 hover:text-white hover:bg-pink-500/20 border border-gray-600 hover:border-pink-500/30 rounded-xl transition-all duration-300 py-2 font-medium bg-transparent"
                style={{ textDecoration: 'none' }}
              >
                Watch More Videos
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecommendationsSection;
