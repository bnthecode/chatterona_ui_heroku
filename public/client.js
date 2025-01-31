const publicKey =
  "BBAhOc0EkO60gUKuTHhPDwSJzpfe7mTheYdB7pOrN8EX-AxujxbYYJYVfajhqp7iXIp2TMM8-hoM_7APR-ERHiE";

if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  // console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log(`%c[SERVICEWORKER] registered worker`, "color:Yellow");

  // Register Push
  // console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });
  console.log(`%c[SERVICEWORKER] push registered`, "color:Yellow");

  console.log(`%c[SERVICEWORKER] sending push notification`, "color:Yellow");
  await fetch("http://localhost:3003/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log(`%c[SERVICEWORKER] push notification sent`, "color:Yellow");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
