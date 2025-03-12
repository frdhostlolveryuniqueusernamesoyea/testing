document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Example data for the table
const dnsData = [
    { domain: "example.com", ip: "93.184.216.34", ttl: "3600", status: "Active" },
    { domain: "mywebsite.org", ip: "192.168.1.1", ttl: "1800", status: "Inactive" },
];

const dnsTable = document.getElementById("dnsTable");
dnsData.forEach(record => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${record.domain}</td>
        <td>${record.ip}</td>
        <td>${record.ttl}</td>
        <td>${record.status}</td>
    `;
    dnsTable.appendChild(row);
});
