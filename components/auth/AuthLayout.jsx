"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Eye, EyeOff, MoveLeft } from "lucide-react"
import Link from "next/link"

const AuthLayout = ({ page }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-start justify-center">
            <Button variant="outline" type="button" onClick={() => router.back()}>
                <MoveLeft />
                Back
            </Button>
            <Card className="flex flex-col items-start justify-center w-full max-w-md rounded-lg space-y-4">
                <div className="flex flex-col items-start justify-center space-y-1 px-6">
                    <CardTitle className="text-3xl text-left">{page === 'signin' ? (
                        `Welcome Back!`
                    ) : `Create an Account`}</CardTitle>
                    <CardDescription className="text-left"> {page === 'signin' ? (`Continue from where you left off`)
                        : `Embark on a journey of stress-free attendance taking.`}
                    </CardDescription>
                </div>
                <CardContent className="w-full">
                    <form className="flex flex-col items-start justify-center w-full space-y-3">
                        {page === 'signin' ? (
                            <div className="flex flex-col items-start justify-center w-full space-y-3">
                                <fieldset className="w-full space-y-2">
                                    <Label htmlFor="email" className="text-base">Email</Label>
                                    <Input id="email" type="email" className="w-full" required />
                                </fieldset>
                                <fieldset className="w-full space-y-1">
                                    <div className="flex justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Button type="button" variant="link" onClick={() => router.push("/auth/forgot-password")}>Forgot password?</Button>
                                    </div>
                                    <div className="relative flex w-full">
                                        <Input id="password" type={showPassword ? "text" : "password"} className="w-full" required />
                                        <Button type="button" onClick={() => setShowPassword(!showPassword)} variant="ghost" size="icon" className="absolute text-center right-0">
                                            {showPassword ?
                                                <EyeOff /> : <Eye />
                                            }
                                        </Button>
                                    </div>
                                </fieldset>
                            </div>
                        ) : (
                            <div className="flex flex-col items-start justify-center w-full space-y-3">
                                <fieldset className="w-full space-y-2">
                                    <Label htmlFor="fullName">Full name</Label>
                                    <Input id="fullName" type="text" className="w-full" required />
                                </fieldset>
                                <fieldset className="w-full space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" className="w-full" required />
                                </fieldset>
                                <fieldset className="w-full space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative flex w-full">
                                        <Input id="password" type={showPassword ? "text" : "password"} className="w-full" required />
                                        <Button type="button" onClick={() => setShowPassword(!showPassword)} variant="ghost" size="icon" className="absolute text-center right-0">
                                            {showPassword ?
                                                <EyeOff /> : <Eye />
                                            }
                                        </Button>
                                    </div>
                                </fieldset>
                            </div>
                        )
                        }
                        <Button type="submit" className="w-full">
                            {page === 'signin' ? (
                                `Sign in`
                            ) : (
                                `Create Account`
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center w-full">
                    <p> Or
                    </p>
                    <Button type='button' variant="outline" className="w-full">
                        Signin with Google
                    </Button>
                    {page === "signin" ? (
                        <p className="text-sm text-center">
                            Don't have an account? 
                            <Button variant="link" type="button" onClick={() => router.push("/auth/signup")} className="text-black">Create one </Button>
                        </p>
                    ) : (
                        <p className="text-sm text-center">
                            Already have an account?
                            <Button variant="link" type="button" onClick={() => router.push("/auth/signin")} className="text-black">Sign in here </Button>
                        </p>
                    )
                    }
                </CardFooter>
            </Card>
        </section>
    )
}
export default AuthLayout