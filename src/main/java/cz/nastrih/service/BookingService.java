package cz.nastrih.service;

import cz.nastrih.entity.Booking;
import cz.nastrih.enums.BookingStatus;
import cz.nastrih.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {
    private static final Logger log = LoggerFactory.getLogger(BookingService.class);
    private final BookingRepository bookingRepository;

    @Value("${booking.hours.open:09:00}")
    private String openTimeStr;
    @Value("${booking.hours.close:17:00}")
    private String closeTimeStr;
    @Value("${booking.slot.step-minutes:15}")
    private int stepMinutes;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> findAll() {
        log.info("Fetching all bookings");
        return bookingRepository.findAll();
    }

    public Optional<Booking> findById(UUID id) {
        log.info("Fetching booking by id: {}", id);
        return bookingRepository.findById(id);
    }

    public Booking save(Booking booking) {
        log.info("Saving booking: {}", booking);
        return bookingRepository.save(booking);
    }

    public void deleteById(UUID id) {
        log.info("Deleting booking by id: {}", id);
        bookingRepository.deleteById(id);
    }

    public List<Booking> findByStatus(BookingStatus status) {
        log.info("Fetching bookings by status: {}", status);
        return bookingRepository.findAll().stream()
                .filter(b -> b.getStatus() == status)
                .toList();
    }

    public boolean hasConflict(UUID staffId, LocalDate date, LocalTime start, LocalTime end) {
        List<BookingStatus> active = new ArrayList<>(EnumSet.of(BookingStatus.PENDING, BookingStatus.CONFIRMED));
        return !bookingRepository.findOverlappingActive(staffId, date, start, end, active).isEmpty();
    }

    public List<LocalTime> getAvailability(UUID staffId, LocalDate date, int durationMinutes) {
        LocalTime open = LocalTime.parse(openTimeStr);
        LocalTime close = LocalTime.parse(closeTimeStr);
        List<LocalTime> slots = new ArrayList<>();
        for (LocalTime cursor = open; !cursor.plusMinutes(durationMinutes).isAfter(close); cursor = cursor.plusMinutes(stepMinutes)) {
            LocalTime end = cursor.plusMinutes(durationMinutes);
            if (!hasConflict(staffId, date, cursor, end)) {
                slots.add(cursor);
            }
        }
        return slots;
    }
}
