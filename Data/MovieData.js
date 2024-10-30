export const MoviesData = [
  {
    userId: "671f973fd30778c37f8306cb", // Замените на настоящий ObjectId
    name: "Пример фильма",
    desc: "Это описание примера фильма, которое подробно описывает сюжет и детали.",
    titleImage: "https://example.com/title-image.jpg",
    image: "https://example.com/movie-image.jpg",
    category: "Драма",
    language: "Русский",
    year: 2021,
    time: 120, // Время фильма в минутах
    video: "https://example.com/movie-video.mp4",
    rate: 4.5,
    numberOfReview: 150,
    reviews: [
      {
        userName: "Иван Иванов",
        userImage: "https://example.com/user-image.jpg",
        rating: 5,
        comment: "Отличный фильм, рекомендую!",
        userId: "671f973fd30778c37f8306cb", // Замените на настоящий ObjectId
      },
    ],
    casts: [
      {
        name: "Алексей Петров",
        image: "https://example.com/cast-image.jpg",
      },
      {
        name: "Мария Иванова",
        image: "https://example.com/cast-image2.jpg",
      },
    ],
  },
  {
    userId: "671f973fd30778c37f8306cb", // Пример следующего фильма
    name: "Другой фильм",
    desc: "Описание другого фильма с различными событиями и персонажами.",
    titleImage: "https://example.com/title-image2.jpg",
    image: "https://example.com/movie-image2.jpg",
    category: "Комедия",
    language: "Русский",
    year: 2020,
    time: 95,
    video: "https://example.com/movie-video2.mp4",
    rate: 4.2,
    numberOfReview: 200,
    reviews: [],
    casts: [
      {
        name: "Николай Сидоров",
        image: "https://example.com/cast-image3.jpg",
      },
    ],
  },
];
