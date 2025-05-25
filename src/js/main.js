import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import JustValidate from "just-validate";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "/src/sass/style.scss";
import { rule } from "postcss/lib/postcss";

const burger = document.querySelector(".burger"),
  close = document.querySelector(".header__menu-close"),
  menu = document.querySelector(".header__menu");

burger.addEventListener("click", () => {
  menu.classList.add("header__menu_active");
  document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
  menu.classList.remove("header__menu_active");
  document.body.style.overflow = "";
});
try {
  const tabs = document.querySelectorAll(".catalog__tab");
  const contents = document.querySelectorAll(".catalog__content-item");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // Удаляем активный класс у всех табов и контента
      tabs.forEach((t) => t.classList.remove("catalog__tab_active"));
      contents.forEach((c) => (c.style.display = "none"));

      // Добавляем активный класс к нажатому табу и показываем соответствующий контент
      tab.classList.add("catalog__tab_active");
      const id = tab.id;
      contents.forEach((item, i) => {
        if (item.id == id || item.id.split(" ").includes(id)) {
          contents[i].style.display = "block";
        }
      });
    });
  });

  // Показываем первый контент при загрузке
  contents.forEach((c, i) => (c.style.display = i < 3 ? "block" : "none"));
} catch (e) {}

// Обратите внимание, что значение block (в двух местах) можно спокойно поменять на flex, если вам это необходимо
try {
  const swiper = new Swiper(".works__swiper", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".icon-right-open",
      prevEl: ".icon-left-open",
    },
    breakpoints: {
      // when window width is >= 1200px
      1200: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      1920: {
        slidesPerView: 3,
        spaceBetween: 35,
      },
    },

    // configure Swiper to use modules
    modules: [Navigation, Pagination],
  });
} catch (e) {}

try {
  const validator = new JustValidate("form");

  validator
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Please fill the name",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Please 2",
      },
    ])
    .addField("#email", [
      {
        rule: "required",
      },
      {
        rule: "email",
      },
    ])
    .addField(
      "#question",
      [
        {
          rule: "required",
        },
        {
          rule: "minLength",
          value: 5,
        },
      ],
      {
        errorsContainer: document
          .querySelector("#question")
          .parentElement.querySelector(".error-message"),
      }
    )
    .addField(
      "#checkbox",
      [
        {
          rule: "required",
        },
      ],
      {
        errorsContainer: document
          .querySelector("#checkbox")
          .parentElement.parentElement.querySelector(".checkbox-error-message"),
      }
    )
    .onSuccess((event) => {
      const form = event.currentTarget;
      const formData = new FormData(form);

      fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Success", data);
          form.reset();
        });
    });
} catch (e) {}

try {
  const validatorBeta = new JustValidate(".footer__form");

  validatorBeta
    .addField(
      "#email",
      [
        {
          rule: "email",
        },
        { rule: "required", errorMessage: "Please fill the email" },
      ],
      {
        errorsContainer: document
          .querySelector(".footer__input")
          .parentElement.querySelector(".error-message"),
      }
    )
    .addField(
      "#checkbox-2",
      [
        {
          rule: "required",
          errorMessage: "Please fill ",
        },
      ],
      {
        errorsContainer: document
          .querySelector("#checkbox-2")
          .parentElement.parentElement.querySelector(
            ".checkbox-2-error-message"
          ),
      }
    );
} catch (e) {}
