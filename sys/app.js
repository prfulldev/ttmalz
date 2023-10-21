const d = document;
const ads = document.getElementById('ads');
const loading = document.getElementById("loading");


//form
const dBtn = d.getElementById("downloadbtn");
//res

const download = (url) => {
   loading.style.display = "flex";
   const resCont = d.getElementById("result");
   const noWm = d.getElementById("bNowm");
   const Wm = d.getElementById("bWm");
   let apiU = `https://api.royalprinz.my.id/api/download/tiktok?url=${url}`;

   fetch(apiU)
      .then((Response) => {
         return Response.json();
      })
      .then((hasil) => {
         
         let data = hasil.result;
         let desc = data.desc;
         let thumb = hasil.result.thumb;
         let nowm = data.nowm;
         let wwm = data.wm;
         //let auth = hasil.author.author;
         resCont.innerHTML = `
            <div class="c-res shadow">
               <div class="c-head">
                  <img
                     src="${thumb}"
                     alt="prof"
                     width="100"
                  />
                  <p>${desc}</p>
               </div>
               <div class="c-btm">
                  <button id="bNowm">No Watermark</button>
                  <button id="bWm">With Watermark</button>
               </div>
            </div>
         `;

         document
            .getElementById("bNowm")
            .addEventListener("click", function () {
               //window.location.href = `${data.nowm}`;
               
               ads.classList.add('show');
               countDown(nowm);
               
            });
         document.getElementById("bWm").addEventListener("click", function () {
               //window.location.href = `${data.wm}`;
               
               ads.classList.add('show');
               countDown();
         });
         loading.style.display = "none";
      })
      .catch((error) => {
         console.error(error);
         loading.style.display = "none";
      });
};

dBtn.addEventListener("click", function () {
   const input = d.getElementById("inputUrl");
   const urlI = input.value.trim();
   
   if (urlI === "") {
     alert("URL Tidak Boleh Kosong")
   }else{
     download(urlI);
   }
});


//count down
var countdown = 5; // Waktu awal
var countdownElement = document.getElementById("countdown");
let adsClose = document.getElementById("ads-close");


function countDown(link) {
  let down = document.getElementById("down");
  var interval = setInterval(function() {
    countdown--;
    countdownElement.textContent = countdown; // Memperbarui tampilan hitungan mundur

    if (countdown === 0) {
      clearInterval(interval); // Menghentikan hitungan mundur setelah mencapai 0
      countdownElement.classList.add('hide');
      adsClose.className = "show";
      down.href = link;
      down.setAttribute("download","tes.mp4");
      down.click();
    }
  }, 1000); // Setiap 1000ms (1 detik)
}

//close ads

adsClose.addEventListener('click', () => {
  ads.classList.remove('show');
  ads.classList.add('hide');
});

