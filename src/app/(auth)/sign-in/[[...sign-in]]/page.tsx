import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
	return (
		<main className="h-screen w-screen flex-center">
			<SignIn afterSignInUrl="/" signUpUrl="/sign-up" />
		</main>
	);
};

export default SignInPage;
