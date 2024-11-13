document.addEventListener("DOMContentLoaded", () => {
    const playerInfoCard = document.getElementById("player-info");

    // Add click event to flip the card
    playerInfoCard.addEventListener("click", () => {
        playerInfoCard.classList.toggle("flipped");
    });

    // Get the playerId from URL and fetch player info
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get("playerId");

    if (playerId) {
        fetchPlayerInfo(playerId);
    } else {
        console.error("playerId not found in URL");
    }
});

async function fetchPlayerInfo(playerId) {
    try {
        const response = await fetch("https://00ef4e9b-77f0-4770-a05e-852e0c3cce03-00-326iz8r73a3gm.riker.replit.dev/getPlayerInfo", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerId })
        });
        const playerData = await response.json();
        renderPlayerInfo(playerData);
    } catch (error) {
        console.error("Error fetching player info:", error);
    }
}

function renderPlayerInfo(playerData) {
    const playerInfoBack = document.getElementById("player-info-back");
    playerInfoBack.innerHTML = `
        <img src="${playerData.image}" alt="${playerData.name}" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px;">
        <h2>${playerData.name} (${playerData.nickName})</h2>
        <p><strong>Role:</strong> ${playerData.role}</p>
        <p><strong>Batting Style:</strong> ${playerData.bat}</p>
        <p><strong>Bowling Style:</strong> ${playerData.bowl}</p>
        <p><strong>Height:</strong> ${playerData.height}</p>
        <p><strong>International Team:</strong> ${playerData.intlTeam}</p>
        <p><strong>Teams:</strong> ${playerData.teams}</p>
        <p><strong>Birth Place:</strong> ${playerData.birthPlace}</p>
        <p><strong>Date of Birth:</strong> ${playerData.DoB}</p>
        <p><strong>Bio:</strong> ${playerData.bio}</p>
    `;
}
