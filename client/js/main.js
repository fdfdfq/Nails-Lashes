document.addEventListener("DOMContentLoaded", async () => {

    console.log("🚀 Nails & Lashes запущен");

    try{

        await loadMasters();

        await loadServices();

        await loadReviews();

        initGallery();

        initScroll();

        initAnimation();

        initBookingForm();

    }catch(error){

        console.error(
            "Ошибка запуска сайта:",
            error
        );

    }

});

// ==========================
// Глобальные данные
// ==========================

let mastersData = [];
let reviewsData = [];
let servicesData = [];


// ==========================
// Загрузка мастеров
// ==========================

async function loadMasters(){

    try{

const response = await fetch(
    "http://localhost:3000/api/masters"
);

if(!response.ok){

    throw new Error(
        "Ошибка загрузки мастеров"
    );

}

mastersData = await response.json();

        renderMasters();


        fillMasterSelect();


        filterServicesByMaster();

    }catch(error){

        console.error(
            "Ошибка загрузки мастеров:",
            error
        );

    }

}


// ==========================
// Карточки мастеров
// ==========================

function renderMasters(){

    const container =
    document.querySelector(".masters-container");


    if(!container) return;


    container.innerHTML = "";


    mastersData.forEach(master => {


let photo = "";

if(master.name === "Татьяна"){
    photo = "tatyana.jpg";
}
else if(master.name === "Карина"){
    photo = "karina.jpg";
}



        container.innerHTML += `

        <div class="master-card">


            <img 
            src="images/masters/${photo}"
            alt="${master.name}"
            >


            <div class="master-info">


                <h3>
                    ${master.name}
                </h3>


                <p>
                    ${master.profession}
                </p>


                <button 
                class="booking-master-btn"
                data-master="${master.id}"
                >

                    Записаться

                </button>


            </div>


        </div>

        `;


    });



    // кнопки записи с карточек

    document
    .querySelectorAll(".booking-master-btn")
    .forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                const masterId =
                button.dataset.master;



                const select =
                document.getElementById(
                    "master_id"
                );



                if(select){


                    select.value = masterId;


                    filterServicesByMaster();


                }



                document
                .getElementById("booking")
                ?.scrollIntoView({

                    behavior:"smooth"

                });


            }
        );


    });


}

// ==========================
// Выбор мастера в форме
// ==========================

function fillMasterSelect(){

    const select =
    document.getElementById(
        "master_id"
    );


    if(!select) return;


    select.innerHTML = "";



    mastersData.forEach(master=>{


        select.innerHTML += `

        <option value="${master.id}">

            ${master.name}

        </option>

        `;


    });



}
// ==========================
// Загрузка услуг
// ==========================

async function loadServices(){

    try{


const response =
await fetch(
    "http://localhost:3000/api/services"
);

if(!response.ok){

    throw new Error(
        "Ошибка загрузки услуг"
    );

}

servicesData =
await response.json();


        renderServices();


        filterServicesByMaster();



        const masterSelect =
        document.getElementById(
            "master_id"
        );


        if(masterSelect){


         masterSelect.removeEventListener(
    "change",
    filterServicesByMaster
);

masterSelect.addEventListener(
    "change",
    filterServicesByMaster
);


        }


    }catch(error){


        console.error(
            "Ошибка загрузки услуг:",
            error
        );


    }

}



// ==========================
// Карточки услуг
// ==========================

function getServiceIcon(name){

    const text = name.toLowerCase();

    if(text.includes("маникюр")) return "hand";

    if(text.includes("ресниц")) return "eye";

    if(text.includes("2d")) return "eye";

    if(text.includes("3d")) return "eye";

    if(text.includes("наращивание")) return "gem";

    if(text.includes("коррек")) return "sparkles";

    return "star";

}

function renderServices(){

    const container =
    document.querySelector(
        ".services-container"
    );

    if(!container) return;

    container.innerHTML = "";

    servicesData.forEach(service=>{

container.innerHTML += `

<div class="service-card">

<div class="service-icon">

    <i data-lucide="${getServiceIcon(service.name)}"></i>

</div>

    <h3>

        ${service.name}

    </h3>

    <p class="service-text">

        Професійний догляд,
        якісні матеріали
        та бездоганний результат.

    </p>

    <div class="service-line"></div>

    <div class="service-price">

        ${service.price} ₴

    </div>

    <button class="service-time">

        ${service.duration} хв

    </button>

</div>

        `;

    });
 
  lucide.createIcons();
  
  revealCards();

  document
  .querySelectorAll(".service-card")
   .forEach(card=>{

    card.classList.remove("show");

});

}


// ==========================
// Фильтр услуг по мастеру
// ==========================

