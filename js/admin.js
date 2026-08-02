const API = "http://localhost:3000/api";


const admin = JSON.parse(
    localStorage.getItem("admin")
);



let allMasters = [];
let allServices = [];





if(!admin){

    window.location.href="login.html";

}






document.addEventListener(
"DOMContentLoaded",
async ()=>{


    showAdminInfo();


    await loadBookings();



    if(admin.role === "owner"){


        await loadMasters();

        await loadServices();


    }
    else{


        const management =
        document.getElementById("management");


        if(management){

            management.style.display="none";

        }


    }


});







// ==========================
// ПРОФИЛЬ
// ==========================


function showAdminInfo(){


    const name =
    document.getElementById("adminName");


    const role =
    document.getElementById("adminRole");



    if(name){

        name.innerHTML =
        "👤 " + (admin.name || "Пользователь");

    }



    if(role){


        role.innerHTML =

        admin.role === "owner"

        ?

        "👑 Владелец"

        :

        "💅 Мастер";


    }


}







// ==========================
// ВЫХОД
// ==========================


function logout(){


    localStorage.removeItem("admin");


    window.location.href="login.html";


}







// ==========================
// ВРЕМЯ
// ==========================


function formatTime(time){


    if(!time)
        return "";


    return time.substring(0,5);


}









// ==========================
// ЗАЯВКИ
// ==========================


async function loadBookings(){


    let url;



    if(admin.role==="owner"){


        url =
        `${API}/bookings`;


    }
    else{


        url =
        `${API}/bookings/master/${admin.master_id}`;


    }



    const res =
    await fetch(url);



    const data =
    await res.json();



    renderBookings(
        data.bookings || data
    );



}









function renderBookings(bookings){



const columns={


new:
document.getElementById("new"),


confirmed:
document.getElementById("confirmed"),


completed:
document.getElementById("completed"),


cancelled:
document.getElementById("cancelled")


};





Object.values(columns)
.forEach(col=>{


if(col)

col.innerHTML="";


});






bookings.forEach(b=>{


let card = `


<div class="booking-card">


<h3>
💅 ${b.service_name || "Услуга"}
</h3>


<p>
👤 ${b.client_name || ""}
</p>


<p>
📞 ${b.phone || ""}
</p>


<p>
👩‍🎨 ${b.master_name || ""}
</p>


<p>
📅 ${b.booking_date || ""}
</p>


<p>
⏰ ${formatTime(b.booking_time)}
</p>


<p>
📌 ${b.status}
</p>



<div class="booking-buttons">


<button onclick="changeStatus(${b.id},'confirmed')">

✅ Подтвердить

</button>



<button onclick="changeStatus(${b.id},'completed')">

🏁 Выполнено

</button>



<button onclick="changeStatus(${b.id},'cancelled')">

❌ Отменить

</button>



<button onclick="deleteBooking(${b.id})">

🗑 Удалить

</button>



</div>


</div>


`;






if(columns[b.status]){


columns[b.status]
.innerHTML += card;


}



});


}









// ==========================
// МАСТЕРА
// ==========================


async function loadMasters(){



const res =
await fetch(
`${API}/masters`
);



allMasters =
await res.json();





const box =
document.getElementById("mastersList");



if(!box)
return;




box.innerHTML="";





allMasters.forEach(master=>{


box.innerHTML += `


<div class="master-card">



${
master.photo

?

`

<img 
src="${master.photo}"
class="master-photo">

`

:

`

<div class="master-no-photo">
👩‍🎨
</div>

`

}




<h3>
${master.name}
</h3>



<p>
💅 ${master.profession || "Мастер"}
</p>



<p>
📞 ${master.phone || ""}
</p>



<p>
📍 ${master.city || ""}
</p>




<div class="master-description">

✨

${master.description || "Описание отсутствует"}

</div>




<div class="master-schedule">

🕒

${master.schedule || "График не указан"}

</div>



</div>


`;



});


}









// ==========================
// УСЛУГИ
// ==========================


async function loadServices(){



const res =
await fetch(
`${API}/services`
);



allServices =
await res.json();





const box =
document.getElementById("servicesList");



if(!box)
return;



box.innerHTML="";





allServices.forEach(service=>{


let master =
allMasters.find(
m=>m.id==service.master_id
);



box.innerHTML += `


<div class="service-card">


<h3>

💅 ${service.name}

</h3>



<p>

👩‍🎨 ${
master
?
master.name
:
"Не указан"

}

</p>



<p>

💰 ${service.price} грн

</p>



<p>

⏰ ${service.duration} мин

</p>



</div>


`;



});



}









// ==========================
// СТАТУС
// ==========================


async function changeStatus(id,status){



await fetch(

`${API}/bookings/${id}/status`,

{


method:"PATCH",


headers:{

"Content-Type":
"application/json"

},


body:

JSON.stringify({

status

})


}


);



await loadBookings();


}









// ==========================
// УДАЛЕНИЕ
// ==========================


async function deleteBooking(id){



if(
!confirm(
"Удалить запись?"
)

)

return;




await fetch(

`${API}/bookings/${id}`,

{


method:"DELETE"


}

);



await loadBookings();



}