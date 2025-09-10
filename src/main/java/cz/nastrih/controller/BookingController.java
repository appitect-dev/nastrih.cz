package cz.nastrih.controller;

import cz.nastrih.dtos.BookingCreateDto;
import cz.nastrih.dtos.BookingUpdateDto;
import cz.nastrih.dtos.TimeSlot;
import cz.nastrih.dtos.TimeSlotRequestDto;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private static final Logger log = LoggerFactory.getLogger(BookingController.class);
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

    @Operation(summary = "Get all bookings")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "List of bookings returned")
    })
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        log.info("Received request to get all bookings");
        return ResponseEntity.ok(bookingService.findAll());
    }

    @Operation(summary = "Get booking by ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Booking found"),
        @ApiResponse(responseCode = "404", description = "Booking not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable UUID id) {
        log.info("Received request to get booking by id: {}", id);
        return bookingService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new booking")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Booking created"),
        @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingCreateDto dto) {
        log.info("Received request to create booking: {}", dto);
        Optional<User> user = userService.findById(dto.getUserId());
        Optional<Service> service = serviceService.findById(dto.getServiceId());
        Optional<Staff> staff = staffService.findById(dto.getStaffId());
        if (user.isEmpty() || service.isEmpty() || staff.isEmpty()) {
            log.warn("Invalid booking creation request: missing user/service/staff");
            return ResponseEntity.badRequest().build();
        }
        if (bookingService.hasConflict(dto.getStaffId(), dto.getDate(), dto.getStartTime(), dto.getEndTime())) {
            return ResponseEntity.status(409).build();
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

    @Operation(summary = "Update a booking")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Booking updated"),
        @ApiResponse(responseCode = "404", description = "Booking not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable UUID id, @Valid @RequestBody BookingUpdateDto dto) {
        log.info("Received request to update booking id: {} with data: {}", id, dto);
        Optional<Booking> existing = bookingService.findById(id);
        if (existing.isEmpty()) {
            log.warn("Booking not found for update: {}", id);
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

    @Operation(summary = "Delete a booking")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Booking deleted"),
        @ApiResponse(responseCode = "404", description = "Booking not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable UUID id) {
        log.info("Received request to delete booking id: {}", id);
        if (bookingService.findById(id).isEmpty()) {
            log.warn("Booking not found for deletion: {}", id);
            return ResponseEntity.notFound().build();
        }
        bookingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get available time slots for a staff/service/date")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "List of available time slots returned"),
        @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping("/availability")
    public ResponseEntity<List<TimeSlot>> getAvailability(@Valid @RequestBody TimeSlotRequestDto req) {
        Optional<Staff> staff = staffService.findById(req.getStaffId());
        Optional<Service> service = serviceService.findById(req.getServiceId());
        if (staff.isEmpty() || service.isEmpty() || !service.get().isActive() || !staff.get().isActive()) {
            return ResponseEntity.badRequest().build();
        }
        int duration = service.get().getDuration();
        List<LocalTime> starts = bookingService.getAvailability(req.getStaffId(), req.getDate(), duration);
        List<TimeSlot> slots = starts.stream()
                .map(s -> new TimeSlot(s, s.plusMinutes(duration)))
                .collect(Collectors.toList());
        return ResponseEntity.ok(slots);
    }
}
