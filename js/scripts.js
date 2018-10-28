$('.modal-container').hide();

const renderEmployee = employee => {
  const fullName = employee.name.first + ' ' + employee.name.last;
  const fullNameWithTitle = employee.name.title[0].toUpperCase() + employee.name.title.slice(2) + ' ' + employee.name.first[0].toUpperCase() + employee.name.first.slice(2) + ' ' + employee.name.last[0].toUpperCase() + employee.name.last.slice(2);
    birthday: employee.dob.date
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
}

const renderModalContainer = $element => {
  const imageLink = $element.children().eq(0).children().eq(0).attr('src');
  const fullName = $element.children().eq(1).children().eq(0).text();
  const email = $element.children().eq(1).children().eq(1).text();
  const city = $element.children().eq(2).children().eq(-1).text();
  const phone = $element.children().eq(2).children().eq(0).text();
  const address = $element.children().eq(2).children().eq(1).text();
  const birthday = $element.children().eq(2).children().eq(-2).text();
  $('.modal-img').attr('src', imageLink);
  $('.modal-name').text(fullName);
  $('.modal-text').eq(0).text(email);
  $('.modal-text').eq(1).text(city);
  $('.modal-text').eq(2).text(phone);
  $('.modal-text').eq(3).text(address);
  $('.modal-text').eq(4).text(birthday);
};

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
}

jQuery.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: data => {
    let renderedEmployees = '';
    data.results.forEach(employee => renderedEmployees += renderEmployee(employee));
    $('#gallery').html(renderedEmployees);
    $('.card').click(function() {
      renderModalContainer($(this));
      $('.modal-container').fadeIn(300);
    });
  }
});

$('#modal-close-btn').click(function() {
  renderModalContainer($(this));
  $('.modal-container').fadeOut(300);
});

$('.modal-container').click(function() {
  $(this).fadeOut(300);
})
