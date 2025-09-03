package cz.nastrih.service;

import cz.nastrih.entity.Booking;
import cz.nastrih.enums.BookingStatus;
import cz.nastrih.repository.BookingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookingServiceTest {
    private BookingRepository bookingRepository;
    private BookingService bookingService;

    @BeforeEach
    void setUp() {
        bookingRepository = mock(BookingRepository.class);
        bookingService = new BookingService(bookingRepository);
    }

    @Test
    void testFindAll() {
        when(bookingRepository.findAll()).thenReturn(List.of(new Booking()));
        List<Booking> bookings = bookingService.findAll();
        assertEquals(1, bookings.size());
    }

    @Test
    void testFindById() {
        UUID id = UUID.randomUUID();
        Booking booking = new Booking();
        when(bookingRepository.findById(id)).thenReturn(Optional.of(booking));
        Optional<Booking> result = bookingService.findById(id);
        assertTrue(result.isPresent());
    }

    @Test
    void testSave() {
        Booking booking = new Booking();
        when(bookingRepository.save(booking)).thenReturn(booking);
        Booking result = bookingService.save(booking);
        assertNotNull(result);
    }

    @Test
    void testDeleteById() {
        UUID id = UUID.randomUUID();
        bookingService.deleteById(id);
        verify(bookingRepository, times(1)).deleteById(id);
    }

    @Test
    void testFindByStatus() {
        Booking booking1 = new Booking();
        booking1.setStatus(BookingStatus.PENDING);
        Booking booking2 = new Booking();
        booking2.setStatus(BookingStatus.CONFIRMED);
        when(bookingRepository.findAll()).thenReturn(List.of(booking1, booking2));
        List<Booking> pendingBookings = bookingService.findByStatus(BookingStatus.PENDING);
        assertEquals(1, pendingBookings.size());
        assertEquals(BookingStatus.PENDING, pendingBookings.get(0).getStatus());
    }

    /**
     * Test for Javadoc demonstration
     * @see BookingService#findAll()
     */
    @Test
    void testFindAllWithJavadoc() {
        when(bookingRepository.findAll()).thenReturn(List.of(new Booking()));
        List<Booking> bookings = bookingService.findAll();
        assertEquals(1, bookings.size());
    }
}
