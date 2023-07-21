$(document).ready(function () {
  HealthBar = new ProgressBar.Circle("#HealthBar", {
    color: "#99FF99",
    trailColor: "#498949",
    strokeWidth: 14,
    trailWidth: 14,
    duration: 250,
    easing: "easeInOut",
  });

  ArmourBar = new ProgressBar.Circle("#ArmourBar", {
    color: "#0080FF",
    trailColor: "#1565ac",
    strokeWidth: 14,
    trailWidth: 14,
    duration: 250,
    easing: "easeInOut",
  });

  DevMoment = new ProgressBar.Circle("#DeveloperIcon", {
    color: "#000000",
    trailColor: "#000000",
    strokeWidth: 14,
    trailWidth: 14,
    duration: 250,
    easing: "easeInOut",
  });
  
  HungerBar = new ProgressBar.Circle("#HungerBar", {
    color: "#e67013",
    trailColor: "#9E4400",
    strokeWidth: 14,
    trailWidth: 14,
    duration: 250,
    easing: "easeInOut",
  });

  ThirstBar = new ProgressBar.Circle("#ThirstBar", {
    color: "#94D3EE",
    trailColor: "#1999d1", 
    strokeWidth: 14,
    trailWidth: 14,
    duration: 250,
    easing: "easeInOut",
  });


  OxygenBar = new ProgressBar.Circle("#OxygenBar", {
    color: "#495A74",
    trailColor: "#1A2F50",
    strokeWidth: 14,
    trailWidth: 14,
    duration: 250,
    easing: "easeInOut",
  });

  Speedometer = new ProgressBar.Circle("#SpeedCircle", {
    color: "rgba(222, 222, 222, 1)",
    trailColor: "rgba(184, 184, 184, 0.4)",
    strokeWidth: 7.5,
    duration: 100,
    trailWidth: 7.5,
    easing: "easeInOut",
  });

  FuelBar = new ProgressBar.SemiCircle("#FuelCircle", {
    color: "rgba(222, 222, 222, 1)",
    trailColor: "rgba(184, 184, 184, 0.4)",
    strokeWidth: 8,
    duration: 100,
    trailWidth: 8,
    easing: "easeInOut",
  });
  
  VoiceBar = new ProgressBar.Circle("#VoiceBar", {
    color: "#FFFFFF",
    trailColor: "#C4C4C4",
    strokeWidth: 14,
    trailWidth: 14,
    duration: 250,
    easing: "easeInOut",
  });
  VoiceBar.animate(0.65);
});

money = new ProgressBar.Circle("#money", {
  color: "#00FF00",
  trailColor: "#00b65b",
  strokeWidth: 12,
  trailWidth: 12,
  duration: 250,
  easing: "easeInOut",
});

bank = new ProgressBar.Circle("#bank", {
  color: "#871f1f",
  trailColor: "#d41c1c",
  strokeWidth: 12,
  trailWidth: 12,
  duration: 250,
  easing: "easeInOut",
});

blackmoney = new ProgressBar.Circle("#blackmoney", {
  color: "#808080",
  trailColor: "#000000",
  strokeWidth: 12,
  trailWidth: 12,
  duration: 250,
  easing: "easeInOut",
});

society = new ProgressBar.Circle("#society", {
  color: "#392613",
  trailColor: "#654321",
  strokeWidth: 12,
  trailWidth: 12,
  duration: 250,
  easing: "easeInOut",
});

$("#developericon").hide()
$(".hudmenu").hide()

var healthtogglemenu = document.getElementById("healthonoff");
function healthtoggle() {
  if (healthtogglemenu.checked == true){
    localStorage.setItem('healthon', 'true');
    $("#HealthBar").fadeIn()
  } else {
    $("#HealthBar").fadeOut()
    localStorage.setItem('healthon', 'false');
  }
}

if (localStorage.getItem("healthon") == 'true') {
  $("#HealthBar").fadeIn()
  healthtogglemenu.checked = true;
} else {
  $("#HealthBar").fadeOut()
  healthtogglemenu.checked = false;
}

if (localStorage.getItem("healthon") == null ) {
  $("#HealthBar").fadeIn()
  healthtogglemenu.checked = true;
  localStorage.setItem('healthon', 'true');
}

if (localStorage.getItem("speedframes") == null) {
  localStorage.setItem('speedframes', 125);
}
fetch(`https://${GetParentResourceName()}/getspeedfps`, {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json; charset=UTF-8',
},
body: JSON.stringify({
speedfps: localStorage.getItem("speedframes")
})
}).then(resp => resp.json()).then(resp => console.log(resp));

