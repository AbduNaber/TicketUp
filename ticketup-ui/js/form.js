function getFormValues() {
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const mailAddress = document.getElementById('mail-address').value;
  const phoneNumber = document.getElementById('phone-number').value;
  const organization = document.getElementById('organization').value;
  const title = document.getElementById('title').value;
  const website = document.getElementById('website').value;
  const city = document.getElementById('city').value;

  const yesCheckbox = document.querySelector('input[name="answer"][value="yes"]');
  const noCheckbox = document.querySelector('input[name="answer"][value="no"]');

  const termsConditionsChecbox = document.querySelector('input[name="terms"][value="accepted"]');

  console.log("Name: " + name);
  console.log("Surname: " + surname);
  console.log("Mail Address: " + mailAddress);
  console.log("Phone Number: " + phoneNumber);
  console.log("Organization: " + organization);
  console.log("Title: " + title);
  console.log("Website: " + website);
  console.log("City: " + city);

  if (yesCheckbox.checked) {
    console.log('Evet seçildi');
  } else if (noCheckbox.checked) {
    console.log('Hayır seçildi');
  } else {
    console.log('Hiçbir seçenek seçilmedi');
  }

  if(termsConditionsChecbox.checked) {
    console.log('Kullanıcı sözleşmesi kabul edildi');
  }
  else{
    console.log('Kullanıcı sözleşmesi kabul edilmedi');
  }
}

function resetForm() {
  const form = document.querySelector('.form');
  form.reset();
  
  const checkboxes = document.querySelectorAll('.form input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  console.log("Form verileri sıfırlandı!");
}
