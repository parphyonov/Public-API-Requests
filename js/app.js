const renderEmployee = employee => {
  const fullName = employee.name.first[0].toUpperCase() + employee.name.first.slice(2) + ' ' + employee.name.last[0].toUpperCase() + employee.name.last.slice(2);
  const fullNameWithTitle = employee.name.title[0].toUpperCase() + employee.name.title.slice(2) + ' ' + employee.name.first[0].toUpperCase() + employee.name.first.slice(2) + ' ' + employee.name.last[0].toUpperCase() + employee.name.last.slice(2);
  let outputHTML = `<div class="card"><div class="card-img-container"><img class="card-img" src="${employee.picture.medium}" alt="${fullNameWithTitle}"></div><div class="card-info-container"><h3 id="name" class="card-name cap">${fullName}</h3><p class="card-text">${employee.email}</p><p class="card-text cap">${employee.location.city}, ${employee.location.state}</p></div></div>`;
  return outputHTML;
}

jQuery.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: data => {
    let renderedEmployees = '';
    data.results.forEach(employee => renderedEmployees += renderEmployee(employee));
    $('#gallery').html(renderedEmployees);
  }
});
