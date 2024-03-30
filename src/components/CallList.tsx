"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";

interface CallListProps {
	type: "ended" | "upcoming" | "recordings";
}

const CallList = ({ type }: CallListProps) => {
	const { isLoading, endedCalls, callRecordings, upcomingCalls } =
		useGetCalls();
	const [recordings, setRecordings] = useState<CallRecording[]>([]);
	const router = useRouter();
	const { toast } = useToast();

	useEffect(() => {
		const fetchRecordings = async () => {
			try {
				const callData = await Promise.all(
					callRecordings.map((meeting) => meeting.queryRecordings())
				);

				const recordings = callData
					.filter((call) => call.recordings.length > 0)
					.flatMap((call) => call.recordings);

				setRecordings(recordings);
			} catch (error) {
				toast({ title: "Try again later" });
			}
		};

		if (type === "recordings") fetchRecordings();
	}, [type, callRecordings]);

	const getCalls = () => {
		switch (type) {
			case "ended":
				return endedCalls;
			case "recordings":
				return recordings;
			case "upcoming":
				return upcomingCalls;
			default:
				return [];
		}
	};
	const getNoCallsMessage = () => {
		switch (type) {
			case "ended":
				return "No Previous Meetings";
			case "recordings":
				return "No Recordings";
			case "upcoming":
				return "No Upcoming Meetings";
			default:
				return "";
		}
	};

	const getIcon = () => {
		switch (type) {
			case "ended":
				return "/icons/previous.svg";
			case "recordings":
				return "/icons/recordings.svg";
			case "upcoming":
				return "/icons/upcoming.svg";
			default:
				return "";
		}
	};

	const handleClick = (meeting: Call | CallRecording) => {
		if (type === "recordings") {
			router.push(`${(meeting as CallRecording).url}`);
		} else {
			router.push(`/meeting/${(meeting as Call).id}`);
		}
	};

	const calls = getCalls();
	const noCallsMessage = getNoCallsMessage();
	const icon = getIcon();

	if (isLoading) return <Loader />;

	return (
		<div className="grid grid-cols-1 gap-5 xl:grid-cols-2 ">
			{calls && calls.length > 0 ? (
				calls.map((meeting: Call | CallRecording) => (
					<MeetingCard
						key={(meeting as Call).id}
						icon={icon}
						title={
							(meeting as Call).state?.custom?.description ||
							(meeting as CallRecording)?.filename ||
							"Personal Meeting"
						}
						date={
							(
								meeting as Call
							).state?.startsAt?.toLocaleString() ||
							(
								meeting as CallRecording
							).start_time.toLocaleString()
						}
						isPreviousMeeting={type === "ended"}
						buttonIcon1={
							type === "recordings"
								? "/icons/play.svg"
								: undefined
						}
						handleClick={() => handleClick(meeting)}
						link={
							type === "recordings"
								? (meeting as CallRecording)?.url
								: `${
										process.env.NEXT_PUBLIC_BASE_URL
								  }/meeting/${(meeting as Call).id}`
						}
						buttonText={type === "recordings" ? "Play" : "Start"}
					/>
				))
			) : (
				<h1>{noCallsMessage}</h1>
			)}
		</div>
	);
};

export default CallList;
