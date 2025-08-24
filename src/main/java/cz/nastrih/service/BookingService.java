package cz.nastrih.service;

import cz.nastrih.entity.Booking;
import cz.nastrih.enums.BookingStatus;
import cz.nastrih.repository.BookingRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> findById(UUID id) {
        return bookingRepository.findById(id);
    }

    public Booking save(Booking booking) {
        return bookingRepository.save(booking);
    }

    public void deleteById(UUID id) {
        bookingRepository.deleteById(id);
    }

    public List<Booking> findByStatus(BookingStatus status) {
        return bookingRepository.findAll().stream()
                .filter(b -> b.getStatus() == status)
                .toList();
    }
}

