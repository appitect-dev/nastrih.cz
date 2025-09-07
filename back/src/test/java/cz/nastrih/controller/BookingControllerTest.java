package cz.nastrih.controller;

import cz.nastrih.dtos.BookingCreateDto;
import cz.nastrih.entity.Booking;
import cz.nastrih.enums.BookingStatus;
import cz.nastrih.service.BookingService;
import cz.nastrih.service.ServiceService;
import cz.nastrih.service.StaffService;
import cz.nastrih.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookingControllerTest {
    private BookingService bookingService;
    private UserService userService;
    private ServiceService serviceService;
    private StaffService staffService;
    private BookingController bookingController;

    @BeforeEach
    void setUp() {
        bookingService = mock(BookingService.class);
        userService = mock(UserService.class);
        serviceService = mock(ServiceService.class);
        staffService = mock(StaffService.class);
        bookingController = new BookingController(bookingService, userService, serviceService, staffService);
    }

    @Test
    void testCreateBookingReturnsBadRequestIfUserMissing() {
        BookingCreateDto dto = new BookingCreateDto();
        dto.setUserId(UUID.randomUUID());
        dto.setServiceId(UUID.randomUUID());
        dto.setStaffId(UUID.randomUUID());
        dto.setDate(LocalDate.now());
        dto.setStartTime(LocalTime.of(10, 0));
        dto.setEndTime(LocalTime.of(11, 0));
        when(userService.findById(dto.getUserId())).thenReturn(Optional.empty());
        when(serviceService.findById(dto.getServiceId())).thenReturn(Optional.of(new cz.nastrih.entity.Service()));
        when(staffService.findById(dto.getStaffId())).thenReturn(Optional.of(new cz.nastrih.entity.Staff()));
        ResponseEntity<Booking> response = bookingController.createBooking(dto);
        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    void testCreateBookingReturnsOkIfAllPresent() {
        BookingCreateDto dto = new BookingCreateDto();
        dto.setUserId(UUID.randomUUID());
        dto.setServiceId(UUID.randomUUID());
        dto.setStaffId(UUID.randomUUID());
        dto.setDate(LocalDate.now());
        dto.setStartTime(LocalTime.of(10, 0));
        dto.setEndTime(LocalTime.of(11, 0));
        cz.nastrih.entity.User user = new cz.nastrih.entity.User();
        cz.nastrih.entity.Service service = new cz.nastrih.entity.Service();
        cz.nastrih.entity.Staff staff = new cz.nastrih.entity.Staff();
        Booking booking = Booking.builder()
                .user(user)
                .service(service)
                .staff(staff)
                .date(dto.getDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .notes(dto.getNotes())
                .status(BookingStatus.PENDING)
                .build();
        when(userService.findById(dto.getUserId())).thenReturn(Optional.of(user));
        when(serviceService.findById(dto.getServiceId())).thenReturn(Optional.of(service));
        when(staffService.findById(dto.getStaffId())).thenReturn(Optional.of(staff));
        when(bookingService.save(any(Booking.class))).thenReturn(booking);
        ResponseEntity<Booking> response = bookingController.createBooking(dto);
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }
}

