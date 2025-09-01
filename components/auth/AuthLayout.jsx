import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const AuthLayout = ({page}) => {
    return (
        <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
            <div className="flex flex-col p-6 items-start justify-center w-full max-w-md border-1 border-gray-400 rounded-lg space-y-5">
                <div className="flex flex-col items-start justify-center space-y-1">
            <h1 className="text-3xl font-bold text-left">{page === 'signin' ? (
                `Welcome Back!`
            ): `Create an Account`}</h1>
            <p className="text-gray-500 text-left"> Continue from where you left off
            </p>
            </div>
            <form className="flex flex-col items-start justify-center w-full space-y-3">
                {page === 'signin' ? (
                    <div className="flex flex-col items-start justify-center w-full space-y-3">
                <fieldset className="w-full space-y-2">
                    <Label htmlFor="email" className="text-gray-600">Email</Label>
                    <Input id="email" type="email" className="w-full" required/>
                </fieldset>
                <fieldset className="w-full space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" className="w-full" required/>
                </fieldset>
                    </div>
                ): (
                    <div className="flex flex-col items-start justify-center w-full space-y-3">
                     <fieldset className="w-full space-y-2">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input id="fullName" type="text" className="w-full" required/>
                    </fieldset>
                <fieldset className="w-full space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="w-full" required/>
                </fieldset>
                <fieldset className="w-full space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" className="w-full" required/>
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
            {page === "signin" ? (
                <p className="text-gray-500 text-sm text-center">
                Don't have an account? {""}
                <Link href="/auth/signup" className="text-black">Create one </Link>
                </p>
            ) : (
                <p className="text-gray-500 text-sm text-center">
                Already have an account?  {""}
                <Link href="/auth/signin" className="text-black">Sign in here</Link> 
                </p>
            )
        }
            </div>
        </section>
    )
}
export default AuthLayout