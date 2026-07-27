const library = document.getElementById("library");
const searchBox = document.getElementById("search");

let publications = [];

fetch("library.json")
    .then(response => response.json())
    .then(data => {

        publications = data;

        // Sort newest first
        publications.sort((a,b)=>{

            const yearA=parseInt(a.date)||0;
            const yearB=parseInt(b.date)||0;

            return yearB-yearA;

        });

        display(publications);

    });

function display(items){

    library.innerHTML="";

    items.forEach(item=>{

        const authors=(item.creators||[])
        .map(a=>`${a.firstName||""} ${a.lastName||""}`.trim())
        .join(", ");

        const tags=(item.tags||[])
        .map(tag=>`<span class="tag">${tag.tag}</span>`)
        .join("");

        const card=document.createElement("div");

        card.className="card";

        card.innerHTML=`
            <h2>${item.title||"Untitled"}</h2>

            <div class="meta">
                <strong>${item.itemType}</strong><br>
                ${authors}<br>
                ${item.publicationTitle||item.publisher||""}<br>
                ${item.date||""}
            </div>

            <div class="abstract">
                ${item.abstractNote||""}
            </div>

            <div class="tags">
                ${tags}
            </div>

            ${
                item.url
                ? `<p><a href="${item.url}" target="_blank">View Publication</a></p>`
                : ""
            }
        `;

        library.appendChild(card);

    });

}

searchBox.addEventListener("input",()=>{

    const search=searchBox.value.toLowerCase();

    display(

        publications.filter(item=>

            JSON.stringify(item)
            .toLowerCase()
            .includes(search)

        )

    );

});
