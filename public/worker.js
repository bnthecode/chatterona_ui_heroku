console.log("Service Worker Loaded...");

self.addEventListener("message", (e) => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified by Brandons Notification!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });
});
