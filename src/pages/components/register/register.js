import {
    Button,
    Card,
    Checkbox,
    Input,
    Typography,
} from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { hash } from "../../../lib/crypto";
export function Register() {
    const [addRes, setAddRes] = React.useState({success: true, message: null});
    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/users/add', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                password: hash(formData.get("password")),
                isAdmin: false
            }),
        }).then(res => res.json())

        setAddRes({success: response.success, message: response.message})
        if(response.success) {
            await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                callbackUrl: "/projects",
            })
        }
    }

    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            <form className="mt-4 gap-4 flex flex-col mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={onSubmit}>
                {!addRes.success ?
                    <p className="text-[var(--message-warn)]">{addRes.message}</p>
                    :
                    <></>
                }
                <Input required size="lg" label="Name" type="text" id="name" name="name" />
                <Input required size="lg" label="Email" type="email" id="email" name="email" />
                <Input required type="password" size="lg" label="Password" name="password" />
                <Checkbox
                required
                    label={
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                        >
                            I agree the
                            <a
                                href="#"
                                className="font-medium transition-colors hover:text-gray-900"
                            >
                                &nbsp;Terms and Conditions
                            </a>
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button type="submit" value="Submit" >
                    Register
                </Button>

                <Typography color="gray" className="text-center font-normal">
                    Already have an account?{" "}
                    <Link href='/api/auth/signin' className="font-medium text-gray-900">
                        Sign In
                    </Link>
                </Typography>
            </form>
        </Card>
    );
}