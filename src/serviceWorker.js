// serviceWorkerRegistration.js

// Đây là file chứa logic đăng ký service worker.
// Service worker giúp làm cho ứng dụng của bạn hoạt động như một PWA (offline, cài đặt lên màn hình chính, v.v.)

const isLocalhost = Boolean(
	window.location.hostname === "localhost" ||
		// [::1] là địa chỉ cục bộ IPv6.
		window.location.hostname === "[::1]" ||
		// 127.0.0.0/8 được coi là cục bộ IPv4.
		window.location.hostname.match(/^127(?:\.\d{1,3}){3}$/),
)

export function register(config) {
	if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
		// URL của service worker từ file build.
		const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href)
		if (publicUrl.origin !== window.location.origin) {
			// Không đăng ký service worker nếu PUBLIC_URL không cùng nguồn gốc.
			return
		}

		window.addEventListener("load", () => {
			const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`

			if (isLocalhost) {
				// Đây là localhost. Kiểm tra service worker ở localhost.
				checkValidServiceWorker(swUrl, config)

				// Thêm log để phát hiện ứng dụng đang chạy ở localhost.
				navigator.serviceWorker.ready.then(() => {
					console.log(
						"Ứng dụng này đang được phục vụ bằng bộ đệm nội bộ service worker.",
					)
				})
			} else {
				// Không phải localhost. Đăng ký service worker.
				registerValidSW(swUrl, config)
			}
		})
	}
}

function registerValidSW(swUrl, config) {
	navigator.serviceWorker
		.register(swUrl)
		.then((registration) => {
			registration.onupdatefound = () => {
				const installingWorker = registration.installing
				if (installingWorker == null) {
					return
				}
				installingWorker.onstatechange = () => {
					if (installingWorker.state === "installed") {
						if (navigator.serviceWorker.controller) {
							// Nội dung được cập nhật.
							console.log("Nội dung mới đã sẵn sàng để sử dụng.")

							// Thực hiện callback nếu được cung cấp.
							if (config && config.onUpdate) {
								config.onUpdate(registration)
							}
						} else {
							// Nội dung được bộ đệm cho lần sử dụng sau.
							console.log("Nội dung được bộ đệm cho lần sử dụng offline.")

							// Thực hiện callback nếu được cung cấp.
							if (config && config.onSuccess) {
								config.onSuccess(registration)
							}
						}
					}
				}
			}
		})
		.catch((error) => {
			console.error("Lỗi khi đăng ký service worker:", error)
		})
}

function checkValidServiceWorker(swUrl, config) {
	fetch(swUrl, {
		headers: { "Service-Worker": "script" },
	})
		.then((response) => {
			const contentType = response.headers.get("content-type")
			if (
				response.status === 404 ||
				(contentType != null && contentType.indexOf("javascript") === -1)
			) {
				// Không tìm thấy service worker hoặc nó không phải là file JS.
				navigator.serviceWorker.ready.then((registration) => {
					registration.unregister().then(() => {
						window.location.reload()
					})
				})
			} else {
				// Tìm thấy service worker, tiếp tục đăng ký.
				registerValidSW(swUrl, config)
			}
		})
		.catch(() => {
			console.log(
				"Không thể kết nối với service worker. Ứng dụng đang chạy ở chế độ offline.",
			)
		})
}

export function unregister() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.ready
			.then((registration) => {
				registration.unregister()
			})
			.catch((error) => {
				console.error(error.message)
			})
	}
}
