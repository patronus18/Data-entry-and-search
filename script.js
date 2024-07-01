let data = [];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function loadData() {
    Papa.parse("sample_data.csv", {
        download: true,
        header: true,
        complete: function(results) {
            data = results.data;
            displayData();
        }
    });
}

function displayData() {
    const table = document.getElementById('data-table');
    table.innerHTML = '<tr><th>Material Name</th><th>Material Type</th><th>Thickness</th><th>Density</th><th>Flammability Rating</th><th>Ignition Temp</th><th>Burn Time</th><th>Heat Release Rate</th><th>Smoke Production</th><th>Toxicity</th><th>Regulations</th><th>Use Case</th><th>Manufacturer</th><th>Flammability Class</th><th>Pass/Fail</th></tr>';
    data.forEach(entry => {
        const row = document.createElement('tr');
        Object.values(entry).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}

function searchData() {
    const query = document.getElementById('search-query').value.toLowerCase();
    const results = data.filter(entry => Object.values(entry).some(value => value.toLowerCase().includes(query)));
    const table = document.getElementById('search-results');
    table.innerHTML = '<tr><th>Material Name</th><th>Material Type</th><th>Thickness</th><th>Density</th><th>Flammability Rating</th><th>Ignition Temp</th><th>Burn Time</th><th>Heat Release Rate</th><th>Smoke Production</th><th>Toxicity</th><th>Regulations</th><th>Use Case</th><th>Manufacturer</th><th>Flammability Class</th><th>Pass/Fail</th></tr>';
    results.forEach(entry => {
        const row = document.createElement('tr');
        Object.values(entry).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}

function addEntry() {
    const form = document.getElementById('add-form');
    const newEntry = {};
    new FormData(form).forEach((value, key) => newEntry[key] = value);
    data.push(newEntry);
    form.reset();
    alert('New entry added successfully!');
    displayData();
}

function predictFlammability() {
    const form = document.getElementById('predict-form');
    const materialName = form.elements['material_name'].value;
    const flammabilityClass = form.elements['flammability_class'].value;
    const result = flammabilityClass.toLowerCase() === 'low' ? 'Pass' : 'Fail';
    document.getElementById('prediction-result').textContent = `Prediction for ${materialName}: ${result}`;
}

// Load initial data
loadData();
