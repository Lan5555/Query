let sheet = document.querySelector('.bottomsheet');
let price = document.querySelector('.price');
let currentTime = document.querySelector('.currentTime');
let colors = ['red','black'];
const firebaseConfig = {
  apiKey: "process.env.SECRET",
  authDomain: "validator-533ce.firebaseapp.com",
  projectId: "validator-533ce",
  storageBucket: "validator-533ce.appspot.com",
  messagingSenderId: "367967988323",
  appId: "1:367967988323:web:18390dc55e99e718d9a656",
  measurementId: "G-0KGQDK3R0Y",
  databaseURL: "https://validator-533ce-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
let months = 0;

const lunchSheet = (value) => {
  sheet.classList.toggle('toggleSheet');
  document.body.classList.toggle('bg');
  price.innerHTML = `₦${value}`;
  //months = value == '5000' ? 2 : 10000;
};
const checkPayment = () => {
  prompt.style.display = "flex";
  sheet.classList.toggle('toggleSheet');
}
const backbtn = () => {
  sheet.classList.toggle('toggleSheet');
  document.body.classList.toggle('bg');
}
let planType = document.querySelector('.planType');
let balance = document.querySelector('.balance');
window.onload = async() => {
  
  await fetchMonths();
 //setCountdownDate();
  fetchPlan();
  fetchBalance();
  
}
const fetchPlan = () => {
  const dataRef = database.ref('plan');
  dataRef.once('value')
  .then((snapshot) => {
    const data = snapshot.val().type;
    planType.innerHTML = data;
  }).catch((error) => {
    
  });
}
const fetchBalance = () => {
  const dataRef = database.ref('balance');
  dataRef.once('value')
    .then((snapshot) => {
      const data = snapshot.val().money;
      balance.innerHTML = `Balance remaining:₦${data}`;
    }).catch((error) => {
  
    });
}
const fetchMonths = async() => {
  return new Promise((resolve, reject) => {
    const dataRef = database.ref('months');
    dataRef.once('value')
    .then((snapshot) => {
      const data = snapshot.val().value;
      months = parseInt(data);
      setCountdownDate();
      resolve();
    }).catch((error) => {
      console.log('doesnt exist');
    });
  })
}

  
  const countdownRef = database.ref("countdownEnd");


    // Function to set the countdown date only if it hasn't been set
    async function setCountdownDate() {
      
          const currentDate = new Date();
          const endDate = new Date();
          endDate.setMonth(currentDate.getMonth() + months);
  
          // Save the date as an ISO string in Firebase
          countdownRef.set(endDate.toISOString())
            .then(() => {
              console.log("Countdown date set successfully!");
            })
            .catch((error) => {
              console.error("Error setting countdown date:", error);
            });
        
     
    }
  
  

function updateCountdown(endDate) {
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = new Date(endDate).getTime() - now;

    if (timeLeft <= 0) {
      clearInterval(interval);
      setInterval(() => {
        currentTime.style.color = colors[Math.floor(Math.random() * colors.length)];
      }, 1000);
      currentTime.innerHTML = "0:00";
      return;
    }

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display the countdown
    currentTime.innerText =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

// Fetch the countdown date from Firebase and start the countdown
countdownRef.on("value", (snapshot) => {
      const endDate = snapshot.val();
      updateCountdown(endDate);
});

let prompt = document.querySelector('.prompt');
let form = document.getElementById('lan');
let message = document.querySelector('.message');
let inputValue = document.querySelector('.val');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  message.style.display = "block";
  const dataRef = database.ref('npay');
  dataRef.set({
    id:inputValue.value
  });
  setTimeout(() => {
    prompt.style.display = "none";
    document.body.classList.toggle('bg');
  },3000);
  
});