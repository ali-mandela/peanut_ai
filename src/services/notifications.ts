export const requestPermission = async () => {
  if (!('Notification' in window)) {
    alert('Notifications not supported')
    return
  }

  const permission = await Notification.requestPermission()
  console.log('Permission:', permission)
  return permission
}

export const sendNotification = (title: string, body: string) => {
  if (Notification.permission !== 'granted') {
    alert('Please enable notifications first')
    return
  }

  const notif = new Notification(title, {
    body,
    icon: '/pwa-192x192.png',
  })

  console.log('Notification sent:', notif)
}