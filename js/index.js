///<reference types='../@types/jquery'/>
let foodCard=document.getElementById('foodCard')
let loader = document.getElementById('loading')

function loading() {
  // window.addEventListener('load',()=>{
  //   loader.classList.add('d-none')
  //   loader.addEventListener('transitionend',()=>{
  //     loader.classList.remove('d-none')
  //   })
  // })
    // $('#loading i').fadeOut(400)  
}

$('#bars').on('click' , function(){
    $('.menu').css({width:'250px'} , 200)
    $('#close').removeClass('d-none')
    $('#bars').addClass('d-none')
})
function closeNav() {
  $('.menu').css({width:'0px'} , 200)
  $('#close').addClass('d-none')
  $('#bars').removeClass('d-none')
  }
function close() {
  $('.card').on('click',()=>{
    if($('#bars').hasClass('d-none')){
      closeNav()   
  }
})
    
  }
$('.menu a').on('click',()=>{
  // $('.menu').addClass('d-none')
  closeNav()
})

$('#close').on('click' , function(){
    // $('.menu').addClass('d-none')
  closeNav()
})

// ==================================
  //Search

function searchOnApi(){
let searchContent = document.getElementById('searchContent')
  foodCard.innerHTML=''

searchContent.innerHTML=` 
 <div class="col-md-6">
 <input id="searchN" class=" form-control" oninput='searchByName()' placeholder="Search By Name" />
 </div>
 <div class="col-md-6">
 <input id="searchL" class="form-control" oninput='searchByName()' placeholder="Search By First Litter" />
 </div>
  `
  }

  function searchByName(){ 
let searchN=  document.getElementById('searchN')
let searchL=  document.getElementById('searchL')
getsearchByName(searchN.value)
getsearchByFirstLetter(searchL.value)
}

async function getsearchByName(sVal){
let http = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${sVal}`)
http =await http.json()
displayFoodAboutA_I(http.meals)
close()
$('#loading i').fadeOut(400)  
return http.meals
}

async function getsearchByFirstLetter(letter){
let http = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
http =await http.json()
$('#loading i').fadeIn(400)
displayFoodAboutA_I(http.meals)
}

async function start(){
  let values =await getsearchByName(' ')
}
start()
// ==================================
// Cateegory        
        function displayFood(data){
          contactData.innerHTML=''
                searchContent.innerHTML=''
          let box=''
          for(let i =0 ; i<data.length ; i++){
              box+=`
              <div class="col-md-3">
              <div class="card" onclick="getCategoryMeal('${data[i].strCategory}')">
                <img class="" w-100 src="${data[i].strCategoryThumb}" alt="Title">
                <div class="layer">
               <div class="layer-content">
                <h3 class="text-center">${data[i].strCategory}</h3>
                <p>${data[i].strCategoryDescription.split(" ",20).join(" ")}</p>
                </div>
                </div
                </div>
              </div>
            </div>
              `
          }
          foodCard.innerHTML=box
        }
        
            async function getFoodByCategories(){
    let httpReq= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let res= await httpReq.json()
displayFood(res.categories)
close()

}

function displayCatMeals(dataMeal){
        searchContent.innerHTML=''
contactData.innerHTML=''
let boxMeal=''
for(let i =0 ; i<dataMeal.length ; i++){
  boxMeal+=`
    <div class="col-md-3">
    <div class="card" onclick="getDetails('${dataMeal[i].idMeal}')" >
      <img class="" w-100 src="${dataMeal[i].strMealThumb}" alt="Title">
      <div class="layer">
      <h3>
        ${dataMeal[i].strMeal}
      </h3>
      </div>
    </div>
  </div>
    `
}
foodCard.innerHTML=boxMeal
}

async function getCategoryMeal(meal){
    foodCard.innerHTML=''
    let httpReq= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`)
    let res= await httpReq.json()
    displayCatMeals(res.meals)
    close()

 
}

// =======================================
//Details

async function getDetails (id){
  let httpReq= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  let res= await httpReq.json()
  displayDetails(res.meals[0])
  close()

}

