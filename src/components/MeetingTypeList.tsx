"use client";

import Card from "./Card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
	const router = useRouter();
	const [meetingState, setmeetingState] = useState<
		| "isScheduleMeeting"
		| "isInstantMeeting"
		| "isJoiningMeeting"
		| undefined
	>();
	const [values, setValues] = useState({
		dateTime: new Date(),
		description: "",
		link: "",
	});
	const [callDetails, setCallDetails] = useState<Call>();
	const { user } = useUser();
	const client = useStreamVideoClient();
	const { toast } = useToast();

	const createMeeting = async () => {
		if (!client || !user) return;

		try {
			if (!values.dateTime) {
				toast({
					title: "Please select a date and time",
				});
				return;
			}
			const id = crypto.randomUUID();
			const call = client.call("default", id);

			if (!call) throw new Error("Failed to create call");

			const startsAt =
				values.dateTime.toISOString() ||
				new Date(Date.now()).toISOString();

			const description = values.description || "Instant Meeting";
			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			});
			setCallDetails(call);
			if (!values.description) {
				router.push(`/meeting/${call.id}`);
			}
			toast({
				title: "Meeting Created",
			});
		} catch (error) {
			console.error(error);
			toast({
				title: "Failed to create meeting",
				variant: "destructive",
			});
		}
	};

	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

	return (
		<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
			<Card
				img={"/icons/add-meetings.svg"}
				title="New Meeting"
				description="Start an instant meeting"
				handleClick={() => setmeetingState("isInstantMeeting")}
				className="bg-orange-500/85"
			/>
			<Card
				img={"/icons/schedule.svg"}
				title="Schedule Meeting"
				description="Plan your meeting"
				handleClick={() => setmeetingState("isScheduleMeeting")}
				className="bg-blue-500/85"
			/>
			<Card
				img={"/icons/recordings.svg"}
				title="View Recordings"
				description="Checkout your recordings"
				handleClick={() => router.push("/recordings")}
				className="bg-purple-500/85"
			/>
			<Card
				img={"/icons/join-meetings.svg"}
				title="Join Meeting"
				description="Via Invitation link"
				handleClick={() => setmeetingState("isJoiningMeeting")}
				className="bg-yellow-500/85"
			/>

			{!callDetails ? (
				<MeetingModal
					isOpen={meetingState === "isScheduleMeeting"}
					onClose={() => setmeetingState(undefined)}
					title="Create Meeting"
					handleClick={createMeeting}
				>
					<div className="flex w-full flex-col gap-2.5">
						<Label
							htmlFor=""
							className="text-base font-normal leading-[22px] text-main-2"
						>
							Add a description
						</Label>
						<Textarea
							className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
							onChange={(e) => {
								setValues({
									...values,
									description: e.target.value,
								});
							}}
						/>
					</div>
					<div className="flex w-full flex-col gap-2.5">
						<Label
							htmlFor=""
							className="text-base font-normal leading-[22px] text-main-2"
						>
							Select Date and Time
						</Label>
						<ReactDatePicker
							selected={values.dateTime}
							onChange={(date) => {
								setValues({ ...values, dateTime: date! });
							}}
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={15}
							timeCaption="time"
							dateFormat="MMMM d, yyyy h:mm aa"
							className="w-full rounded bg-dark-3 p-2 focus:outline-none"
						/>
					</div>
				</MeetingModal>
			) : (
				<MeetingModal
					isOpen={meetingState === "isScheduleMeeting"}
					onClose={() => setmeetingState(undefined)}
					title="Meeting Created"
					className="text-center"
					buttonText="Copy Meeting Link"
					handleClick={() => {
						navigator.clipboard.writeText(meetingLink);
						toast({
							title: "Link Copied!",
						});
					}}
					image="/icons/checked.svg"
					buttonIcon="/icons/copy.svg"
				/>
			)}
			<MeetingModal
				isOpen={meetingState === "isInstantMeeting"}
				onClose={() => setmeetingState(undefined)}
				title="Start the instant meeting"
				className="text-center"
				buttonText="Start Meeting"
				handleClick={createMeeting}
			/>
			<MeetingModal
				isOpen={meetingState === "isJoiningMeeting"}
				onClose={() => setmeetingState(undefined)}
				title="Type the link here"
				className="text-center"
				buttonText="Join Meeting"
				handleClick={() => router.push(values.link)}
			>
				<Input
					placeholder="Enter the link here"
					className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
					onChange={(e) =>
						setValues({ ...values, link: e.target.value })
					}
				/>
			</MeetingModal>
		</section>
	);
};

export default MeetingTypeList;
