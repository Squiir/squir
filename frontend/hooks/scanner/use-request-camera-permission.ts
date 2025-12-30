import { useCameraPermissions } from "expo-camera";
import { useEffect } from "react";

/**
 * Hook to automatically request camera permissions if not granted
 * @param permission - Current camera permission state from useCameraPermissions
 * @param requestPermission - Request function from useCameraPermissions
 */
export function useRequestCameraPermission(
	permission: ReturnType<typeof useCameraPermissions>[0],
	requestPermission: ReturnType<typeof useCameraPermissions>[1],
) {
	useEffect(() => {
		if (!permission || permission.granted) return;
		requestPermission();
	}, [permission, requestPermission]);
}