function displayDetails(data) {
          searchContent.innerHTML=''
contactData.innerHTML=''

  let recipes = ``
  for (let i = 1; i <= 20; i++) {
      if (data[`strIngredient${i}`]) {
        recipes += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
      }
  }

  let tagsStr = data.strTags?.split(",")
  // let tags = meal.strTags.split(",")
  let tags = ''
  for (let i = 0; i < tagsStr.length; i++) {
      tags += `
      <li class="alert alert-danger m-2 p-1">${tagsStr[i]}</li>`
  }
  // ${data[i].strTags}
  let boxMeal=''
    boxMeal=`
    <div class="col-md-4">
     <div class="img-content">
     <img src='${data.strMealThumb}' class="w-100"  />
     <p>${data.strMeal}</p>
     </div>
      </div>
      <div class="col-md-8 p-2">
      <div class="instructions">
      <h2>Instructions</h2>
      <p class="strInstruc">${data.strInstructions}</p>
      <h3>Area : <span class="details-span">${data.strArea}</span></h3>
      <h3>Category : <span class="details-span">${data.strCategory}</span></h3>
      <h3>Recipes : </h3>
      <ul class='ps-0 details-list d-flex flex-wrap'>${recipes}</ul>
      <h3>Tags : </h3>
      <ul class='ps-0 details-list d-flex flex-wrap'>
      ${tags ? tags : ''} 
      </ul>
      <div class="btns">
      <button  class="btn rounded-2 btn-success">Source</button>
      <button class="btn rounded-2 btn-danger"><a href='${data.strYoutube}'>Youtube</a></button>
      </div>
      </div>
      </div>
    
      `
  
  foodCard.innerHTML=boxMeal
  
}

// ==================================
//Area
 
function displayAreaFunc(data){
        searchContent.innerHTML=''
contactData.innerHTML=''
let box=''
for(let i=0 ; i <data.length ; i++){
box+=`
<div class="col-md-3">
<div class="card text-white text-center area" onclick="getFoodArea('${data[i].strArea}')" >
<span><i class="custome-icone fa fa-house-laptop"></i></span>          
<h3>
 ${data[i].strArea}
</h3>
</div>
</div>
`
}
foodCard.innerHTML=box

}




async function getArea(){
let httpReq= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
let res= await httpReq.json()
displayAreaFunc(res.meals)   
close()
}



function displayFoodAboutA_I(dataMeal){
  contactData.innerHTML=''
let boxMeal=``
if(dataMeal !== null)
for(let i =0 ; i<dataMeal.length ; i++){
boxMeal+=`
<div class="col-md-3">
<div class="card" onclick="getDetails('${dataMeal[i].idMeal}')" >
<img class="w-100" src="${dataMeal[i].strMealThumb}" alt="Title">
<div class="layer">
<h3>
  ${dataMeal[i].strMeal}
</h3>
</div>
</div>
</div>
`
}
foodCard.innerHTML=boxMeal
}




async function getFoodArea(country){
foodCard.innerHTML=''
contactData.innerHTML=''
let httpReq= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
let response= await httpReq.json()
// console.log(response.meals)
displayFoodAboutA_I(response.meals)
close()

}


// ===============================================
//Ingredients

async function getIngredients() {
  foodCard.innerHTML=''
  // contactData.innerHTML=''
  let http = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list  `)
  let res = await http.json()  
  displayIngredients(res.meals.slice(0,20))
  close()

}


function displayIngredients(data) { 
   searchContent.innerHTML=''
contactData.innerHTML=''
let ingeBox=''
for(let i=0 ; i <data.length;i++){
  ingeBox+=`
  <div class="col-md-3">
            <div class="card text-white text-center"  onclick="getIngredientsMeals('${data[i].strIngredient}')"            >
              <i class="custome-icone fa-solid fa-drumstick-bite"></i>
              <h2 class="mb-1">${data[i].strIngredient}</h2>
              <p>${data[i].strDescription.split(' ').slice(0,20).join(' ')}</p>
            </div>
          </div>
  
  `
} 
foodCard.innerHTML=ingeBox

 }


async function getIngredientsMeals(meal){

  foodCard.innerHTML=''
let httpReq= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
let response= await httpReq.json()
// console.log(response.meals)
displayFoodAboutA_I(response.meals)
}




 