function droplistchange(x) {
  var droplist = x.options[x.selectedIndex].innerHTML.replace(/\"/g, '');
  
  console.log(droplist)

  localStorage.setItem('speedframes', droplist);

    fetch(`https://${GetParentResourceName()}/getspeedfps`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    speedfps: localStorage.getItem("speedframes")
  })
}).then(resp => resp.json()).then(resp => console.log(resp));

}

var armourtogglemenu = document.getElementById("armouronoff");
function armourtoggle() {
  if (armourtogglemenu.checked == true){
    localStorage.setItem('armouron', 'true');
    $("#armourfoil").fadeIn()
  } else {
    $("#armourfoil").fadeOut()
    localStorage.setItem('armouron', 'false');
  }
}

if (localStorage.getItem("armouron") == 'true') {
  $("#armourfoil").fadeIn()
  armourtogglemenu.checked = true;
} else {
  $("#armourfoil").fadeOut()
  armourtogglemenu.checked = false;
}

if (localStorage.getItem("armouron") == null ) {
  $("#armourfoil").fadeIn()
  armourtogglemenu.checked = true;
  localStorage.setItem('armouron', 'true');
}

var balancetogglemenu = document.getElementById("showbalanceandjob");
function balancetoggle() {
  if (balancetogglemenu.checked == true){
    localStorage.setItem('balanceon', 'true');
    $("#balancefoil").fadeIn()
  } else {
    $("#balancefoil").fadeOut()
    localStorage.setItem('balanceon', 'false');
  }
}

if (localStorage.getItem("balanceon") == 'true') {
  $("#balancefoil").fadeIn()
  balancetogglemenu.checked = true;
} else {
  $("#balancefoil").fadeOut()
  balancetogglemenu.checked = false;
}

var armourreltogglemenu = document.getElementById("armourrel");
function armourrelevant() {
  if (armourreltogglemenu.checked == true){
    localStorage.setItem('armourrele', 'true');
    $("#ArmourBar").fadeOut()
  } else {
    $("#ArmourBar").fadeIn()
    localStorage.setItem('armourrele', 'false');
  }
}

if (localStorage.getItem("armourrele") == 'true') {
  armourreltogglemenu.checked = true;
  $("#ArmourBar").fadeOut()
} else {
  $("#ArmourBar").fadeIn()
  armourreltogglemenu.checked = false;
}

if (localStorage.getItem("armourrele") == null ) {
  $("#ArmourBar").fadeOut()
  armourreltogglemenu.checked = true;
  localStorage.setItem('armourrele', 'true');
}

var hungertogglemenu = document.getElementById("hungeronoff");
function hungertoggle() {
  if (hungertogglemenu.checked == true){
    localStorage.setItem('hungeron', 'true');
    $("#HungerBar").fadeIn()
  } else {
    $("#HungerBar").fadeOut()
    localStorage.setItem('hungeron', 'false');
  }
}

if (localStorage.getItem("hungeron") == 'true') {
  $("#HungerBar").fadeIn()
  hungertogglemenu.checked = true;
} else {
  $("#HungerBar").fadeOut()
  hungertogglemenu.checked = false;
}

if (localStorage.getItem("hungeron") == null ) {
  $("#HungerBar").fadeIn()
  hungertogglemenu.checked = true;
  localStorage.setItem('hungeron', 'true');
}

var thirsttogglemenu = document.getElementById("thirstonoff");
function thristtoggle() {
  if (thirsttogglemenu.checked == true){
    localStorage.setItem('thriston', 'true');
    $("#ThirstBar").fadeIn()
  } else {
    $("#ThirstBar").fadeOut()
    localStorage.setItem('thriston', 'false');
  }
}

if (localStorage.getItem("thriston") == 'true') {
  $("#ThirstBar").fadeIn()
  thirsttogglemenu.checked = true;
} else {
  $("#ThirstBar").fadeOut()
  thirsttogglemenu.checked = false;
}

if (localStorage.getItem("thriston") == null ) {
  $("#ThirstBar").fadeIn()
  thirsttogglemenu.checked = true;
  localStorage.setItem('thriston', 'true');
}

var voicetogglemenu = document.getElementById("voiceonoff");
function voicetoggle() {
  if (voicetogglemenu.checked == true){
    localStorage.setItem('voiceon', 'true');
    $("#VoiceBar").fadeIn()
  } else {
    $("#VoiceBar").fadeOut()
    localStorage.setItem('voiceon', 'false');
  }
}

if (localStorage.getItem("voiceon") == 'true') {
  $("#VoiceBar").fadeIn()
  voicetogglemenu.checked = true;
} else {
  $("#VoiceBar").fadeOut()
  voicetogglemenu.checked = false;
}

