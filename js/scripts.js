// This function takes an item in employees array and spits out validly formatted HTML code with the information about the employee
const renderEmployee = employee => {
  const fullName = employee.name.first + ' ' + employee.name.last;
  // The full name with title properly capitalized (other cases use CSS capitalization, but here I decided to use it in alt attribute on image)
  const fullNameWithTitle = employee.name.title[0].toUpperCase() + employee.name.title.slice(2) + ' ' + employee.name.first[0].toUpperCase() + employee.name.first.slice(2) + ' ' + employee.name.last[0].toUpperCase() + employee.name.last.slice(2);
  // I used string literals to populate employees data into HTML
  // I also added a hidden div with data for the modal window
  let outputHTML = `<div class="card">
  <div class="card-img-container">
  <img class="card-img" src="${employee.picture.large}" alt="${fullNameWithTitle}">
  </div><div class="card-info-container">
  <h3 id="name" class="card-name cap">${fullName}</h3>
  <p class="card-text">${employee.email}</p>
  <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
  </div>
  <div class="hidden">
  <span class="phone">${employee.phone}</span>
  <span class="address">${employee.location.street}, ${employee.location.state} ${employee.location.postcode}</span>
  <span class="dob">${employee.dob.date.slice(0, 10)}</span>
  <span class="city">${employee.location.city}</span>
  </div>
  </div>`;
  return outputHTML;
};

// This function will render modal container when a click on a .card occurs
const renderModalContainer = $element => {
  // I did not figure the proper way to do it with jQuery data() method
  // I understand this is verbose, but it worked out great.
  const imageLink = $element.children().eq(0).children().eq(0).attr('src');
  $('.modal-img').attr('src', imageLink);

  const fullName = $element.children().eq(1).children().eq(0).text();
  $('.modal-name').text(fullName);

  const email = $element.children().eq(1).children().eq(1).text();
  $('.modal-text').eq(0).text(email);

  const city = $element.children().eq(2).children().eq(-1).text();
  $('.modal-text').eq(1).text(city);

  const phone = $element.children().eq(2).children().eq(0).text();
  $('.modal-text').eq(2).text(phone);

  const address = $element.children().eq(2).children().eq(1).text();
  $('.modal-text').eq(3).text(address);

  const birthday = $element.children().eq(2).children().eq(-2).text();
  $('.modal-text').eq(4).text(birthday);

};

// In index.html it was said that the modal window should be created dynamically
const createModalAndAppendItToTheBody = () => {
  $('body').append(`<div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
              <h3 id="name" class="modal-name cap">name</h3>
              <p class="modal-text">email</p>
              <p class="modal-text cap">city</p>
              <hr>
              <p class="modal-text">(555) 555-5555</p>
              <p class="modal-text cap">123 Portland Ave., Portland, OR 97204</p>
              <p class="modal-text">Birthday: 10/21/2015</p>
          </div>
      </div>`);
};

// So here it does so
createModalAndAppendItToTheBody();
$('.modal-container').hide();

// Here we make an AJAX request to the API
jQuery.ajax({
  // ?results=12 is the way to request info for 12 users
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: data => {
    // This variable will hold HTML code for all employees
    let renderedEmployees = '';
    // So we iterate over the array in the response and add valid HTML to the variable
    data.results.forEach(employee => renderedEmployees += renderEmployee(employee));
    // And set HTML content of the #gallery with our employees' HTML
    $('#gallery').html(renderedEmployees);
    // The click event is here since in the beginning there are no .card in the DOM
    $('.card').click(function() {
      // We populate elements of the modal container with employee data
      renderModalContainer($(this));
      // And show this modal container
      $('.modal-container').fadeIn(300);
    });
  }
});

// The click event on the close button in the modal container
$('#modal-close-btn').click(function() {
  $('.modal-container').fadeOut(300);
});

// The click event anywhere inside the modal container to hide it
$('.modal-container').click(function() {
  $(this).fadeOut(300);
});
