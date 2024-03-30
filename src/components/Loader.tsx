import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
	return (
		<div className="flex-center h-screen w-full">
			<Loader2
				className="text-white animate-spin"
				width={32}
				height={32}
			/>
		</div>
	);
};

export default Loader;
