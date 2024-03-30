import React, { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Divide } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	buttonText?: string;
	image?: string;
	buttonIcon?: string;
	className?: string;
	children?: ReactNode;
	handleClick?: () => void;
}

const MeetingModal = ({
	isOpen,
	onClose,
	title,
	buttonText,
	image,
	buttonIcon,
	className,
	handleClick,
	children,
}: MeetingModalProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
				<div className="flex flex-col gap-6">
					{image && (
						<div className="flex justify-center">
							<Image
								src={image}
								alt="image"
								width={72}
								height={72}
							/>
						</div>
					)}
					<h1
						className={cn(
							"text-3xl font-bold leading-[42px]",
							className
						)}
					>
						{title}
					</h1>
					{children}
					<Button
						className="bg-main-1 focus-visible:ring-0 focus-visible:ring-offset-0 text-dark-1 font-semibold"
						onClick={handleClick}
					>
						{buttonIcon && (
							<Image
								src={buttonIcon}
								alt="button icon"
								width={13}
								height={13}
							/>
						)}{" "}
						&nbsp;
						{buttonText || "Schedule Meeting"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default MeetingModal;
