const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');
const errorElement = document.getElementById('error-element');
let selectedCategory = 1000;


const loadFetchCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategories(data.data);
}


const displayAllCategories = (data) => {
    // console.log(data);
    data.forEach(card => {

        // console.log(card);
        const newButton = document.createElement('button');
        newButton.classList = `category-btn btn  btn-ghost bg-slate-700 text-white text-lg`;
        newButton.innerText = card.category;
        newButton.addEventListener('click', () => {
            fetchDataByCategories(card.category_id)
            const allbtn = document.querySelectorAll('.category-btn');
            for (const btn of allbtn) {
                btn.classList.remove('bg-red-400')
            };
            newButton.classList.add('bg-red-400')

        })
        btnContainer.appendChild(newButton);
    });
}


const fetchDataByCategories = async (categoryId) => {
    selectedCategory = categoryId;
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    desplayFetchDataByCategories(data.data);
}

const desplayFetchDataByCategories = (data) => {
    if (data.length === 0) {
        errorElement.classList.remove('hidden');
    } else {
        errorElement.classList.add('hidden')
    }
    cardContainer.innerHTML = ``;
    data.forEach(video => {
        // verified batch
        let verifiedBatch = '';
        if (video.authors[0].verified) {
            verifiedBatch = `<img class="w-6 h-6" src="./images/verify.png" alt="">`
        }
        // verified batch end
        console.log(video);
        const newCard = document.createElement('div');
        newCard.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72">
                    <img class="w-full" src=${video.thumbnail} />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src=${video.authors[0].profile_picture} />
                        </div>
                        <div>
                            <h2 class="card-title">${video.title}</h2>
                            <div class="flex mt-3">
                                <p class="">${video.authors[0].profile_name}</p>
                                ${verifiedBatch}
                            </div>
                            <p class="mt-3">${video.others.views} </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(newCard)

    });
}


loadFetchCategories();
fetchDataByCategories(selectedCategory);