document.addEventListener("DOMContentLoaded", function () {
    // 1. Вибір всіх пунктів меню
    // const menuItems = document.querySelectorAll(".navbar ul li a");
    
    // // 2. Перебір кожного пункту меню
    // menuItems.forEach((item, index) => {
    //     // 3. Зміна кольору фону на основі індексу
    //     if (index % 2 === 0) {
    //         item.style.color = "blue";
    //     } else {
    //         item.style.color = "green";
    //     }
    // });

    // 6. Зміна заголовка секції "Our courses"
    const courseTitle = document.querySelector(".course-section h2");
    if (courseTitle) {
        courseTitle.textContent = "Наші курси!";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("auth-modal");
    const signInBtn = document.querySelector(".sign-in-btn");
    const closeBtn = document.querySelector(".close-btn");
    const authForm = document.getElementById("auth-form");
    const signUpForm = document.getElementById("signup-form");
    const toggleSignup = document.getElementById("toggle-signup");
    const toggleLogin = document.getElementById("toggle-login");
    const modalTitle = document.querySelector(".modal-content h2");

    // URL сервера
    const API_URL = "http://localhost:3000";

    // Відкриття модального вікна
    signInBtn.addEventListener("click", function () {
        modal.style.display = "block";
        authForm.style.display = "block";
        signUpForm.style.display = "none"; 
        modalTitle.textContent = "Sign In";
    });

    // Закриття модального вікна
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Закриття при кліку за межі модального вікна
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Перемикання між формами
    toggleSignup.addEventListener("click", function (event) {
        event.preventDefault();
        authForm.style.display = "none";
        signUpForm.style.display = "block";
        modalTitle.textContent = "Sign Up";
    });

    toggleLogin.addEventListener("click", function (event) {
        event.preventDefault();
        signUpForm.style.display = "none";
        authForm.style.display = "block";
        modalTitle.textContent = "Sign In";
    });

    // Обробка форми входу
    authForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message === "Logged in successfully!") {
                modal.style.display = "none";
            }
        })
        .catch(error => console.error("Error:", error));
    });

    // Обробка форми реєстрації
    signUpForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname, email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message === "Registered successfully!") {
                modal.style.display = "none";
            }
        })
        .catch(error => console.error("Error:", error));
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const scheduleBtn = document.getElementById("schedule-btn");
    const scheduleModal = document.getElementById("schedule-modal");
    const closeModal = scheduleModal.querySelector(".close-btn2");
    const scheduleBody = document.getElementById("schedule-body");

    scheduleBtn.addEventListener("click", function (e) {
        e.preventDefault();
        scheduleModal.style.display = "flex";
        renderSchedule();
    });

    closeModal.addEventListener("click", function () {
        scheduleModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === scheduleModal) {
            scheduleModal.style.display = "none";
        }
    });

    function getTimeRemaining(startDate) {
        const total = Date.parse(startDate) - Date.parse(new Date());
        return {
            total,
            days: Math.floor(total / (1000 * 60 * 60 * 24)),
            hours: Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((total / 1000 / 60) % 60),
            seconds: Math.floor((total / 1000) % 60)
        };
    }

    const courses = [
        { name: "Web Development Basics", date: "March 20, 2025 10:00:00", description: "Цей курс допоможе вам освоїти основи веб-розробки, включаючи HTML, CSS та JavaScript." },
        { name: "Python for Beginners", date: "March 22, 2025 13:00:00", description: "Навчіться основам програмування на Python, включаючи синтаксис, структури даних та основні алгоритми." },
        { name: "UI/UX Design", date: "March 25, 2025 15:00:00", description: "Розкрийте секрети ефективного дизайну користувацького інтерфейсу та досвіду користувача." }
    ];

    function renderSchedule() {
        scheduleBody.innerHTML = "";
        courses.forEach((course, index) => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");

            courseCard.innerHTML = `
                <h3>${course.name}</h3>
                <p class='course-description'>${course.description}</p>
                <p><strong>Starts in:</strong> <span class="timer" data-index="${index}"></span></p>
                <button class='view-course-btn' data-course='#courses'>Переглянути курс</button>
            `;

            scheduleBody.appendChild(courseCard);
        });

        document.querySelectorAll(".view-course-btn").forEach(button => {
            button.addEventListener("click", function () {
                window.location.href = button.getAttribute("data-course");
                scheduleModal.style.display = "none";
            });
        });

        updateTimers();
    }

    function updateTimers() {
        document.querySelectorAll(".timer").forEach((timer, index) => {
            const timeRemaining = getTimeRemaining(courses[index].date);
            timer.textContent = `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`;
        });
    }

    setInterval(updateTimers, 1000);
});


