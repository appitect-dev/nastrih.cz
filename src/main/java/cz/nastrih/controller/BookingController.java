package cz.nastrih.controller;

import cz.nastrih.dtos.BookingCreateDto;
import cz.nastrih.dtos.BookingUpdateDto;
import cz.nastrih.entity.Booking;
import cz.nastrih.entity.Service;
import cz.nastrih.entity.Staff;
import cz.nastrih.entity.User;
import cz.nastrih.enums.BookingStatus;
import cz.nastrih.service.BookingService;
import cz.nastrih.service.ServiceService;
import cz.nastrih.service.StaffService;
import cz.nastrih.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;
    private final UserService userService;
    private final ServiceService serviceService;
    private final StaffService staffService;

    public BookingController(BookingService bookingService, UserService userService, ServiceService serviceService, StaffService staffService) {
        this.bookingService = bookingService;
        this.userService = userService;
        this.serviceService = serviceService;
        this.staffService = staffService;
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable UUID id) {
        return bookingService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingCreateDto dto) {
        Optional<User> user = userService.findById(dto.getUserId());
        Optional<Service> service = serviceService.findById(dto.getServiceId());
        Optional<Staff> staff = staffService.findById(dto.getStaffId());
        if (user.isEmpty() || service.isEmpty() || staff.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Booking booking = Booking.builder()
                .user(user.get())
                .service(service.get())
                .staff(staff.get())
                .date(dto.getDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .notes(dto.getNotes())
                .status(BookingStatus.PENDING)
                .build();
        return ResponseEntity.ok(bookingService.save(booking));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable UUID id, @Valid @RequestBody BookingUpdateDto dto) {
        Optional<Booking> existing = bookingService.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Booking booking = existing.get();
        booking.setDate(dto.getDate());
        booking.setStartTime(dto.getStartTime());
        booking.setEndTime(dto.getEndTime());
        booking.setNotes(dto.getNotes());
        booking.setStatus(dto.getStatus());
        return ResponseEntity.ok(bookingService.save(booking));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable UUID id) {
        if (bookingService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        bookingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

