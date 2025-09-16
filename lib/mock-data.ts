// Mock data for the Smart Student Hub application
// TODO: Replace with API calls to Django REST Framework

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'hei' | 'student' | 'faculty' | 'recruiter';
  avatar?: string;
}

export interface Student {
  id: number
  name: string
  email: string
  cgpa: number
  attendance: number
  hsi: number // Holistic Student Index
  batch: string
  college: string
  department: string
  facultyAdvisor?: number // Faculty ID
  placementStatus: 'placed' | 'ongoing' | 'not-started'
  avatar?: string
  domains: {
    ai: number
    web: number
    blockchain: number
    mobile: number
    data_science: number
    cybersecurity: number
    cloud: number
    iot: number
    ar_vr: number
    game_dev: number
    devops: number
    uiux: number
    research: number
  }
  achievements: Achievement[]
  projects: Project[]
}

export interface Achievement {
  id: number
  title: string
  category: "academic" | "extracurricular" | "research" | "community_service" | "internship" | "community" | "sports" | "leadership"
  description: string
  date: string
  status: "pending" | "approved" | "rejected"
  points: number
}

export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  status: "ongoing" | "completed" | "planned"
  startDate: string
  endDate?: string
  projectLink?: string
  githubUrl?: string
  liveUrl?: string
}

export interface Faculty {
  id: number
  name: string
  email: string
  department: string
  college: string
  specialization: string
  experience: number
  assignedStudents: number[]
  maxStudents: number
}

export interface University {
  id: number
  name: string
  location: string
  totalStudents: number
  totalFaculty: number
}

// Mock Users
export const mockUsers: User[] = [
  { id: '1', email: 'admin@hub.com', name: 'Admin User', role: 'admin' },
  { id: '2', email: 'hei@university.edu', name: 'HEI Admin', role: 'hei' },
  { id: '3', email: 'alice.johnson@university.edu', name: 'Alice Johnson', role: 'student' },
  { id: '4', email: 'sarah.wilson@university.edu', name: 'Dr. Sarah Wilson', role: 'faculty' },
  { id: '5', email: 'recruiter@company.com', name: 'Jane Recruiter', role: 'recruiter' },
];