document.addEventListener("DOMContentLoaded", function () {
    const reviews = document.querySelector(".reviews");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let scrollAmount = 0;
    const cardWidth = document.querySelector(".review-card").offsetWidth + 10;

    nextBtn.addEventListener("click", () => {
        reviews.scrollBy({ left: cardWidth, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
        reviews.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });

    // Додаємо підтримку свайпу
    let isDown = false;
    let startX;
    let scrollLeft;

    reviews.addEventListener("mousedown", (e) => {
        isDown = true;
        reviews.classList.add("active");
        startX = e.pageX - reviews.offsetLeft;
        scrollLeft = reviews.scrollLeft;
    });

    reviews.addEventListener("mouseleave", () => {
        isDown = false;
        reviews.classList.remove("active");
    });

    reviews.addEventListener("mouseup", () => {
        isDown = false;
        reviews.classList.remove("active");
    });

    reviews.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reviews.offsetLeft;
        const walk = (x - startX) * 2; // Швидкість прокрутки
        reviews.scrollLeft = scrollLeft - walk;
    });

    // Свайп для мобільних
    let touchStartX = 0;
    let touchEndX = 0;

    reviews.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    reviews.addEventListener("touchmove", (e) => {
        touchEndX = e.touches[0].clientX;
    });

    reviews.addEventListener("touchend", () => {
        if (touchStartX - touchEndX > 50) {
            reviews.scrollBy({ left: cardWidth, behavior: "smooth" });
        } else if (touchEndX - touchStartX > 50) {
            reviews.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }
    });
});





document.addEventListener("DOMContentLoaded", function () {
    const joinButtons = document.querySelectorAll(".join-btn");

    joinButtons.forEach(button => {
        button.addEventListener("click", function () {
            const course = this.closest(".course");
            const courseData = {
                title: course.querySelector("h3").innerText,
                price: course.querySelector(".price").innerText,
                duration: course.querySelector(".detail-item:nth-child(1) p").innerText,
                videos: course.querySelector(".detail-item:nth-child(2) p").innerText,
                students: course.querySelector(".detail-item:nth-child(3) p").innerText,
                image: course.querySelector("img").src
            };

            // Збереження курсу в localStorage
            let myCourses = JSON.parse(localStorage.getItem("myCourses")) || [];
            if (!myCourses.some(c => c.title === courseData.title)) {
                myCourses.push(courseData);
            }
            localStorage.setItem("myCourses", JSON.stringify(myCourses));

            // Оновлення кнопки
            this.style.background = "#2ecc71"; // Зелений колір
            this.innerText = "Переглянути";
            this.dataset.view = "true"; // Позначаємо, що курс уже додано

            // Додаємо посилання на кнопку
            this.addEventListener("click", function () {
                window.location.href = `course.html?title=${encodeURIComponent(courseData.title)}&price=${encodeURIComponent(courseData.price)}&duration=${encodeURIComponent(courseData.duration)}&videos=${encodeURIComponent(courseData.videos)}&students=${encodeURIComponent(courseData.students)}&image=${encodeURIComponent(courseData.image)}`;
            });
        });
    });
});

