// Sample data for news, team members, and images
const newsData = [
    "India wins a historic match against Australia in the Border-Gavaskar Trophy!",
    "Virat Kohli scores a double century in the second Test against Sri Lanka.",
    "BCCI announces the squad for the 2024 World Cup."
];

const teamData = [
    { name: "Virat Kohli", role: "Batsman", image: "virat.jpg", stats: "Matches: 100, Runs: 7000, Average: 52.50" },
    { name: "Rohit Sharma", role: "Opener", image: "rohit.jpg", stats: "Matches: 200, Runs: 8000, Average: 48.00" },
    { name: "Jasprit Bumrah", role: "Bowler", image: "bumrah.jpg", stats: "Matches: 50, Wickets: 150, Average: 24.30" }
];

const galleryImages = [
    "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"
];

// Dynamically load the latest news
window.onload = () => {
    const newsContainer = document.getElementById("news");
    newsData.forEach(news => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.innerHTML = `<p>${news}</p>`;
        newsContainer.appendChild(newsItem);
    });

    // Load team profiles
    const teamContainer = document.getElementById("team-members");
    teamData.forEach(member => {
        const profileCard = document.createElement("div");
        profileCard.classList.add("profile-card");
        profileCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
            <p>${member.stats}</p>
        `;
        teamContainer.appendChild(profileCard);
    });

    // Load gallery images
    const galleryContainer = document.getElementById("image-gallery");
    galleryImages.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.alt = "Cricket Match";
        galleryContainer.appendChild(imgElement);
    });
};

// Filter gallery images by search term
function filterGallery() {
    const query = document.getElementById("search").value.toLowerCase();
    const images = document.querySelectorAll("#image-gallery img");

    images.forEach(img => {
        const altText = img.alt.toLowerCase();
        img.style.display = altText.includes(query) ? "block" : "none";
    });
}


async function fetchTeamRecords() {
    try {
        const response = await fetch("https://00ef4e9b-77f0-4770-a05e-852e0c3cce03-00-326iz8r73a3gm.riker.replit.dev/getIndianTeamList", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json', // Important to specify JSON content type
            },
        });
        const data = await response.json();

        // Check if data.list is an array and handle it accordingly
        if (data && Array.isArray(data.list) && data !== undefined) {
            renderTeamRecords(data.list);
        } else {
            console.error("Unexpected data format:", data);
        }
    } catch (error) {
        console.error("Error fetching team data:", error);
    }
}

function renderTeamRecords(teams) {
    const teamRecordsDiv = document.getElementById("team-records");
    if (!teamRecordsDiv) {
        console.error("Element with id 'team-records' not found.");
        return;
    }
    teamRecordsDiv.innerHTML = ""; // Clear previous content

    // Loop through each team and create HTML elements for teamId and teamName only
    teams.forEach(team => {
        if (team.teamId && team.teamName) {
            const teamDiv = document.createElement("div");
            teamDiv.className = "team";
            teamDiv.innerHTML = `
                <p>Team ID: ${team.teamId}</p>
                <p>Team Name: ${team.teamName}</p>
            `;
            // Add a click event to navigate to profile page with teamId in URL
            teamDiv.onclick = () => {
                // Redirect to profile page with teamId as a query parameter
                window.location.href = `profile.html?teamId=${team.teamId}`;
            };

            teamRecordsDiv.appendChild(teamDiv);
        }
    });
}

// Call the function to fetch and display team records
fetchTeamRecords();
