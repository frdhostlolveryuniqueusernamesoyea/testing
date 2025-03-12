document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

document.getElementById("prntscrModeToggle").addEventListener("click", () => {
    setInterval(() => {
        document.body.classList.toggle("dark-mode");
    }, 100);
});

// Initialize example data
let dnsData = [
    { domain: "example.com", ip: "93.184.216.34", ttl: "3600", status: "Active" },
    { domain: "mywebsite.org", ip: "192.168.1.1", ttl: "1800", status: "Inactive" },
];

const dnsTable = document.getElementById("dnsTable");
const form = document.getElementById("addRecordForm");

// Function to render the DNS table
function renderTable() {
    dnsTable.innerHTML = ""; // Clear the table
    dnsData.forEach((record, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.domain}</td>
            <td>${record.ip}</td>
            <td>${record.ttl}</td>
            <td>${record.status}</td>
            <td><button onclick="removeRecord(${index})">Remove</button></td>
        `;
        dnsTable.appendChild(row);
    });
}

// Add new record
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const domain = document.getElementById("domainInput").value;
    const ip = document.getElementById("ipInput").value;
    const ttl = document.getElementById("ttlInput").value;
    const status = document.getElementById("statusInput").value;

    const response = await fetch("https://api.cloudflare.com/client/v4/zones/0fbb81973c7c183d622aecc1a5415b3e/dns_records", {
        method: "POST",
        body: JSON.stringify({ 
            "comment": "test record from dnsdash",
            "content": ip,
            "name": domain,
            "proxied": false,
            "ttl": ttl,
            "type": "A"
         }),
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Key": "EEvO29SWUshpValP6wOvNEm01Fro30BBmxiKtOVe"
        },
    });

    dnsData.push({ domain, ip, ttl, status });
    renderTable();
    form.reset(); // Clear form fields
});

// Remove a record
function removeRecord(index) {
    dnsData.splice(index, 1); // Remove the record from the array
    renderTable();
}



// Initial table rendering
renderTable();
