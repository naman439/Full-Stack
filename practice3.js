const express = require('express');
const app = express();
const PORT = 3000;

const TOTAL_SEATS = 20;
const LOCK_TIMEOUT_MS = 60 * 1000; // 1 minute
const seats = {};

for (let i = 1; i <= TOTAL_SEATS; i++) {
    seats[i] = { status: 'available', lockTimer: null };
}

app.get('/seats', (req, res) => {
    const publicSeats = {};
    for (const id in seats) {
        publicSeats[id] = { status: seats[id].status };
    }
    res.status(200).json(publicSeats);
});

app.post('/lock/:seatId', (req, res) => {
    const { seatId } = req.params;
    const seat = seats[seatId];

    if (!seat) {
        return res.status(404).json({ message: 'Seat not found.' });
    }

    if (seat.status !== 'available') {
        return res.status(400).json({ message: `Seat ${seatId} is not available for locking.` });
    }

    seat.status = 'locked';
    seat.lockTimer = setTimeout(() => {
        if (seat.status === 'locked') {
            seat.status = 'available';
            console.log(`Lock expired for seat ${seatId}. It is now available.`);
        }
    }, LOCK_TIMEOUT_MS);

    res.status(200).json({ message: `Seat ${seatId} locked successfully. Confirm within 1 minute.` });
});

app.post('/confirm/:seatId', (req, res) => {
    const { seatId } = req.params;
    const seat = seats[seatId];

    if (!seat) {
        return res.status(404).json({ message: 'Seat not found.' });
    }

    if (seat.status !== 'locked') {
        return res.status(400).json({ message: `Seat ${seatId} is not locked and cannot be booked.` });
    }

    clearTimeout(seat.lockTimer);
    seat.status = 'booked';
    seat.lockTimer = null;

    res.status(200).json({ message: `Seat ${seatId} booked successfully!` });
});

app.listen(PORT, () => {
    console.log(`Booking server running on http://localhost:${PORT}`);
});