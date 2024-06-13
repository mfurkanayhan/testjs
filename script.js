const rootEl = document.getElementById("root");
gotoHome();

function gotoLogin() {
  rootEl.innerHTML = `
  <div class="d-flex justify-content-center align-items-center" style="height: 60vh;">
  <div class="col-lg-5 col-12">
    <div class="card">
      <div class="card-header text-center">
        <h1>Login Page</h1>
        <p>Enter your information to log in</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="userNameOrEmail">
            User Name or Email
          </label>
          <input type="text" class="form-control" placeholder="johndoe" id="userNameOrEmail"
            onkeyup="checkValidation(event)" required minlength="3">
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-group mt-2">
          <label for="password">
            Password
          </label>
          <input type="password" class="form-control" placeholder="*******" id="password"
            onkeyup="checkValidationForPassword(event)" required minlength="6">
          <ul style="display: none;">
            <li class="text-danger" id="min6Length">
              Must be at least 6 characters long
            </li>
            <li class="text-danger" id="upperCase">
              Must contain an uppercase letter
            </li>
            <li class="text-danger" id="lowerCase">
              Must contain a lowercase letter
            </li>
            <li class="text-danger" id="number">
              Must contain a number
            </li>
            <li class="text-danger" id="specialCharacter">
              Must contain a special character
            </li>
          </ul>
        </div>
      </div>
      <div class="card-header">
        <button onclick="login()" class="btn btn-dark w-100">
          Log In
        </button>
        <a onclick="gotoRegister()" class="mt-1" style="float: right;">
          Click here to register for free
        </a>
      </div>
    </div>
  </div>
</div>
`
}

function gotoRegister() {
  rootEl.innerHTML = `
  <div class="d-flex justify-content-center align-items-center" style="height: 60vh;">
  <div class="col-lg-5 col-12">
    <div class="card">
      <div class="card-header text-center">
        <h1>Register Page</h1>
        <p>Fill in the information below to register</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="name">
            Name
          </label>
          <input type="text" class="form-control" placeholder="john" id="name" onkeyup="checkValidation(event)" required
            minlength="3" autocomplete="off">
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-group mt-2">
          <label for="lastName">
            Last Name
          </label>
          <input type="text" class="form-control" placeholder="doe" id="lastName" onkeyup="checkValidation(event)"
            required minlength="3" autocomplete="off">
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-group mt-2">
          <label for="userName">
            Username
          </label>
          <input type="text" class="form-control" placeholder="johndoe" id="userName" onkeyup="checkValidation(event)"
            required minlength="3" autocomplete="off">
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-group mt-2">
          <label for="email">
            Email
          </label>
          <input type="email" class="form-control" placeholder="john@doe.com" id="email"
            onkeyup="checkValidation(event)" required minlength="3" autocomplete="off">
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-group mt-2">
          <label for="password">
            Password
          </label>
          <input type="password" class="form-control" placeholder="******" id="password"
            onkeyup="checkValidationForPassword(event)" required minlength="6">
          <ul style="display: none;">
            <li class="text-danger" id="min6Length">
              Must be at least 6 characters long
            </li>
            <li class="text-danger" id="upperCase">
              Must contain an uppercase letter
            </li>
            <li class="text-danger" id="lowerCase">
              Must contain a lowercase letter
            </li>
            <li class="text-danger" id="number">
              Must contain a number
            </li>
            <li class="text-danger" id="specialCharacter">
              Must contain a special character
            </li>
          </ul>
        </div>
      </div>
      <div class="card-header">
        <button onclick="register()" class="btn btn-dark w-100">
          Register
        </button>
        <a onclick="gotoLogin()" class="mt-1" style="float: right;">
          Already have an account?
        </a>
      </div>
    </div>
  </div>
</div>
  `
}

function getTicketDetailsModal(){
  rootEl.innerHTML = `
  <div class="modal fade" id="ticketDetailsModal" tabindex="-1" role="dialog" aria-labelledby="ticketDetailsModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ticketDetailsModalLabel">Ticket Details</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Ticket information will be dynamically loaded here -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `;
  // Bootstrap modal initialization if needed
  $('#ticketDetailsModal').modal();
}

// Ticket detaylarını göstermek için
function showTicketDetails(ticketId) {
  axios.get(`https://localhost:7102/api/Tickets/GetTicket/${ticketId}`)
    .then(response => {
      const ticket = response.data;
      // Update modal content
      const modalBody = document.querySelector('#ticketDetailsModal .modal-body');
      modalBody.innerHTML = `
        <p><strong>ID:</strong> ${ticket.id}</p>
        <p><strong>Subject:</strong> ${ticket.subject}</p>
        <p><strong>Description:</strong> ${ticket.description}</p>
        <p><strong>Status:</strong> ${ticket.status}</p>
        <p><strong>Priority:</strong> ${ticket.priority}</p>
      `;
      $('#ticketDetailsModal').modal('show'); // Trigger modal display
    })
    .catch(error => {
      console.error('Error loading ticket details:', error);
      alert('Failed to load ticket details.');
    });
}

