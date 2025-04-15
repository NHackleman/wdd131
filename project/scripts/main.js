// Sunny Side Up Golf Course JS

document.addEventListener('DOMContentLoaded', () => {
    // Booking Modal Logic
    const bookBtn = document.getElementById('bookTeeTimeBtn');
    const modal = document.getElementById('bookingModal');
    const closeModal = document.getElementById('closeBookingModal');
    if (bookBtn && modal && closeModal) {
        bookBtn.addEventListener('click', () => {
            modal.setAttribute('aria-hidden', 'false');
        });
        closeModal.addEventListener('click', () => {
            modal.setAttribute('aria-hidden', 'true');
        });
        closeModal.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                modal.setAttribute('aria-hidden', 'true');
            }
        });
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
        });
    }

    // Booking Form Logic (localStorage, feedback, validation)
    const bookingForm = document.getElementById('bookingForm');
    const bookingFeedback = document.getElementById('bookingFeedback');
    if (bookingForm && bookingFeedback) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = bookingForm.name.value.trim();
            const date = bookingForm.date.value;
            const time = bookingForm.time.value;
            if (name && date && time) {
                const booking = { name, date, time };
                let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
                bookings.push(booking);
                localStorage.setItem('bookings', JSON.stringify(bookings));
                bookingFeedback.innerHTML = `<p>Thank you, ${name}! Your tee time for ${date} at ${time} is booked.</p>`;
                bookingForm.reset();
            } else {
                bookingFeedback.innerHTML = `<p>Please fill out all fields.</p>`;
            }
        });
    }

    // Hole Selector Logic (Course Preview)
    const holeSelect = document.getElementById('holeSelect');
    const holeDetails = document.getElementById('holeDetails');
    const holes = [
        {
            number: 1,
            par: 4,
            desc: "A gentle dogleg right with a wide fairway and a welcoming sunrise view."
        },
        {
            number: 2,
            par: 3,
            desc: "Short par 3 over water, club selection is key."
        },
        {
            number: 3,
            par: 5,
            desc: "A long straight hole with a bunker guarding the green."
        },
        {
            number: 4,
            par: 4,
            desc: "A challenging uphill par 4 with a narrow approach and mature trees lining the fairway."
        },
        {
            number: 5,
            par: 3,
            desc: "A short par 3 with a sloping green and tricky wind conditions."
        },
        {
            number: 6,
            par: 5,
            desc: "A sweeping dogleg left par 5, risk-reward for those who cut the corner over the water."
        },
        {
            number: 7,
            par: 4,
            desc: "A downhill par 4 with a wide landing area, but beware the hidden bunker near the green."
        },
        {
            number: 8,
            par: 3,
            desc: "A long par 3 bordered by wildflowers, requiring a precise tee shot."
        },
        {
            number: 9,
            par: 4,
            desc: "A par 4 finishing hole with a pond guarding the front of the green."
        },
        {
            number: 10,
            par: 4,
            desc: "A gentle par 4 to start the back nine, featuring a split fairway and rolling hills."
        },
        {
            number: 11,
            par: 5,
            desc: "A demanding par 5 with out-of-bounds on the right and a two-tiered green."
        },
        {
            number: 12,
            par: 3,
            desc: "A picturesque par 3 over a ravine, club selection is crucial."
        },
        {
            number: 13,
            par: 4,
            desc: "A narrow par 4 with dense woods along the left side and a small green."
        },
        {
            number: 14,
            par: 5,
            desc: "A par 5 with a sharp dogleg right and a green protected by bunkers."
        },
        {
            number: 15,
            par: 4,
            desc: "A short par 4 with an elevated tee and panoramic course views."
        },
        {
            number: 16,
            par: 3,
            desc: "A long par 3 with a water hazard short and left of the green."
        },
        {
            number: 17,
            par: 4,
            desc: "A strategic par 4 with a split fairway and a challenging approach."
        },
        {
            number: 18,
            par: 5,
            desc: "A memorable finishing par 5 with a wide fairway and a large, undulating green."
        }
    ];
    if (holeSelect && holeDetails) {
        // Populate options
        holeSelect.innerHTML = holes.map(h => `<option value="${h.number}">Hole ${h.number}</option>`).join('');
        // Show details for selected hole
        function showHoleDetails(num) {
            const hole = holes.find(h => h.number == num);
            if (hole) {
                holeDetails.innerHTML = `
                <h3>Hole ${hole.number} (Par ${hole.par})</h3>
                <p>${hole.desc}</p>
                `;
            }
        }
        holeSelect.addEventListener('change', e => {
            showHoleDetails(e.target.value);
        });
        showHoleDetails(1); // Default to hole 1
    }

    // Gallery Filtering
    const galleryGrid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (galleryGrid && filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                Array.from(galleryGrid.children).forEach(img => {
                    if (filter === 'all' || img.dataset.category === filter) {
                        img.style.display = '';
                    } else {
                        img.style.display = 'none';
                    }
                });
            });
        });
    }

    // Contact Form Logic (localStorage, validation, feedback)
    const contactForm = document.getElementById('contactForm');
    const contactFeedback = document.getElementById('contactFeedback');
    if (contactForm && contactFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.contactName.value.trim();
            const email = contactForm.contactEmail.value.trim();
            const msg = contactForm.contactMsg.value.trim();
            if (name && email && msg) {
                const messages = JSON.parse(localStorage.getItem('messages')) || [];
                messages.push({ name, email, msg, date: new Date().toISOString() });
                localStorage.setItem('messages', JSON.stringify(messages));
                contactFeedback.innerHTML = `<p>Thank you, ${name}! Your message has been sent.</p>`;
                contactForm.reset();
            } else {
                contactFeedback.innerHTML = `<p>Please fill out all fields.</p>`;
            }
        });
    }
});