'use client';
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Star, Zap, Users, Building } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const plans = [
  {
    title: "Students",
    subtitle: "Perfect for individual learners",
    icon: <Users className="w-6 h-6" />,
    price: { naira: { monthly: "Free", annually: "Free" }, dollar: { monthly: "Free", annually: "Free" } },
    priceDetails: "",
    trial: "Always free",
    features: [
      "Mark attendance with QR/GPS",
      "Personal attendance history",
      "Real-time notifications",
      "Motivational feedback",
      "Mobile-optimized interface"
    ],
    cta: "Sign Up Free",
    popular: false,
    color: "border-blue-500/20 bg-blue-500/5"
  },
  {
    title: "Lecturers",
    subtitle: "For educators and instructors",
    icon: <Zap className="w-6 h-6" />,
    price: { naira: { monthly: "₦2,500", annually: "₦25,000" }, dollar: { monthly: "$1.70", annually: "$17" } },
    priceDetails: { monthly: "/month", annually: "/year" },
    trial: "14-day free trial",
    features: [
      "Create & manage sessions",
      "Real-time attendance tracking",
      "Advanced analytics & insights",
      "Export to PDF/Excel/CSV",
      "Student notifications",
      "Course management tools"
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "border-primary/50 bg-primary/5"
  },
  {
    title: "Institutions",
    subtitle: "For schools and universities",
    icon: <Building className="w-6 h-6" />,
    price: { naira: { monthly: "Custom", annually: "Custom" }, dollar: { monthly: "Custom", annually: "Custom" } },
    priceDetails: "",
    trial: "30-day trial + demo",
    features: [
      "Multi-department management",
      "Institution-wide analytics",
      "White-label branding",
      "Priority support",
      "Custom integrations",
      "Advanced reporting suite"
    ],
    cta: "Contact Sales",
    popular: false,
    color: "border-purple-500/20 bg-purple-500/5"
  },
];

const Pricing = ({ setActiveSection }) => {
  const router = useRouter();
  const [currency, setCurrency] = useState("naira");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setActiveSection('pricing');
    }
  }, [isInView, setActiveSection]);

  const handleCtaClick = (cta) => {
    if (cta.includes("Sign Up") || cta.includes("Trial")) {
      router.push('/auth/signup');
    } else if (cta.includes("Contact")) {
      window.location.href = "mailto:sales@presently.app";
    }
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
            Choose the perfect plan for your needs. Start free, upgrade when you're ready.
          </p>

          {/* Currency and billing toggles */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
              <Label htmlFor="currency-switch" className="text-sm font-medium">NGN (₦)</Label>
              <Switch
                id="currency-switch"
                checked={currency === 'dollar'}
                onCheckedChange={(checked) => setCurrency(checked ? 'dollar' : 'naira')}
              />
              <Label htmlFor="currency-switch" className="text-sm font-medium">USD ($)</Label>
            </div>
            <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
              <Label htmlFor="billing-switch" className="text-sm font-medium">Monthly</Label>
              <Switch
                id="billing-switch"
                checked={billingCycle === 'annually'}
                onCheckedChange={(checked) => setBillingCycle(checked ? 'annually' : 'monthly')}
              />
              <Label htmlFor="billing-switch" className="text-sm font-medium">
                Annually 
                <span className="text-primary ml-1">(Save 17%)</span>
              </Label>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={cn(
                "relative h-full flex flex-col transition-all duration-300 hover:shadow-2xl",
                plan.color,
                plan.popular && "ring-2 ring-primary/50 shadow-lg shadow-primary/20"
              )}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
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
                      {plan.price[currency][billingCycle]}
                    </div>
                    {plan.priceDetails[billingCycle] && (
                      <div className="text-muted-foreground">{plan.priceDetails[billingCycle]}</div>
                    )}
                    <div className="text-sm text-primary font-medium mt-2">{plan.trial}</div>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <ul className="space-y-4">
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

                <CardFooter className="pt-8">
                  <Button 
                    onClick={() => handleCtaClick(plan.cta)}
                    variant={plan.popular ? 'default' : 'outline'}
                    className={cn(
                      "w-full py-6 font-semibold transition-all duration-200",
                      plan.popular && "cta-button"
                    )}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
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