document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const courseTitle = urlParams.get("title");

    const courses = {
        "Основи веб-розробки": {
            description: "Цей курс навчить вас основам HTML, CSS та JavaScript.",
            videos: ["YEmdHbQBCSQ", "ESnrn1kAD4E", "nGhKIC_7Mkk", "Ez8F0nW6S", "ajdRvxDWH4w", "Zg4-uSjxosE", "UmRtFFSDSFo", "gFWhbjzowrM", "P0XMXqDGttU", "7zcXPCt8Ck0"]
        },
        "Python для початківців": {
            description: "Вивчайте основи Python та створюйте свої перші програми!",
            videos: ["PuBadaR8qC4", "PRGkYivK2xI", "BBb_duZIusU", "2gFqUWO-AWM", "NvdSKgQcyuc", "HNChkuE6HyA", "UzOnFDmoJ9w", "5bwpXLHzZRo", "fhxByMe0mq8", "jgNB4GN1UaQ"]
        },
        "UI/UX Дизайн": {
            description: "Опануйте основи UI/UX дизайну та створюйте круті інтерфейси.",
            videos: ["O5IXf8qB9U4", "FlwYtS4mIQw", "SKvsPh0qdQU", "h9r_UpOzajA", "yhqEqcWMoqs", "L1V-C5h1ZE1AhlI", "gJ6cvzZ0ewQ", "FdJz-rfMPFk", "O9-t0DtoobA", "pYQBvAYnL1I"]
        }
    };

    const courseHeader = document.getElementById("course-title");
    const courseDescription = document.getElementById("course-description");
    const videoFrame = document.getElementById("video-frame");
    const nextVideoBtn = document.getElementById("next-video-btn");
    const progressRing = document.getElementById("progress-ring");
    const progressText = document.getElementById("progress-text");

    if (!courseTitle || !courses[courseTitle]) {
        courseHeader.textContent = "Курс не знайдено";
        courseDescription.textContent = "На жаль, цей курс не існує.";
        return;
    }

    courseHeader.textContent = courseTitle;
    courseDescription.textContent = courses[courseTitle].description;

    const videoList = courses[courseTitle].videos;
    let currentVideoIndex = parseInt(localStorage.getItem(`progress_${courseTitle}`)) || 0;

    // Функція для оновлення прогресу
    function updateProgress() {
        let progressPercent = ((currentVideoIndex) / videoList.length) * 100;
        let dashOffset = 283 - (progressPercent / 100) * 283;
        progressRing.style.strokeDashoffset = dashOffset;
        progressText.textContent = `${Math.round(progressPercent)}%`;

        localStorage.setItem(`progress_${courseTitle}`, currentVideoIndex);
    }

    // Функція для завершення курсу
    function completeCourse() {
        currentVideoIndex = videoList.length; 
        updateProgress(); 
        localStorage.setItem(`completed_${courseTitle}`, "true");
        nextVideoBtn.textContent = "Курс завершено"; 
        nextVideoBtn.disabled = true; 
    }

    // Показуємо наступне відео, якщо не останнє, інакше кнопку завершення курсу
    function showNextVideo() {
        if (currentVideoIndex < videoList.length - 1) {
            currentVideoIndex++;
            videoFrame.src = `https://www.youtube.com/embed/${videoList[currentVideoIndex]}`;
            updateProgress();
        } else {
            completeCourse(); 
        }
    }

    // Перевірка, чи курс вже завершений, і зміна тексту кнопки
    if (localStorage.getItem(`completed_${courseTitle}`) === "true") {
        nextVideoBtn.textContent = "Курс завершено"; 
        nextVideoBtn.disabled = true;
        updateProgress(); 
    } else {
        // Якщо курс не завершений, відображаємо перше відео
        videoFrame.src = `https://www.youtube.com/embed/${videoList[currentVideoIndex]}`;
        updateProgress(); 
    }

    nextVideoBtn.addEventListener("click", showNextVideo);

    // Оновлення кнопок для інших курсів
    function updateJoinButtons() {
        document.querySelectorAll(".course").forEach((course) => {
            const title = course.querySelector("h3").textContent;
            const joinBtn = course.querySelector(".join-btn");

            if (localStorage.getItem(`completed_${title}`) === "true") {
                joinBtn.textContent = "Завершено";
                joinBtn.disabled = true;
                joinBtn.style.backgroundColor = "#ccc";
                joinBtn.style.cursor = "not-allowed";
            }
        });
    }

    updateJoinButtons();
});
