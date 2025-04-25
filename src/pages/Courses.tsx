
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchCourses } from '@/lib/store/slices/coursesSlice';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Link } from 'react-router-dom';
import { BookOpenIcon, ClockIcon, SearchIcon, UsersIcon, StarIcon } from 'lucide-react';

const Courses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading } = useSelector((state: RootState) => state.courses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  
  // Filter courses based on search and level filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });
  
  // Get unique levels for filtering
  const levels = Array.from(new Set(courses.map(course => course.level))) as string[];

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Available Courses</h1>
          <p className="text-gray-400 mt-1">Browse and enroll in our training courses</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-kombee-background-light border-kombee-purple/30 text-white placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
      
      {/* Level filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={!selectedLevel ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedLevel(null)}
          className={!selectedLevel ? 'bg-kombee-purple hover:bg-kombee-purple-dark' : 'border-kombee-purple/30 text-white hover:bg-kombee-purple/20'}
        >
          All Levels
        </Button>
        
        {levels.map(level => (
          <Button
            key={level}
            variant={selectedLevel === level ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedLevel(level)}
            className={selectedLevel === level ? 'bg-kombee-purple hover:bg-kombee-purple-dark' : 'border-kombee-purple/30 text-white hover:bg-kombee-purple/20'}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Button>
        ))}
      </div>
      
      {/* Courses grid */}
      {loading ? (
        <div className="py-12 flex justify-center">
          <LoadingSpinner size="large" />
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Card key={course.id} className="bg-kombee-background-light border-kombee-purple/20 overflow-hidden flex flex-col">
              <div className="aspect-video w-full overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-white">{course.title}</CardTitle>
                    <CardDescription className="text-gray-400">{course.instructor}</CardDescription>
                  </div>
                  <Badge className={
                    course.level === 'beginner' ? 'bg-green-900/50 text-green-300 hover:bg-green-900' :
                    course.level === 'intermediate' ? 'bg-yellow-900/50 text-yellow-300 hover:bg-yellow-900' :
                    'bg-red-900/50 text-red-300 hover:bg-red-900'
                  }>
                    {course.level && (course.level.charAt(0).toUpperCase() + course.level.slice(1))}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <p className="text-sm text-gray-300 line-clamp-2 mb-3">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <ClockIcon className="inline-block mr-1 h-4 w-4" />
                    <span>{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
                  </div>
                  <div className="flex items-center">
                    <UsersIcon className="inline-block mr-1 h-4 w-4" />
                    <span>{course.enrolledUsers}</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="inline-block mr-1 h-4 w-4 text-yellow-500" />
                    <span>{course.averageRating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button asChild className="w-full bg-kombee-purple hover:bg-kombee-purple-dark">
                  <Link to={`/courses/${course.id}`}>
                    <BookOpenIcon className="mr-2 h-4 w-4" />
                    View Course
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No courses found matching your search criteria.</p>
        </div>
      )}
    </MainLayout>
  );
};

export default Courses;
