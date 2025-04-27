
// Mock Data
const data = {
    appointments: [
        {
            id: 1,
            time: '09:00 AM',
            patientName: 'Sarah Johnson',
            type: 'Regular Checkup',
            status: 'confirmed'
        },
        {
            id: 2,
            time: '10:30 AM',
            patientName: 'Michael Chen',
            type: 'Follow-up',
            status: 'pending'
        },
        {
            id: 3,
            time: '02:00 PM',
            patientName: 'Emma Davis',
            type: 'New Patient',
            status: 'confirmed'
        }
    ],
    messages: [
        {
            id: 1,
            from: 'David Wilson',
            subject: 'Medication Question',
            preview: 'Hi Dr. Smith, I wanted to ask about the new medication...',
            time: '10:30 AM',
            unread: true
        },
        {
            id: 2,
            from: 'Lisa Anderson',
            subject: 'Follow-up Appointment',
            preview: 'Thank you for the consultation yesterday. Regarding the follow-up...',
            time: '09:15 AM',
            unread: false
        }
    ],
    patients: [
        {
            id: 1,
            name: 'James Wilson',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
            lastVisit: '2024-03-14',
            condition: 'Hypertension'
        },
        {
            id: 2,
            name: 'Emily Brown',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
            lastVisit: '2024-03-13',
            condition: 'Diabetes'
        },
        {
            id: 3,
            name: 'Michael Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            lastVisit: '2024-03-12',
            condition: 'Asthma'
        }
    ],
    activityData: {
        weekly: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [8, 12, 10, 15, 11, 6, 4]
        },
        monthly: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [45, 52, 48, 50]
        }
    }
};

// Initialize Components
function initializeAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = data.appointments
        .map(appointment => `
            <div class="appointment-item">
                <div class="appointment-info">
                    <div class="appointment-time">${appointment.time}</div>
                    <div class="appointment-patient">
                        <div class="patient-name">${appointment.patientName}</div>
                        <div class="appointment-type">${appointment.type}</div>
                    </div>
                </div>
                <div class="appointment-status ${appointment.status}">${appointment.status}</div>
            </div>
        `)
        .join('');
}

function initializeMessages() {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = data.messages
        .map(message => `
            <div class="message-item ${message.unread ? 'unread' : ''}" onclick="showMessage(${message.id})">
                <div class="message-header">
                    <div class="message-from">${message.from}</div>
                    <div class="message-time">${message.time}</div>
                </div>
                <div class="message-preview">${message.preview}</div>
            </div>
        `)
        .join('');
}

function initializePatients() {
    const patientsGrid = document.getElementById('patientsGrid');
    patientsGrid.innerHTML = data.patients
        .map(patient => `
            <div class="patient-card">
                <img src="${patient.avatar}" alt="${patient.name}" class="patient-avatar">
                <div class="patient-info">
                    <h3>${patient.name}</h3>
                    <div class="patient-details">
                        <div>Last Visit: ${new Date(patient.lastVisit).toLocaleDateString()}</div>
                        <div>${patient.condition}</div>
                    </div>
                </div>
            </div>
        `)
        .join('');
}

let activityChart;
function initializeActivityChart(period = 'weekly') {
    const ctx = document.getElementById('activityChart').getContext('2d');
    const chartData = data.activityData[period];

    if (activityChart) {
        activityChart.destroy();
    }

    activityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Consultations',
                data: chartData.data,
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    });
}

// Modal Functions
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="close-btn" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal(button) {
    const modal = button.closest('.modal');
    document.body.removeChild(modal);
}

