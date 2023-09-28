self.addEventListener('message', (event) => {

    if (event.data.type === 'task') {
        const tasks = event.data.data;

        setInterval(() => {
            // Проверяем каждую задачу в списке
            tasks.forEach(task => {
                const deadline = new Date(task.deadline);
                const currentDate = new Date();

                if (deadline.getDay() >= currentDate.getDay()
                    && deadline.getMonth() >= currentDate.getMonth()) {

                    // Отправляем уведомление о задаче, если срок подходит к завершению
                    const notificationOptions = {
                        body: `${task.title} - ${task.deadline}`,
                    };
                    self.registration.showNotification('Deadline reminder', notificationOptions);
                }
            });
        }, 24 * 60 * 60 * 1000); // Каждые 24 часа
    }
});