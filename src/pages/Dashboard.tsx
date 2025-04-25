
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { MainLayout } from '@/components/layout/MainLayout';
import { fetchCourses } from '@/lib/store/slices/coursesSlice';
import { fetchUserProgress } from '@/lib/store/slices/progressSlice';
import { fetchUserNotifications } from '@/lib/store/slices/notificationsSlice';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  ClockIcon, 
  CheckIcon, 
  TrophyIcon,
  ChartBarIcon,
} from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { courses, loading: coursesLoading } = useSelector((state: RootState) => state.courses);
  const { userProgress, loading: progressLoading } = useSelector((state: RootState) => state.progress);
  
  // Fetch data on component mount
  useEffect(() => {
    if (user) {
      dispatch(fetchCourses());
      dispatch(fetchUserProgress(user.id));
      dispatch(fetchUserNotifications(user.id));
    }
  }, [dispatch, user]);
  
  const loading = coursesLoading || progressLoading;
  
  // Calculate some stats for display
  const enrolledCourses = userProgress.length;
  const completedCourses = userProgress.filter(p => p.percentComplete === 100).length;
  
  // Get courses in progress
  const inProgressCourses = userProgress
    .filter(p => p.percentComplete > 0 && p.percentComplete < 100)
    .map(p => {
      const course = courses.find(c => c.id === p.courseId);
      return {
        ...course,
        progress: p.percentComplete,
      };
    });
  
  // Get recommended courses (not enrolled)
  const recommendedCourses = courses
    .filter(course => !userProgress.some(p => p.courseId === course.id))
    .slice(0, 3);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
        <p className="text-gray-400 mt-1">Here's an overview of your learning progress</p>
      </div>
      
      {loading ? (
        <div className="py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-kombee-background-light border-kombee-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <BookOpenIcon className="mr-2 h-5 w-5 text-kombee-purple" />
                  Enrolled Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{enrolledCourses}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-kombee-background-light border-kombee-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{completedCourses}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-kombee-background-light border-kombee-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <ClockIcon className="mr-2 h-5 w-5 text-blue-500" />
                  Learning Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8</p>
              </CardContent>
            </Card>
            
            <Card className="bg-kombee-background-light border-kombee-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <TrophyIcon className="mr-2 h-5 w-5 text-yellow-500" />
                  Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1</p>
              </CardContent>
            </Card>
          </div>
          
          {/* In-progress courses */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ChartBarIcon className="mr-2 h-5 w-5 text-kombee-purple" />
              Your Progress
            </h2>
            
            {inProgressCourses.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {inProgressCourses.map(course => (
                  <Card key={course?.id} className="bg-kombee-background-light border-kombee-purple/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">{course?.title}</CardTitle>
                      <CardDescription className="text-gray-400">{course?.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-1">
                        <span className="text-sm text-gray-300 mr-auto">Progress</span>
                        <span className="text-sm font-medium text-kombee-purple">{course?.progress}%</span>
                      </div>
                      <Progress value={course?.progress} className="h-2 bg-gray-700" />
                    </CardContent>
                    <CardFooter>
                      <Button asChild size="sm" variant="outline" className="border-kombee-purple/30 hover:bg-kombee-purple/20">
                        <Link to={`/courses/${course?.id}`}>Continue</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-kombee-background-light border-kombee-purple/20">
                <CardContent className="py-8 text-center">
                  <p className="text-gray-400">No courses in progress. Start learning today!</p>
                  <Button asChild className="mt-4 bg-kombee-purple hover:bg-kombee-purple-dark">
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Recommended courses */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpenIcon className="mr-2 h-5 w-5 text-kombee-purple" />
              Recommended for You
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedCourses.map(course => (
                <Card key={course.id} className="bg-kombee-background-light border-kombee-purple/20">
                  <div className="aspect-video w-full overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">{course.title}</CardTitle>
                    <CardDescription className="text-gray-400">{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 flex items-center">
                        <ClockIcon className="inline-block mr-1 h-4 w-4" />
                        {Math.floor(course.duration / 60)}h {course.duration % 60}m
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        course.level === 'beginner' ? 'bg-green-900/50 text-green-300' :
                        course.level === 'intermediate' ? 'bg-yellow-900/50 text-yellow-300' :
                        'bg-red-900/50 text-red-300'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-kombee-purple hover:bg-kombee-purple-dark">
                      <Link to={`/courses/${course.id}`}>Enroll Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Dashboard;
