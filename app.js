// if (!localStorage.getItem('isAuthenticated')) {
//     window.location.href = 'login.html';
// }
// User Data
    const userData = {
        profile: {
            name: "Sarah Anderson",
            goal: "Living a healthier lifestyle",
            imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=256",
            age: 28,
            dob: "1996-03-15",
            gender: "Female",
            height: "5'6\"",
            weight: "135",
            level: 12,
            xp: 2800,
            nextLevelXp: 3000
        },
        stats: {
            streak: 8,
            points: 1250,
            calories: 1850,
            exercise: 45,
            sleep: 7.2,
            nutrition: 85,
            mood: 'energetic'
        },
        achievements: [
            { id: 1, title: 'Fitness Enthusiast', icon: '💪', progress: 100, description: 'Complete 30 workouts', xpReward: 500 },
            { id: 2, title: 'Early Bird', icon: '🌅', progress: 85, description: 'Wake up before 6 AM for 7 days', xpReward: 300 },
            { id: 3, title: 'Streak Master', icon: '🔥', progress: 70, description: 'Maintain a 10-day streak', xpReward: 400 },
            { id: 4, title: 'Goal Crusher', icon: '🎯', progress: 45, description: 'Achieve all daily targets', xpReward: 600 },
        ]
    };

    // Health Chart Data
    const weeklyData = [
        { name: 'Mon', calories: 1800, exercise: 45, sleep: 7.5, nutrition: 80 },
        { name: 'Tue', calories: 1950, exercise: 30, sleep: 6.8, nutrition: 75 },
        { name: 'Wed', calories: 1750, exercise: 60, sleep: 7.8, nutrition: 90 },
        { name: 'Thu', calories: 2100, exercise: 40, sleep: 7.2, nutrition: 85 },
        { name: 'Fri', calories: 1850, exercise: 50, sleep: 7.0, nutrition: 88 },
        { name: 'Sat', calories: 2200, exercise: 20, sleep: 8.5, nutrition: 70 },
        { name: 'Sun', calories: 1900, exercise: 55, sleep: 8.0, nutrition: 82 },
    ];

    const monthlyData = [
        { name: 'Week 1', calories: 1900, exercise: 42, sleep: 7.4, nutrition: 82 },
        { name: 'Week 2', calories: 1950, exercise: 45, sleep: 7.2, nutrition: 85 },
        { name: 'Week 3', calories: 1850, exercise: 50, sleep: 7.8, nutrition: 88 },
        { name: 'Week 4', calories: 1800, exercise: 48, sleep: 7.6, nutrition: 86 },
    ];

    // Initialize Health Chart
    let healthChart;
    const ctx = document.getElementById('healthChart').getContext('2d');

    function initializeChart(data) {
        if (healthChart) {
            healthChart.destroy();
        }

        healthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.name),
                datasets: [
                    {
                        label: 'Calories',
                        data: data.map(d => d.calories),
                        borderColor: '#0ea5e9',
                        tension: 0.4
                    },
                    {
                        label: 'Exercise (min)',
                        data: data.map(d => d.exercise),
                        borderColor: '#10b981',
                        tension: 0.4
                    },
                    {
                        label: 'Sleep (hours)',
                        data: data.map(d => d.sleep),
                        borderColor: '#6366f1',
                        tension: 0.4
                    },
                    {
                        label: 'Nutrition Score',
                        data: data.map(d => d.nutrition),
                        borderColor: '#f59e0b',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Initialize Achievements
    function initializeAchievements() {
        const achievementsGrid = document.querySelector('.achievements-grid');
        userData.achievements.forEach(achievement => {
            const card = document.createElement('div');
            card.className = 'achievement-card';
            card.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <h3>${achievement.title}</h3>
                <div class="progress-bar">
                    <div class="progress" style="width: ${achievement.progress}%"></div>
                </div>
                <p>${achievement.progress}% Complete</p>
                <p class="xp-reward">+${achievement.xpReward} XP</p>
            `;
            achievementsGrid.appendChild(card);
        });
    }

    // Event Listeners
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize Chart with weekly data
        initializeChart(weeklyData);
        
        // Initialize Achievements
        initializeAchievements();

        // Chart period toggle
        const chartButtons = document.querySelectorAll('.chart-btn');
        chartButtons.forEach(button => {
            button.addEventListener('click', () => {
                chartButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const period = button.dataset.period;
                initializeChart(period === 'weekly' ? weeklyData : monthlyData);
            });
        });

        // Join button
        const joinBtn = document.querySelector('.join-btn');
        if (joinBtn) {
            joinBtn.addEventListener('click', () => {
                alert('Coming soon! Join Vasudev LifeKit to unlock more features.');
            });
        }

        // Notifications button
        const notificationsBtn = document.querySelector('.notifications-btn');
        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', () => {
                alert('You have 2 new notifications!');
            });
        }
    });

    // Animation helper
    function animate(element, keyframes, options) {
        return element.animate(keyframes, options);
    }

    // Add animations to elements
    document.querySelectorAll('.metric-card, .achievement-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            animate(card, [
                { transform: 'translateY(0)' },
                { transform: 'translateY(-5px)' }
            ], {
                duration: 200,
                fill: 'forwards'
            });
        });

        card.addEventListener('mouseleave', () => {
            animate(card, [
                { transform: 'translateY(-5px)' },
                { transform: 'translateY(0)' }
            ], {
                duration: 200,
                fill: 'forwards'
            });
        });
    });