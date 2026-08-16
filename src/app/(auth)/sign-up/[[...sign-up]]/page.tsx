import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
	return (
		<main className="h-screen w-screen flex-center">
			<SignUp afterSignUpUrl="/" signInUrl="/sign-in" />
		</main>
	);
};

export default SignUpPage;
