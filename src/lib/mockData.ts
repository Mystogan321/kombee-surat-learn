
import { 
  User, Course, Module, Lesson, Assessment, Question, 
  Progress, UserAnalytics, Notification 
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Smith',
    email: 'john.smith@kombee.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    department: 'Engineering',
    position: 'Software Developer',
    joinDate: '2023-01-15',
  },
  {
    id: 'user2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@kombee.com',
    role: 'intern',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    department: 'Marketing',
    position: 'Marketing Intern',
    joinDate: '2023-06-10',
  },
  {
    id: 'user3',
    name: 'Michael Chen',
    email: 'michael.chen@kombee.com',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    department: 'Engineering',
    position: 'Senior Engineer',
    joinDate: '2021-03-22',
  },
  {
    id: 'user4',
    name: 'Priya Patel',
    email: 'priya.patel@kombee.com',
    role: 'hr_admin',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    department: 'Human Resources',
    position: 'HR Manager',
    joinDate: '2022-02-15',
  },
  {
    id: 'user5',
    name: 'David Wilson',
    email: 'david.wilson@kombee.com',
    role: 'team_lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    department: 'Product',
    position: 'Product Team Lead',
    joinDate: '2020-11-05',
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: 'course1',
    title: 'Frontend Development Fundamentals',
    description: 'Learn the core concepts of modern frontend development including HTML, CSS, and JavaScript.',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop',
    instructor: 'Michael Chen',
    duration: 480, // 8 hours
    modules: [],
    enrolledUsers: 42,
    averageRating: 4.7,
    tags: ['Development', 'Frontend', 'Web'],
    level: 'beginner',
    createdAt: '2023-01-10T08:00:00Z',
    updatedAt: '2023-03-15T10:30:00Z',
  },
  {
    id: 'course2',
    title: 'Product Management Essentials',
    description: 'Master the fundamentals of product management, from ideation to launch and beyond.',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop',
    instructor: 'David Wilson',
    duration: 360, // 6 hours
    modules: [],
    enrolledUsers: 28,
    averageRating: 4.5,
    tags: ['Product Management', 'Business', 'Strategy'],
    level: 'intermediate',
    createdAt: '2023-02-05T09:15:00Z',
    updatedAt: '2023-04-20T14:45:00Z',
  },
  {
    id: 'course3',
    title: 'Digital Marketing Strategy',
    description: 'Develop comprehensive digital marketing strategies to drive business growth and customer engagement.',
    thumbnail: 'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2942&auto=format&fit=crop',
    instructor: 'Sarah Johnson',
    duration: 300, // 5 hours
    modules: [],
    enrolledUsers: 35,
    averageRating: 4.3,
    tags: ['Marketing', 'Digital', 'Strategy'],
    level: 'intermediate',
    createdAt: '2023-03-12T11:00:00Z',
    updatedAt: '2023-05-18T16:20:00Z',
  },
  {
    id: 'course4',
    title: 'HR Compliance and Best Practices',
    description: 'Stay up-to-date with the latest HR regulations and implement best practices for organizational success.',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
    instructor: 'Priya Patel',
    duration: 240, // 4 hours
    modules: [],
    enrolledUsers: 20,
    averageRating: 4.8,
    tags: ['HR', 'Compliance', 'Management'],
    level: 'advanced',
    createdAt: '2023-04-08T13:45:00Z',
    updatedAt: '2023-06-25T09:10:00Z',
  },
];

// Mock Modules (for first course)
export const mockModules: Module[] = [
  {
    id: 'module1',
    title: 'HTML Basics',
    description: 'Learn the fundamentals of HTML markup language',
    lessons: [],
    order: 1,
  },
  {
    id: 'module2',
    title: 'CSS Styling',
    description: 'Master cascading style sheets for web design',
    lessons: [],
    order: 2,
  },
  {
    id: 'module3',
    title: 'JavaScript Programming',
    description: 'Introduction to JavaScript concepts and DOM manipulation',
    lessons: [],
    order: 3,
  },
];

