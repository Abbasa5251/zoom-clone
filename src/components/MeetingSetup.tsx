"use client";
import {
	DeviceSettings,
	VideoPreview,
	useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const MeetingSetup = ({
	setIsSetupComplete,
}: {
	setIsSetupComplete: (value: boolean) => void;
}) => {
	const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
	const call = useCall();

	if (!call)
		throw new Error("useCall must be used inside StreamCall component");

	useEffect(() => {
		if (isMicCamToggledOn) {
			call?.camera.disable();
			call?.microphone.disable();
		} else {
			call?.camera.enable();
			call?.microphone.enable();
		}
	}, [isMicCamToggledOn, call?.camera, call?.microphone]);

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
			<h1 className="text-2xl font-bold">Setup</h1>
			<VideoPreview />

			<div className="flex h-16 items-center justify-center gap-3">
				<Label
					className="flex items-center justify-center font-medium"
					htmlFor="mic-cam-toggle"
				>
					<Checkbox
						id="mic-cam-toggle"
						checked={isMicCamToggledOn}
						onCheckedChange={(checkedState) =>
							setIsMicCamToggledOn(!!checkedState)
						}
					/>
					Join with Mic and Camera Off
				</Label>
				<DeviceSettings />
			</div>
			<Button
				className="rounded-md bg-green-500 px-4 py-2.5"
				onClick={(e) => {
					call.join();
					setIsSetupComplete(true);
				}}
			>
				{" "}
				Join Meeting
			</Button>
		</div>
	);
};

export default MeetingSetup;
