import { toast } from "react-hot-toast"

// Common Toast Options
const COMMON_OPTIONS = {
	duration: 2000,
	position: "top-center",
	// Aria
	ariaProps: {
		role: "status",
		"aria-live": "polite",
	},
}

// Success Toast Options
const SUCCESS_OPTIONS = {
	...COMMON_OPTIONS, // Spread the common options
	icon: "✅",
	style: {
		border: "1px solid #4CAF50", // Example of custom styling for success
		color: "#4CAF50",
	},
}

// Error Toast Options
const ERROR_OPTIONS = {
	...COMMON_OPTIONS, // Spread the common options
	icon: "❌",
	style: {
		border: "1px solid #F44336", // Example of custom styling for error
		color: "#F44336",
	},
}

// Toast function
export const showToast = (type: string, message: string) => {
	if (type === "success") {
		toast.success(message, SUCCESS_OPTIONS)
	} else if (type === "error") {
		toast.error(message, ERROR_OPTIONS)
	} else {
		toast(message, COMMON_OPTIONS) // Default notification
	}
}
