// ----------------------------
// Current selections
// ----------------------------
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxgX93TApxBIvh82QOxfN-kvHFlaxQf6MxEWkkxCweucOdFxZ8ruDU-G2RVX2hyIQNl5A/exec";


const selections = {
    day: "Saturday",
    meal: "Lunch",
    food: "🍛 Biryani",
    area: "📍 Anywhere"
};

// ----------------------------
// Choice Buttons
// ----------------------------

const buttons = document.querySelectorAll(".choice");

buttons.forEach(button => {

    button.addEventListener("click", async () => {

        const parent = button.parentElement;

        parent.querySelectorAll(".choice").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const group = button.dataset.group;

        selections[group] = button.innerText.trim();

        updateSummary();

    });

});

// ----------------------------
// Summary
// ----------------------------

const summary = document.getElementById("summaryText");

function updateSummary(){

    summary.innerHTML = `

        📅 ${selections.day}
        <br>
        🍽️ ${selections.meal}
        <br>
        ${selections.food}
        <br>
        ${selections.area}

    `;

}

updateSummary();


// ----------------------------
// Modal
// ----------------------------

const modal = document.getElementById("modal");

const modalTitle = document.getElementById("modalTitle");

const modalMessage = document.getElementById("modalMessage");

const closeModal = document.getElementById("closeModal");

closeModal.onclick = () => {

    modal.classList.add("hidden");

};

// ----------------------------
// YES
// ----------------------------

document
.getElementById("yesBtn")
.addEventListener("click", async ()=>{
    saveResponse("Yes");
    modal.classList.remove("hidden");

    modalTitle.innerHTML="❤️ Yay!";

    modalMessage.innerHTML=`

        I'm really looking forward to spending
        time with you.

        <br><br>

        I'll message you soon so we can
        plan everything.

        <br><br>

        — Chintan

    `;

    startConfetti();

});


// ----------------------------
// PLAN LATER
// ----------------------------

document
.getElementById("laterBtn")
.addEventListener("click", async ()=>{
    saveResponse("Later");
    modal.classList.remove("hidden");

    modalTitle.innerHTML="😊 Sounds good";

    modalMessage.innerHTML=`

        No worries.

        <br><br>

        We'll find another day that works
        for both of us.

        <br><br>

        Looking forward to it.

        <br><br>

        — Chintan

    `;

});


// ----------------------------
// LET YOU KNOW
// ----------------------------

document
.getElementById("knowBtn")
.addEventListener("click", async ()=>{
    saveResponse("let me know");
    modal.classList.remove("hidden");

    modalTitle.innerHTML="🙂 Thank you";

    modalMessage.innerHTML=`

        Thanks for letting me know.

        <br><br>

        Whenever you're ready.

        <br><br>

        — Chintan

    `;

});


// ----------------------------
// CONFETTI
// ----------------------------

const canvas = document.getElementById("confetti");

const ctx = canvas.getContext("2d");

let pieces=[];

function resizeCanvas(){

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

}

window.addEventListener("resize",resizeCanvas);

resizeCanvas();


function createPiece(){

    return{

        x:Math.random()*canvas.width,

        y:-20,

        size:6+Math.random()*8,

        speed:2+Math.random()*4,

        angle:Math.random()*360,

        rotate:Math.random()*8

    };

}

function startConfetti(){

    pieces=[];

    for(let i=0;i<180;i++){

        pieces.push(createPiece());

    }

    animateConfetti();

}

function animateConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    pieces.forEach(piece=>{

        piece.y+=piece.speed;

        piece.angle+=piece.rotate;

        ctx.save();

        ctx.translate(piece.x,piece.y);

        ctx.rotate(piece.angle*Math.PI/180);

        ctx.fillStyle=[
            "#c89b61",
            "#ffffff",
            "#d2a86d",
            "#ffdb9c"
        ][Math.floor(Math.random()*4)];

        ctx.fillRect(
            -piece.size/2,
            -piece.size/2,
            piece.size,
            piece.size
        );

        ctx.restore();

    });

    pieces=pieces.filter(p=>p.y<canvas.height+20);

    if(pieces.length){

        requestAnimationFrame(animateConfetti);

    }else{

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }
    

}
async function saveResponse(response){

    try {
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                response: response,
                day: selections.day,
                meal: selections.meal,
                food: selections.food,
                area: selections.area
            })
        });

    } catch (err) {
        console.error(err);
    }

}