// Mock Lessons (for first module)
export const mockLessons: Lesson[] = [
  {
    id: 'lesson1',
    title: 'Introduction to HTML',
    description: 'Understanding the basics of HTML markup',
    contentType: 'video',
    content: 'https://example.com/videos/intro-html.mp4',
    duration: 15,
    order: 1,
    isCompleted: false,
  },
  {
    id: 'lesson2',
    title: 'HTML Document Structure',
    description: 'Learning about DOCTYPE, head, body, and metadata',
    contentType: 'document',
    content: 'https://example.com/docs/html-structure.pdf',
    duration: 20,
    order: 2,
    isCompleted: false,
  },
  {
    id: 'lesson3',
    title: 'HTML Forms',
    description: 'Creating interactive forms with HTML',
    contentType: 'video',
    content: 'https://example.com/videos/html-forms.mp4',
    duration: 25,
    order: 3,
    isCompleted: false,
  },
  {
    id: 'lesson4',
    title: 'HTML5 Semantic Elements',
    description: 'Using semantic HTML for better accessibility',
    contentType: 'presentation',
    content: 'https://example.com/presentations/semantic-html.pptx',
    duration: 30,
    order: 4,
    isCompleted: false,
  },
];

// Update modules with lessons
mockModules[0].lessons = mockLessons;

// Update course with modules
mockCourses[0].modules = mockModules;

// Mock Assessment Questions
export const mockQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Which HTML tag is used for creating a hyperlink?',
    options: [
      { id: 'o1', text: '<link>' },
      { id: 'o2', text: '<a>' },
      { id: 'o3', text: '<href>' },
      { id: 'o4', text: '<url>' },
    ],
    correctOptionId: 'o2',
    explanation: 'The <a> (anchor) tag is used to create hyperlinks in HTML documents.',
    type: 'multiple_choice',
    difficulty: 'easy',
  },
  {
    id: 'q2',
    text: 'CSS stands for Cascading Style Sheets.',
    options: [
      { id: 'o1', text: 'True' },
      { id: 'o2', text: 'False' },
    ],
    correctOptionId: 'o1',
    explanation: 'CSS (Cascading Style Sheets) is used to style and layout web pages.',
    type: 'true_false',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    text: 'Which property is used to change the background color in CSS?',
    options: [
      { id: 'o1', text: 'color' },
      { id: 'o2', text: 'bgcolor' },
      { id: 'o3', text: 'background-color' },
      { id: 'o4', text: 'background' },
    ],
    correctOptionId: 'o3',
    explanation: 'The background-color property is used to set the background color of an element in CSS.',
    type: 'multiple_choice',
    difficulty: 'easy',
  },
];

// Mock Assessment
export const mockAssessment: Assessment = {
  id: 'assessment1',
  title: 'HTML Basics Assessment',
  description: 'Test your knowledge of HTML fundamentals',
  questions: mockQuestions,
  timeLimit: 15, // 15 minutes
  passingScore: 70, // 70%
  attempts: 3,
  courseId: 'course1',
  moduleId: 'module1',
};

// Mock Progress Data
export const mockProgress: Progress = {
  userId: 'user1',
  courseId: 'course1',
  completedLessons: ['lesson1', 'lesson2'],
  lastAccessed: '2023-07-10T14:30:00Z',
  assessmentResults: [
    {
      assessmentId: 'assessment1',
      score: 80,
      passed: true,
      completedAt: '2023-07-05T10:15:00Z',
      timeSpent: 720, // 12 minutes
      answers: [
        {
          questionId: 'q1',
          selectedOptionId: 'o2',
          isCorrect: true,
        },
        {
          questionId: 'q2',
          selectedOptionId: 'o1',
          isCorrect: true,
        },
        {
          questionId: 'q3',
          selectedOptionId: 'o4',
          isCorrect: false,
        },
      ],
    },
  ],
  percentComplete: 50,
};

// Mock User Analytics
export const mockUserAnalytics: UserAnalytics = {
  userId: 'user1',
  enrolledCourses: 3,
  completedCourses: 1,
  inProgressCourses: 2,
  averageAssessmentScore: 85,
  totalLearningTime: 480, // 8 hours
  certificatesEarned: 1,
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    title: 'New Course Available',
    message: 'Check out our new course on Advanced JavaScript Concepts!',
    isRead: false,
    type: 'info',
    createdAt: '2023-07-01T09:00:00Z',
  },
  {
    id: 'notif2',
    userId: 'user1',
    title: 'Assessment Completed',
    message: 'You scored 80% on HTML Basics Assessment. Great job!',
    isRead: true,
    type: 'success',
    createdAt: '2023-07-05T10:30:00Z',
  },
  {
    id: 'notif3',
    userId: 'user1',
    title: 'Course Deadline Approaching',
    message: 'Remember to complete Frontend Development Fundamentals by July 15!',
    isRead: false,
    type: 'warning',
    createdAt: '2023-07-08T16:45:00Z',
  },
];
