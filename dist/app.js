"use strict";
let incidents = [
    {
        id: 1,
        title: "Biased Recommendation Algorithm",
        description: "Algorithm consistently favored certain demographics...",
        severity: "Medium",
        reported_at: "2025-03-15T10:00:00Z",
    },
    {
        id: 2,
        title: "LLM Hallucination in Critical Info",
        description: "LLM provided incorrect safety procedure information...",
        severity: "High",
        reported_at: "2025-04-01T14:30:00Z",
    },
    {
        id: 3,
        title: "Minor Data Leak via Chatbot",
        description: "Chatbot inadvertently exposed non-sensitive user metadata...",
        severity: "Low",
        reported_at: "2025-03-20T09:15:00Z",
    },
];
const incidentList = document.getElementById('incidentList');
const filterSeverity = document.getElementById('filterSeverity');
const sortDate = document.getElementById('sortDate');
const form = document.getElementById('incidentForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const severityInput = document.getElementById('severity');
function renderIncidents() {
    const severity = filterSeverity.value;
    const sort = sortDate.value;
    let filteredIncidents = incidents.slice();
    if (severity !== "All") {
        filteredIncidents = filteredIncidents.filter(i => i.severity === severity);
    }
    if (sort === "newest") {
        filteredIncidents.sort((a, b) => new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime());
    }
    else {
        filteredIncidents.sort((a, b) => new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime());
    }
    incidentList.innerHTML = '';
    filteredIncidents.forEach(incident => {
        const incidentDiv = document.createElement('div');
        incidentDiv.className = 'incident';
        incidentDiv.innerHTML = `
        <div class="incident-title">${incident.title}</div>
        <div class="incident-meta">
          Severity: <strong>${incident.severity}</strong> |
          Reported: ${new Date(incident.reported_at).toLocaleDateString()}
        </div>
        <button class="view-details">View Details</button>
        <div class="details">${incident.description}</div>
      `;
        const viewDetailsBtn = incidentDiv.querySelector('.view-details');
        const detailsDiv = incidentDiv.querySelector('.details');
        viewDetailsBtn.addEventListener('click', () => {
            detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
            viewDetailsBtn.textContent = detailsDiv.style.display === 'block' ? 'Hide Details' : 'View Details';
        });
        incidentList.appendChild(incidentDiv);
    });
}
filterSeverity.addEventListener('change', renderIncidents);
sortDate.addEventListener('change', renderIncidents);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const severity = severityInput.value;
    if (!title || !description || !severity) {
        alert("Please fill all fields.");
        return;
    }
    const newIncident = {
        id: incidents.length + 1,
        title,
        description,
        severity,
        reported_at: new Date().toISOString(),
    };
    incidents.push(newIncident);
    titleInput.value = '';
    descriptionInput.value = '';
    severityInput.value = '';
    renderIncidents();
});
renderIncidents();