// Mock Students Data
export const dummyStudents: Student[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@university.edu",
    cgpa: 8.5,
    attendance: 92,
    hsi: 75,
    batch: "2024",
    college: "Amrita",
    department: "Computer Science",
    facultyAdvisor: 1,
    placementStatus: "placed",
    domains: {
      ai: 20,
      web: 15,
      blockchain: 0,
      mobile: 10,
      data_science: 18,
      cybersecurity: 5,
      cloud: 12,
      iot: 8,
      ar_vr: 3,
      game_dev: 0,
      devops: 8,
      uiux: 22,
      research: 25,
    },
    achievements: [
      {
        id: 1,
        title: "Best Project Award",
        category: "academic",
        description: "Won first place in annual project competition",
        date: "2024-03-15",
        status: "approved",
        points: 50,
      },
      {
        id: 2,
        title: "AI Research Paper Published",
        category: "research",
        description: "Published in IEEE conference",
        date: "2024-01-15",
        status: "approved",
        points: 100,
      },
    ],
    projects: [
      {
        id: 1,
        title: "AI-Powered Study Assistant",
        description: "A machine learning application to help students with personalized study plans",
        technologies: ["Python", "TensorFlow", "React", "Node.js"],
        status: "completed",
        startDate: "2024-01-15",
        endDate: "2024-03-10",
        projectLink: "https://github.com/example/ecommerce",
        githubUrl: "https://github.com/example/ai-assistant"
      },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@university.edu",
    cgpa: 7.8,
    attendance: 85,
    hsi: 62,
    batch: "2024",
    college: "MIT",
    department: "Computer Science",
    facultyAdvisor: 1,
    placementStatus: "ongoing",
    domains: {
      ai: 5,
      web: 25,
      blockchain: 12,
      mobile: 15,
      data_science: 8,
      cybersecurity: 10,
      cloud: 18,
      iot: 5,
      ar_vr: 0,
      game_dev: 8,
      devops: 22,
      uiux: 8,
      research: 10,
    },
    achievements: [
      {
        id: 3,
        title: "Hackathon Winner",
        category: "extracurricular",
        description: "Won regional hackathon with blockchain solution",
        date: "2024-02-20",
        status: "approved",
        points: 40,
      },
      {
        id: 4,
        title: "Web Development Internship",
        category: "internship",
        description: "Summer internship at tech startup",
        date: "2024-06-01",
        status: "pending",
        points: 50,
      },
    ],
    projects: [
      {
        id: 2,
        title: "Decentralized Voting System",
        description: "Blockchain-based secure voting platform",
        technologies: ["Solidity", "React", "Web3.js", "IPFS"],
        status: "ongoing",
        startDate: "2024-02-01",
      },
      {
        id: 3,
        title: "E-commerce Platform",
        description: "Full-stack web application",
        technologies: ["React", "Django", "PostgreSQL"],
        status: "ongoing",
        startDate: "2024-02-01",
      },
    ],
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@university.edu",
    cgpa: 9.2,
    attendance: 96,
    hsi: 88,
    batch: "2023",
    college: "MIT",
    department: "Computer Science",
    facultyAdvisor: 2,
    placementStatus: "placed",
    domains: {
      ai: 25,
      web: 20,
      blockchain: 5,
      mobile: 12,
      data_science: 30,
      cybersecurity: 15,
      cloud: 20,
      iot: 10,
      ar_vr: 8,
      game_dev: 5,
      devops: 10,
      uiux: 25,
      research: 35,
    },
    achievements: [
      {
        id: 5,
        title: "Research Publication",
        category: "research",
        description: "Published paper on machine learning applications",
        date: "2024-01-10",
        status: "approved",
        points: 80,
      },
      {
        id: 6,
        title: "Machine Learning Competition",
        category: "academic",
        description: "Top 10 in Kaggle competition",
        date: "2024-03-10",
        status: "approved",
        points: 85,
      },
      {
        id: 7,
        title: "Community Coding Workshop",
        category: "community",
        description: "Taught coding to local students",
        date: "2024-04-05",
        status: "approved",
        points: 60,
      },
    ],
    projects: [
      {
        id: 4,
        title: "Smart Campus IoT System",
        description: "IoT-based campus management system with AI analytics",
        technologies: ["Python", "Arduino", "React", "MongoDB", "TensorFlow"],
        status: "completed",
        startDate: "2023-09-01",
        endDate: "2024-01-15",
      },
    ],
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@university.edu",
    cgpa: 8.1,
    attendance: 88,
    hsi: 76,
    batch: "2023",
    college: "MIT",
    department: "Information Technology",
    facultyAdvisor: 3,
    placementStatus: "placed",
    domains: {
      ai: 20,
      web: 30,
      blockchain: 15,
      mobile: 25,
      data_science: 15,
      cybersecurity: 20,
      cloud: 22,
      iot: 12,
      ar_vr: 10,
      game_dev: 15,
      devops: 18,
      uiux: 28,
      research: 12,
    },
    achievements: [
      {
        id: 8,
        title: "Mobile App Development",
        category: "academic",
        description: "Built cross-platform mobile app",
        date: "2024-02-01",
        status: "approved",
        points: 65,
      },
    ],
    projects: [
      {
        id: 5,
        title: "Social Media App",
        description: "React Native social platform",
        technologies: ["React Native", "Firebase"],
        status: "ongoing",
        startDate: "2024-01-15",
      },
    ],
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@university.edu",
    cgpa: 7.5,
    attendance: 82,
    hsi: 68,
    batch: "2023",
    college: "MIT",
    department: "Information Technology",
    placementStatus: "ongoing",
    domains: {
      ai: 18,
      web: 22,
      blockchain: 10,
      mobile: 20,
      data_science: 25,
      cybersecurity: 15,
      cloud: 18,
      iot: 8,
      ar_vr: 5,
      game_dev: 10,
      devops: 12,
      uiux: 30,
      research: 15,
    },
    achievements: [],
    projects: [
      {
        id: 6,
        title: "Data Visualization Dashboard",
        description: "Analytics dashboard with D3.js",
        technologies: ["React", "D3.js", "Node.js"],
        status: "ongoing",
        startDate: "2024-03-01",
      },
    ],
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@university.edu",
    cgpa: 8.7,
    attendance: 94,
    hsi: 88,
    batch: "2022",
    college: "MIT",
    department: "Electronics",
    facultyAdvisor: 4,
    placementStatus: "placed",
    domains: {
      ai: 22,
      web: 15,
      blockchain: 8,
      mobile: 18,
      data_science: 20,
      cybersecurity: 25,
      cloud: 15,
      iot: 35,
      ar_vr: 12,
      game_dev: 8,
      devops: 12,
      uiux: 10,
      research: 28,
    },
    achievements: [
      {
        id: 9,
        title: "IoT Research Project",
        category: "research",
        description: "Smart home automation system",
        date: "2024-01-20",
        status: "approved",
        points: 90,
      },
    ],
    projects: [
      {
        id: 7,
        title: "IoT Smart Home",
        description: "Automated home control system",
        technologies: ["Arduino", "Python", "React"],
        status: "completed",
        startDate: "2023-11-01",
        endDate: "2024-02-01",
      },
    ],
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace.lee@university.edu",
    cgpa: 8.3,
    attendance: 90,
    hsi: 79,
    batch: "2022",
    college: "MIT",
    department: "Electronics",
    facultyAdvisor: 4,
    placementStatus: "placed",
    domains: {
      ai: 25,
      web: 12,
      blockchain: 5,
      mobile: 15,
      data_science: 22,
      cybersecurity: 20,
      cloud: 10,
      iot: 30,
      ar_vr: 8,
      game_dev: 5,
      devops: 8,
      uiux: 15,
      research: 32,
    },
    achievements: [
      {
        id: 10,
        title: "National Science Fair Winner",
        category: "academic",
        description: "Won first place in robotics category",
        date: "2024-03-15",
        status: "approved",
        points: 95,
      },
    ],
    projects: [],
  },
  {
    id: 8,
    name: "Henry Chen",
    email: "henry.chen@university.edu",
    cgpa: 7.2,
    attendance: 78,
    hsi: 64,
    batch: "2022",
    college: "MIT",
    department: "Mechanical",
    placementStatus: "ongoing",
    domains: {
      ai: 12,
      web: 18,
      blockchain: 6,
      mobile: 10,
      data_science: 15,
      cybersecurity: 8,
      cloud: 12,
      iot: 15,
      ar_vr: 20,
      game_dev: 12,
      devops: 20,
      uiux: 12,
      research: 18,
    },
    achievements: [],
    projects: [
      {
        id: 8,
        title: "CAD Design Tool",
        description: "Web-based CAD application",
        technologies: ["Three.js", "React", "WebGL"],
        status: "ongoing",
        startDate: "2024-02-15",
      },
    ],
  },
]

