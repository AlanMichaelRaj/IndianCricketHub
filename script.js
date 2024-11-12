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
