'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { GraduationCap, Users, BookOpen, ArrowRight, ArrowLeft, Check, Chrome } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'Mark attendance and track your progress',
    icon: <GraduationCap className="w-8 h-8" />,
    features: ['Quick attendance marking', 'Personal history', 'Progress tracking'],
    color: 'border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40'
  },
  {
    id: 'lecturer',
    title: 'Lecturer',
    description: 'Manage courses and track student attendance',
    icon: <BookOpen className="w-8 h-8" />,
    features: ['Create sessions', 'Real-time tracking', 'Advanced analytics'],
    color: 'border-primary/20 bg-primary/5 hover:border-primary/40'
  },
  {
    id: 'class-rep',
    title: 'Class Representative',
    description: 'Assist with attendance management',
    icon: <Users className="w-8 h-8" />,
    features: ['View class data', 'Export reports', 'Student coordination'],
    color: 'border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40'
  }
];

const steps = [
  {
    title: 'Choose Your Role',
    description: 'Select how you\'ll be using Presently'
  },
  {
    title: 'Account Setup',
    description: 'Tell us a bit more about yourself'
  },
  {
    title: 'Permissions',
    description: 'Help us personalize your experience'
  },
  {
    title: 'Setup Complete',
    description: 'You\'re all set to start using Presently!'
  }
];

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);
  const router = useRouter();
  const { setUserRole, setMatriculationNumber, setDepartment, setLevel, setDigitalSignature, setStaffId, setCoursesTaught, setAssignedCourses, setAssignedLecturer, setLocationAccessGranted, setNotificationsEnabled, setDarkModePreference } = useAppStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('user@example.com'); // Placeholder, will be pre-filled from auth
  const [password, setPassword] = useState('');
  const [matriculationNumberInput, setMatriculationNumberInput] = useState('');
  const [studentDepartmentInput, setStudentDepartmentInput] = useState('');
  const [levelInput, setLevelInput] = useState('');
  const [digitalSignatureInput, setDigitalSignatureInput] = useState(null);
  const [staffIdInput, setStaffIdInput] = useState('');
  const [lecturerDepartmentInput, setLecturerDepartmentInput] = useState('');
  const [coursesTaughtInput, setCoursesTaughtInput] = useState('');
  const [assignedCoursesInput, setAssignedCoursesInput] = useState('');
  const [assignedLecturerInput, setAssignedLecturerInput] = useState('');

  const [locationAccess, setLocationAccess] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleNext = () => {
    if (currentStep === 0 && selectedRole) {
      setUserRole(selectedRole);
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 1) {
      // Save Account Setup details
      if (selectedRole === 'student') {
        setMatriculationNumber(matriculationNumberInput);
        setDepartment(studentDepartmentInput);
        setLevel(levelInput);
        setDigitalSignature(digitalSignatureInput);
      } else if (selectedRole === 'lecturer') {
        setStaffId(staffIdInput);
        setDepartment(lecturerDepartmentInput);
        setCoursesTaught(coursesTaughtInput.split(',').map(s => s.trim()));
      } else if (selectedRole === 'class-rep') {
        setAssignedCourses(assignedCoursesInput.split(',').map(s => s.trim()));
        setAssignedLecturer(assignedLecturerInput);
      }
      // For now, we don't save fullName, email, password to store as they are handled by auth
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      // Save Permissions details
      setLocationAccessGranted(locationAccess);
      setNotificationsEnabled(notifications);
      setDarkModePreference(darkMode);
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300",
                  index <= currentStep 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-16 h-1 rounded-full transition-all duration-300",
                    index < currentStep ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{steps[currentStep].title}</h1>
          <p className="text-xl text-muted-foreground">{steps[currentStep].description}</p>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card
                    className={cn(
                      "cursor-pointer transition-all duration-300 h-full",
                      role.color,
                      selectedRole === role.id 
                        ? "ring-2 ring-primary shadow-lg shadow-primary/20 scale-105" 
                        : "hover:scale-105"
                    )}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <CardHeader className="text-center pb-6">
                      <div className={cn(
                        "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300",
                        selectedRole === role.id ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground"
                      )}>
                        {role.icon}
                      </div>
                      <CardTitle className="text-xl font-bold">{role.title}</CardTitle>
                      <CardDescription className="text-base">{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {role.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="account-setup"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <Card className="glass-card p-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold mb-2">Account Details</CardTitle>
                  <CardDescription>Provide some basic information to set up your profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  {selectedRole === 'student' && (
                    <>
                      <div>
                        <Label htmlFor="matriculation">Matriculation Number</Label>
                        <Input id="matriculation" type="text" placeholder="UG/2023/001" value={matriculationNumberInput} onChange={(e) => setMatriculationNumberInput(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" type="text" placeholder="Computer Science" value={studentDepartmentInput} onChange={(e) => setStudentDepartmentInput(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="level">Level</Label>
                        <Input id="level" type="text" placeholder="100" value={levelInput} onChange={(e) => setLevelInput(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="signature">Digital Signature (Upload)</Label>
                        <Input id="signature" type="file" onChange={(e) => setDigitalSignatureInput(e.target.files[0])} />
                      </div>
                    </>
                  )}

                  {selectedRole === 'lecturer' && (
                    <>
                      <div>
                        <Label htmlFor="staffId">Staff ID</Label>
                        <Input id="staffId" type="text" placeholder="LEC/2023/005" value={staffIdInput} onChange={(e) => setStaffIdInput(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" type="text" placeholder="Physics" value={lecturerDepartmentInput} onChange={(e) => setLecturerDepartmentInput(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="coursesTaught">Courses Taught (Comma Separated)</Label>
                        <Input id="coursesTaught" type="text" placeholder="PHY101, PHY201" value={coursesTaughtInput} onChange={(e) => setCoursesTaughtInput(e.target.value)} />
                      </div>
                    </>
                  )}

                  {selectedRole === 'class-rep' && (
                    <>
                      <div>
                        <Label htmlFor="assignedCourses">Assigned Courses (Link/IDs)</Label>
                        <Input id="assignedCourses" type="text" placeholder="MATH101, CHM202" value={assignedCoursesInput} onChange={(e) => setAssignedCoursesInput(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="assignedLecturer">Assigned Lecturer (ID/Email)</Label>
                        <Input id="assignedLecturer" type="text" placeholder="lecturer@example.com" value={assignedLecturerInput} onChange={(e) => setAssignedLecturerInput(e.target.value)} />
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pt-6">
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 secondary-button group"
                  >
                    <Chrome className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Sign in with Google
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="permissions"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <Card className="glass-card p-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold mb-2">Permissions & Preferences</CardTitle>
                  <CardDescription>Help us tailor your experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="location-access" className="flex flex-col">
                      <span>Location Access</span>
                      <span className="font-normal text-muted-foreground text-sm">Required for GPS attendance verification.</span>
                    </Label>
                    <Switch id="location-access" checked={locationAccess} onCheckedChange={setLocationAccess} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications" className="flex flex-col">
                      <span>Notifications</span>
                      <span className="font-normal text-muted-foreground text-sm">Get alerts for new sessions, announcements, and more.</span>
                    </Label>
                    <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode" className="flex flex-col">
                      <span>Dark Mode</span>
                      <span className="font-normal text-muted-foreground text-sm">Enable dark theme for a comfortable viewing experience.</span>
                    </Label>
                    <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} /> {/* Default to dark mode */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="completion"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">You're all set!</h2>
              <p className="text-muted-foreground mb-8">
                Welcome to Presently. Let's start making attendance effortless.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="secondary-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStep === 0 && !selectedRole}
            className="cta-button group"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;