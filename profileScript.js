async function fetchTeamProfile(teamId) {
    try {
        const response = await fetch("https://00ef4e9b-77f0-4770-a05e-852e0c3cce03-00-326iz8r73a3gm.riker.replit.dev/getIndianTeamProfiles", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({ teamId: teamId }) // Send the teamId in the request body
        });

        const profileData = await response.json();
        
        // Log the profile data to inspect the structure
        console.log("Profile Data:", profileData);
        
        renderProfileData(profileData);
    } catch (error) {
        console.error("Error fetching team profile:", error);
    }
}

function renderProfileData(profileData) {
    const profileDataDiv = document.getElementById("profile-data");
    if (!profileDataDiv) {
        console.error("Element with id 'profile-data' not found.");
        return;
    }

    // Clear previous content
    profileDataDiv.innerHTML = "";

    // Check if profileData contains the players array
    const players = profileData || []; // Adjust this based on the actual response

    // Loop through each player and display their profile info
    players.forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "player-profile";
        playerDiv.innerHTML = `
            <p><strong>Player Name:</strong> ${player.PlayerName}</p>
            <p><strong>Matches Played:</strong> ${player.MatchesPlayed}</p>
            <p><strong>Innings Played:</strong> ${player.InningsPlayed}</p>
            <p><strong>Runs Scored:</strong> ${player.RunsScored}</p>
            <p><strong>Total Runs:</strong> ${player.TotalRuns}</p>
            <p><strong>Batting Average:</strong> ${player.BattingAverage}</p>
            <hr>
        `;
        profileDataDiv.appendChild(playerDiv);
    });
}



// Get teamId from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const teamId = urlParams.get('teamId');
console.log(teamId)

if (teamId) {
    fetchTeamProfile(teamId); // Fetch profile data if teamId is found
} else {
    console.error("teamId not found in URL");
}


