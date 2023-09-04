
let contactData = document.getElementById('foodCard')
function contact() { 
  foodCard.innerHTML=''
    searchContent.innerHTML=''
    contactData.innerHTML=`
    <div class="container w-75 m-auto">
       <form oninput="checkAllInputs()" class="d-flex align-items-center">
       <div class="row g-4" id="contactData">

   <div class="col-md-6">
   <input type="text" class="form-control" id="userN" oninput="validationForName() "  name="userName" placeholder="Enter Your Name">
   <p class='alert alert-danger d-none' id='nameAlert'>Special characters and numbers not allowed</p>
  </div>
 <div class="col-md-6">
  <input type="email" class="form-control" id="userE" oninput="validationForEmail()" name="userEmail" placeholder="Enter Your Email">
  <p class='alert alert-danger d-none' id='emailAlert'>Email not valid *exemple@yyy.zzz </p>
 
 </div>
 <div class="col-md-6">
  <input type="number"class="form-control" id="phone" oninput="validationForPhone()"name="userPhone" placeholder="Enter Your Phone">
  <p class='alert alert-danger d-none' id='phoneAlert'>Enter valid Phone Number </p>
  
 </div>
 <div class="col-md-6">
  <input type="number" class="form-control" id="userAge"oninput="validationForAge()" name="userAge" placeholder="Enter Your Age">
  <p class='alert alert-danger d-none' id='ageAlert'>Enter valid Age</p>
 
 </div>
 <div class="col-md-6">
  <input type="password" class="form-control" id="pass"oninput="validationForPass()" name="userPassword" placeholder="Enter Your Password">
  <p class='alert alert-danger d-none' id='passAlert'>Enter valid password *Minimum eight characters, at least one letter and one number:*
  </p>
 </div>
 <div class="col-md-6">
  <input type="password" class="form-control" id="rePass" oninput="validationForRePass()" name="rePassword" placeholder="Repassword">
  <p class='alert alert-danger d-none' id='rePassAlert'>Posswords does not match</p>
 </div> 
 <button id="btn" class="btn btn-outline-danger w-auto mx-auto" disabled>submit</button>
 </form>
 </div>
 </div>
    `
  
   }
  
  
   function validationForName() {
    let userN=document.getElementById('userN') 
    let nameAlert=document.getElementById('nameAlert')
      let userRegx = /^[a-zA-Z ]+$/
      if(!userRegx.test(userN.value)){
          nameAlert.classList.remove('d-none')
      }else{
        nameAlert.classList.add('d-none')
        return true
      }
      
     }
  
  
    function validationForEmail(){
      let userE=document.getElementById('userE')
      let emailAlert=document.getElementById('emailAlert')
      let emailRegx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
      if(!emailRegx.test(userE.value.toLowerCase())){
          emailAlert.classList.remove('d-none')
      }else{
        emailAlert.classList.add('d-none')
        return true
      }
    } 
  
  
    function validationForPhone(){
      let phone=document.getElementById('phone')
      let phoneAlert=document.getElementById('phoneAlert')
      let regxPhone = /^01[0125]\d{8}$/
      // let regxPhone = /^01(0|1|2|5)\d{8}$/
        !regxPhone.test(phone.value) ? phoneAlert.classList.remove('d-none')
        :
        phoneAlert.classList.add('d-none')
        return true      
    }
  
    function validationForAge(){
      let age=document.getElementById('userAge')
      let ageAlert=document.getElementById('ageAlert')
      let regxAge=/^[1-9]?[0-9]{1}$/
        if(regxAge.test(age.value)){
          ageAlert.classList.add('d-none')
          return true
        }else{
          ageAlert.classList.remove('d-none')
  
        }
      }
      
  
    function validationForPass() {
      let regxPass= /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
      let pass = document.getElementById('pass')
      let passAlert = document.getElementById('passAlert')
      localStorage.setItem('password',JSON.stringify(pass.value))
      if(regxPass.test(pass.value)){
        passAlert.classList.add('d-none')
        return true
      }else{
        passAlert.classList.remove('d-none')
  
      }
    }  
  
    function validationForRePass(){
      let rePass = document.getElementById('rePass')
      let rePassAlert = document.getElementById('rePassAlert')
  
    if(JSON.parse(localStorage.getItem('password'))==rePass.value){
      rePassAlert.classList.add('d-none')
      return true
     }else{
      rePassAlert.classList.remove('d-none')
     }
    }

function checkAllInputs() {
      if(
      validationForName() &&
      validationForEmail()&&
      validationForPhone()&&
      validationForAge()&&
      validationForPass()&&
      validationForRePass()
      ){
        // btn.disabled =false
        document.getElementById('btn').removeAttribute('disabled')
      } else{
        document.getElementById('btn').setAttribute('disabled' , true)

      }
   
    }
