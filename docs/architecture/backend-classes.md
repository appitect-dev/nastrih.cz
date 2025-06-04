# Backend Class Structure

## Core Entities

### User.java

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String firstName;
    private String lastName;
    private String phone;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

### Service.java

```java
@Entity
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private Integer duration; // in minutes

    @Column(nullable = false)
    private BigDecimal price;

    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToMany(mappedBy = "services")
    private Set<Staff> staff = new HashSet<>();
}
```

### Staff.java

```java
@Entity
@Table(name = "staff")
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String bio;
    private boolean isActive;

    @ManyToMany
    @JoinTable(name = "staff_services")
    private Set<Service> services = new HashSet<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

### Booking.java

```java
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff;

    @Column(nullable = false)
    private LocalDate bookingDate;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

## Repositories

### UserRepository.java

```java
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRole(UserRole role);
    List<User> findByIsActiveTrue();
}
```

### ServiceRepository.java

```java
@Repository
public interface ServiceRepository extends JpaRepository<Service, UUID> {
    List<Service> findByIsActiveTrue();
    List<Service> findByStaffId(UUID staffId);
    Optional<Service> findByName(String name);
}
```

### StaffRepository.java

```java
@Repository
public interface StaffRepository extends JpaRepository<Staff, UUID> {
    List<Staff> findByIsActiveTrue();
    List<Staff> findByServicesId(UUID serviceId);
    Optional<Staff> findByUserId(UUID userId);
}
```

### BookingRepository.java

```java
@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByUserId(UUID userId);
    List<Booking> findByStaffId(UUID staffId);
    List<Booking> findByBookingDate(LocalDate date);
    List<Booking> findByStatus(BookingStatus status);
    boolean existsByStaffIdAndBookingDateAndStartTimeBetween(
        UUID staffId, LocalDate date, LocalTime start, LocalTime end);
}
```

## Services

### UserService.java

```java
@Service
@Transactional
public class UserService {
    // Methods to implement:
    User createUser(UserRegistrationDto dto);
    User updateUser(UUID id, UserUpdateDto dto);
    void deleteUser(UUID id);
    User getUserById(UUID id);
    User getUserByEmail(String email);
    List<User> getAllUsers();
    List<User> getUsersByRole(UserRole role);
    void changePassword(UUID id, PasswordChangeDto dto);
    void deactivateUser(UUID id);
    void activateUser(UUID id);
}
```

### ServiceService.java

```java
@Service
@Transactional
public class ServiceService {
    // Methods to implement:
    Service createService(ServiceCreateDto dto);
    Service updateService(UUID id, ServiceUpdateDto dto);
    void deleteService(UUID id);
    Service getServiceById(UUID id);
    List<Service> getAllServices();
    List<Service> getActiveServices();
    void assignStaffToService(UUID serviceId, UUID staffId);
    void removeStaffFromService(UUID serviceId, UUID staffId);
    void deactivateService(UUID id);
    void activateService(UUID id);
}
```

### StaffService.java

```java
@Service
@Transactional
public class StaffService {
    // Methods to implement:
    Staff createStaff(StaffCreateDto dto);
    Staff updateStaff(UUID id, StaffUpdateDto dto);
    void deleteStaff(UUID id);
    Staff getStaffById(UUID id);
    List<Staff> getAllStaff();
    List<Staff> getActiveStaff();
    List<Staff> getStaffByService(UUID serviceId);
    void assignServiceToStaff(UUID staffId, UUID serviceId);
    void removeServiceFromStaff(UUID staffId, UUID serviceId);
    void deactivateStaff(UUID id);
    void activateStaff(UUID id);
}
```

### BookingService.java

```java
@Service
@Transactional
public class BookingService {
    // Methods to implement:
    Booking createBooking(BookingCreateDto dto);
    Booking updateBooking(UUID id, BookingUpdateDto dto);
    void cancelBooking(UUID id);
    Booking getBookingById(UUID id);
    List<Booking> getBookingsByUser(UUID userId);
    List<Booking> getBookingsByStaff(UUID staffId);
    List<Booking> getBookingsByDate(LocalDate date);
    List<Booking> getBookingsByStatus(BookingStatus status);
    boolean isTimeSlotAvailable(BookingAvailabilityDto dto);
    List<TimeSlot> getAvailableTimeSlots(TimeSlotRequestDto dto);
    void sendBookingConfirmation(Booking booking);
    void sendBookingReminder(Booking booking);
}
```

## Controllers

### AuthController.java

```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    // Endpoints to implement:
    @PostMapping("/register")
    ResponseEntity<AuthResponse> register(@Valid @RequestBody UserRegistrationDto dto);

    @PostMapping("/login")
    ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest dto);

    @PostMapping("/refresh")
    ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody TokenRefreshRequest dto);

    @PostMapping("/logout")
    ResponseEntity<Void> logout();

    @PostMapping("/forgot-password")
    ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequest dto);

    @PostMapping("/reset-password")
    ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest dto);
}
```