// Schedule Appointment
function showScheduleAppointment() {
    const content = `
        <form onsubmit="handleScheduleSubmit(event)" class="schedule-form">
            <div class="form-group">
                <label for="patient">Patient</label>
                <select id="patient" required>
                    ${data.patients.map(patient => 
                        `<option value="${patient.id}">${patient.name}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="date">Date</label>
                <input type="date" id="date" required min="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-group">
                <label for="time">Time</label>
                <input type="time" id="time" required>
            </div>
            <div class="form-group">
                <label for="type">Appointment Type</label>
                <select id="type" required>
                    <option value="Regular Checkup">Regular Checkup</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="New Patient">New Patient</option>
                    <option value="Emergency">Emergency</option>
                </select>
            </div>
            <button type="submit" class="submit-btn">Schedule Appointment</button>
        </form>
    `;
    showModal('Schedule Appointment', content);
}

function handleScheduleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const newAppointment = {
        id: data.appointments.length + 1,
        patientName: form.patient.options[form.patient.selectedIndex].text,
        time: form.time.value,
        type: form.type.value,
        status: 'pending'
    };
    
    data.appointments.push(newAppointment);
    initializeAppointments();
    closeModal(form.closest('.modal').querySelector('.close-btn'));
    showNotification('Appointment scheduled successfully!');
}

// Message Functions
function showMessageCompose() {
    const content = `
        <form onsubmit="handleMessageSubmit(event)" class="message-form">
            <div class="form-group">
                <label for="recipient">To</label>
                <select id="recipient" required>
                    ${data.patients.map(patient => 
                        `<option value="${patient.id}">${patient.name}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" rows="4" required></textarea>
            </div>
            <button type="submit" class="submit-btn">Send Message</button>
        </form>
    `;
    showModal('Compose Message', content);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const form = event.target;
    closeModal(form.closest('.modal').querySelector('.close-btn'));
    showNotification('Message sent successfully!');
}

function showMessage(id) {
    const message = data.messages.find(m => m.id === id);
    const content = `
        <div class="message-full">
            <div class="message-subject">${message.subject}</div>
            <div class="message-from">From: ${message.from}</div>
            <div class="message-time">Time: ${message.time}</div>
            <div class="message-content">${message.preview}</div>
            <div class="form-group" style="margin-top: 1rem;">
                <label for="reply">Reply</label>
                <textarea id="reply" rows="4"></textarea>
            </div>
            <button onclick="handleReply(${id})" class="submit-btn">Send Reply</button>
        </div>
    `;
    showModal('Message', content);
}

function handleReply(id) {
    closeModal(document.querySelector('.modal').querySelector('.close-btn'));
    showNotification('Reply sent successfully!');
}

// View All Functions
function showAllPatients() {
    const content = `
        <div class="full-list">
            ${data.patients.map(patient => `
                <div class="patient-row">
                    <img src="${patient.avatar}" alt="${patient.name}" class="patient-avatar-small">
                    <div class="patient-info-row">
                        <div class="patient-name">${patient.name}</div>
                        <div class="patient-condition">${patient.condition}</div>
                        <div class="patient-last-visit">Last Visit: ${new Date(patient.lastVisit).toLocaleDateString()}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    showModal('All Patients', content);
}

function showAllAppointments() {
    const content = `
        <div class="full-list">
            ${data.appointments.map(appointment => `
                <div class="appointment-row">
                    <div class="appointment-time">${appointment.time}</div>
                    <div class="appointment-info-row">
                        <div class="patient-name">${appointment.patientName}</div>
                        <div class="appointment-type">${appointment.type}</div>
                    </div>
                    <div class="appointment-status ${appointment.status}">${appointment.status}</div>
                </div>
            `).join('')}
        </div>
    `;
    showModal('All Appointments', content);
}

function showAllMessages() {
    const content = `
        <div class="full-list">
            ${data.messages.map(message => `
                <div class="message-row ${message.unread ? 'unread' : ''}" onclick="showMessage(${message.id})">
                    <div class="message-info-row">
                        <div class="message-from">${message.from}</div>
                        <div class="message-subject">${message.subject}</div>
                        <div class="message-preview">${message.preview}</div>
                    </div>
                    <div class="message-time">${message.time}</div>
                </div>
            `).join('')}
        </div>
    `;
    showModal('All Messages', content);
}

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initializeAppointments();
    initializeMessages();
    initializePatients();
    initializeActivityChart();

    // Period selector for activity chart
    document.querySelectorAll('.period-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.period-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            initializeActivityChart(button.dataset.period);
        });
    });
});