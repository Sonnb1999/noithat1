var topIMG = "assets/images/logo1.png";
var sclIMG = "assets/images/logo2.png";
const letfSibar = document.getElementById("leftSibar");
const rightSibar = document.getElementById("rightSidebar");
var header = document.querySelector('#header');
var goTop = document.querySelector('#go-top');

var formLoginA = document.querySelector('.color-login-js');
var navLinks = document.querySelectorAll('.nav-link-js');
var formSearch = document.querySelector('.input_search');
var btnOpenSearch = document.querySelector('.js-btn-open_search');


$('img[alt="Gabriela Silveira"]').attr("class", "default_logo")

// scroll
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", scrollY > 0);
  goTop.classList.toggle("open", scrollY > 700);

  var btn_nav_rights = document.querySelectorAll(".btn-right");
  for (const btn_nav_right of btn_nav_rights) {
    btn_nav_right.classList.toggle("btn-nav-dark", scrollY > 10)
  }
  var value = $(this).scrollTop();
  if (value > 50) {
    $(".default_logo").attr("src", sclIMG);
  }
  else
    $(".default_logo").attr("src", topIMG);
})

// search 
function openSearch(x) {
  x.classList.toggle("fa-xmark");

  if (x.classList.contains('fa-xmark')) {
    formSearch.style.display = 'flex';
  }
  else {
    formSearch.style.display = 'none';
  }
}

function search() {

}

// lazy load
document.addEventListener("DOMContentLoaded", function () {
  var lazyloadImages = document.querySelectorAll("img.lazy");
  var lazyloadThrottleTimeout;

  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      var scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        if (img.offsetTop < (window.innerHeight + scrollTop)) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
        }
      });
      if (lazyloadImages.length == 0) {
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20);
  }

  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});

// show image 
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);


// contact
var btns = document.querySelectorAll('.item-menu');
var contacts = document.querySelectorAll('.item-menu-plugin');

btns.forEach((btn, index1) => {
  contacts.forEach((element, index2) => {
    if (index1 == index2) {
      btn.onmousemove = function () {
        element.classList.add('active');
      }
    }

  });
});

for (const btn of btns) {
  btn.onmouseout = function () {
    for (const contact of contacts) {
      contact.classList.remove('active');
    }
  }
}


// sidebar right
function openNav() {
  document.getElementById("mySidenav").style.width = "425px";

  rightSibar.classList.toggle("open");
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  rightSibar.classList.remove("open");
}

// sidebar left
function openNavLeft() {
  document.getElementById("leftSidenav").style.width = "320px";
  letfSibar.classList.toggle("open");
}

function closeNavLeft() {
  document.getElementById("leftSidenav").style.width = "0";
  letfSibar.classList.remove("open");
}

// project
$('.featured__controls li').on('click', function () {
  $('.featured__controls li').removeClass('active');
  $(this).addClass('active');
});
if ($('.featured__filter').length > 0) {
  var containerEl = document.querySelector('.featured__filter');
  var mixer = mixitup(containerEl);
}

// contract
var itemOnMoves = document.getElementsByClassName('item-js')

var modal = document.getElementById("myModal");
// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
if (img != null) {
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
if (span != null) {
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }
}


document.addEventListener("DOMContentLoaded", function () {
  th_set_cookie();
});
async function th_set_cookie() {
  let fullUrl = window.location.href
  let utmParams = {}
  if (fullUrl.split("?")[1] != null) {
    const params = new URLSearchParams(fullUrl.split("?")[1]);
    for (const [key, val] of params) {
      if (key.startsWith("utm_")) {
        utmParams[key] = val;
      }
    }
  }

  if (Object.keys(utmParams).length) {
    await call_server(utmParams)
    await count_click(fullUrl, utmParams)
  }
}

async function call_server(utmParams) {
  // 1 ngay = 86400
  let time_cookie_live = 604800
  let interval_number = 7
  let interval_type = 'days'

  const url_fetch = 'https://2p.sambala.net/api/check_cookie'
  const myHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Origin"
  }

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
    let response = await fetch(url_fetch)
    let data = await response.json();
    let set_cookie = data['results']

    interval_number = set_cookie['th_access_interval_number']
    interval_type = set_cookie['th_access_interval_type']


    if (interval_type == 'days') {
      time_cookie_live = interval_number * 24 * 60 * 60
    } else if (interval_type == 'hours') {
      time_cookie_live = interval_number * 60 * 60
    } else if (interval_type == 'minutes') {
      time_cookie_live = interval_number * 60
    }

  } catch (error) {
    time_cookie_live = interval_number * 24 * 60 * 60
  }
  const expires = (new Date(Date.now() + time_cookie_live * 1000)).toUTCString()
  let utm_source = document.cookie.match(new RegExp('odoo_utm_source' + '=([^;]+)'))
  if (utm_source == null) {
    document.cookie = utmParams["utm_source"] != undefined ? "odoo_utm_source=" + utmParams['utm_source'] + "; expires=" + expires + "; path=/;" : ""
    document.cookie = utmParams["utm_campaign"] != undefined ? "odoo_utm_campaign=" + utmParams['utm_campaign'] + "; expires=" + expires + "; path=/;" : ""
    document.cookie = utmParams["utm_medium"] != undefined ? "odoo_utm_medium=" + utmParams['utm_medium'] + "; expires=" + expires + "; path=/;" : ""
  }
}

async function count_click(fullUrl, utmParams) {
  let code_session = sessionStorage.getItem('code')
  const url_server = 'https://2p.sambala.net/api/backlink';

  let data = {
    link_tracker: fullUrl.split("?")[0],
    odoo_utmParams: utmParams,
    code: code_session != null ? code_session : '',
    referrer: document.referrer,
  };

  let headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': '7fd3b7621caf03334a5036e6550adbc7b8311ecc'
  });
  try {

    await fetch(url_server, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (sessionStorage.getItem('code') == null) {
          sessionStorage.setItem("code", result['result']['code']);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.log('Error:', error);
  }
}