### BookingController.java

```java
@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    // Endpoints to implement:
    @PostMapping
    ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingCreateDto dto);

    @PutMapping("/{id}")
    ResponseEntity<Booking> updateBooking(@PathVariable UUID id, @Valid @RequestBody BookingUpdateDto dto);

    @DeleteMapping("/{id}")
    ResponseEntity<Void> cancelBooking(@PathVariable UUID id);

    @GetMapping("/{id}")
    ResponseEntity<Booking> getBooking(@PathVariable UUID id);

    @GetMapping("/user/{userId}")
    ResponseEntity<List<Booking>> getUserBookings(@PathVariable UUID userId);

    @GetMapping("/staff/{staffId}")
    ResponseEntity<List<Booking>> getStaffBookings(@PathVariable UUID staffId);

    @GetMapping("/date/{date}")
    ResponseEntity<List<Booking>> getBookingsByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date);

    @GetMapping("/available-slots")
    ResponseEntity<List<TimeSlot>> getAvailableTimeSlots(@Valid @RequestBody TimeSlotRequestDto dto);
}
```

### AdminController.java

```java
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    // Endpoints to implement:
    @GetMapping("/dashboard")
    ResponseEntity<DashboardStats> getDashboardStats();

    @GetMapping("/users")
    ResponseEntity<Page<User>> getAllUsers(Pageable pageable);

    @GetMapping("/bookings")
    ResponseEntity<Page<Booking>> getAllBookings(Pageable pageable);

    @GetMapping("/services")
    ResponseEntity<Page<Service>> getAllServices(Pageable pageable);

    @GetMapping("/staff")
    ResponseEntity<Page<Staff>> getAllStaff(Pageable pageable);

    @PostMapping("/services")
    ResponseEntity<Service> createService(@Valid @RequestBody ServiceCreateDto dto);

    @PutMapping("/services/{id}")
    ResponseEntity<Service> updateService(@PathVariable UUID id, @Valid @RequestBody ServiceUpdateDto dto);

    @PostMapping("/staff")
    ResponseEntity<Staff> createStaff(@Valid @RequestBody StaffCreateDto dto);

    @PutMapping("/staff/{id}")
    ResponseEntity<Staff> updateStaff(@PathVariable UUID id, @Valid @RequestBody StaffUpdateDto dto);

    @GetMapping("/analytics")
    ResponseEntity<AnalyticsData> getAnalytics(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate);
}
```

## DTOs (Data Transfer Objects)

### User DTOs

```java
public record UserRegistrationDto(
    String email,
    String password,
    String firstName,
    String lastName,
    String phone
) {}

public record UserUpdateDto(
    String firstName,
    String lastName,
    String phone
) {}

public record PasswordChangeDto(
    String currentPassword,
    String newPassword
) {}
```

### Service DTOs

```java
public record ServiceCreateDto(
    String name,
    String description,
    Integer duration,
    BigDecimal price
) {}

public record ServiceUpdateDto(
    String name,
    String description,
    Integer duration,
    BigDecimal price,
    boolean isActive
) {}
```

### Staff DTOs

```java
public record StaffCreateDto(
    UUID userId,
    String bio,
    Set<UUID> serviceIds
) {}

public record StaffUpdateDto(
    String bio,
    Set<UUID> serviceIds,
    boolean isActive
) {}
```

### Booking DTOs

```java
public record BookingCreateDto(
    UUID userId,
    UUID serviceId,
    UUID staffId,
    LocalDate date,
    LocalTime startTime
) {}

public record BookingUpdateDto(
    UUID staffId,
    LocalDate date,
    LocalTime startTime,
    String notes
) {}

public record TimeSlotRequestDto(
    UUID serviceId,
    UUID staffId,
    LocalDate date
) {}

public record TimeSlot(
    LocalTime startTime,
    LocalTime endTime,
    boolean available
) {}
```

## Enums

```java
public enum UserRole {
    USER,
    STAFF,
    ADMIN
}

public enum BookingStatus {
    PENDING,
    CONFIRMED,
    CANCELLED,
    COMPLETED,
    NO_SHOW
}
```

## Exceptions

```java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

public class BookingException extends RuntimeException {
    public BookingException(String message) {
        super(message);
    }
}

public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}
```

## Security Configuration

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // Methods to implement:
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http);

    @Bean
    PasswordEncoder passwordEncoder();

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config);

    @Bean
    JwtAuthenticationFilter jwtAuthenticationFilter();
}
```

This class structure provides a complete guide for implementing the backend system. Each class includes:

- Required annotations
- Properties/fields
- Methods to implement
- Relationships between entities
- Security considerations
- Data validation requirements

The implementation should follow these guidelines:

1. Use Lombok annotations (@Data, @Builder, etc.) to reduce boilerplate
2. Implement proper validation using @Valid and custom validators
3. Add proper error handling and logging
4. Follow REST API best practices
5. Implement proper security measures
6. Add comprehensive unit tests
7. Document all public methods using Javadoc

```

```
