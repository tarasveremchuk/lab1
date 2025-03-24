document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const courseTitle = urlParams.get("title");

    const courses = {
        "Основи веб-розробки": {
            description: "Цей курс навчить вас основам HTML, CSS та JavaScript.",
            videos: ["dQw4w9WgXcQ", "eIrMbAQSU34", "M8jFvOTCh28", "3JluqTojuME", "kUMe1FH4CHE", "yfoY53QXEnI", "SgQhwtIoQ7o", "mJgBOIoGihA", "zJSY8tbf_ys", "Qqx_wzMmFeA"]
        },
        "Python для початківців": {
            description: "Вивчайте основи Python та створюйте свої перші програми!",
            videos: ["PuBadaR8qC4", "PRGkYivK2xI", "BBb_duZIusU", "2gFqUWO-AWM", "NvdSKgQcyuc", "HNChkuE6HyA", "UzOnFDmoJ9w", "5bwpXLHzZRo", "fhxByMe0mq8", "jgNB4GN1UaQ"]
        },
        "UI/UX Дизайн": {
            description: "Опануйте основи UI/UX дизайну та створюйте круті інтерфейси.",
            videos: ["ysEN5RaKOlA", "G6Ccf0ulwIg", "D5D1PfI1jP8", "BDx6S5GxBdM", "QMgbiUUosOE", "L1V-kSYm5VQ", "8h9n1MNrshM", "u9GOm3izfGg", "8UCiSP2qWqU", "wdx3U5JM8FY"]
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
        let progressPercent = ((currentVideoIndex) / videoList.length) * 100; // Початковий прогрес 0%
        let dashOffset = 283 - (progressPercent / 100) * 283;
        progressRing.style.strokeDashoffset = dashOffset;
        progressText.textContent = `${Math.round(progressPercent)}%`;

        localStorage.setItem(`progress_${courseTitle}`, currentVideoIndex);
    }

    // Функція для завершення курсу
    function completeCourse() {
        // Оновлюємо прогрес на 100%
        currentVideoIndex = videoList.length; // встановлюємо максимальний індекс відео, тобто завершення курсу
        updateProgress(); // Оновлюємо прогрес
        localStorage.setItem(`completed_${courseTitle}`, "true");
        nextVideoBtn.textContent = "Курс завершено"; // Змінюємо текст кнопки
        nextVideoBtn.disabled = true; // Вимикаємо кнопку
    }

    // Показуємо наступне відео, якщо не останнє, інакше кнопку завершення курсу
    function showNextVideo() {
        if (currentVideoIndex < videoList.length - 1) {
            currentVideoIndex++;
            videoFrame.src = `https://www.youtube.com/embed/${videoList[currentVideoIndex]}`;
            updateProgress();
        } else {
            completeCourse(); // Якщо це останнє відео, одразу завершуємо курс
        }
    }

    // Перевірка, чи курс вже завершений, і зміна тексту кнопки
    if (localStorage.getItem(`completed_${courseTitle}`) === "true") {
        nextVideoBtn.textContent = "Курс завершено"; // Якщо курс завершено, змінюємо текст на "Курс завершено"
        nextVideoBtn.disabled = true;
        updateProgress(); // Оновлюємо прогрес на 100%
    } else {
        // Якщо курс не завершений, відображаємо перше відео
        videoFrame.src = `https://www.youtube.com/embed/${videoList[currentVideoIndex]}`;
        updateProgress(); // Початковий прогрес 0%
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