if (localStorage.getItem("voiceon") == null ) {
  $("#VoiceBar").fadeIn()
  voicetogglemenu.checked = true;
  localStorage.setItem('voiceon', 'true');
}

var oxygenrelmenu = document.getElementById("oxygenrel");
function oxygenrelevant() {
  if (oxygenrelmenu.checked == true){
    localStorage.setItem('oxygenisrel', 'true');
    $("#OxygenBar").fadeIn()
  } else {
    $("#OxygenBar").fadeOut()
    localStorage.setItem('oxygenisrel', 'false');
  }
}

if (localStorage.getItem("oxygenisrel") == 'true') {
  $("#OxygenBar").fadeIn()
  oxygenrelmenu.checked = true;
} else {
  $("#OxygenBar").fadeOut()
  oxygenrelmenu.checked = false;
}

if (localStorage.getItem("oxygenisrel") == null ) {
  $("#OxygenBar").fadeIn()
  oxygenrelmenu.checked = true;
  localStorage.setItem('oxygenisrel', 'true');
}

var fueltogglemenu = document.getElementById("fuelonoff");
function fueltoggle() {
  if (fueltogglemenu.checked == true){
    localStorage.setItem('fuelon', 'true');
    $("#fuelfoil").fadeIn()
  } else {
    $("#fuelfoil").fadeOut()
    localStorage.setItem('fuelon', 'false');
  }
}

if (localStorage.getItem("fuelon") == 'true') {
  $("#fuelfoil").fadeIn()
  fueltogglemenu.checked = true;
} else {
  $("#fuelfoil").fadeOut()
  fueltogglemenu.checked = false;
}

if (localStorage.getItem("fuelon") == null ) {
  $("#fuelfoil").fadeIn()
  fueltogglemenu.checked = true;
  localStorage.setItem('fuelon', 'true');
}

var speedtogglemenu = document.getElementById("speedonoff");
function speedtoggle() {
  if (speedtogglemenu.checked == true){
    localStorage.setItem('speedon', 'true');
    $("#speedfoil").fadeIn()
  } else {
    $("#speedfoil").fadeOut()
    localStorage.setItem('speedon', 'false');
  }
}

if (localStorage.getItem("speedon") == 'true') {
  $("#speedfoil").fadeIn()
  speedtogglemenu.checked = true;
} else {
  $("#speedfoil").fadeOut()
  speedtogglemenu.checked = false;
}

if (localStorage.getItem("speedon") == null ) {
  $("#speedfoil").fadeIn()
  speedtogglemenu.checked = true;
  localStorage.setItem('speedon', 'true');
}

var maptogglemenu = document.getElementById("maponoff");
function maptoggle() {
  if (maptogglemenu.checked == true){
    $("#mapfoil").fadeIn()
    localStorage.setItem('mapon', 'true');
    fetch(`https://${GetParentResourceName()}/getmap`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    mapon: true
  })
}).then(resp => resp.json()).then(resp => console.log(resp));
  } else {
    localStorage.setItem('mapon', 'false');
    fetch(`https://${GetParentResourceName()}/getmap`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    mapon: false
  })
}).then(resp => resp.json()).then(resp => console.log(resp));
$("#mapfoil").fadeOut()
  }
}

if (localStorage.getItem("mapon") == 'true') {
  //fetch setion
  fetch(`https://${GetParentResourceName()}/getmap`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    mapon: true
  })
}).then(resp => resp.json()).then(resp => console.log(resp));
 //fetch setion
 $("#mapfoil").fadeIn()
  maptogglemenu.checked = true;
} else {
   //fetch setion
  fetch(`https://${GetParentResourceName()}/getmap`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    mapon: false
  })
}).then(resp => resp.json()).then(resp => console.log(resp));
 //fetch setion
 $("#mapfoil").fadeOut()
  maptogglemenu.checked = false;
}

if (localStorage.getItem("mapon") == null ) {
  $("#mapfoil").fadeIn()
  maptogglemenu.checked = true;
  localStorage.setItem('mapon', 'true');
  fetch(`https://${GetParentResourceName()}/getmap`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      mapon: true
    })
  }).then(resp => resp.json()).then(resp => console.log(resp));
}

const CancelMenu = () => {
  $.post(`https://joehud/cancel`);
};

document.onkeyup = function (event) {
  event = event || window.event;
  var charCode = event.keyCode || event.which;
  if (charCode == 27) {
    CancelMenu();
  }
};

