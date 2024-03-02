const btnContainer = document.getElementById('btn-container');

const loadFetchCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategories(data.data);
}


const displayAllCategories = (data) => {
    // console.log(data);
    data.forEach(card => {
        console.log(card);
        const newButton = document.createElement('button');
        newButton.classList = `btn  btn-ghost bg-slate-700 text-white text-lg`;
        newButton.innerText = card.category;
        newButton.addEventListener('click',()=>fetchDataByCategories(card.category_id))
        btnContainer.appendChild(newButton);
    });
}


const fetchDataByCategories = (categoryId) => {
    console.log(categoryId);
}


loadFetchCategories()