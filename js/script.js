//load all pets
const loadAllPets = async () => {
  const pets = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const response = await pets.json();
  displayAllPets(response.pets);
};

//load one pet picture by id
const loadOnePet = async (id) => {
  const pet = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const res = await pet.json();
  displayOnePet(res.petData);
};

//display one pet picture
const displayOnePet = (data) => {
  const petPic = document.getElementById("petPic");
  const div = document.createElement("div");
  div.innerHTML = `
            <div class="flex flex-col border border-gray-400 rounded-lg p-4">
              
                <img class="rounded-lg h-[160px] w-full" src=${data.image} alt="" />
              </div>
             `;
  petPic.appendChild(div);
};

//load details of a pet
const loadDetails = async (id) => {
  const details = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const res = await details.json();
  displayDetails(res.petData);
};

//show details modal
const displayDetails = (data) => {
  const modal = document.getElementById("modalContainer");
  // modal.classList.remove("hidden");
  modal.innerHTML = `
  
  
  <img class="w-full rounded-lg" src=${data.image} alt="" />
  <h1 class="text-2xl font-bold">${data.pet_name}</h1>
  
  <div class="flex items-center gap-3">
                
              <img src="./images/grid.png" class="w-[20px]" alt="" />
                <h1>Breed:${data.breed ? data.breed : "Not Found"}</h1>
              </div>
  <div class="flex items-center gap-3">
                <i class="fa-regular fa-calendar"></i>
                <h1>Birth:${
                  data.date_of_birth ? data.date_of_birth : `Not Found`
                }</h1>
              </div>
               <div class="flex items-center gap-3">
                <i class="fa-solid fa-venus"></i>
                <h1>Gender:${data.gender ? data.gender : "Not found"}</h1>
              </div>
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-dollar-sign"></i>
                <h1>Price:  ${data.price ? data.price : `Not available`}</h1>
              </div>
              <div class="flex items center gap-3">
              <i class="fa-solid fa-venus"></i>
              <p>${data.vaccinated_status}</p>
              </div>
  

              <hr class="my-4"/>
              <h1 class="mb-4 font-bold">Details Information</h1>
              <p>${data.pet_details}</p>
  
    `;
  document.getElementById("my_modal_5").showModal();
};

