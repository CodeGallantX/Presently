'use client';
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Star, Zap, Users, Building, GraduationCap, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const plans = [
  {
    title: "Lecturers",
    subtitle: "For educators and instructors",
    icon: <Zap className="w-6 h-6" />,
    price: {
      naira: { monthly: 3000, annually: 30000 },
      dollar: { monthly: 5, annually: 50 }
    },
    priceDetails: { monthly: "/month", annually: "/year" },
    trial: "Free trial available",
    features: [
      "Create & manage attendance sessions",
      "Real-time attendance tracking",
      "Export to PDF / Excel / CSV",
      "Course management tools",
      "Advanced analytics & insights",
      "Student notifications (reminders & alerts)",
      "Automations (auto-open/close sessions, reminders)",
      "Attendance validation alerts"
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "border-primary/50 bg-primary/5",
    note: ""
  },
  {
    title: "Students",
    subtitle: "Compulsory, tied to a lecturer's course",
    icon: <GraduationCap className="w-6 h-6" />,
    price: {
      naira: { monthly: 500, annually: 500 },
      dollar: { monthly: 1, annually: 1 }
    },
    priceDetails: { monthly: "/year", annually: "/year" },
    trial: "Auto-enrolled with lecturer",
    features: [
      "Mark attendance with QR/GPS",
      "View attendance history",
      "Real-time absence/presence notifications",
      "Motivational feedback",
      "Mobile-optimized interface"
    ],
    cta: "Auto-enrolled",
    popular: false,
    color: "border-blue-500/20 bg-blue-500/5",
    note: "Students cannot sign up alone — they join automatically once their lecturer/course is onboarded.",
    disabled: true
  },
  {
    title: "Departments",
    subtitle: "For faculties or departments covering all courses",
    icon: <Building className="w-6 h-6" />,
    price: {
      naira: { monthly: 150000, annually: 1500000 },
      dollar: { monthly: 200, annually: 2000 }
    },
    priceDetails: { monthly: "/month", annually: "/year" },
    trial: "Free 1-Month Trial",
    features: [
      "All lecturers & students in department included",
      "Centralized department dashboard",
      "Bulk analytics (by course, by level)",
      "Student compliance & exam clearance reports",
      "Multi-lecturer coordination tools",
      "Departmental admin accounts",
      "Priority support"
    ],
    cta: "Start Free Trial",
    popular: false,
    color: "border-purple-500/20 bg-purple-500/5",
    note: ""
  },
  {
    title: "Institutions",
    subtitle: "For tertiary institutions",
    icon: <Users className="w-6 h-6" />,
    price: {
      naira: { monthly: "Custom", annually: "Custom" },
      dollar: { monthly: "Custom", annually: "Custom" }
    },
    priceDetails: { monthly: "", annually: "" },
    trial: "Custom demo & trial",
    features: [
      "Institution-wide deployment (all departments included)",
      "Cross-department & faculty analytics",
      "Custom integrations (LMS, ERP, exam clearance) [coming soon]",
      "White-label branding (school name, logo, domain)",
      "Advanced reporting suite",
      "API access for developers [coming soon]",
      "Dedicated support & SLA"
    ],
    cta: "Contact Sales",
    popular: false,
    color: "border-orange-500/20 bg-orange-500/5",
    note: ""
  },
];

const Pricing = ({ setActiveSection }) => {
  const router = useRouter();
  const [currency, setCurrency] = useState("naira");
  const [billingCycle, setBillingCycle] = useState("annually");

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setActiveSection('pricing');
    }
  }, [isInView, setActiveSection]);

  const handleCtaClick = (cta, planTitle) => {
    if (planTitle === "Lecturers" || planTitle === "Departments") {
      router.push('/payment');
    } else if (cta.includes("Contact")) {
      window.location.href = "mailto:sales@presently.app";
    } else if (planTitle === "Students") {
      // Do nothing for disabled student plan
      return;
    }
  };

  const formatPrice = (price, currency) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'naira' ? 'NGN' : 'USD',
      minimumFractionDigits: 0,
    }).format(price).replace('NGN', '₦').replace('USD', '

                <CardContent className="flex-grow">
                  {plan.note && (
                    <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-blue-400 leading-relaxed">{plan.note}</p>
                      </div>
                    </div>
                  )}
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6">
                  <Button 
                    onClick={() => handleCtaClick(plan.cta, plan.title)}
                    variant={plan.popular ? 'default' : 'outline'}
                    disabled={plan.disabled}
                    className={cn(
                      "w-full py-6 font-semibold transition-all duration-200",
                      plan.popular && "cta-button",
                      plan.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Billing Information */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">How Billing Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold">1. Lecturer Signs Up</h4>
                <p className="text-sm text-muted-foreground">
                  Lecturers create accounts and set up their courses with annual billing.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="font-semibold">2. Students Auto-Enrolled</h4>
                <p className="text-sm text-muted-foreground">
                  Students are automatically added when lecturers create courses. Student fees are collected separately.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-3">
                  <Building className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="font-semibold">3. Scale to Department</h4>
                <p className="text-sm text-muted-foreground">
                  Departments can upgrade to cover all lecturers and students with centralized billing.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Need something custom?</h3>
            <p className="text-muted-foreground mb-6">
              We work with large institutions to create tailored solutions that fit your specific needs.
            </p>
            <Button variant="outline" className="secondary-button">
              Schedule a Call
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;);
  };

  const calculateSavedPercentage = (monthly, annually) => {
    if (typeof monthly !== 'number' || typeof annually !== 'number') return 0;
    const totalMonthly = monthly * 12;
    return Math.round(((totalMonthly - annually) / totalMonthly) * 100);
  };

  return (
    <section ref={ref} id="pricing" className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">
            Simple, Transparent
            <span className="text-primary"> Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your institution. Start with lecturers, students follow automatically.
          </p>

          {/* Toggles */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
              <Label htmlFor="billing-cycle-switch" className={cn("text-sm font-medium", billingCycle === 'monthly' && 'text-primary')}>Monthly</Label>
              <Switch
                id="billing-cycle-switch"
                checked={billingCycle === 'annually'}
                onCheckedChange={(checked) => setBillingCycle(checked ? 'annually' : 'monthly')}
              />
              <Label htmlFor="billing-cycle-switch" className={cn("text-sm font-medium", billingCycle === 'annually' && 'text-primary')}>
                Annually
                {billingCycle === 'annually' && (
                  <span className="text-green-500 font-semibold ml-2 bg-green-100/50 px-2 py-1 rounded-md">Save up to 17%</span>
                )}
              </Label>
            </div>
            <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
              <Label htmlFor="currency-switch" className={cn("text-sm font-medium", currency === 'naira' && 'text-primary')}>NGN (₦)</Label>
              <Switch
                id="currency-switch"
                checked={currency === 'dollar'}
                onCheckedChange={(checked) => setCurrency(checked ? 'dollar' : 'naira')}
              />
              <Label htmlFor="currency-switch" className={cn("text-sm font-medium", currency === 'dollar' && 'text-primary')}>USD ($)</Label>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, index) => {
            const savedPercentage = calculateSavedPercentage(plan.price[currency].monthly, plan.price[currency].annually);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "relative",
                  plan.disabled && "opacity-75"
                )}
              >
                <Card className={cn(
                  "relative h-full flex flex-col transition-all duration-300 hover:shadow-2xl",
                  plan.color,
                  plan.popular && "ring-2 ring-primary/50 shadow-lg shadow-primary/20",
                  plan.disabled && "cursor-not-allowed"
                )}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div className={cn(
                      "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300",
                      plan.popular ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    )}>
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                    <CardDescription className="text-base">{plan.subtitle}</CardDescription>
                    <div className="pt-4">
                      <div className="text-4xl font-bold text-primary mb-1">
                        {formatPrice(plan.price[currency][billingCycle], currency)}
                      </div>
                      {plan.priceDetails[billingCycle] && (
                        <div className="text-muted-foreground">{plan.priceDetails[billingCycle]}</div>
                      )}
                      {billingCycle === 'annually' && savedPercentage > 0 && (
                        <div className="text-sm text-green-500 font-semibold mt-2">
                          Save {savedPercentage}%
                        </div>
                      )}
                      <div className="text-sm text-primary font-medium mt-2">{plan.trial}</div>
                    </div>
                  </CardHeader>

                <CardContent className="flex-grow">
                  {plan.note && (
                    <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-blue-400 leading-relaxed">{plan.note}</p>
                      </div>
                    </div>
                  )}
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6">
                  <Button 
                    onClick={() => handleCtaClick(plan.cta, plan.title)}
                    variant={plan.popular ? 'default' : 'outline'}
                    disabled={plan.disabled}
                    className={cn(
                      "w-full py-6 font-semibold transition-all duration-200",
                      plan.popular && "cta-button",
                      plan.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Billing Information */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">How Billing Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold">1. Lecturer Signs Up</h4>
                <p className="text-sm text-muted-foreground">
                  Lecturers create accounts and set up their courses with annual billing.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="font-semibold">2. Students Auto-Enrolled</h4>
                <p className="text-sm text-muted-foreground">
                  Students are automatically added when lecturers create courses. Student fees are collected separately.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-3">
                  <Building className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="font-semibold">3. Scale to Department</h4>
                <p className="text-sm text-muted-foreground">
                  Departments can upgrade to cover all lecturers and students with centralized billing.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Need something custom?</h3>
            <p className="text-muted-foreground mb-6">
              We work with large institutions to create tailored solutions that fit your specific needs.
            </p>
            <Button variant="outline" className="secondary-button">
              Schedule a Call
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;