// Mock Faculty Data
export const dummyFaculty: Faculty[] = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@university.edu",
    department: "Computer Science",
    college: "MIT",
    specialization: "AI/ML, Data Science",
    experience: 12,
    assignedStudents: [1, 2],
    maxStudents: 15,
  },
  {
    id: 2,
    name: "Prof. Michael Brown",
    email: "michael.brown@university.edu",
    department: "Computer Science",
    college: "MIT",
    specialization: "Software Engineering, Web Development",
    experience: 8,
    assignedStudents: [3],
    maxStudents: 12,
  },
  {
    id: 3,
    name: "Dr. Jennifer Davis",
    email: "jennifer.davis@university.edu",
    department: "Information Technology",
    college: "MIT",
    specialization: "Mobile Development, UI/UX",
    experience: 10,
    assignedStudents: [4],
    maxStudents: 10,
  },
  {
    id: 4,
    name: "Prof. Lisa Wilson",
    email: "lisa.wilson@university.edu",
    department: "Electronics",
    college: "MIT",
    specialization: "IoT, Embedded Systems",
    experience: 15,
    assignedStudents: [6, 7],
    maxStudents: 8,
  },
  {
    id: 5,
    name: "Dr. Robert Brown",
    email: "robert.brown@university.edu",
    department: "Mechanical",
    college: "MIT",
    specialization: "CAD/CAM, Automation",
    experience: 18,
    assignedStudents: [],
    maxStudents: 6,
  },
]

// Mock Universities Data
export const dummyUniversities: University[] = [
  {
    id: 1,
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    totalStudents: 11520,
    totalFaculty: 1000,
  },
  {
    id: 2,
    name: "Stanford University",
    location: "Stanford, CA",
    totalStudents: 17249,
    totalFaculty: 2240,
  },
  {
    id: 3,
    name: "Harvard University",
    location: "Cambridge, MA",
    totalStudents: 23731,
    totalFaculty: 2400,
  },
  {
    id: 4,
    name: "Carnegie Mellon University",
    location: "Pittsburgh, PA",
    totalStudents: 14799,
    totalFaculty: 1400,
  },
]

// Mock Achievements for approval
export const mockPendingAchievements: Achievement[] = [
  { id: 11, title: "Open Source Contribution", category: "research", description: "Contributed to React library", date: "2024-05-01", status: "pending", points: 40 },
  { id: 12, title: "Startup Pitch Competition", category: "leadership", description: "Pitched innovative startup idea", date: "2024-05-15", status: "pending", points: 65 },
];

// Helper functions for data manipulation
export const getStudentsByCollege = (college: string): Student[] => {
  return dummyStudents.filter((student) => student.college === college)
}

export const getStudentsByBatch = (batch: string): Student[] => {
  return dummyStudents.filter((student) => student.batch === batch)
}

export const getTopStudentsByHSI = (limit = 10): Student[] => {
  return [...dummyStudents].sort((a, b) => b.hsi - a.hsi).slice(0, limit)
}

export const getAverageHSI = (): number => {
  const total = dummyStudents.reduce((sum, student) => sum + student.hsi, 0)
  return Math.round((total / dummyStudents.length) * 100) / 100
}

export const getAverageCGPA = (): number => {
  const total = dummyStudents.reduce((sum, student) => sum + student.cgpa, 0)
  return Math.round((total / dummyStudents.length) * 100) / 100
}

export const currentUser = {
  email: "alice.johnson@university.edu" // or whichever student email you want to use
};