//display all pets
const displayAllPets = (data) => {
  const allPets = document.getElementById("allPets");
  document.getElementById("spinnerID").classList.remove("hidden");
  allPets.innerHTML = "";
  setTimeout(() => {
    document.getElementById("spinnerID").classList.add("hidden");
    if (data.length === 0) {
      allPets.classList.remove("grid");
      allPets.innerHTML = `
      <div class="flex flex-col justify-center items-center  h-[500px] bg-slate-300 rounded-lg p-8">
      <h1 class="text-2xl text-center">No information available</h1>
      <img src="./images/error.webp" alt="" />
      <p class="text-center w-4/6 mx-auto">No pets found? Don’t worry! More pets are added often. Try expanding your search criteria, and you’ll soon find the perfect companion waiting for you.</p>
      </div>
      `;
      return;
    } else {
      allPets.classList.add("grid");
    }
    data.forEach((element) => {
      const div = document.createElement("div");
      div.innerHTML = `
     <div class="flex flex-col border border-gray-400 rounded-lg p-4">
                <div >
                  <img class="rounded-lg h-[180px] w-full" src=${
                    element.image
                  } alt="" />
                </div>
                <h1 class="text-2xl font-bold">${element.pet_name}</h1>
                <div class="py-4">
                <div class="flex items-center gap-3">
                  
                  <img src="./images/grid.png" class="w-[20px] flex items-center gap-3" alt="" />
                  <h1>Breed:${element.breed ? element.breed : "Not Found"}</h1>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fa-regular fa-calendar"></i>
                  <h1>Birth:${
                    element.date_of_birth
                      ? element.date_of_birth
                      : `Unavailable`
                  }</h1>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fa-solid fa-venus"></i>
                  <h1>Gender:${
                    element.gender ? element.gender : "Not Found"
                  }</h1>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fa-solid fa-dollar-sign"></i>
                  <h1>Price:  ${
                    element.price ? element.price : `Not available`
                  }</h1>
                </div>
  
                <div class="flex gap-2 justify-center items-center mt-4">
                  <button onclick="loadOnePet(${
                    element.petId
                  })" class="btn text-lg"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button onclick="countDown()" class="btn text-teal-700 font-bold text-lg border-teal-200">Adopt</button>
                  <button onclick="loadDetails(${
                    element.petId
                  })" class="btn text-teal-700 font-bold text-lg border-teal-200">Details</button>
                </div>
                </div>
              </div>
              `;
      allPets.appendChild(div);
    });
  }, 2000);

  setTimeout(() => {
    let sortPrice = document.getElementById("priceButton");
    sortPrice.addEventListener("click", () => {
      data.sort((a, b) => b.price - a.price);
      allPets.innerHTML = "";
      console.log(data);
      data.forEach((element) => {
        const div = document.createElement("div");
        div.innerHTML = `
       <div class="flex flex-col border border-gray-400 rounded-lg p-4">
                  <div>
                    <img class="rounded-lg h-[180px] w-full" src=${
                      element.image
                    } alt="" />
                  </div>
                  <h1 class="text-2xl font-bold">${element.pet_name}</h1>
                  <div class="py-4">
                  <div class="flex items-center gap-3">
                    
                    <img src="./images/grid.png" class="w-[20px]" alt="" />
                    <h1>Breed:${
                      element.breed ? element.breed : "Not found"
                    }</h1>
                  </div>
                  <div class="flex items-center gap-3">
                    <i class="fa-regular fa-calendar"></i>
                    <h1>Birth:${
                      element.date_of_birth
                        ? element.date_of_birth
                        : `Unavailable`
                    }</h1>
                  </div>
                  <div class="flex items-center gap-3">
                    <i class="fa-solid fa-venus"></i>
                    <h1>Gender:${
                      element.gender ? element.gender : "Not found"
                    }</h1>
                  </div>
                  <div class="flex items-center gap-3">
                    <i class="fa-solid fa-dollar-sign"></i>
                    <h1>Price:  ${
                      element.price ? element.price : `Not available`
                    }</h1>
                  </div>
    
                  <div class="flex gap-2 justify-center items-center mt-4">
                    <button onclick="loadOnePet(${
                      element.petId
                    })" class="btn text-lg"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button class="btn text-teal-700 font-bold text-lg border-teal-200">Adopt</button>
                    <button onclick="loadDetails(${
                      element.petId
                    })" class="btn text-teal-700 font-bold text-lg border-teal-200">Details</button>
                  </div>
                  </div>
                </div>
                `;
        allPets.appendChild(div);
      });
    });
  }, 2000);
};

//load categories
const loadCategory = async () => {
  const category = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const res = await category.json();
  displayCategory(res.categories);
  res.categories.forEach((element) => {
    const active = element.id;
    const activeBtn = document.getElementById(`btn-${active}`);
  });
};

//remove active button
const removeActiveButton = () => {
  const remove = document.getElementsByClassName("category-btn");
  for (const btn of remove) {
    btn.classList.remove("bg-red-500", "text-white");
  }
};

//load pets by category
const loadPetsByCategory = async (name) => {
  removeActiveButton();
  const active = document.getElementById(`btn-${name}`);
  active.classList.add("bg-red-500", "text-white");
  const category = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${name}`
  );
  const res = await category.json();
  displayAllPets(res.data);
};

//display categories
const displayCategory = (data) => {
  data.forEach((element) => {
    const category = document.getElementById("category");
    const button = document.createElement("button");
    button.innerHTML = `
        <button  id="btn-${element.category}" onclick="loadPetsByCategory('${element.category}')"
            class="category-btn  flex items-center gap-4 border border-gray-400 rounded-md p-3  w-[150px] mb-10"
          >
            <img class="h-[30px]" src=${element.category_icon} alt="" />
            <h1 class="font-bold" text-lg>${element.category}</h1>
            
          </button>`;
    category.appendChild(button);
  });
};

const countDown = () => {
  let count = 3;
  const clockId = setInterval(() => {
    const countDown = document.getElementById("countDown");
    countDown.innerHTML = `${count}`;
    count--;

    if (count < 0) {
      clearInterval(clockId);
      return;
    }
  }, 1000);

  document.getElementById("customModal").showModal();
  setTimeout(() => {
    document.getElementById("customModal").close();
  }, 3000);
};

//scroll
const scrollAdoptSection = (Id) => {
  const scroll = document.getElementById(Id);
  scroll.scrollIntoView({ behavior: "smooth" });
};

loadCategory();
loadAllPets();
