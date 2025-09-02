'use client';
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { sectionVariants } from '@/lib/animations';

const plans = [
  {
    title: "Students",
    price: { naira: { monthly: "Free", annually: "Free" }, dollar: { monthly: "Free", annually: "Free" } },
    priceDetails: "",
    trial: "Always free",
    features: [
      "Mark attendance (QR/code)",
      "Receive attendance notifications",
      "Personal attendance sheet/history",
      "Motivational/funny feedback per session",
    ],
    cta: "Sign Up for Free",
    main: false,
  },
  {
    title: "Lecturers",
    price: { naira: { monthly: "₦2,500", annually: "₦25,000" }, dollar: { monthly: "$1.70", annually: "$17" } },
    priceDetails: { monthly: "/month", annually: "/year" },
    trial: "14-day free trial",
    features: [
      "Create & manage attendance sessions",
      "Real-time attendance updates",
      "One course included",
      "Basic analytics",
      "Export to CSV/XLSX/PDF",
      "Notifications to students",
    ],
    cta: "Start Trial",
    main: true,
  },
  {
    title: "Departments",
    price: { naira: { monthly: "₦20,000", annually: "₦200,000" }, dollar: { monthly: "$13.50", annually: "$135" } },
    priceDetails: { monthly: "/month", annually: "/year" },
    trial: "14-day free trial",
    features: [
      "All lecturer features",
      "5 lecturer accounts included",
      "Department-wide analytics",
      "Admin dashboard",
      "Bulk student import",
    ],
    cta: "Start Trial",
    main: false,
  },
  {
    title: "Institutions",
    price: { naira: { monthly: "Custom", annually: "Custom" }, dollar: { monthly: "Custom", annually: "Custom" } },
    priceDetails: "",
    trial: "30-day trial after demo",
    features: [
      "All department features",
      "Institution-wide dashboard",
      "Multi-department management",
      "White-labeling",
      "Premium support",
    ],
    cta: "Contact Sales",
    main: false,
  },
];

const Pricing = ({ setActiveSection }) => {
  const router = useRouter();
  const [currency, setCurrency] = useState("naira");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setActiveSection('pricing');
    }
  }, [isInView, setActiveSection]);

  const handleCtaClick = (cta) => {
    if (cta.includes("Sign Up") || cta.includes("Trial")) {
      router.push('/auth/signup');
    } else if (cta.includes("Contact")) {
      // Add mailto link or contact form logic
    }
  };

  return (
    <motion.section
      ref={ref}
      id="pricing"
      className="py-20 px-4 md:px-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Flexible Pricing for Everyone</h2>
          <p className="text-lg text-gray-600 mt-2">Choose the plan that’s right for you.</p>
        </div>

        <div className="flex justify-center items-center gap-8 mb-12">
          <div className="flex items-center space-x-2">
            <Label htmlFor="currency-switch">NGN (₦)</Label>
            <Switch
              id="currency-switch"
              checked={currency === 'dollar'}
              onCheckedChange={(checked) => setCurrency(checked ? 'dollar' : 'naira')}
            />
            <Label htmlFor="currency-switch">USD ($)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="billing-switch">Monthly</Label>
            <Switch
              id="billing-switch"
              checked={billingCycle === 'annually'}
              onCheckedChange={(checked) => setBillingCycle(checked ? 'annually' : 'monthly')}
            />
            <Label htmlFor="billing-switch">Annually (Save 10%)</Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col ${plan.main ? 'border-primary shadow-lg' : ''}`}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                <CardDescription>{plan.trial}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">{plan.price[currency][billingCycle]}</span>
                  <span className="text-gray-500">{plan.priceDetails[billingCycle]}</span>
                </div>
                <ul className="space-y-3 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleCtaClick(plan.cta)}  variant={plan.main ? 'default' : 'outline'} className="w-full py-6">
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Pricing;