function filterServicesByMaster(){


    const masterSelect =
    document.getElementById(
        "master_id"
    );


    const serviceSelect =
    document.getElementById(
        "service_id"
    );



    if(
        !masterSelect ||
        !serviceSelect
    ) return;



    const masterId =
    Number(
        masterSelect.value
    );



    serviceSelect.innerHTML = "";



const filteredServices =
servicesData.filter(service=>{

    return Number(
        service.master_id
    ) === masterId;

});

if(!filteredServices.length){

    serviceSelect.innerHTML = `

        <option>

            Нет доступных услуг

        </option>

    `;

    return;

}

filteredServices.forEach(service=>{

    serviceSelect.innerHTML += `

    <option value="${service.id}">

        ${service.name}
        — ${service.price} ₴

    </option>

    `;

 });

}
// ==========================
// Галерея
// ==========================

function initGallery(){


    const images =
    document.querySelectorAll(
        ".gallery-item img"
    );


    if(!images.length) return;



    images.forEach(img=>{


        img.addEventListener(
            "click",
            ()=>{


                openImage(img.src);


            }

        );


    });


}



// ==========================
// Открытие большого фото
// ==========================

function openImage(src){


    const overlay =
    document.createElement(
        "div"
    );


    overlay.className =
    "image-overlay";



    overlay.innerHTML = `

        <img src="${src}">

    `;



    document.body.appendChild(
        overlay
    );



    overlay.addEventListener(
        "click",
        ()=>{

            overlay.remove();

        }

    );


}



// ==========================
// Плавная прокрутка
// ==========================

function initScroll(){


    document
    .querySelectorAll(
        "a[href^='#']"
    )
    .forEach(link=>{


        link.addEventListener(
            "click",
            function(e){


                const target =
                document.querySelector(
                    this.getAttribute(
                        "href"
                    )
                );



                if(target){


                    e.preventDefault();



                    target.scrollIntoView({

                        behavior:"smooth"

                    });


                }


            }

        );


    });


}



// ==========================
// Анимация появления
// ==========================

function initAnimation(){


    const items =
    document.querySelectorAll(
        ".animate"
    );



    const observer =
    new IntersectionObserver(
        entries=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){


                    entry.target.classList.add(
                        "show"
                    );


                }


            });


        },

        {

            threshold:0.2

        }

    );



    items.forEach(item=>{


        observer.observe(item);


    });


}
// ==========================
// Форма записи
// ==========================

function initBookingForm(){

    const form =
    document.getElementById(
        "bookingForm"
    );

    if(!form) return;

    form.addEventListener(
        "submit",
        async(e)=>{

                e.preventDefault();



                const bookingData = {


                    client_name:
                    document.getElementById(
                        "client_name"
                    ).value,



                    phone:
                    document.getElementById(
                        "phone"
                    ).value,



                    master_id:
                    Number(
                        document.getElementById(
                            "master_id"
                        ).value
                    ),



                    service_id:
                    Number(
                        document.getElementById(
                            "service_id"
                        ).value
                    ),



                    booking_date:
                    document.getElementById(
                        "booking_date"
                    ).value,



                    booking_time:
                    document.getElementById(
                        "booking_time"
                    ).value


                };



                try{


                    const response =
                    await fetch(
                        "http://localhost:3000/api/bookings",
                        {

                            method:"POST",

                            headers:{

                                "Content-Type":
                                "application/json"

                            },

                            body:
                            JSON.stringify(
                                bookingData
                            )

                        }

                    );



                    const result =
                    await response.json();



                    if(response.ok){


                        alert(
                            "✅ Ви успішно записані!"
                        );


                        form.reset();



                    }else{


                        alert(
                            result.message ||
                            "Помилка запису"
                        );


                    }



                } catch(error){

                    console.error(
                        "Помилка:",
                        error
                    );

                    alert(
                        "Сервер недоступний"
                    );

                }

        });

}

async function loadReviews(){

    try{

const response = await fetch(
    "http://localhost:3000/api/reviews"
);

if(!response.ok){

    throw new Error(
        "Ошибка загрузки отзывов"
    );

}

reviewsData = await response.json();

        renderReviews();


    }catch(error){

        console.log(
            "Ошибка загрузки отзывов:",
            error
        );

    }

}



function renderReviews(){

    const container =
    document.querySelector(".reviews-container");


    if(!container) return;


    container.innerHTML = `

    <div class="reviews-track">

    ${
        reviewsData.map(review => `

        <div class="review-card">

            <h3>
                ${review.client_name}
            </h3>


    <div class="stars">
    ${"⭐".repeat(review.rating)}
    </div>

            <p>
                ${review.text}
            </p>


        </div>

        `).join("")
    }


    </div>

    `;


}

// ==========================
// Scroll Reveal Services
// ==========================

const revealCards = () => {

    const cards = document.querySelectorAll(".service-card");

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },{
        threshold:0.35
    });

    cards.forEach(card=>{

        observer.observe(card);

    });

}