// Örnek olarak anasayfa yüklendiğinde modalı hazırla
document.addEventListener('DOMContentLoaded', function() {
  getTicketDetailsModal();
});


async function gotoHome() {
  if (checkAuthentication()) {
    const localStorageResponseString = localStorage.getItem("response");
    const localStorageResponse = JSON.parse(localStorageResponseString);
    const userId = localStorageResponse.userId;

    const response = await axios.get("https://localhost:7102/api/Tickets/GetAll/" + userId)

    let text = "";

    for (let index in response.data){
      const data = response.data[index]
      text += `
        <tr onclick="showTicketDetails('${data.id}')">
          <td>${+index + 1}</td>
          <td>${data.subject}</td>
          <td>${data.isUrgent}</td>
          <td>${data.createdDate}</td>
          <td>
            <select onchange="changeTicketStatus('${data.id}', event)" class="form-control">
              ${data.status === "Open"}
              <option ${data.status === "Open" ? "selected" : ""}>Open</option>  
              <option ${data.status === "Closed" ? "selected" : ""}>Closed</option>  
            </select>
          </td>
        </tr>
      `
    }

    getTicketDetailsModal();

    rootEl.innerHTML = `
      <h1>ITDesk Home Page</h1>
      <button id="logoutButton" onclick="logout()" class="btn btn-primary">Logout</button>
      <div class="mt-2">
        <h3>New Task Form</h3>
        <div>
          <div class="form-control">
            Subject
            <input id="subject" class="form-control mt-1" style="width:250px;" type="text">
          </div>

          <div class="form-control mt-1">
            IsUrgent
            <select id="isUrgent" class="form-control" style="width:150px;">
              <option>No Urgent</option>
              <option>Normal</option>
              <option>Urgent</option>
            </select>
          </div>

          <div class="form-control mt-1">
            <button onclick="createTicket()" class="btn btn-primary">Create a New Task</button>
          </div>
        </div>
      </div>
      <hr>
      <table class="table table-hover table-bordered mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>IsUrgent</th>
            <th>Created Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${text}
        </tbody>
      </table>`;
      
  } else {
    gotoLogin();
  }
}

async function createTicket(){
  const subjectEl = document.getElementById("subject");
  const isUrgentEl = document.getElementById("isUrgent");
  const localStorageResponseString = localStorage.getItem("response");
  const localStorageResponse = JSON.parse(localStorageResponseString);
  const userId = localStorageResponse.userId;
  
  const data = {
    userId: userId,
    subject: subjectEl.value,
    isUrgent: isUrgentEl.value
  };

  try {
    const response = await axios.post("https://localhost:7102/api/Tickets/Create", data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    toastr.success('Ticket create is successful');
    gotoHome();

  } catch (error) {
    console.error("Error creating ticket:", error);
    let errorMessage = "Failed to create ticket: Unknown error";
    if (error.response && error.response.data) {
      errorMessage = "Failed to create ticket: " + (error.response.data.message || "Unknown error");
      
    }
    toastr.error(errorMessage);    
  }
}

async function changeTicketStatus(id, event) {
  const originalStatus = event.target.value;

  var response = await Swal.fire({
    title: 'Change Status!',
    text: 'Do you want to change status this ticket',
    icon: 'question',
    confirmButtonText: 'Change',
    showCancelButton: true,
    cancelButtonText: "Cancel"
  });

  if(response.isConfirmed){
    const data = {
      id: id,
      status: event.target.value
    };

    try {
      await axios.post("https://localhost:7102/api/Tickets/ChangeStatus", data);
      toastr.success('Ticket status change is successful');
      gotoHome();      
    } catch (err) {
      console.error("Error changing ticket status:", err);
      toastr.error("Failed to change ticket status: " + (err.response && err.response.data.message || "Unknown error"));
      event.target.value = originalStatus;
    }
  } else {
    event.target.value = originalStatus;
  }
}

function checkValidation(e) {
  const isValid = e.target.validity.valid;

  if (!isValid) {
    e.target.className = "form-control is-invalid";
    const errorMessage = e.target.validationMessage;
    
    const divEl = document.querySelector("#" + e.target.id + " + div");
    divEl.innerHTML = errorMessage;
  } else {
    e.target.className = "form-control is-valid"
  }
}

function checkValidationForPassword(e) {
  e.target.className = "form-control is-invalid";
  checkValidationForPassword2(e.target.value);
}

function checkValidationForPassword2(value) {
  const ulEl = document.querySelector(`#password + ul`);
  ulEl.computedStyleMap.display = "block";

  const validation = {
    min6Length: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialCharacter: false
  };

  const min6LengthLiEl = document.getElementById("min6Length");
  min6LengthLiEl.className = isTrueReturnSuccessOrDanger(value.length >= 6);

  const upperCaseLiEl = document.getElementById("upperCase");
  upperCaseLiEl.className = isTrueReturnSuccessOrDanger(/[A-Z]/.test(value));

  const lowerCaseLiEl = document.getElementById("lowerCase");
  lowerCaseLiEl.className = isTrueReturnSuccessOrDanger(/[a-z]/.test(value));

  const numberLiEl = document.getElementById("number");
  numberLiEl.className = isTrueReturnSuccessOrDanger(/[0-9]/.test(value));

  const specialCharacterLiEl = document.getElementById("specialCharacter");
  specialCharacterLiEl.className = isTrueReturnSuccessOrDanger(/[^\w\s]/.test(value));

  validation.min6Length = value.length >= 6;
  validation.upperCase = /[A-Z]/.test(value);
  validation.lowerCase = /[a-z]/.test(value);
  validation.number = /[0-9]/.test(value);
  validation.specialCharacter = /[^\w\s]/.test(value);

  for (let i in validation) {
    if (!validation[i]) return;
  }

  ulEl.style.display = "none";
  document.getElementById("password").className = "form-control is-valid";
}

function isTrueReturnSuccessOrDanger(expression) {
  if (expression) return "text-success"

  return "text-danger"
}

function login() {
  const userNameOrEmailEl = document.getElementById("userNameOrEmail");
  const userNameOrEmailIsValid = userNameOrEmail.validity.valid;

  const passwordEl = document.getElementById("password");
  const passwordIsValid = passwordEl.validity.valid;

  if (!userNameOrEmailIsValid) {
    userNameOrEmailEl.className = "form-control is-invalid";
    document.querySelector(`#userNameOrEmail + div`).innerHTML = userNameOrEmailEl.validationMessage;
  }

  if (!passwordIsValid) {
    passwordEl.className = "form-control is-invalid";
    checkValidationForPassword2(passwordEl.value);
  }

  const data = {
    userNameOrEmail: userNameOrEmailEl.value,
    password: passwordEl.value
  }

  if (userNameOrEmailIsValid && passwordIsValid) {
    axios.post("https://localhost:7102/api/Auth/Login", data)
      .then(res => {
        localStorage.setItem("response", JSON.stringify(res.data));
        Swal.fire({
          icon: 'success',
          title: 'Logged in!',
          text: 'You have successfully logged in.',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          gotoHome();
        });
      })
      .catch(error => {
        console.error("Login error:", error);
        if (error.response && error.response.data) {
          // Assuming the server sends back a plain text message
          const message = error.response.data.message || "An unexpected error occurred";
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An unexpected error occurred.',
          });
        }
      })    
  }
}

