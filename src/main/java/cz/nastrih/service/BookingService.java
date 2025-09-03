package cz.nastrih.service;

import cz.nastrih.entity.Booking;
import cz.nastrih.enums.BookingStatus;
import cz.nastrih.repository.BookingRepository;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {
    private static final Logger log = LoggerFactory.getLogger(BookingService.class);
    private final BookingRepository bookingRepository;

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
}
