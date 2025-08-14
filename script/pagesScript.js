
  const mainPhoto = document.getElementById("mainPhoto");
  const thumbnails = document.querySelectorAll(".thumb");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainPhoto.src = thumb.src;

      // Удаляем класс active у всех
      thumbnails.forEach(t => t.classList.remove("active"));
      // Добавляем active к выбранному
      thumb.classList.add("active");
    });
  });
