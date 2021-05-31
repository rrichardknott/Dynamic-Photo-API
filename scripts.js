var searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function(e){
    e.preventDefault();

var photoContainer = document.querySelector("#photoContainer");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {           
           var data = JSON.parse(xhttp.responseText);               
               photoContainer.innerHTML = "";
               photoData = data.photos;
            if(photoData.length > 0){                
               photoData.forEach(function(photo){                   
                    var photoCol = document.createElement("div");   
                    photoCol.classList.add("photoCol");
                    photoCol.innerHTML = 
                    `
                        <a href="${photo.url}" target="_blank"><img id="image" src=${photo.src.large}></a>                   
                        <div id="photographer">Photographer: ${photo.photographer}</div>
                        <div id="url"><a href="${photo.url}" target='_blank' >Photo URL<span> 📷 </span></a></div>
                        <div id="id">Photo Id: ${photo.id}</div>
                        
                    `;
                   
                    photoContainer.append(photoCol);
               })   
           }
           else {               
               console.log("nothing was returned");
               photoContainer.innerHTML = `<h2 id="noResults">Your search criteria " ${searchValue} " produced no results</h2>`;
               
           }
          
        }
    };
    var searchValue = document.querySelector("#search-bar").value;
    xhttp.open("GET", `https://api.pexels.com/v1/search?per_page=12&query=${searchValue}`, true);
    xhttp.setRequestHeader("Authorization", "563492ad6f91700001000001f204b9af6b794fdca2c1399f30006d28");
    xhttp.send();
})