function register() {
  const nameEl = document.getElementById("name");
  const nameIsValid = nameEl.validity.valid;
  
  const lastNameEl = document.getElementById("lastName");
  const lastNameIsValid = lastNameEl.validity.valid;

  const userNameEl = document.getElementById("userName");
  const userNameIsValid = userNameEl.validity.valid;
  
  const emailEl = document.getElementById("email");
  const emailIsValid = emailEl.validity.valid;
  
  const passwordEl = document.getElementById("password");
  const passwordIsValid = passwordEl.validity.valid;
  
  if (!nameIsValid) {
    nameEl.className = "form-control is-invalid";
    document.querySelector(`#name + div`).innerHTML = nameEl.validationMessage;
  }

  if (!lastNameIsValid) {
    lastNameEl.className = "form-control is-invalid";
    document.querySelector(`#lastName + div`).innerHTML = nameEl.validationMessage;
  }

  if (!userNameIsValid) {
    userNameEl.className = "form-control is-invalid";
    document.querySelector(`#userName + div`).innerHTML = userNameEl.validationMessage;
  }

  if (!emailIsValid) {
    emailEl.className = "form-control is-invalid";
    document.querySelector(`#email + div`).innerHTML = emailEl.validationMessage;
  }

  if (!passwordIsValid) {
    passwordEl.className = "form-control is-invalid";
    document.querySelector(`#password + div`).innerHTML = passwordEl.validationMessage;
  }

  if (nameIsValid && passwordIsValid && userNameIsValid && emailIsValid && lastNameIsValid) {
    const data = {
      name: nameEl.value,
      lastname: lastNameEl.value,
      username: userNameEl.value,
      email: emailEl.value,
      password: passwordEl.value
    }

    axios.post("https://localhost:7102/api/Auth/Register", data).then(res => {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Registration completed successfully. You can log in now!"
      });
      gotoLogin();
    });
  }
}

function checkAuthentication() {
  const response = localStorage.getItem("response");
  if (!response) {
    gotoLogin();
    return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', function() {
  if (!checkAuthentication()){
    return;
  }
  checkSession();
  getTicketDetailsModal();
});

function setCurrentPage(page) {
  localStorage.setItem("currentPage", page);
}
function checkSession() {
  const currentPage = localStorage.getItem("currentPage");
  const isLoggedIn = localStorage.getItem("response");

  if (!isLoggedIn) {
    gotoLogin();
    return;
  }

  switch (currentPage) {
    case "home":
      gotoHome();
      break;
    case "login":
      gotoLogin();
      break;
    case "register":
      gotoRegister();
      break;
    default:
      gotoHome();
  }
}



function logout() {
  localStorage.removeItem("response");
  gotoLogin();
}