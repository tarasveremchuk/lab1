document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const courseTitle = urlParams.get("title");

    // Дані курсів (можна розширювати)
    const courses = {
        "Основи веб-розробки": {
            description: "Цей курс навчить вас основам HTML, CSS та JavaScript.",
            videos: ["dQw4w9WgXcQ", "eIrMbAQSU34"]
        },
        "Python для початківців": {
            description: "Вивчайте основи Python та створюйте свої перші програми!",
            videos: ["rfscVS0vtbw", "u3dBdmGJpV0"]
        },
        "UI/UX Дизайн": {
            description: "Опануйте основи UI/UX дизайну та створюйте круті інтерфейси.",
            videos: ["ysEN5RaKOlA", "G6Ccf0ulwIg"]
        }
    };

    // Вставляємо дані
    document.getElementById("course-title").textContent = courseTitle || "Курс";
    document.getElementById("course-description").textContent = courses[courseTitle]?.description || "Опис курсу відсутній.";

    const videoList = document.getElementById("video-list");
    const videos = courses[courseTitle]?.videos || [];

    videos.forEach(videoId => {
        const videoWrapper = document.createElement("div");
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.allowFullscreen = true;
        videoWrapper.appendChild(iframe);
        videoList.appendChild(videoWrapper);
    });
});
