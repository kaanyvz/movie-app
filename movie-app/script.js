const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const main = document.querySelector("main");
const form = document.querySelector("form");
const searchBar = document.getElementById("searchBar");

getMovies(APIURL)

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies){

    main.innerHTML = "";

    movies.forEach(movie => {
        
        const {poster_path,title,vote_average,release_date} = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `

            <div class="movie-img">
                <img 
                src="${IMGPATH + poster_path}" 
                alt="${title}"
                />
            </div>
            <div class="movie-name">
                <h3>${title}</h3>
            </div>
            <div class="movie-info">
                <p>${release_date}</p>
                <span class ="${getClassByRate(vote_average)}" >Vote : ${vote_average}</span>
            </div>
        
        `;

        main.appendChild(movieEl);

    });
};


function getClassByRate(vote){
    if(vote >8){
        return "green";
    }else if(vote >=5) {
        return "orange";
    }else{
        return "red";
    }
}


form.addEventListener("submit",(e) =>{
    e.preventDefault();

    const searchTerm = searchBar.value;
    
    if(searchTerm){

        getMovies(SEARCHAPI + searchTerm);
            searchBar.value = "";
        }
})