window.addEventListener("message", function (event) {
  let data = event.data;

  if (data.action == "update_hud") {
    HealthBar.animate(data.hp / 100);
    ArmourBar.animate(data.armor / 100);
    HungerBar.animate(data.hunger / 100);
    ThirstBar.animate(data.thirst / 100);
  }

  $("#job").text(data.job);
  $("#cashtext").text(data.money);
  $("#banktext").text(data.bank);
  $("#dirtytext").text(data.blackMoney);
  $("#societytext").text(data.society);

  if (data.oxygen >= 0) {
  OxygenBar.animate(data.oxygen / 100);
  } else if (data.oxygen < 0) {
    OxygenBar.animate(0 / 1);
  }

  if (data.action == "voice_level") {
    switch (data.voicelevel) {
      case 1:
        data.voicelevel = 25;
        break;
      case 2:
        data.voicelevel = 50;
        break;
      case 3:
        data.voicelevel = 100;
        break;
      default:
        data.voicelevel = 25;
        break;
    }
    VoiceBar.animate(data.voicelevel / 100);
  }

  if (data.radio == true) {
    $("#Voice").removeClass("fa-microphone");
    $("#Voice").addClass("fa-headset");
  } else if (data.radio == false) {
    $("#Voice").removeClass("fa-headset");
    $("#Voice").addClass("fa-microphone");
  }

  if (data.talking == 1) {
    VoiceBar.path.setAttribute("stroke", "#FFFF00");
  } else if (data.talking == false) {
    VoiceBar.path.setAttribute("stroke", "#FFFFFF");
  }
  
  if (data.showOxygen == true && localStorage.getItem("oxygenisrel") == 'true') {
    $("#OxygenBar").show();
  } else if (data.showOxygen == false && localStorage.getItem("oxygenisrel") == 'true') {
    $("#OxygenBar").hide();
  }

  if (data.showOxygen == false && localStorage.getItem("oxygenisrel") == 'false') {
    $("#OxygenBar").show();
  } else if (data.showOxygen == true && localStorage.getItem("oxygenisrel") == 'false') {
    $("#OxygenBar").show();
  } 

  if (data.armor < 1, localStorage.getItem("armourrele") == 'false') {
    $("#ArmourBar").fadeIn();
  } 
  
  if (data.armor == 0 && localStorage.getItem("armourrele") == 'true') {
    $("#ArmourBar").fadeOut();
  } else if (data.armor > 0 && localStorage.getItem("armourrele") == 'true') {
    $("#ArmourBar").fadeIn();
  }

  if (data.thirst < 25) {
    $("#ThirstIcon").toggleClass("flash");
  }

  if (data.hunger < 25) {
    $("#HungerIcon").toggleClass("flash");
  }

  if (data.speed > 0) {
    $("#SpeedIndicator").text(data.speed + " " + data.speedtext);
    let multiplier = data.maxspeed * 0.1;
    let SpeedoLimit = data.maxspeed + multiplier;
    Speedometer.animate(data.speed / SpeedoLimit);
    Speedometer.path.setAttribute("stroke", "white");
  } else if (data.speed == 0) {
    $("#SpeedIndicator").text("0 " + data.speedtext);
    Speedometer.path.setAttribute("stroke", "none");
  }

  if (data.showSpeedo == true) {
    $("#VehicleBox").show();
  } else if (data.showSpeedo == false) {
    $("#VehicleBox").hide();
  }

  if (data.mapoutline == true) {
    $(".outline").show();
  } else if (data.mapoutline == false) {
    $(".outline").hide();
  }

  if (data.action == "update_fuel") {
    let finalfuel = (data.fuel / 100);
    if (finalfuel > 0.9) {
      FuelBar.animate(1.0);
    } else if (finalfuel < 0.9) {
      FuelBar.animate(finalfuel);
    }
    if (finalfuel < 0.2) {
      FuelBar.path.setAttribute("stroke", "red");
    } else if (finalfuel > 0.2) {
      FuelBar.path.setAttribute("stroke", "white");
    }
  }

  if (data.showFuel == true) {
    $("#FuelCircle").show();
  } else if (data.showFuel == false) {
    $("#FuelCircle").hide();
  }

  // Function to show the "Icons" container from the bottom
  function showIconsContainer() {
    $(".Icons").addClass("show-from-bottom");
    setTimeout(function () {
      $(".Icons").css("transform", "none");
    }, 50);
  }

  // Function to hide the "Icons" container and reset its position to the bottom
  function hideIconsContainer() {
    $(".Icons").css("transform", "translateY(100%)");
  }

  if (data.showUi == true) {
    $(".container").show("fast");
    $("#overfoil").show("fast");
    showIconsContainer();
  } else if (data.showUi == false) {
    $(".container").hide("fast");
    $(".hudmenu").hide("fast");
    $("#overfoil").hide("fast");
    hideIconsContainer();
  }

  if (data.showhudmenu == true) {
    $(".hudmenu").show()
  } else if (data.showhudmenu == false) {
    $(".hudmenu").hide();
  }

});
