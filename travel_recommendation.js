let travelData = null;

// Load JSON
fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((json) => {
        travelData = json;
        console.log("API Loaded:", json);
    })
    .catch((error) => console.error("Error loading JSON:", error));



// SEARCH FUNCTION
function search() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!input.trim()) {
        resultsDiv.innerHTML = "<p>Please enter a search keyword.</p>";
        return;
    }

    let results = [];

    // Country search
    travelData.countries.forEach(country => {
        if (country.name.toLowerCase().includes(input)) {
            results.push(...country.cities);
        }
    });

    // Beach search
    if (input.includes("beach") || input.includes("beaches")) {
        results.push(...travelData.beaches);
    }

    // Temple search
    if (input.includes("temple") || input.includes("temples")) {
        results.push(...travelData.temples);
    }

    // No results
    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
    }

    // Display results
    results.forEach(item => {
        resultsDiv.innerHTML += `
            <div class="result-card">
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;
    });
}



// RESET BUTTON
function clearResults() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
}
